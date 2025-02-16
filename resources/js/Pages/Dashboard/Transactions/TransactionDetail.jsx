import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Button from "@/Components/Dashboard/Button";

import Table from "@/Components/Dashboard/Table";
import Pagination from "@/Components/Dashboard/Pagination";
import Barcode from "@/Components/Dashboard/Barcode";

export default function Index({ transactions }) {
    const { url } = usePage();

    return (
        <>
            <Head title="Transaction Details" />
            <Button
                type={"download"}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-download"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 11l5 5l5 -5" />
                        <path d="M12 4l0 12" />
                    </svg>
                }
                className={
                    "border w-64 bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 "
                }
                label={"Download data transaksi"}
                href={"/dashboard/export-transactions"}
            />
            <Table.Card title={"Riwayat Transaksi"}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className="w-10">No</Table.Th>
                            <Table.Th>Invoice</Table.Th>
                            {/* <Table.Th>Nama Product</Table.Th>
                            <Table.Th>Qty</Table.Th> */}
                            <Table.Th>Pembayaran</Table.Th>
                            <Table.Th>Kembalian</Table.Th>
                            <Table.Th>Diskon</Table.Th>
                            <Table.Th>Total Harga</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {transactions.data.length ? (
                            transactions.data.map((transaction, i) => (
                                <tr
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                    key={i}
                                >
                                    <Table.Td className="text-center">
                                        {i + 1}
                                    </Table.Td>
                                    <Table.Td>
                                        <Link
                                            href={`/dashboard/transactions/detail/${transaction.invoice}`}
                                        >
                                            <Barcode
                                                value={transaction.invoice}
                                                format="CODE39"
                                                width={1}
                                                height={20}
                                                lineColor="#000"
                                            />
                                        </Link>
                                    </Table.Td>
                                    <Table.Td>{transaction.cash}</Table.Td>
                                    <Table.Td>{transaction.change}</Table.Td>
                                    <Table.Td>{transaction.discount}</Table.Td>
                                    <Table.Td>
                                        {transaction.grand_total}
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <Table.Empty
                                colSpan={8}
                                message="Data Transaksi tidak ditemukan."
                            />
                        )}
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} />;
