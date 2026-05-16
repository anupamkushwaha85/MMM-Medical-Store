import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import PrescriptionUpload from '../components/PrescriptionUpload';
import Icon from '../components/Icons';

export default function Prescription() {
    return (
        <>
            <Seo title="Upload Prescription" description="Upload a prescription for medicines that require pharmacist review before dispatch." />
            <section className="page-shell section-pad">
                <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="space-y-5">
                        <p className="kicker">Prescription</p>
                        <h1 className="display-heading text-4xl sm:text-5xl">Upload a prescription for careful review</h1>
                        <p className="max-w-xl text-sm leading-7 text-slate-600">
                            Share a clear file and the pharmacy team will verify the details before preparing the medicines that require prescription support.
                        </p>
                        <div className="rounded-[30px] border border-brand-100 bg-white p-6 shadow-soft">
                            <div className="flex items-center gap-3">
                                <Icon name="ShieldCheck" className="h-5 w-5 text-brand-700" />
                                <p className="text-sm font-semibold text-slate-900">We review prescription orders before dispatch</p>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                If anything needs clarification, the store will contact you with the phone number you provide.
                            </p>
                        </div>
                    </div>
                    <PrescriptionUpload />
                </Reveal>
            </section>
        </>
    );
}