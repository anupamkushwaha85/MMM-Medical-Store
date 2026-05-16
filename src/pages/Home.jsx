import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CategoryCard from '../components/CategoryCard';
import TrustBadges from '../components/TrustBadges';
import HowItWorks from '../components/HowItWorks';
import OwnerCard from '../components/OwnerCard';
import TestimonialSlider from '../components/TestimonialSlider';
import Icon from '../components/Icons';
import {
    featuredCategories,
    howItWorksSteps,
    ownerProfile,
    testimonialItems,
    trustBadges,
} from '../data/products';

const emailConfigured =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Home() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);

    const handleSubscribe = async (event) => {
        event.preventDefault();
        setSubscribing(true);
        try {
            if (emailConfigured) {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
                    {
                        name: 'Website visitor',
                        email: newsletterEmail,
                        phone: 'Not provided',
                        subject: 'Newsletter signup',
                        message: 'Please add this address to the Yashi Medical Store newsletter.',
                    },
                    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
                );
            }

            toast.success('Newsletter signup submitted.');
            setNewsletterEmail('');
            event.currentTarget.reset();
        } catch (error) {
            console.error(error);
            toast.error('Could not submit the newsletter form.');
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <>
            <Seo
                title="Home"
                description="Yashi Medical Store is a modern medical and pharma e-commerce experience with genuine medicines, prescription uploads, and trusted local delivery."
            />
            <section className="page-shell section-pad relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(212,161,44,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.18),transparent_28%)]" />
                <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                    <Reveal className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-brand-800 shadow-soft">
                            <Icon name="ShieldCheck" className="h-4 w-4" />
                            Trusted pharmacy by Madan Mohan Mishra
                        </div>
                        <div className="space-y-5">
                            <p className="kicker">Yashi Medical Store</p>
                            <h1 className="display-heading max-w-3xl text-5xl leading-tight text-balance sm:text-6xl lg:text-7xl">
                                Your Health, Our Priority
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                A clinically clean, warm, and dependable online pharmacy for medicines, wellness essentials, prescription uploads, and careful delivery support.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
                            >
                                Browse Products
                                <Icon name="ArrowRight" className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/prescription"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-50"
                            >
                                Upload Prescription
                                <Icon name="Upload" className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { value: '30+', label: 'sample products' },
                                { value: '6', label: 'care categories' },
                                { value: 'Same-day', label: 'delivery support' },
                            ].map((item) => (
                                <div key={item.label} className="rounded-[28px] border border-brand-100 bg-white p-5 shadow-soft">
                                    <p className="font-display text-3xl text-slate-950">{item.value}</p>
                                    <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.08} className="space-y-6">
                        <div className="glass-card overflow-hidden">
                            <div className="bg-slate-950 px-6 py-5 text-white">
                                <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Pharmacy promise</p>
                                <h2 className="mt-3 font-display text-4xl">Care with order and calm.</h2>
                            </div>
                            <div className="grid gap-5 p-6">
                                <div className="rounded-[28px] bg-brand-50 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">Owner</p>
                                    <p className="mt-3 font-display text-3xl text-slate-950">{ownerProfile.name}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{ownerProfile.quote}</p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[24px] border border-brand-100 p-4">
                                        <p className="text-sm font-semibold text-slate-900">Prescription checks</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">Upload, review, and prepare with a clear pharmacist flow.</p>
                                    </div>
                                    <div className="rounded-[24px] border border-brand-100 p-4">
                                        <p className="text-sm font-semibold text-slate-900">WhatsApp support</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">Quick ordering help with the same store contact number.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OwnerCard compact />
                    </Reveal>
                </div>
            </section>

            <section className="page-shell section-pad">
                <Reveal className="space-y-8">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="kicker">Trust markers</p>
                            <h2 className="display-heading mt-3 text-3xl sm:text-4xl">Why customers feel safe ordering here</h2>
                        </div>
                    </div>
                    <TrustBadges badges={trustBadges} />
                </Reveal>
            </section>

            <section className="page-shell section-pad">
                <Reveal className="space-y-8">
                    <div>
                        <p className="kicker">Featured categories</p>
                        <h2 className="display-heading mt-3 text-3xl sm:text-4xl">Everything a well-run pharmacy should surface first</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {featuredCategories.map((category) => (
                            <CategoryCard key={category.name} category={category} />
                        ))}
                    </div>
                </Reveal>
            </section>

            <section className="page-shell section-pad">
                <Reveal className="space-y-8">
                    <div>
                        <p className="kicker">How it works</p>
                        <h2 className="display-heading mt-3 text-3xl sm:text-4xl">Three clear steps from search to delivery</h2>
                    </div>
                    <HowItWorks steps={howItWorksSteps} />
                </Reveal>
            </section>

            <section className="page-shell section-pad">
                <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div className="space-y-5">
                        <p className="kicker">About the owner</p>
                        <h2 className="display-heading text-3xl sm:text-4xl">Built around calm guidance and dependable medicine supply</h2>
                        <p className="max-w-xl text-sm leading-7 text-slate-600">
                            {ownerProfile.bio}
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                        >
                            Read full story
                            <Icon name="ArrowRight" className="h-4 w-4" />
                        </Link>
                    </div>
                    <OwnerCard />
                </Reveal>
            </section>

            <section className="page-shell section-pad">
                <Reveal>
                    <TestimonialSlider testimonials={testimonialItems} />
                </Reveal>
            </section>

            <section className="page-shell section-pad">
                <Reveal className="glass-card overflow-hidden p-6 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                            <p className="kicker">Newsletter</p>
                            <h2 className="display-heading mt-3 text-3xl sm:text-4xl">Get store updates and practical health notes</h2>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                                A short email form for people who want thoughtful pharmacy updates without noise.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="grid gap-4 sm:grid-cols-[1fr_auto]">
                            <label className="sr-only" htmlFor="newsletter-email">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(event) => setNewsletterEmail(event.target.value)}
                                placeholder="Email address"
                                className="rounded-full border border-brand-100 px-5 py-4 text-slate-900 outline-none transition focus:border-brand-500"
                            />
                            <button
                                type="submit"
                                disabled={subscribing}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {subscribing ? 'Submitting...' : 'Join newsletter'}
                                <Icon name="Send" className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </Reveal>
            </section>
        </>
    );
}