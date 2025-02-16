<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TransactionDetail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TransactionsExport;


class TransactionController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get cart
        $carts = Cart::with('product')->where('cashier_id', auth()->user()->id)->latest()->get();

        //get all customers
        $customers = Customer::latest()->get();

        $carts_total = 0;
        foreach ($carts as $cart) {
            $carts_total += $cart->price; // Assuming your quantity column is named 'quantity'
        }


        return Inertia::render('Dashboard/Transactions/Index', [
            'carts' => $carts,
            'carts_total' => $carts_total,
            'customers' => $customers
        ]);
    }

    public function transactionDetails(Request $request)
    {
        $transactions = Transaction::with('details.product')
            ->when($request->invoice, function ($query) use ($request) {
                $query->where('invoice', $request->invoice);
            })
            ->latest()
            ->paginate(7);

        // Debugging
        // dd($transactions->toArray());

        return Inertia::render('Dashboard/Transactions/TransactionDetail', [
            'transactions' => $transactions
        ]);
    }






    /**
     * searchProduct
     *
     * @param  mixed $request
     * @return void
     */
    public function searchProduct(Request $request)
    {
        //find product by barcode
        $product = Product::where('barcode', $request->barcode)->first();

        if ($product) {
            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        }

        return response()->json([
            'success' => false,
            'data' => null
        ]);
    }

    /**
     * addToCart
     *
     * @param  mixed $request
     * @return void
     */
    public function addToCart(Request $request)
    {
        // Cari produk berdasarkan ID yang diberikan
        $product = Product::whereId($request->product_id)->first();

        // Jika produk tidak ditemukan, redirect dengan pesan error
        if (!$product) {
            return redirect()->back()->with('error', 'Product not found.');
        }

        // Cek stok produk
        if ($product->stock < $request->qty) {
            return redirect()->back()->with('error', 'Out of Stock Product!.');
        }

        // Cek keranjang
        $cart = Cart::with('product')
            ->where('product_id', $request->product_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if ($cart) {
            // Tingkatkan qty
            $cart->increment('qty', $request->qty);

            // Jumlahkan harga * kuantitas
            $cart->price = $cart->product->sell_price * $cart->qty;

            $cart->save();
        } else {
            // Insert ke keranjang
            Cart::create([
                'cashier_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => $request->sell_price * $request->qty,
            ]);
        }

        return redirect()->route('transactions.index')->with('success', 'Product Added Successfully!.');
    }


    /**
     * destroyCart
     *
     * @param  mixed $request
     * @return void
     */
    public function destroyCart($cart_id)
    {
        $cart = Cart::with('product')->whereId($cart_id)->first();

        if ($cart) {
            $cart->delete();
            return back();
        } else {
            // Handle case where no cart is found (e.g., redirect with error message)
            return back()->withErrors(['message' => 'Cart not found']);
        }
    }

    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        /**
         * algorithm generate no invoice
         */
        $length = 10;
        $random = '';
        for ($i = 0; $i < $length; $i++) {
            $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }

        //generate no invoice
        $invoice = 'TRX-' . Str::upper($random);

        //insert transaction
        $transaction = Transaction::create([
            'cashier_id' => auth()->user()->id,
            'customer_id' => $request->customer_id,
            'invoice' => $invoice,
            'cash' => $request->cash,
            'change' => $request->change,
            'discount' => $request->discount,
            'grand_total' => $request->grand_total,
        ]);

        //get carts
        $carts = Cart::where('cashier_id', auth()->user()->id)->get();

        //insert transaction detail
        foreach ($carts as $cart) {

            //insert transaction detail
            $transaction->details()->create([
                'transaction_id' => $transaction->id,
                'product_id' => $cart->product_id,
                'qty' => $cart->qty,
                'price' => $cart->price,
            ]);

            //get price
            $total_buy_price = $cart->product->buy_price * $cart->qty;
            $total_sell_price = $cart->product->sell_price * $cart->qty;

            //get profits
            $profits = $total_sell_price - $total_buy_price;

            //insert provits
            $transaction->profits()->create([
                'transaction_id' => $transaction->id,
                'total' => $profits,
            ]);

            //update stock product
            $product = Product::find($cart->product_id);
            $product->stock = $product->stock - $cart->qty;
            $product->save();
        }

        //delete carts
        Cart::where('cashier_id', auth()->user()->id)->delete();

        // return response()->json([
        //     'success' => true,
        //     'data' => $transaction
        // ]);
        return to_route('transactions.print', $transaction->invoice);
    }

    public function print()
    {
        //get transaction
        $transaction = Transaction::with('details.product', 'cashier', 'customer')->where('invoice', );
        $price = $transaction->grand_total;
        // dd($price);
        return Inertia::render('Dashboard/Transactions/Print', [
            'transaction' => $transaction,
            'price' => $price
        ]);
    }

    public function exportTransactions()
    {
        return Excel::download(new TransactionsExport, 'transactions.xlsx');
    }

    public function detailInvoice($invoice)
    {
        $transaction = Transaction::with(['details.product'])->where('invoice', $invoice)->firstOrFail();

        return Inertia::render('Dashboard/Transactions/DetailInvoice', [
            'transaction' => $transaction,
            'products' => $transaction->details->map(function ($detail) {
                return [
                    'id' => $detail->product->id,
                    'title' => $detail->product->title,
                    'price' => $detail->product->sell_price,
                    'qty' => $detail->qty,
                    'total' => $detail->qty * $detail->product->sell_price,
                ];
            }),
        ]);
    }


}
