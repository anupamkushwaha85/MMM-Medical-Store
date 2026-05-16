import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Icon from './Icons';

const initialForm = {
    patient_name: '',
    phone: '',
    address: '',
    notes: '',
};

const emailConfigured =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_PRESCRIPTION_TEMPLATE &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function PrescriptionUpload() {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [sending, setSending] = useState(false);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const setPrescriptionFile = (event) => {
        const selected = event.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error('Please add a prescription file.');
            return;
        }

        setSending(true);
        try {
            if (emailConfigured) {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_PRESCRIPTION_TEMPLATE,
                    {
                        ...form,
                        file_name: file.name,
                    },
                    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
                );
            }

            toast.success('Prescription submitted successfully.');
            setForm(initialForm);
            setFile(null);
            event.currentTarget.reset();
        } catch (error) {
            console.error(error);
            toast.error('Prescription submission failed. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="grid gap-8 rounded-[36px] border border-brand-100 bg-white p-6 shadow-soft lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">Prescription upload</p>
                    <h2 className="mt-2 font-display text-3xl text-slate-900">Share your prescription securely</h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        Upload a JPG, PNG, or PDF and add the details the pharmacy needs to prepare your order carefully.
                    </p>
                </div>

                <div
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`rounded-[30px] border-2 border-dashed p-6 transition ${dragActive ? 'border-brand-500 bg-brand-50' : 'border-brand-100 bg-slate-50'}`}
                >
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-700 shadow-soft">
                            <Icon name="Upload" className="h-6 w-6" />
                        </span>
                        <span className="font-semibold text-slate-900">Drop prescription here or click to upload</span>
                        <span className="text-sm text-slate-500">Accepted formats: JPG, PNG, PDF</span>
                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={setPrescriptionFile} />
                    </label>
                    {file ? <p className="mt-4 text-sm font-medium text-brand-700">Selected file: {file.name}</p> : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                        Patient name
                        <input
                            name="patient_name"
                            value={form.patient_name}
                            onChange={onChange}
                            required
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500"
                        />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                        Phone
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            required
                            type="tel"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500"
                        />
                    </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                    Address
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        rows="3"
                        required
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500"
                    />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                    Notes
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={onChange}
                        rows="4"
                        placeholder="Mention dosage timing, brand preference, or any delivery note."
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500"
                    />
                </label>

                <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {sending ? 'Sending...' : 'Submit prescription'}
                    <Icon name="ArrowRight" className="h-4 w-4" />
                </button>
            </form>

            <aside className="space-y-5 rounded-[30px] bg-slate-950 p-6 text-white">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">Doctor consultation note</p>
                    <p className="mt-3 text-2xl font-display">We check prescriptions before dispatch.</p>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                    If a medicine requires prescription verification, the team reviews the uploaded file and contacts you only if anything needs clarification.
                </p>
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-medium text-brand-100">Accepted files</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                        JPG, PNG, and PDF are supported. Keep the file readable and include a clear patient name.
                    </p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-brand-500/15 p-5">
                    <p className="text-sm font-medium text-brand-100">Fast support</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                        Use the contact page or WhatsApp if you need help before uploading.
                    </p>
                </div>
            </aside>
        </div>
    );
}