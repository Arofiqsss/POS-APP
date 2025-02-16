<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Invoice;
use Spatie\Permission\Models\Role;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $invoice = Invoice::create(
            [
                "nama_toko" => "Toko Zein",
                "alamat" => "Setu",
                "note" => "Terimakasih Sudah Berbelanja!",
                'image' => 'invoice/invoice.png',
            ]
        );

    }
}
