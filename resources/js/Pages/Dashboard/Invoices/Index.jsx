import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Dashboard/Table";
import { IconCirclePlus } from "@tabler/icons-react";
import Button from "@/Components/Dashboard/Button";

export default function InvoiceDetail({ invoice }) {
    return (
        <>
            <Head title="Invoice Detail" />
            <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <Button
                        type={"link"}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={
                            "border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200"
                        }
                        label={"Edit Invoice"}
                        href={"/dashboard/invoice/update/" + invoice.id}
                    />
                </div>
            </div>
            <Table.Card title={"Data Invoice"}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th>Nama Toko</Table.Th>
                            <Table.Th>Alamat</Table.Th>
                            <Table.Th>Note</Table.Th>
                            <Table.Th>Gambar</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <tr>
                            <Table.Td>{invoice.nama_toko}</Table.Td>
                            <Table.Td>{invoice.alamat}</Table.Td>
                            <Table.Td>{invoice.note}</Table.Td>
                            <Table.Td>
                                {invoice.image ? (
                                    <img
                                        src={invoice.image}
                                        alt="Invoice Image"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ) : (
                                    <span className="text-gray-500">
                                        Tidak ada gambar
                                    </span>
                                )}
                            </Table.Td>
                        </tr>
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    );
}

InvoiceDetail.layout = (page) => <DashboardLayout children={page} />;
