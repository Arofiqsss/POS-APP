import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Dashboard/Table";
import { IconCirclePlus } from "@tabler/icons-react";
import Button from "@/Components/Dashboard/Button";
// utils/dateFormatter.js
export const formatTanggalIndonesia = (dateString) => {
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const date = new Date(dateString);
    const tanggal = date.getDate();
    const bulanIndex = date.getMonth();
    const tahun = date.getFullYear();

    return `${tanggal} ${bulan[bulanIndex]} ${tahun}`;
};
export default function Print({ invoices }) {
    // Fungsi untuk memformat harga ke format mata uang IDR
    // const formatPrice = (price) => {
    //     return price.toLocaleString("id-ID", {
    //         style: "currency",
    //         currency: "IDR",
    //     });
    // };

    return (
        <>
            <Head title="Invoice Setting" />
            <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <Button
                        type={"link"}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={
                            "border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200"
                        }
                        label={"Tambah Invoice"}
                        href={route("invoices.create")}
                    />
                </div>
            </div>
            <Table.Card title={"Daftar Invoice"}>
                <section className="bg-gray-100 py-20">
                    <div className="max-w-2xl mx-auto py-0 md:py-16">
                        {/* Iterasi data invoices */}
                        {invoices.map((invoice) => (
                            <article
                                key={invoice.id}
                                className="shadow-none md:shadow-md md:rounded-md overflow-hidden mb-6"
                            >
                                <div className="md:rounded-b-md bg-white">
                                    <div className="p-9 border-b border-gray-200">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-top">
                                                <div className="space-y-4">
                                                    <div>
                                                        <img
                                                            className="h-6 object-cover mb-4"
                                                            src="https://cdn.mjwebs.com/sites/mjwebs/mjwebs-logo.png"
                                                            alt="MJWebs Logo"
                                                        />
                                                        <p className="font-bold text-lg text-black">
                                                            Invoice
                                                        </p>
                                                        <p className="text-black">
                                                            {invoice.nama_toko}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-400">
                                                            Invoice Number
                                                        </p>
                                                        <p>{invoice.id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-400">
                                                            Invoice Date
                                                        </p>
                                                        <p className="text-black text-sm">
                                                            {formatTanggalIndonesia(
                                                                invoice.tanggal_invoice
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-9 border-b border-gray-200">
                                        <p className="font-medium text-sm text-gray-400">
                                            Note
                                        </p>
                                        <p className="text-sm">
                                            Terimakasih Sudah Berbelanja!
                                        </p>
                                    </div>
                                    <table className="w-full divide-y divide-gray-200 text-sm">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-9 py-4 text-left font-semibold text-gray-400"
                                                >
                                                    Item
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 text-left font-semibold text-gray-400"
                                                >
                                                    Qty
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 text-left font-semibold text-gray-400"
                                                >
                                                    Harga
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-3 text-left font-semibold text-gray-400"
                                                >
                                                    Discount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {/* Contoh item, Anda bisa menyesuaikan dengan data yang ada */}
                                            <tr>
                                                <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                                    <div>
                                                        <p className="text-black">
                                                            Contoh Item
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap text-gray-600 truncate">
                                                    1
                                                </td>
                                                <td className="whitespace-nowrap text-gray-600 truncate">
                                                    {/* {formatPrice(100000)} */}
                                                </td>
                                                <td className="whitespace-nowrap text-gray-600 truncate">
                                                    {/* {formatPrice(0)} */}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="p-9 border-b border-gray-200">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-bold text-black text-lg">
                                                        Total Pembayaran
                                                    </p>
                                                </div>
                                                <p className="font-bold text-black text-lg">
                                                    {/* {formatPrice(invoice.total_harga)} */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </Table.Card>
        </>
    );
}

Print.layout = (page) => <DashboardLayout children={page} />;
