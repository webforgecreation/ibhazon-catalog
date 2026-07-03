import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Edit3, Check, Percent, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { saveProductImageOverride } from '../data/products';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  adminMode: boolean;
  onRefreshProducts: () => void;
  isInCart: boolean;
  cartQuantity: number;
  onUpdateCartQuantity: (p: Product, qty: number) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  adminMode,
  onRefreshProducts,
  isInCart,
  cartQuantity,
  onUpdateCartQuantity
}: ProductCardProps) {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [tempUrl, setTempUrl] = useState(product.image);
  const [justAdded, setJustAdded] = useState(false);

  // Calculate a realistic Original MRP (round number) for crossed-out visual
  const mrp = Math.ceil((product.price * 1.35) / 100) * 100 - 1; // 35% higher, ending in 99 or 9
  const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);

  const handleSaveImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl.trim() && (tempUrl.startsWith('http://') || tempUrl.startsWith('https://'))) {
      saveProductImageOverride(product.id, tempUrl.trim());
      onRefreshProducts();
      setIsEditingImage(false);
    } else {
      alert("Please enter a valid URL starting with http:// or https://");
    }
  };

  const handleAddClick = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-150/60 shadow-xs hover:shadow-lg hover:border-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden group relative"
    >
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] font-mono font-black px-2.5 py-1 rounded-lg flex items-center gap-0.5 shadow-md shadow-rose-900/10">
        <Percent className="w-2.5 h-2.5" />
        {discountPercent}% OFF
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-50 border-b border-slate-100/60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High-quality fallback image in case link breaks
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594818821915-bc32432617f6?auto=format&fit=crop&w=600&h=450&q=80";
          }}
        />

        {/* Hover Actions Bar */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
          <button
            onClick={() => onViewDetails(product)}
            className="p-3 bg-white text-slate-900 rounded-xl shadow-xl hover:bg-slate-50 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Quick View Details"
          >
            <Eye className="w-4.5 h-4.5 text-indigo-600" />
            Quick View
          </button>
          
          {adminMode && (
            <button
              onClick={() => setIsEditingImage(true)}
              className="p-3 bg-indigo-600 text-white rounded-xl shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-200 cursor-pointer"
              title="Replace Product Image Link"
            >
              <Edit3 className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Rating Overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-sm border border-slate-100/50">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-450 font-medium">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Product Metadata & Info */}
      <div className="p-4.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm">{product.category}</span>
            {product.stock < 10 ? (
              <span className="text-rose-600 font-bold flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 animate-pulse" />
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-600 font-bold">In Stock</span>
            )}
          </div>
          
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-sm font-display font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>
          
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add/Cart Controller */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-display font-extrabold text-slate-950">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-[11px] font-semibold text-slate-400 line-through">₹{mrp.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1 py-0.2 rounded-sm font-mono font-bold">Save ₹{(mrp - product.price).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Cart Buttons */}
          {isInCart ? (
            <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl h-9 overflow-hidden">
              <button
                onClick={() => onUpdateCartQuantity(product, cartQuantity - 1)}
                className="px-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors h-full font-bold cursor-pointer text-xs"
              >
                -
              </button>
              <span className="px-2 text-xs font-mono font-bold text-slate-900 min-w-[20px] text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => onUpdateCartQuantity(product, cartQuantity + 1)}
                className="px-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors h-full font-bold cursor-pointer text-xs"
                disabled={cartQuantity >= product.stock}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              disabled={product.stock === 0}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                justAdded 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-50' 
                  : 'bg-slate-950 hover:bg-indigo-600 text-white shadow-slate-950/10'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Inline Image Editing Form Overlay */}
      {isEditingImage && (
        <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col justify-between p-4 text-white">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Replace Image Link</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Copy any image address from Google Chrome or Unsplash and paste below:
            </p>
          </div>

          <form onSubmit={handleSaveImage} className="space-y-3 my-auto">
            <textarea
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              rows={4}
              className="w-full text-[10px] font-mono bg-slate-800 text-slate-100 p-2.5 rounded-lg border border-slate-700 focus:outline-hidden focus:border-indigo-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsEditingImage(false)}
                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs text-white rounded-lg transition-colors cursor-pointer"
              >
                Save Link
              </button>
            </div>
          </form>

          <p className="text-[9px] text-slate-500 font-mono truncate text-center">
            ID: {product.id}
          </p>
        </div>
      )}
    </motion.div>
  );
}
