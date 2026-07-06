import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Ticket, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { motion } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (product: any, qty: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Pricing math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Calculate Promo Discount
  let discount = 0;
  if (appliedPromo === "IBHA10") {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedPromo === "WELCOME500" && subtotal >= 1999) {
    discount = 500;
  }

  const shippingThreshold = 4999;
  const shippingFee = subtotal > 0 && subtotal < shippingThreshold ? 149 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.18); // 18% GST typical for luxury/hardware appliances in India
  const grandTotal = taxableAmount + shippingFee + tax;

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (!promoInput.trim()) return;

    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(`Promo code "${promoInput.trim().toUpperCase()}" applied successfully!`);
      setPromoInput('');
    } else {
      if (promoInput.trim().toUpperCase() === "WELCOME500" && subtotal < 1999) {
        setPromoError("Code WELCOME500 requires a minimum purchase of ₹1,999.");
      } else {
        setPromoError("Invalid promotional coupon code.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Click-out barrier */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-base font-display font-bold text-slate-900">Your Shopping Cart</h2>
              <p className="text-xs text-slate-500 font-mono">{cartItems.length} unique items</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/55 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {cartItems.length > 0 && (() => {
          const progress = Math.min(100, (subtotal / shippingThreshold) * 100);
          const remaining = shippingThreshold - subtotal;
          return (
            <div className="px-6 py-3 bg-indigo-50/40 border-b border-indigo-100/50 space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-indigo-700 font-mono">
                  <Truck className="w-3.5 h-3.5" />
                  {remaining > 0 ? "EXPRESS SHIPPING UPDATE" : "FREE SHIPPING UNLOCKED!"}
                </span>
                <span className="font-mono">
                  {remaining > 0 ? `₹${subtotal.toLocaleString('en-IN')} / ₹${shippingThreshold.toLocaleString('en-IN')}` : "Eligible"}
                </span>
              </div>
              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden relative shadow-inner">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                {remaining > 0 ? (
                  <>Add <strong className="text-indigo-600">₹{remaining.toLocaleString('en-IN')}</strong> more to your cart to qualify for <strong>FREE Premium Home Delivery</strong>!</>
                ) : (
                  <>Congratulations! Your order is eligible for <strong className="text-emerald-600 uppercase">FREE Express Hand-Delivery</strong> via IBHAFINTECH Logistics.</>
                )}
              </p>
            </div>
          );
        })()}

        {/* Scrollable Cart Item list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5 py-12">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <ShoppingBag className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                  Browse our high-quality catalog of home, farming, and garden appliances to start shopping!
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline mt-1 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-3 border border-slate-100 bg-white rounded-xl hover:border-slate-200/85 transition-colors shadow-xs"
              >
                {/* Product Pic */}
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-slate-150 shrink-0 bg-slate-50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594818821915-bc32432617f6?auto=format&fit=crop&w=100&q=80";
                  }}
                />

                {/* Info and modifiers */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 truncate max-w-[170px]" title={item.product.name}>
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.product.category}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg h-7 overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
                        className="px-2 text-slate-500 hover:text-slate-800 hover:bg-slate-150 transition-colors h-full font-bold cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 text-[11px] font-mono font-bold text-slate-900 min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
                        className="px-2 text-slate-500 hover:text-slate-800 hover:bg-slate-150 transition-colors h-full font-bold cursor-pointer text-xs"
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Codes & Price Summaries */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
            {/* Promo Code Input Form */}
            <form onSubmit={handleApplyPromoSubmit} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Coupon (Ex: IBHA10)"
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 uppercase font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer active:scale-98"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <p className="text-[10px] text-rose-600 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-600"></span>
                  {promoError}
                </p>
              )}
              {promoSuccess && (
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                  {promoSuccess}
                </p>
              )}

              {/* Promo suggestions */}
              {!appliedPromo && (
                <div className="flex gap-1.5 items-center pt-1 text-[10px] text-slate-500">
                  <span className="font-semibold text-indigo-600">Offers:</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono font-bold">IBHA10</span>
                  <span>(10% off)</span>
                  <span className="text-slate-300">|</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono font-bold">WELCOME500</span>
                  <span>(₹500 off)</span>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon Discount ({appliedPromo})
                  </span>
                  <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-medium uppercase font-mono">FREE</span>
                ) : (
                  <span className="font-mono">₹{shippingFee}</span>
                )}
              </div>

              {shippingFee > 0 && (
                <p className="text-[10px] text-slate-400 font-mono italic">
                  Add ₹{(shippingThreshold - subtotal).toLocaleString('en-IN')} more to unlock FREE shipping.
                </p>
              )}

              <div className="flex justify-between text-slate-500">
                <span>GST Tax (18%)</span>
                <span className="font-mono">₹{tax.toLocaleString('en-IN')}</span>
              </div>

              <hr className="border-slate-200" />

              <div className="flex justify-between text-sm font-bold text-slate-900 pt-0.5">
                <span>Grand Total</span>
                <span className="font-mono font-extrabold text-base text-indigo-600">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={onCheckout}
                className="w-full py-3 bg-slate-950 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-slate-950/10 flex items-center justify-center gap-2 cursor-pointer active:scale-99 group"
              >
                Secure Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>PCI-DSS SSL Secured Transacting Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
