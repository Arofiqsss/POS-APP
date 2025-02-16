import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Button from "@/Components/Dashboard/Button";
import Table from "@/Components/Dashboard/Table";
import Barcode from "@/Components/Dashboard/Barcode";

export default function DetailInvoice({ transaction, products }) {
    return (
        <>
            <Head title="Detail Transaksi" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">
                    Detail Transaksi
                </h1>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            Informasi Transaksi
                        </h2>
                        <Link
                            href={route("transactions.print", {
                                invoice: transaction.invoice,
                            })}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            target="_blank"
                        >
                            Cetak Invoice
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Invoice:
                            </p>
                            <p className="font-medium">{transaction.invoice}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Total Harga:
                            </p>
                            <p className="font-medium">
                                {transaction.grand_total}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Pembayaran:
                            </p>
                            <p className="font-medium">{transaction.cash}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Kembalian:
                            </p>
                            <p className="font-medium">{transaction.change}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Diskon:
                            </p>
                            <p className="font-medium">
                                {transaction.discount}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4">
                        Daftar Produk
                    </h2>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>No</Table.Th>
                                <Table.Th>Nama Produk</Table.Th>
                                <Table.Th>Harga</Table.Th>
                                <Table.Th>Qty</Table.Th>
                                <Table.Th>Total</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {products.length > 0 ? (
                                products.map((product, i) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Table.Td>{i + 1}</Table.Td>
                                        <Table.Td>{product.title}</Table.Td>
                                        <Table.Td>{product.price}</Table.Td>
                                        <Table.Td>{product.qty}</Table.Td>
                                        <Table.Td>{product.total}</Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty
                                    colSpan={5}
                                    message="Tidak ada produk ditemukan."
                                />
                            )}
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

DetailInvoice.layout = (page) => <DashboardLayout children={page} />;
