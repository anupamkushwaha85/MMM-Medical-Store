import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import OwnerCard from '../components/OwnerCard';
import Icon from '../components/Icons';
import { storeInfo } from '../data/products';

export default function Contact() {
    return (
        <>
            <Seo title="Contact" description="Contact Yashi Medical Store for orders, prescription support, and store information." />
            <section className="page-shell section-pad">
                <Reveal className="space-y-5">
                    <p className="kicker">Contact</p>
                    <h1 className="display-heading text-4xl sm:text-5xl">Talk to the store team</h1>
                    <p className="max-w-2xl text-sm leading-7 text-slate-600">
                        Reach out for order status, medicine availability, prescription help, or a quick WhatsApp response.
                    </p>
                </Reveal>
            </section>

            <section className="page-shell pb-16 sm:pb-20 lg:pb-24">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <Reveal className="space-y-6">
                        <div className="glass-card p-6">
                            <p className="kicker">Store info</p>
                            <div className="mt-5 space-y-4 text-sm text-slate-600">
                                <InfoRow icon="MapPin" label="Address" value={storeInfo.address} />
                                <InfoRow icon="Phone" label="Phone" value={storeInfo.phone} href={`tel:${storeInfo.phone.replace(/\s/g, '')}`} />
                                <InfoRow icon="Mail" label="Email" value={storeInfo.email} href={`mailto:${storeInfo.email}`} />
                                <InfoRow icon="Clock3" label="Hours" value={storeInfo.hours} />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={storeInfo.whatsapp}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white"
                                >
                                    <Icon name="MessageCircle" className="h-4 w-4" />
                                    WhatsApp
                                </a>
                                <a
                                    href={`tel:${storeInfo.phone.replace(/\s/g, '')}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-800"
                                >
                                    Call store
                                </a>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[32px] border border-brand-100 bg-white shadow-soft">
                            <iframe
                                title="Yashi Medical Store location"
                                src={storeInfo.mapEmbedUrl}
                                className="h-[340px] w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <OwnerCard compact />
                    </Reveal>

                    <Reveal className="space-y-6">
                        <ContactForm />
                    </Reveal>
                </div>
            </section>
        </>
    );
}

function InfoRow({ icon, label, value, href }) {
    const content = href ? (
        <a href={href} className="font-medium text-slate-900 transition hover:text-brand-700">
            {value}
        </a>
    ) : (
        <span className="font-medium text-slate-900">{value}</span>
    );

    return (
        <div className="flex gap-3">
            <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon name={icon} className="h-4 w-4" />
            </span>
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">{label}</p>
                <div className="mt-1 text-sm leading-6">{content}</div>
            </div>
        </div>
    );
}