<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Ambil data transaksi beserta detailnya.
     */
    public function collection()
    {
        return Transaction::with('details.product')->get();
    }

    /**
     * Header untuk file Excel.
     */
    public function headings(): array
    {
        return ['Nama Product', 'Qty', 'Pembayaran', 'Kembalian', 'Diskon', 'Total Harga'];
    }

    /**
     * Mapping data untuk setiap baris.
     */
    public function map($transaction): array
    {
        $rows = [];

        foreach ($transaction->details as $detail) {
            $rows[] = [
                $detail->product->title ?? 'Unknown', // Nama produk
                $detail->qty, // Jumlah
                $transaction->cash, // Pembayaran
                $transaction->change, // Kembalian
                $transaction->discount, // Diskon
                $transaction->grand_total, // Total harga
            ];
        }

        return $rows;
    }
}
