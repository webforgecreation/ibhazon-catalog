import React, { useState } from 'react';
import { X, ShieldCheck, User as UserIcon, Lock, Sparkles, AlertCircle, CheckCircle, ArrowRight, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialTab?: 'customer' | 'admin';
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = 'customer' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>(initialTab);
  const [customerMode, setCustomerMode] = useState<'signin' | 'signup'>('signin');
  
  // Form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // UI states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickCustomer = () => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const demoUser: User = {
        id: 'user_demo_101',
        name: 'Rohan Sharma',
        email: 'rohan.sharma@gmail.com',
        role: 'customer',
        phone: '+91 98765 43210',
        address: '42, Park Street, Sector 5',
        city: 'Kolkata',
        state: 'West Bengal',
        zipCode: '700091'
      };
      localStorage.setItem('ibhazon_current_user', JSON.stringify(demoUser));
      onLoginSuccess(demoUser);
      setSuccess('Logged in successfully as Rohan Sharma!');
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    }, 600);
  };

  const handleQuickAdmin = () => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      const demoAdmin: User = {
        id: 'admin_sys_999',
        name: 'Ibha System Admin',
        email: 'admin@ibhazon.com',
        role: 'admin'
      };
      localStorage.setItem('ibhazon_current_user', JSON.stringify(demoAdmin));
      onLoginSuccess(demoAdmin);
      setSuccess('Administrative Clearance Granted! Welcome, Admin.');
      setIsLoading(false);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (activeTab === 'admin') {
        // Simple secure checks for demo
        if (email.trim().toLowerCase() === 'admin@ibhazon.com' && password === '123456') {
          const adminUser: User = {
            id: 'admin_sys_999',
            name: 'Ibha System Admin',
            email: 'admin@ibhazon.com',
            role: 'admin'
          };
          localStorage.setItem('ibhazon_current_user', JSON.stringify(adminUser));
          onLoginSuccess(adminUser);
          setSuccess('Administrative Clearance Granted!');
          setIsLoading(false);
          setTimeout(() => {
            onClose();
            setSuccess('');
          }, 1000);
        } else {
          setError('Invalid administrator email or gateway security PIN.');
          setIsLoading(false);
        }
      } else {
        // Customer Mode signup or signin
        if (customerMode === 'signup' && !name) {
          setError('Please provide your full name to register.');
          setIsLoading(false);
          return;
        }

        const loggedUser: User = {
          id: `user_uid_${Math.floor(Math.random() * 900000 + 100000)}`,
          name: customerMode === 'signup' ? name : email.split('@')[0],
          email: email,
          role: 'customer',
          phone: phone || '+91 91000 94484'
        };

        localStorage.setItem('ibhazon_current_user', JSON.stringify(loggedUser));
        onLoginSuccess(loggedUser);
        setSuccess(customerMode === 'signup' ? 'Account created and logged in!' : 'Successfully signed in!');
        setIsLoading(false);
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 1000);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={onClose} />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 border border-slate-200"
      >
        {/* Left Visual Sidebar - Brand Statement */}
        <div className="md:w-5/12 bg-slate-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient overlays */}
          <div className="absolute inset-0 bg-radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_60%) pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Info */}
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3 select-none">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-display font-black tracking-tight text-white flex items-center gap-0.5 leading-none">
                  IBHA<span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-black">ZON</span>
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full self-end mb-1 ml-0.5"></span>
                </h1>
                <span className="text-[8px] text-slate-300 font-mono tracking-[0.2em] font-extrabold mt-0.5 uppercase">
                  SECURE TRADING PLATFORM
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Welcome to the digital procurement gate of IBHAFINTECH PRIVATE LIMITED. Please select your gateway to resume authenticated sessions, track logistics transits, or manage catalogue inventories.
              </p>
            </div>
          </div>

          {/* Core Guarantees Icons */}
          <div className="space-y-4 mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-slate-200">Corporate Backing</h4>
                <p className="text-[10px] text-slate-400">Backed by IBHAFINTECH PVT LTD.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-slate-200">PCI-DSS Security</h4>
                <p className="text-[10px] text-slate-400">Insured logs & 256-bit secure links.</p>
              </div>
            </div>
          </div>

          {/* Bottom corporate credits */}
          <div className="text-[9px] text-slate-500 font-mono mt-8">
            SYSTEM ID: IBHA_PORTAL_SECURE
          </div>
        </div>

        {/* Right Tabbed Form Area */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Tabs Selection */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1 mb-8">
              <button
                type="button"
                onClick={() => { setActiveTab('customer'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'customer'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                Customer Account
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('admin'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Administrative Gateway
              </button>
            </div>

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'customer' ? (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-extrabold text-slate-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Customer Log In / Registration
                  </h3>
                  <p className="text-xs text-slate-400">
                    {customerMode === 'signin' 
                      ? 'Access customized express shipping codes and view saved checkout histories.'
                      : 'Create your secure IBHAZON customer ledger profile instantly.'}
                  </p>
                </div>

                {/* Switcher Customer sub-tabs */}
                <div className="flex gap-4 border-b border-slate-100 pb-2 text-xs">
                  <button
                    onClick={() => setCustomerMode('signin')}
                    className={`pb-1 font-bold border-b-2 transition-all ${
                      customerMode === 'signin' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setCustomerMode('signup')}
                    className={`pb-1 font-bold border-b-2 transition-all ${
                      customerMode === 'signup' 
                        ? 'border-indigo-600 text-indigo-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {customerMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohan Sharma"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Password</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {customerMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mobile / Delivery Phone</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Feedback Blocks */}
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                    >
                      {isLoading ? 'Processing...' : customerMode === 'signin' ? 'Sign In Securely' : 'Complete Registration'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickCustomer}
                      disabled={isLoading}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                    >
                      <span>1-Click Demo Customer</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Admin Tab
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-extrabold text-slate-950 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Administrative Gateway Lock
                  </h3>
                  <p className="text-xs text-slate-400">
                    Authorization gate. Requires verified system credentials to modify catalog listings, adjust warehouse parameters, or download transaction invoice ledgers.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Administrator Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@ibhazon.com"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Security PIN / Password</label>
                      <span className="text-[10px] text-slate-400 font-mono">Demo PIN: 123456</span>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  {/* Feedback Blocks */}
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                    >
                      {isLoading ? 'Verifying Gateway...' : 'Submit Credentials'}
                      <Lock className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleQuickAdmin}
                      disabled={isLoading}
                      className="py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-100"
                    >
                      <span>1-Click System Admin</span>
                    </button>
                  </div>
                </form>

                {/* Secure Gateway Warning Tag */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 font-mono leading-relaxed">
                  ⚠️ ACCESS WARNING: Unauthorized attempts to bypass this Administrative Gateway are logged under the PCI-DSS transit log guidelines of IBHA PVT LTD.
                </div>
              </div>
            )}
          </div>

          {/* Prompt info */}
          <div className="text-[10px] text-slate-400 text-center mt-6 pt-4 border-t border-slate-100">
            Secure processing provided by IbhaFINTECH Private Limited © 2026.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
