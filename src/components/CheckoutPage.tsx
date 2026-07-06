import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CreditCard, Landmark, CheckCircle, Smartphone, MapPin, Receipt, ChevronRight, Award } from 'lucide-react';
import { CartItem, Order, User } from '../types';
import { motion } from 'motion/react';

interface CheckoutPageProps {
  cartItems: CartItem[];
  appliedPromo: string;
  onPlaceOrder: (order: Order) => void;
  onBackToCart: () => void;
  onClose: () => void;
  currentUser?: User | null;
}

export default function CheckoutPage({
  cartItems,
  appliedPromo,
  onPlaceOrder,
  onBackToCart,
  onClose,
  currentUser
}: CheckoutPageProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    zipCode: currentUser?.zipCode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'pod'>('upi');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPaying, setIsPaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  let discount = 0;
  if (appliedPromo === "IBHA10") {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedPromo === "WELCOME500" && subtotal >= 1999) {
    discount = 500;
  }

  const shippingFee = subtotal > 0 && subtotal < 4999 ? 149 : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.18);
  const total = taxableAmount + shippingFee + tax;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number starting with 6-9.";
    }
    if (!formData.address.trim()) newErrors.address = "Detailed street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State selection is required.";
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Postal PIN code is required.";
    } else if (!/^\d{6}$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = "PIN code must be exactly 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPaying(true);

    // Simulate a secure bank / UPI gateway check out
    setTimeout(() => {
      setIsPaying(false);
      setIsCompleted(true);

      const orderId = `IBHA-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNo = `IN-BL-${Math.floor(1000000 + Math.random() * 9000000)}`;
      
      const newOrder: Order = {
        id: orderId,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        items: cartItems,
        subtotal,
        discount,
        shipping: shippingFee,
        tax,
        total,
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'Processing',
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        trackingNumber: trackingNo
      };

      setGeneratedOrder(newOrder);
      onPlaceOrder(newOrder);
    }, 2000);
  };

  // State dropdown list for India
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  if (isCompleted && generatedOrder) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Animated Success Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl shadow-emerald-50 text-center space-y-4"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8 text-emerald-600 animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-bold">Transaction Secured & Approved</span>
              <h2 className="text-2xl font-display font-black text-slate-900">Thank you for your Order!</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Your payment was processed successfully. A detailed invoice has been generated. Your shipment is handled by <strong>IBHAFINTECH PVT LTD</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4 text-left max-w-md mx-auto text-xs font-mono">
              <div>
                <p className="text-slate-400">ORDER ID</p>
                <p className="font-bold text-slate-800">{generatedOrder.id}</p>
              </div>
              <div>
                <p className="text-slate-400">TRACKING NO</p>
                <p className="font-bold text-indigo-600">{generatedOrder.trackingNumber}</p>
              </div>
            </div>
          </motion.div>

          {/* Printable Invoice */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-8 space-y-6 relative">
            {/* Watermark/Fintech Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
              <Award className="w-[450px] h-[450px]" />
            </div>

            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-xl font-display font-extrabold text-slate-950 tracking-tight">IBHAZON INVOICE</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Operated by IBHAFINTECH PVT LTD</p>
              </div>
              <div className="text-right text-xs space-y-0.5">
                <p className="font-bold text-slate-800">TAX INVOICE</p>
                <p className="text-slate-500 font-mono">{generatedOrder.createdAt}</p>
                <p className="text-indigo-600 font-bold font-mono text-[10px]">ORIGINAL COPY</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs leading-relaxed border-b border-slate-100 pb-6">
              <div>
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1 text-slate-400">Billing & Shipping To</p>
                <p className="font-semibold text-slate-800 text-sm">{generatedOrder.customerName}</p>
                <p className="text-slate-500 mt-0.5">{generatedOrder.address}</p>
                <p className="text-slate-500">{generatedOrder.city}, {generatedOrder.state} - {generatedOrder.zipCode}</p>
                <p className="text-slate-500 font-mono mt-1">Phone: +91 {generatedOrder.phone}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1 text-slate-400">Corporate Details</p>
                <p className="font-semibold text-slate-800 text-sm">IBHAFINTECH PVT LTD</p>
                <p className="text-slate-500 mt-0.5">11-5-285, HP ROAD, BHAVANI NAGAR, MOOSAPET</p>
                <p className="text-slate-500">Hyderabad, Telangana - 500018</p>
                <p className="text-slate-500 font-mono mt-1">Support: ibhafintech@gmail.com</p>
              </div>
            </div>

            {/* Line items table */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Itemized Breakdown</p>
              <div className="space-y-2">
                {generatedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-xs p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                    <div>
                      <p className="font-semibold text-slate-800">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Qty: {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="font-mono font-bold text-slate-800">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial calculations */}
            <div className="border-t border-slate-100 pt-6 flex justify-end">
              <div className="w-full max-w-xs space-y-2.5 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-800">₹{generatedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {generatedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Coupon</span>
                    <span className="font-mono">-₹{generatedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping & Logistics</span>
                  {generatedOrder.shipping === 0 ? (
                    <span className="text-emerald-600 uppercase font-mono font-bold">FREE</span>
                  ) : (
                    <span className="font-mono text-slate-800">₹{generatedOrder.shipping}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>GST Tax (18% inclusive)</span>
                  <span className="font-mono text-slate-800">₹{generatedOrder.tax.toLocaleString('en-IN')}</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1">
                  <span>Total Amount Paid</span>
                  <span className="font-mono text-indigo-600 text-base font-extrabold">₹{generatedOrder.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right">
                  <span className="bg-slate-100 text-[9px] font-mono font-bold uppercase text-slate-600 px-2 py-0.5 rounded">
                    Paid via {generatedOrder.paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 text-center text-[10px] text-slate-400 leading-relaxed">
              <p>This is a digitally generated tax invoice compliant under Section 31 of GST guidelines. No physical signature is required.</p>
              <p className="mt-1 font-semibold text-indigo-900/75">For any technical support call +91 91000 94484 or write to ibhafintech@gmail.com</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-950 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer active:scale-98 shadow-md"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-xl transition-colors cursor-pointer active:scale-98"
            >
              Print Invoice Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Form Panel: Address and details */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToCart}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-display font-bold text-slate-950 tracking-tight">Secure Shipping Checkout</h2>
              <p className="text-xs text-slate-400">Fully encrypted checkout powered by IBHAFINTECH</p>
            </div>
          </div>

          <form onSubmit={handlePaySubmit} className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                1. Delivery Location Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 uppercase block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter recipient's name"
                    className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all ${
                      errors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-rose-500">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 uppercase block">Phone Number (For Delivery)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-xs font-mono font-semibold text-slate-400">+91</span>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full text-xs bg-slate-50 border rounded-xl pl-12 pr-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all font-mono ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600 uppercase block">Email Address (For Invoice Delivery)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all ${
                    errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-500">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600 uppercase block">Street Address / House No / Area</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Plot, Building, Apartment, and Street"
                  className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all ${
                    errors.address ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-rose-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 uppercase block">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="E.g. Hyderabad"
                    className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all ${
                      errors.city ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.city && <p className="text-[10px] text-rose-500">{errors.city}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 uppercase block">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all text-slate-800 ${
                      errors.state ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                    }`}
                  >
                    <option value="">-- Select --</option>
                    {indianStates.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  {errors.state && <p className="text-[10px] text-rose-500">{errors.state}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 uppercase block">6-Digit PIN Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="E.g. 500081"
                    maxLength={6}
                    className={`w-full text-xs bg-slate-50 border rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all font-mono ${
                      errors.zipCode ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.zipCode && <p className="text-[10px] text-rose-500">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Payment Method selectors */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                2. Instant Secure Payment Gateways
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-24 transition-all relative ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${paymentMethod === 'upi' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">UPI Instant</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Paytm, PhonePe, GPay</p>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-24 transition-all relative ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Card Gateways</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Visa, RuPay, MasterCard</p>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('pod')}
                  className={`p-4 border rounded-2xl cursor-pointer flex flex-col justify-between h-24 transition-all relative ${
                    paymentMethod === 'pod'
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Landmark className={`w-5 h-5 ${paymentMethod === 'pod' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Pay on Delivery</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Cash / UPI on arrival</p>
                  </div>
                </div>
              </div>

              {/* Secure note */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-950">100% Secure Transacting Guarantee</p>
                  <p className="text-[10px] text-emerald-900/80 leading-relaxed mt-0.5">
                    Your transactions are routed securely via 256-bit SSL financial bridges maintained directly under parent corporate division <strong>IBHAFINTECH PVT LTD</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPaying}
              className="w-full py-4 bg-slate-950 hover:bg-indigo-600 text-white rounded-2xl text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isPaying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authorizing Payments Gateways...
                </>
              ) : (
                `Complete Secure Payment - ₹${total.toLocaleString('en-IN')}`
              )}
            </button>
          </form>
        </div>

        {/* Right Panel: Order Review */}
        <div className="w-full lg:w-96 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs h-fit space-y-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Receipt className="w-4 h-4 text-indigo-600" />
            3. Order Cart Verification
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3.5 pr-1">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex gap-3 items-center text-xs">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.product.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Qty: {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}</p>
                </div>
                <span className="font-mono font-bold text-slate-800 shrink-0">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <hr className="border-slate-100" />

          {/* Pricing breakdowns */}
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Cart Items Subtotal</span>
              <span className="font-mono text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Coupon Applied ({appliedPromo})</span>
                <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping & Logistics</span>
              {shippingFee === 0 ? (
                <span className="text-emerald-600 font-bold uppercase font-mono">FREE</span>
              ) : (
                <span className="font-mono text-slate-800">₹{shippingFee}</span>
              )}
            </div>

            <div className="flex justify-between">
              <span>GST (18% inclusive)</span>
              <span className="font-mono text-slate-800">₹{tax.toLocaleString('en-IN')}</span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-between text-sm font-bold text-slate-900 pt-1">
              <span>Grand Total</span>
              <span className="font-mono text-indigo-600 font-extrabold text-base">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
