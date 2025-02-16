<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    /**
     * Export transaksi ke Excel.
     */
    public function exportTransactions()
    {
        return Excel::download(new TransactionsExport, 'transactions.xlsx');
    }
}
