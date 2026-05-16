import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import Icon from './Icons';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart.`);
    };

    return (
        <motion.article whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
            <div className="group overflow-hidden rounded-[30px] border border-brand-100 bg-white shadow-soft transition hover:shadow-lift">
                <Link to={`/products/${product.id}`} className="block">
                    <div className="relative overflow-hidden bg-slate-50">
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                            {product.badge}
                        </span>
                        {product.requiresPrescription ? (
                            <span className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                                Rx only
                            </span>
                        ) : null}
                    </div>
                    <div className="space-y-3 p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">{product.category}</p>
                                <h3 className="mt-2 font-display text-2xl text-slate-900">{product.name}</h3>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-gold-50 px-3 py-1 text-sm font-semibold text-gold-600">
                                <Icon name="Star" className="h-4 w-4 fill-current" />
                                {product.rating}
                            </div>
                        </div>
                        <p className="text-sm leading-6 text-slate-600">{product.description}</p>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-2xl font-semibold text-slate-900">₹{product.price}</p>
                                <p className="text-sm text-slate-500">
                                    MRP <span className="line-through">₹{product.mrp}</span>
                                </p>
                            </div>
                            <div className="text-right text-xs font-medium text-slate-500">{product.reviews} reviews</div>
                        </div>
                    </div>
                </Link>
                <div className="border-t border-brand-100 p-5">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                    >
                        Add to cart
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}