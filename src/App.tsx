import React, { useState, useEffect } from 'react';
import { getProducts, CATEGORIES } from './data/products';
import { Product, CartItem, Order, User } from './types';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import OrderTracker from './components/OrderTracker';
import PolicyModals from './components/PolicyModals';
import PolicyPage from './components/PolicyPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  HelpCircle, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  X, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
  LayoutGrid,
  Home,
  Sprout,
  Tractor,
  PawPrint,
  Sofa,
  Dumbbell,
  Wrench,
  Briefcase,
  Lightbulb,
  Bath
} from 'lucide-react';

const categoryMetadata: Record<string, { icon: any; color: string; desc: string; bg: string }> = {
  "All Categories": { 
    icon: LayoutGrid, 
    color: "text-indigo-600 bg-indigo-50 border-indigo-200", 
    desc: "Browse our entire multi-department catalog",
    bg: "hover:border-indigo-500/30 hover:shadow-indigo-500/5" 
  },
  "Home & Kitchen": { 
    icon: Home, 
    color: "text-rose-600 bg-rose-50 border-rose-200", 
    desc: "Culinary appliances, non-sticks & geysers",
    bg: "hover:border-rose-500/30 hover:shadow-rose-500/5" 
  },
  "Garden Equipment": { 
    icon: Sprout, 
    color: "text-emerald-600 bg-emerald-50 border-emerald-200", 
    desc: "Mowers, smart sprinkler systems & shears",
    bg: "hover:border-emerald-500/30 hover:shadow-emerald-500/5" 
  },
  "Farming Equipment": { 
    icon: Tractor, 
    color: "text-teal-600 bg-teal-50 border-teal-200", 
    desc: "Heavy diesel tillers, sprayers & seeders",
    bg: "hover:border-teal-500/30 hover:shadow-teal-500/5" 
  },
  "Pet Supplies": { 
    icon: PawPrint, 
    color: "text-amber-600 bg-amber-50 border-amber-200", 
    desc: "Leashes, premium feeds & grooming kits",
    bg: "hover:border-amber-500/30 hover:shadow-amber-500/5" 
  },
  "Furniture": { 
    icon: Sofa, 
    color: "text-orange-600 bg-orange-50 border-orange-200", 
    desc: "Ergonomic workspace desks & armchairs",
    bg: "hover:border-orange-500/30 hover:shadow-orange-500/5" 
  },
  "Gym & Fitness": { 
    icon: Dumbbell, 
    color: "text-cyan-600 bg-cyan-50 border-cyan-200", 
    desc: "Cardio plates, dumbbells & yoga gear",
    bg: "hover:border-cyan-500/30 hover:shadow-cyan-500/5" 
  },
  "Tools & Hardware": { 
    icon: Wrench, 
    color: "text-blue-600 bg-blue-50 border-blue-200", 
    desc: "Power drillers, sockets & steel ladders",
    bg: "hover:border-blue-500/30 hover:shadow-blue-500/5" 
  },
  "Office Supplies": { 
    icon: Briefcase, 
    color: "text-violet-600 bg-violet-50 border-violet-200", 
    desc: "Calculators, desks, files & accessories",
    bg: "hover:border-violet-500/30 hover:shadow-violet-500/5" 
  },
  "Lighting": { 
    icon: Lightbulb, 
    color: "text-yellow-600 bg-yellow-50 border-yellow-200", 
    desc: "Lamps, high-wattage smart panels & LEDs",
    bg: "hover:border-yellow-500/30 hover:shadow-yellow-500/5" 
  },
  "Bathroom": { 
    icon: Bath, 
    color: "text-sky-600 bg-sky-50 border-sky-200", 
    desc: "Geysers, diatomaceous mats & shelving",
    bg: "hover:border-sky-500/30 hover:shadow-sky-500/5" 
  }
};

export default function App() {
  // --- STATE ---
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Authentication & Session
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'customer' | 'admin'>('customer');
  
  // Navigation & Modal triggers
  const [activeView, setActiveView] = useState<'shop' | 'checkout' | 'tracker' | 'privacy' | 'refund' | 'terms' | 'shipment'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'refund' | 'terms' | 'shipment' | null>(null);
  
  // Custom interactive image override toggle
  const [adminMode, setAdminMode] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState<number>(99999);
  const [sortBy, setSortBy] = useState('default');
  const [appliedPromo, setAppliedPromo] = useState('');

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Monsoon Farming Equipment Sale",
      tagline: "Heavy diesel tillers, solar power pumps, and crop sprayers managed under secure fintech transacting.",
      discount: "UP TO 35% OFF INSTANT",
      bgClass: "from-emerald-900 to-slate-950",
      buttonText: "Browse Farming Equipment",
      category: "Farming Equipment"
    },
    {
      title: "Premium Smart Living Appliances",
      tagline: "Explore high-efficiency air fryers, induction cooktops, and automatic dishwashers with 7-day returns.",
      discount: "FESTIVE SELECTIONS",
      bgClass: "from-indigo-950 to-slate-950",
      buttonText: "Explore Kitchen Products",
      category: "Home & Kitchen"
    },
    {
      title: "Professional Tools & Hardware",
      tagline: "Aviation-grade aluminum ladders, heavy impact drills, generators, and welding units.",
      discount: "INDUS-GRADE QUALITY",
      bgClass: "from-amber-950 to-slate-950",
      buttonText: "View Heavy Tools",
      category: "Tools & Hardware"
    }
  ];

  // --- INITIALIZATION ---
  useEffect(() => {
    // Load products
    refreshProducts();

    // Read cart from localStorage
    try {
      const storedUser = localStorage.getItem("ibhazon_current_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        if (parsed.role === 'admin') {
          setAdminMode(true);
        }
      }
      const storedCart = localStorage.getItem("ibhazon_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedOrders = localStorage.getItem("ibhazon_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
      const storedPromo = localStorage.getItem("ibhazon_promo");
      if (storedPromo) {
        setAppliedPromo(storedPromo);
      }
      const storedAdminMode = localStorage.getItem("ibhazon_admin_mode");
      if (storedAdminMode) {
        setAdminMode(JSON.parse(storedAdminMode));
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  // Hash Routing Synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/privacy' || hash === '#privacy') {
      setActiveView('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      } else if (hash === '#/refund' || hash === '#refund') {
         setActiveView('refund');
         window.scrollTo({ top: 0, behavior: 'smooth' });

      } else if (hash === '#/terms' || hash === '#terms') {
        setActiveView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else if (hash === '#/shipment' || hash === '#shipment') {
        setActiveView('shipment');
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else if (hash === '#/checkout' || hash === '#checkout') {
        setActiveView('checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else if (hash === '#/tracker' || hash === '#tracker') {
        setActiveView('tracker');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/' || hash === '#' || !hash) {
        setActiveView('shop');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const validViews = ['checkout', 'tracker', 'privacy', 'refund', 'terms', 'shipment'];
    if (validViews.includes(activeView)) {
      if (window.location.hash !== `#/${activeView}`) {
        window.location.hash = `#/${activeView}`;
      }
    } else {
      if (window.location.hash && window.location.hash !== '#/') {
        window.location.hash = '#/';
      }
    }
  }, [activeView]);

  const handleLogout = () => {
    localStorage.removeItem("ibhazon_current_user");
    setCurrentUser(null);
    setAdminMode(false);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setAdminMode(true);
    } else {
      setAdminMode(false);
    }
  };

  // Sync cart with localStorage
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("ibhazon_cart", JSON.stringify(newCart));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  };

  const refreshProducts = () => {
    setProducts(getProducts());
  };

  // Rotate banner slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // --- FILTERING ENGINE ---
  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All Categories') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search text
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filter by Price Cap
    result = result.filter(p => p.price <= priceRange);

    // Sorting Engine
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  // --- CART ACTIONS ---
  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updateCartState(updated);
    } else {
      updateCartState([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateCartQty = (product: Product, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart({ product, quantity: 0 });
      return;
    }
    const updated = cart.map(item => {
      if (item.product.id === product.id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    updateCartState(updated);
  };

  const handleRemoveFromCart = (item: CartItem) => {
    const updated = cart.filter(ci => ci.product.id !== item.product.id);
    updateCartState(updated);
  };

  const handleApplyPromo = (code: string): boolean => {
    const validCodes = ["IBHA10", "WELCOME500"];
    if (validCodes.includes(code)) {
      setAppliedPromo(code);
      localStorage.setItem("ibhazon_promo", code);
      return true;
    }
    return false;
  };

  const handlePlaceOrder = (order: Order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    try {
      localStorage.setItem("ibhazon_orders", JSON.stringify(updatedOrders));
    } catch (e) {
      console.error("Error storing orders list", e);
    }
    // Clear shopping cart on successful order
    updateCartState([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-600 selection:text-white relative">
      
      {/* GLOBAL NAVBAR */}
      <Navbar 
        products={products}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearchChange={setSearchQuery}
        onCategoryChange={(cat) => { setSelectedCategory(cat); setActiveView('shop'); }}
        selectedCategory={selectedCategory}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenTracker={() => setActiveView('tracker')}
        adminMode={adminMode}
        onToggleAdminMode={() => {
          const next = !adminMode;
          setAdminMode(next);
          localStorage.setItem("ibhazon_admin_mode", JSON.stringify(next));
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={(tab) => {
          setAuthInitialTab(tab);
          setIsAuthOpen(true);
        }}
      />

      {/* RENDER ACTIVE ROUTE VIEW */}
      <AnimatePresence mode="wait">
        
        {activeView === 'shop' && (
          <motion.main
            key="shop-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 pb-16"
          >
            {/* HERO PROMOTIONAL BANNER */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="relative overflow-hidden bg-slate-950 rounded-3xl py-12 px-6 sm:px-10 lg:px-12 text-white shadow-xl border border-slate-900">
                
                {/* Rotating Background Card */}
                <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgClass} opacity-85 z-0 transition-all duration-1000`} />
                
                {/* Overlay graphics */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_50%)] z-0" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-[1600px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-5 md:pr-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-indigo-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      {heroSlides[currentSlide].discount}
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-none text-white drop-shadow-xs">
                      {heroSlides[currentSlide].title}
                    </h2>
                    
                    <p className="text-sm text-slate-350 max-w-xl leading-relaxed font-sans">
                      {heroSlides[currentSlide].tagline}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3.5">
                      <button
                        onClick={() => setSelectedCategory(heroSlides[currentSlide].category)}
                        className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-102"
                      >
                        {heroSlides[currentSlide].buttonText}
                        <ArrowRight className="w-4 h-4 text-indigo-600" />
                      </button>
                      
                      <button 
                        onClick={() => {
                          alert("IBHAFINTECH support is active 24/7. Call us at +91 91000 94484 or email ibhafintech@gmail.com. We generate legal GST invoices instantly.");
                        }}
                        className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold rounded-xl transition-all cursor-pointer hover:border-white/20"
                      >
                        Fintech Support Desks
                      </button>
                    </div>
                  </div>

                  {/* Right Hero side promo block */}
                  <div className="hidden md:col-span-4 bg-slate-900/45 border border-white/10 p-6 rounded-2xl backdrop-blur-md space-y-4">
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 font-mono">IBHAFINTECH GUARANTEES</h4>
                    
                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <Truck className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">Insured courier transits with active GPS shipping consignment tracking codes.</p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">Instant refunds within 7-days for any unopened household appliance or tools.</p>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>190 catalog items loaded</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                        100% Secure
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-indigo-500 w-6' : 'bg-slate-700 hover:bg-slate-550'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Helper Tips if Admin Mode is Enabled */}
            {adminMode && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs text-indigo-950 shadow-sm animate-pulse">
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                    <span><strong>Admin Edit Mode is Active!</strong> You can now replace product images live by hovering over any card and clicking the edit icon.</span>
                  </div>
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                  >
                    Open Image Linker
                  </button>
                </div>
              </div>
            )}

            {/* BRANDED CATEGORY DIRECTORY */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
                    <Flame className="w-5 h-5 text-indigo-600 animate-pulse" />
                    Browse Departments
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Explore our certified enterprise catalog sorted across premium categories with logistics tracking.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-2">
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-mono font-bold px-2.5 py-1 rounded-md">
                    11 CORE DIVISIONS
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-2.5 py-1 rounded-md">
                    GST-READY INVOICING
                  </span>
                </div>
              </div>

              {/* Grid of Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                {CATEGORIES.map((cat) => {
                  const meta = categoryMetadata[cat] || categoryMetadata["All Categories"];
                  const Icon = meta.icon;
                  const isSelected = selectedCategory === cat;
                  const count = products.filter(p => cat === 'All Categories' || p.category === cat).length;

                  return (
                    <motion.div
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-950 border-slate-950 text-white shadow-xl ring-2 ring-indigo-500/40'
                          : 'bg-white border-slate-200 text-slate-700 ' + meta.bg
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Icon Container */}
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl border transition-colors ${
                            isSelected 
                              ? 'bg-indigo-600 border-indigo-500 text-white' 
                              : meta.color
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          {/* Item Count Pill */}
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                            isSelected 
                              ? 'bg-white/10 text-indigo-200' 
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {count}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className={`text-xs font-bold tracking-tight ${isSelected ? 'text-white font-extrabold' : 'text-slate-900'}`}>
                            {cat}
                          </h4>
                          <p className={`text-[10px] leading-relaxed mt-1 line-clamp-2 ${
                            isSelected ? 'text-slate-350 font-medium' : 'text-slate-400 font-normal'
                          }`}>
                            {meta.desc}
                          </p>
                        </div>
                      </div>

                      {/* Accent highlight strip at bottom on active */}
                      {isSelected && (
                        <div className="absolute bottom-0 inset-x-4 h-1 bg-indigo-500 rounded-t-full" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* MAIN CATALOG FILTER & PRODUCTS GRID */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT SIDEBAR FILTERS (DESKTOP) */}
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2.5 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-150 p-6 space-y-6 shadow-xs sticky top-24">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                      Filter Options
                    </h4>
                    <button 
                      onClick={() => { setPriceRange(99999); setSortBy('default'); setSelectedCategory('All Categories'); setSearchQuery(''); }}
                      className="text-[10px] text-slate-400 hover:text-indigo-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Price filter */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Max Budget: ₹{priceRange.toLocaleString('en-IN')}</label>
                    <input 
                      type="range"
                      min={999}
                      max={99999}
                      step={500}
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>₹999</span>
                      <span>₹99,999</span>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Sorting */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Sort Catalogue By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700"
                    >
                      <option value="default">Default Catalog Sorting</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Average Rating Stars</option>
                      <option value="popular">Review Counts (Popular)</option>
                    </select>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1 text-[11px] text-indigo-950">
                    <p className="font-semibold text-indigo-950 uppercase text-[9px]">Need customized quotes?</p>
                    <p className="text-indigo-900/85">For corporate bulk orders with GST invoicing, write to <strong>ibhafintech@gmail.com</strong>.</p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE PRODUCTS GRID */}
              <div className="lg:col-span-9 xl:col-span-9.5 space-y-6">
                
                {/* Search / Filter Summary Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-150/60 shadow-xs">
                  <div className="text-xs text-slate-500">
                    Showing <strong className="text-slate-800">{filteredProducts.length}</strong> matching premium items in <strong className="text-indigo-600">"{selectedCategory}"</strong>
                  </div>

                  {/* Mini-filters (Mobile / Tablet) */}
                  <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="lg:hidden text-[10px] bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-slate-700"
                    >
                      <option value="default">Sort by</option>
                      <option value="price-asc">Price: Low-High</option>
                      <option value="price-desc">Price: High-Low</option>
                      <option value="rating">Rating</option>
                    </select>

                    {searchQuery && (
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="text-indigo-900 font-bold hover:text-indigo-500 text-[11px]">×</button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid layout */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-xs space-y-3.5">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mx-auto">
                      <ShoppingBag className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">No products match your filters</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                        Try clearing search texts or raising your price cap budget slider to browse other matching appliances.
                      </p>
                    </div>
                    <button
                      onClick={() => { setPriceRange(99999); setSortBy('default'); setSelectedCategory('All Categories'); setSearchQuery(''); }}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((p) => {
                      const cartItem = cart.find(item => item.product.id === p.id);
                      return (
                        <ProductCard 
                          key={p.id}
                          product={p}
                          onAddToCart={handleAddToCart}
                          onViewDetails={(prod) => setSelectedProduct(prod)}
                          adminMode={adminMode}
                          onRefreshProducts={refreshProducts}
                          isInCart={!!cartItem}
                          cartQuantity={cartItem ? cartItem.quantity : 0}
                          onUpdateCartQuantity={handleUpdateCartQty}
                        />
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

            {/* SECURE PAYMENT BRANDING HERO CAROUSEL AD */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-20">
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800/80">
                <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none select-none">
                  <ShoppingBag className="w-96 h-96" />
                </div>

                <div className="max-w-xl space-y-4 relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 tracking-widest block">TRUSTED BY OVER 15,000+ CUSTOMERS</span>
                  <h3 className="text-2xl font-display font-extrabold tracking-tight">Parent Corporate Division: IBHAFINTECH PVT LTD</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    IBHAZON is built directly on parent transaction frameworks. That means absolute transparency, RBI-level secure checkouts, automated invoice tax generation, and zero third-party processing delays.
                  </p>
                  <div className="flex gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span>GSTIN Check Approved</span>
                    <span>•</span>
                    <span>Corporate Support Ready</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.main>
        )}

        {activeView === 'checkout' && (
          <motion.div
            key="checkout-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <CheckoutPage 
              cartItems={cart}
              appliedPromo={appliedPromo}
              onPlaceOrder={handlePlaceOrder}
              onBackToCart={() => setActiveView('shop')}
              onClose={() => { setActiveView('shop'); }}
              currentUser={currentUser}
            />
          </motion.div>
        )}

        {activeView === 'tracker' && (
          <motion.div
            key="tracker-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <OrderTracker 
              orders={orders}
              onBack={() => setActiveView('shop')}
            />
          </motion.div>
        )}

        {(activeView === 'privacy' || activeView === 'refund' || activeView === 'terms') && (
          <motion.div
            key="policy-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <PolicyPage 
              type={activeView}
              onBack={() => setActiveView('shop')}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* FOOTER */}
      <Footer onOpenPolicy={(type) => setPolicyType(type)} />

      {/* --- DRAWERS & OVERLAY MODALS --- */}
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            isInCart={!!cart.find(item => item.product.id === selectedProduct.id)}
            cartQuantity={cart.find(item => item.product.id === selectedProduct.id)?.quantity || 0}
            onUpdateCartQuantity={handleUpdateCartQty}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={() => { setIsCartOpen(false); setActiveView('checkout'); }}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
          />
        )}
      </AnimatePresence>

      {/* Admin Panel Console */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel 
            products={products}
            onRefreshProducts={refreshProducts}
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Policy Modals Overlay (Privacy, Refund, Terms, Shipment Policy) */}
      <PolicyModals 
        isOpen={!!policyType}
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* Auth Modal (Separate Customer / Admin gateways) */}
      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            initialTab={authInitialTab}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
