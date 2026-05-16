import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icons';
import { productBrands, productCategories, products } from '../data/products';

const sortOptions = [
    { value: 'popular', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
];

export default function Products() {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [brand, setBrand] = useState('All');
    const [sortBy, setSortBy] = useState('popular');
    const [priceCap, setPriceCap] = useState(3000);
    const [rxOnly, setRxOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const perPage = 8;

    useEffect(() => {
        setLoading(true);
        const timer = window.setTimeout(() => setLoading(false), 450);
        return () => window.clearTimeout(timer);
    }, [searchParams]);

    useEffect(() => {
        setCategory(searchParams.get('category') || 'All');
        setCurrentPage(1);
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = products
            .filter((product) => (category === 'All' ? true : product.category === category))
            .filter((product) => (brand === 'All' ? true : product.brand === brand))
            .filter((product) => (rxOnly ? product.requiresPrescription : true))
            .filter((product) => product.price <= priceCap)
            .filter((product) => {
                if (!query) {
                    return true;
                }

                return [product.name, product.brand, product.description, product.category, product.composition]
                    .join(' ')
                    .toLowerCase()
                    .includes(query);
            });

        switch (sortBy) {
            case 'price-low':
                return result.sort((left, right) => left.price - right.price);
            case 'price-high':
                return result.sort((left, right) => right.price - left.price);
            case 'newest':
                return result.sort((left, right) => right.id - left.id);
            default:
                return result.sort((left, right) => right.reviews - left.reviews);
        }
    }, [brand, category, priceCap, queryKey(search), rxOnly, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
    const pageItems = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [category, brand, priceCap, rxOnly, search, sortBy]);

    return (
        <>
            <Seo
                title="Products"
                description="Browse medicines, vitamins, baby care, personal care, diabetic care, and surgical supplies at Yashi Medical Store."
            />
            <section className="page-shell section-pad">
                <Reveal className="space-y-5">
                    <p className="kicker">Products</p>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <h1 className="display-heading text-4xl sm:text-5xl">Search products with calm, clear filters</h1>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Filter by category, brand, prescription requirement, price, or search keywords. Results are sample pharmacy data with realistic names and pricing.
                            </p>
                        </div>
                        <div className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft">
                            Showing {filteredProducts.length} products
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="page-shell pb-16 sm:pb-20 lg:pb-24">
                <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                    <Reveal className="glass-card sticky top-28 h-fit p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-3xl text-slate-900">Filters</h2>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setCategory('All');
                                    setBrand('All');
                                    setSortBy('popular');
                                    setPriceCap(3000);
                                    setRxOnly(false);
                                }}
                                className="text-sm font-semibold text-brand-700"
                            >
                                Reset
                            </button>
                        </div>

                        <label className="mt-6 block space-y-2 text-sm font-medium text-slate-700">
                            Search
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-brand-500">
                                <Icon name="Search" className="h-4 w-4 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search medicines or brands"
                                    className="w-full outline-none"
                                />
                            </div>
                        </label>

                        <label className="mt-5 block space-y-2 text-sm font-medium text-slate-700">
                            Category
                            <select
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
                            >
                                {productCategories.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="mt-5 block space-y-2 text-sm font-medium text-slate-700">
                            Brand
                            <select
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
                            >
                                <option value="All">All</option>
                                {productBrands.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="mt-5 block space-y-2 text-sm font-medium text-slate-700">
                            Price range
                            <div className="rounded-2xl border border-slate-200 p-4">
                                <input
                                    type="range"
                                    min="50"
                                    max="3000"
                                    step="1"
                                    value={priceCap}
                                    onChange={(event) => setPriceCap(Number(event.target.value))}
                                    className="w-full accent-brand-500"
                                />
                                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                                    <span>₹50</span>
                                    <span>Up to ₹{priceCap}</span>
                                </div>
                            </div>
                        </label>

                        <label className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                            <input type="checkbox" checked={rxOnly} onChange={(event) => setRxOnly(event.target.checked)} />
                            Prescription required only
                        </label>

                        <label className="mt-5 block space-y-2 text-sm font-medium text-slate-700">
                            Sort by
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </Reveal>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="animate-pulse overflow-hidden rounded-[30px] border border-brand-100 bg-white shadow-soft">
                                        <div className="h-60 bg-slate-100" />
                                        <div className="space-y-3 p-5">
                                            <div className="h-4 w-24 rounded-full bg-slate-100" />
                                            <div className="h-7 w-3/4 rounded-full bg-slate-100" />
                                            <div className="h-4 w-full rounded-full bg-slate-100" />
                                            <div className="h-4 w-2/3 rounded-full bg-slate-100" />
                                            <div className="h-12 rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : pageItems.length ? (
                            <>
                                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                                    {pageItems.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                        <button
                                            key={pageIndex}
                                            type="button"
                                            onClick={() => setCurrentPage(pageIndex + 1)}
                                            className={`h-11 min-w-11 rounded-full px-4 text-sm font-semibold transition ${pageIndex + 1 === currentPage ? 'bg-brand-500 text-white' : 'bg-white text-slate-700 shadow-soft hover:bg-brand-50'}`}
                                        >
                                            {pageIndex + 1}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="glass-card flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center">
                                <Icon name="PackageSearch" className="h-12 w-12 text-brand-500" />
                                <h2 className="mt-4 font-display text-3xl text-slate-900">No products match these filters</h2>
                                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                                    Try widening the price range, clearing the prescription filter, or searching a shorter phrase.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setCategory('All');
                                        setBrand('All');
                                        setSortBy('popular');
                                        setPriceCap(3000);
                                        setRxOnly(false);
                                    }}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

function queryKey(search) {
    return search.trim().toLowerCase();
}