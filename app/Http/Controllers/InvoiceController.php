<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class InvoiceController extends Controller
{

    public function index(): Response
    {
        $invoice = Invoice::first();

        if ($invoice) {
            $invoice->image = $invoice->image ? asset('storage/invoice/' . $invoice->image) : null;
        }

        return Inertia::render('Dashboard/Invoices/Index', [
            'invoice' => $invoice
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('Invoices/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_toko' => 'required',
            'alamat' => 'nullable',
            'tanggal_invoice' => 'required|date',
        ]);

        Invoice::create($request->all());

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice created successfully.');
    }

    public function show(Invoice $invoice): Response
    {
        return Inertia::render('Dashboard/Invoices/Show', [
            'invoice' => $invoice
        ]);
    }

    public function edit(Invoice $invoice): Response
    {
        return Inertia::render('Dashboard/Invoices/Update', [
            'invoice' => $invoice
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        // Validasi input
        $request->validate([
            'nama_toko' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Batasan jenis dan ukuran file
        ]);

        try {
            // Handle upload gambar
            if ($request->hasFile('image')) {
                // Hapus gambar lama jika ada
                if ($invoice->image) {
                    Storage::delete('public/invoice/' . $invoice->image);
                }

                // Simpan gambar baru
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName(); // Nama file unik
                $image->storeAs('public/invoice', $imageName);

                // Update nama gambar di database
                $invoice->image = $imageName;
            }

            // Update data invoice
            $invoice->update([
                'nama_toko' => $request->nama_toko,
                'alamat' => $request->alamat ,
                'note' => $request->note ,
                'image' => $invoice->image,
            ]);


            // Redirect dengan pesan sukses
            return redirect()->route('invoices.index', $invoice->id)
                ->with('success', 'Invoice updated successfully.');
        } catch (\Exception $e) {
            // Tangani error dan kembalikan pesan error
            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan dalam penyimpanan data: ' . $e->getMessage()]);
        }
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('invoices.index')
            ->with('success', 'Invoice deleted successfully.');
    }
}
