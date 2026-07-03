import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, Headphones, ClipboardList, Check, ShoppingCart, MessageSquare, AlertCircle } from 'lucide-react';
import { Product, Review } from '../types';
import { motion } from 'motion/react';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  isInCart: boolean;
  cartQuantity: number;
  onUpdateCartQuantity: (p: Product, qty: number) => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  isInCart,
  cartQuantity,
  onUpdateCartQuantity
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  if (!product) return null;

  // Generate realistic reviews for this product
  const reviews: Review[] = [
    {
      id: "r1",
      productId: product.id,
      userName: "Ramesh Kumar",
      rating: 5,
      comment: `Absolutely brilliant! The quality of this ${product.name} is outstanding. Exceeded my expectations for the price. Highly recommend.`,
      date: "June 28, 2026"
    },
    {
      id: "r2",
      productId: product.id,
      userName: "Anjali Sharma",
      rating: 4,
      comment: `Very sturdy and functions perfectly. Built with solid materials. Delivery by IBHAZON was fast and hassle-free.`,
      date: "June 15, 2026"
    },
    {
      id: "r3",
      productId: product.id,
      userName: "Srinivas Rao",
      rating: Math.floor(product.rating),
      comment: `Good value for money. Fits the descriptions perfectly. Support team at ibhafintech@gmail.com answered my queries within 10 minutes.`,
      date: "May 29, 2026"
    }
  ];

  const mrp = Math.ceil((product.price * 1.35) / 100) * 100 - 1;
  const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Left Side: Product Image Display */}
        <div className="w-full md:w-1/2 bg-slate-50 relative p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 min-h-[300px] md:min-h-[450px]">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-all md:hidden z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[250px] md:max-h-[380px] w-full object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594818821915-bc32432617f6?auto=format&fit=crop&w=600&h=450&q=80";
            }}
          />

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Product ID: {product.id}</span>
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              {product.stock > 0 ? `${product.stock} Units Available` : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & Interactivity */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-start relative">
            <div className="space-y-1 pr-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <h2 className="text-xl font-display font-bold text-slate-900 mt-1.5 leading-tight">{product.name}</h2>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">{product.rating} Rating</span>
                <span className="text-slate-300 text-xs">|</span>
                <span className="text-xs text-slate-500">{product.reviewsCount} Customer Reviews</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all hidden md:block"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
            {[
              { id: 'details', label: 'Overview', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'specs', label: 'Specifications', icon: <ClipboardList className="w-4 h-4" /> },
              { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-white shadow-xs'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 max-h-[300px] md:max-h-none">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Shipping & Support Highlights */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <Truck className="w-5 h-5 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">Free Safe Shipping</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Free dispatch on all orders above ₹4,999.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">Corporate Warranty</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Secured & managed by IBHA FINTECH PVT LTD.</p>
                    </div>
                  </div>
                </div>

                {/* Customer Support Info */}
                <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-indigo-950">
                    <p className="font-semibold text-indigo-950">Need Help or Placing a Custom Order?</p>
                    <p className="text-indigo-900/80 mt-0.5">
                      Contact support directly via email <strong>ibhafintech@gmail.com</strong> or call us at <strong>+91 91000 94484</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Technical Specifications</h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{rev.userName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400 gap-0.5 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {rev.rating}.0
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions Frame */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Special Offer Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-extrabold text-slate-950">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-sm text-slate-400 line-through">₹{mrp.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-[10px] text-rose-600 font-semibold uppercase">{discountPercent}% instant discount applied</span>
            </div>

            {isInCart ? (
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl h-11 overflow-hidden shadow-xs">
                <button
                  onClick={() => onUpdateCartQuantity(product, cartQuantity - 1)}
                  className="px-4 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors h-full font-bold cursor-pointer text-sm"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono font-bold text-slate-900 min-w-[24px] text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onUpdateCartQuantity(product, cartQuantity + 1)}
                  className="px-4 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors h-full font-bold cursor-pointer text-sm"
                  disabled={cartQuantity >= product.stock}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold shadow-md shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
