import React, { useState, useRef } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Card from "@/Components/Dashboard/Card";
import Button from "@/Components/Dashboard/Button";
import { IconPencilPlus, IconUsersPlus, IconTrash } from "@tabler/icons-react";
import Input from "@/Components/Dashboard/Input";
import Textarea from "@/Components/Dashboard/TextArea";
import toast from "react-hot-toast";
import axios from "axios";

export default function Update({ invoice }) {
    const { errors } = usePage().props;
    const { data, setData, put, processing } = useForm({
        nama_toko: invoice.nama_toko,
        alamat: invoice.alamat,
        note: invoice.note,
        image: null, // Untuk file baru yang dipilih
        _method: "PUT",
    });

    // Jika ada gambar dari database, gunakan sebagai default preview
    const existingImage = invoice.image
        ? `/storage/invoice/${invoice.image}`
        : null;
    const [previewImage, setPreviewImage] = useState(existingImage);
    const [fileName, setFileName] = useState(invoice.image || ""); // State untuk nama file

    const fileInputRef = useRef(null);

    // Fungsi untuk menangani perubahan input gambar
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        setPreviewImage(URL.createObjectURL(file));
        setFileName(file.name);
    };

    // Fungsi untuk menghapus gambar yang dipilih
    const removeImage = () => {
        setData("image", null);
        setPreviewImage(null);
        setFileName(""); // Reset nama file
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset input file
        }
    };

    // Fungsi untuk submit form
    const submit = (e) => {
        e.preventDefault();

        console.log("Data yang dikirim:", data); // Cek apakah data.nama_toko kosong

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("nama_toko", data.nama_toko);
        formData.append("alamat", data.alamat);
        formData.append("note", data.note);

        if (data.image) {
            formData.append("image", data.image);
        }

        axios
            .post(route("invoices.update", invoice.id), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                toast.success("Data berhasil disimpan");
            })
            .catch((error) => {
                console.log("Error response:", error.response);

                let message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : "Terjadi kesalahan";
                toast.error(message);
            });
    };

    return (
        <>
            <Head title="Update Invoice" />
            <Card
                title={"Update Invoice"}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type="submit"
                        label="Simpan"
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                        disabled={processing}
                    />
                }
                form={submit}
            >
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        <Input
                            type="text"
                            label="Nama Toko"
                            value={data.nama_toko}
                            onChange={(e) =>
                                setData("nama_toko", e.target.value)
                            }
                            errors={errors.nama_toko}
                            placeholder="Nama Toko"
                        />
                    </div>
                    <div className="col-span-12">
                        <Input
                            type="text"
                            label="Alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            errors={errors.alamat}
                            placeholder="Alamat"
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name="Note"
                            label="Note"
                            placeholder="Note"
                            errors={errors.note}
                            onChange={(e) => setData("note", e.target.value)}
                            value={data.note}
                        />
                    </div>
                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Gambar
                        </label>
                        <Input
                            id={"gambar"}
                            type={"file"}
                            // accept="image/*"
                            onChange={handleImageChange}
                            // ref={fileInputRef}
                            className={"hidden"}
                        />
                        <label
                            htmlFor="gambar"
                            className="w-full min-h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center p-4"
                        >
                            {previewImage ? (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        alt="Preview Gambar"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <IconTrash size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="gambar"
                                    className="text-center cursor-pointer"
                                >
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Klik untuk mengunggah gambar
                                    </p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500">
                                        Format: JPEG, PNG (Maksimal 2MB)
                                    </p>
                                </label>
                            )}
                            {fileName && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {fileName}
                                </p>
                            )}
                        </label>
                        {errors.image && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.image}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
}

Update.layout = (page) => <DashboardLayout children={page} />;
