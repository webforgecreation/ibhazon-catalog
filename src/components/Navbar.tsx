import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, HelpCircle, Settings, Menu, X, Landmark, SlidersHorizontal, MapPin, User as UserIcon, LogOut, Key, ChevronDown, Shield } from 'lucide-react';
import { Product, User } from '../types';

interface NavbarProps {
  products: Product[];
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  onSelectProduct: (product: Product) => void;
  onOpenTracker: () => void;
  adminMode: boolean;
  onToggleAdminMode: () => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuth: (tab: 'customer' | 'admin') => void;
}

export default function Navbar({
  products,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onSearchChange,
  onCategoryChange,
  selectedCategory,
  onSelectProduct,
  onOpenTracker,
  adminMode,
  onToggleAdminMode,
  currentUser,
  onLogout,
  onOpenAuth
}: NavbarProps) {
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchVal.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()))
      .slice(0, 6); // Max 6 quick suggestions
    setSuggestions(filtered);
  }, [searchVal, products]);

  // Click-out listeners for suggestions dropdown and key listener for [/]
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      // Focus on '/' key press if user is not already typing in an input
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchVal);
    setSuggestions([]);
  };

  const handleSuggestionClick = (p: Product) => {
    onSelectProduct(p);
    setSearchVal('');
    setSuggestions([]);
  };

  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-900/80 shadow-lg backdrop-blur-md bg-opacity-95">
      {/* Main Navbar */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Branded Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer shrink-0 group select-none" 
            onClick={() => { onCategoryChange('All Categories'); onSearchChange(''); setSearchVal(''); }}
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-0.5 leading-tight">
                IBHA<span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-black">ZON</span>
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full self-end mb-1 ml-0.5"></span>
              </h1>
              <span className="text-[8px] text-slate-300 font-mono tracking-[0.2em] font-extrabold -mt-0.5 uppercase">
                PRODUCTS & LOGISTICS
              </span>
            </div>
          </div>

          {/* Search bar with Suggestions dropdown */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl relative" ref={suggestionRef}>
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search across 190 premium appliances & tools..."
                value={searchVal}
                onChange={(e) => { setSearchVal(e.target.value); onSearchChange(e.target.value); }}
                className="w-full text-xs bg-slate-900/90 border border-slate-800 text-slate-100 rounded-xl pl-4 pr-16 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-slate-500 transition-all font-sans"
              />
              <div className="absolute right-3 top-2 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 rounded-md border border-slate-800 bg-slate-950 font-mono text-[9px] font-medium text-slate-500 select-none pointer-events-none">
                  /
                </kbd>
                <button type="submit" className="text-slate-500 hover:text-indigo-400 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions Box */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Quick Catalog Matches
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {suggestions.length} items found
                  </span>
                </div>
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSuggestionClick(p)}
                    className="flex items-center gap-3.5 px-4 py-3 hover:bg-slate-50 transition-all cursor-pointer border-b border-slate-100/60 last:border-0 group/item"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="w-9 h-9 rounded-lg object-cover border border-slate-150 shrink-0 group-hover/item:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover/item:text-indigo-600 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.2 bg-slate-100 rounded-sm text-slate-500">{p.category}</span>
                        <span>• ★ {p.rating}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold font-mono text-slate-900 group-hover/item:text-indigo-600">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-emerald-600 font-mono block">In Stock</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Right Actions Menu */}
          <div className="flex items-center gap-3.5">
            
            {/* If NOT logged in, show both customer & admin log in actions separately */}
            {!currentUser ? (
              <div className="flex items-center gap-2">
                {/* User/Customer portal Login */}
                <button
                  onClick={() => onOpenAuth('customer')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-850 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Customer Log In</span>
                  <span className="sm:hidden">Login</span>
                </button>

                {/* Administrative Gateway Login */}
                <button
                  onClick={() => onOpenAuth('admin')}
                  className="px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden lg:inline">Admin Gateway</span>
                  <span className="lg:hidden">Admin</span>
                </button>
              </div>
            ) : (
              /* If logged in, show personalized account settings dropdown */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/30 rounded-xl flex items-center gap-2 transition-all cursor-pointer text-xs"
                >
                  {/* Initials avatar circle */}
                  <div className="w-6.5 h-6.5 bg-indigo-600 text-white font-black text-[10px] rounded-lg flex items-center justify-center uppercase shadow-sm shrink-0">
                    {currentUser.name.slice(0, 2)}
                  </div>
                  
                  <div className="text-left hidden md:block">
                    <p className="text-[10px] text-slate-400 leading-none">Logged In</p>
                    <p className="text-xs font-bold text-white leading-tight mt-0.5 truncate max-w-[80px]">
                      {currentUser.name}
                    </p>
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown list */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {currentUser.role === 'admin' ? '🔥 Administrator Session' : '🍀 Customer Ledger'}
                      </p>
                      <p className="text-xs font-bold text-slate-800 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => { onOpenAdmin(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4" />
                        Admin Panel Console
                      </button>
                    )}

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => { onToggleAdminMode(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-slate-400" />
                        {adminMode ? 'Disable Admin View' : 'Enable Admin View'}
                      </button>
                    )}

                    <button
                      onClick={() => { onOpenTracker(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      My Delivery Tracker
                    </button>

                    <button
                      onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer border-t border-slate-100 mt-1 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out Session
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Track order (Show always for guest if not logged in) */}
            {!currentUser && (
              <button
                onClick={onOpenTracker}
                className="text-slate-300 hover:text-indigo-400 font-semibold text-xs py-2 px-3 hover:bg-slate-900 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Track Order</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white md:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchVal}
              onChange={(e) => { setSearchVal(e.target.value); onSearchChange(e.target.value); }}
              className="w-full text-xs bg-slate-900 border border-slate-800 text-white rounded-xl pl-4 pr-10 py-2.5 focus:outline-hidden"
            />
            <button type="submit" className="absolute right-3.5 top-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stats list */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
            <button
              onClick={() => { onOpenTracker(); setIsMobileMenuOpen(false); }}
              className="p-3 bg-slate-900 rounded-xl text-center font-bold hover:bg-slate-850"
            >
              Track Order
            </button>
            <button
              onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}
              className="p-3 bg-slate-900 rounded-xl text-center font-bold text-indigo-400 hover:bg-slate-850"
            >
              Admin Config
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
