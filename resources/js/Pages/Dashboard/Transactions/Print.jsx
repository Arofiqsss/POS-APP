import React, { useEffect } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Print({ transaction, store, price }) {
    const formatPrice = (price) => {
        return price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    };

    useEffect(() => {
        window.print();
    }, []);

    console.log(transaction);

    return (
        <>
            <Head title="Print Invoice" />
            {/* <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-black">
                <div className="text-center mb-8">
                </div>
                    <h1 className='text-center text-white mb-10'>PT Arofix sejahtera</h1>
                <div className="flex justify-between mb-6 bg-white text-black dark:bg-black dark:text-white">
                    <div>
                        <h2 className="text-lg font-semibold">Invoice</h2>
                        <p>No: {transaction.invoice}</p>
                        <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-semibold">Customer</h2>
                        <p>{transaction.customer.name}</p>
                        <p>{transaction.customer.address}</p>
                    </div>
                </div>
                <div className="mb-6 bg-white text-black dark:bg-black dark:text-white">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b py-2">No</th>
                                <th className="border-b py-2">Product</th>
                                <th className="border-b py-2">Price</th>
                                <th className="border-b py-2">Qty</th>
                                <th className="border-b py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.details.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-b py-2">{index + 1}</td>
                                    <td className="border-b py-2">{item.product.title}</td>
                                    <td className="border-b py-2">{formatPrice(item.price)}</td>
                                    <td className="border-b py-2">{item.qty}</td>
                                    <td className="border-b py-2">{formatPrice(item.price * item.qty)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right py-2">Discount</td>
                                <td className="py-2">{formatPrice(transaction.discount)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right py-2 font-semibold">Total</td>
                                <td className="py-2 font-semibold">{formatPrice(transaction.grand_total)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right py-2">Cash</td>
                                <td className="py-2">{formatPrice(transaction.cash)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right py-2">Change</td>
                                <td className="py-2">{formatPrice(transaction.change)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="text-center mt-8 text-black dark:text-white">
                    <p className="text-sm">Thank you for your purchase!</p>
                    <p className="text-sm">Please come again.</p>
                </div>
            </div> */}

            <section className="bg-gray-100 py-20">
                <div className="max-w-2xl mx-auto py-0 md:py-16">
                    <article className="shadow-none md:shadow-md md:rounded-md overflow-hidden">
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
                                                <p className="font-bold text-lg">
                                                    Invoice
                                                </p>
                                                <p>MJWebs</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="font-medium text-sm text-gray-400">
                                                    Invoice Number
                                                </p>
                                                <p>{transaction.invoice}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm text-gray-400">
                                                    Invoice Date
                                                </p>
                                                <p>31 December 2021</p>
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
                                        <th
                                            scope="col"
                                            className="py-3 text-left font-semibold text-gray-400"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {transaction.details.map((item, index) => (
                                        <tr>
                                            <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                                <div>
                                                    <p>{item.product.title}</p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap text-gray-600 truncate">
                                                {item.qty}
                                            </td>
                                            <td className="whitespace-nowrap text-gray-600 truncate">
                                                {formatPrice(
                                                    item.product.sell_price
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap text-gray-600 truncate">
                                                {formatPrice(
                                                    transaction.discount
                                                )}
                                            </td>
                                        </tr>
                                    ))}
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
                                            {formatPrice(price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

// Print.layout = page => <DashboardLayout children={page} />
