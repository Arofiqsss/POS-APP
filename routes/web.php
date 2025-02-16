<?php
use App\Http\Controllers\ExportController;

use App\Http\Controllers\Apps\CategoryController;
use App\Http\Controllers\Apps\CustomerController;
use App\Http\Controllers\Apps\ProductController;
use App\Http\Controllers\Apps\TransactionController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TransactionDetail;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;

Route::get('/', function () {
    return redirect('/dashboard');
})->middleware('auth');


Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    Route::get('/', function () {
        $products = Product::count();
        return Inertia::render('Dashboard/Index', [
            'products' => $products,
            'categories' => Category::count(),
            'transactions' => Transaction::count(),
            'users' => User::count()
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    // roles route
    Route::resource('/roles', RoleController::class)->except(['create', 'edit', 'show']);
    // users route
    Route::resource('/users', UserController::class)->except('show');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('customers', CustomerController::class);
    //route transaction
    Route::get('/transactions', [\App\Http\Controllers\Apps\TransactionController::class, 'index'])->name('transactions.index');

    //route transaction searchProduct
    Route::post('/transactions/searchProduct', [\App\Http\Controllers\Apps\TransactionController::class, 'searchProduct'])->name('transactions.searchProduct');

    //route transaction addToCart
    Route::post('/transactions/addToCart', [\App\Http\Controllers\Apps\TransactionController::class, 'addToCart'])->name('transactions.addToCart');

    //route transaction destroyCart
    Route::delete('/transactions/{cart_id}/destroyCart', [\App\Http\Controllers\Apps\TransactionController::class, 'destroyCart'])->name('transactions.destroyCart');

    //route transaction Details
    Route::get('/transactions/details', [\App\Http\Controllers\Apps\TransactionController::class, 'transactionDetails'])->name('transactions.details');

    //route transaction store
    Route::post('/transactions/store', [\App\Http\Controllers\Apps\TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions/{invoice}/print', [\App\Http\Controllers\Apps\TransactionController::class, 'print'])->name('transactions.print');
    Route::get('/transactions/detail/{invoice}', [\App\Http\Controllers\Apps\TransactionController::class, 'detailinvoice'])->name('detailinvoice');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/export-transactions', [ExportController::class, 'exportTransactions'])->name('export.transactions');
    Route::resource('invoices', InvoiceController::class);
    Route::get('/invoice/update/{invoice}', [InvoiceController::class, 'edit'])->name('invoice.edit');
    Route::get('/invoicepreview', [TransactionController::class,'print'])->name('invoicepreview');
    Route::post('/invoice/update/{id}', [InvoiceController::class, 'update'])->name('invoice.update');



});

require __DIR__ . '/auth.php';
