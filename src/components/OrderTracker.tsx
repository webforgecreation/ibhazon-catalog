import React, { useState } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle2, ChevronRight, HelpCircle, Phone, ArrowLeft } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerProps {
  orders: Order[];
  onBack: () => void;
}

export default function OrderTracker({ orders, onBack }: OrderTrackerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Default simulated orders that exist out-of-the-box so the user can test the tracker instantly!
  const mockOrders: Record<string, Order> = {
    "IBHA-884910": {
      id: "IBHA-884910",
      customerName: "Satish Reddy",
      email: "satish.reddy@gmail.com",
      phone: "9848022338",
      address: "Flat 402, Gachibowli Heights, Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      zipCode: "500032",
      items: [
        {
          product: {
            id: "home-kitchen-3",
            name: "Air Fryer",
            category: "Home & Kitchen",
            price: 5999,
            rating: 4.8,
            reviewsCount: 310,
            description: "Rapid air circulation technology air fryer",
            specs: ["4.5L capacity", "8 programs"],
            image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=150&q=80",
            stock: 12
          },
          quantity: 1
        }
      ],
      subtotal: 5999,
      discount: 0,
      shipping: 0,
      tax: 1080,
      total: 7079,
      paymentMethod: "UPI_GPAY",
      status: "Shipped",
      createdAt: "July 1, 2026, 03:20 PM",
      trackingNumber: "IN-HYD-55091"
    },
    "IBHA-224490": {
      id: "IBHA-224490",
      customerName: "Priyanka Sen",
      email: "priyanka.s@yahoo.com",
      phone: "9123456780",
      address: "Apt 12B, Salt Lake Sector 5",
      city: "Kolkata",
      state: "West Bengal",
      zipCode: "700091",
      items: [
        {
          product: {
            id: "pet-supplies-1",
            name: "Dog Food",
            category: "Pet Supplies",
            price: 1999,
            rating: 4.6,
            reviewsCount: 45,
            description: "Premium high-protein dry dog food",
            specs: ["10kg", "chicken and veggies"],
            image: "https://images.unsplash.com/photo-1589722244358-f0ec94b0d44d?auto=format&fit=crop&w=150&q=80",
            stock: 35
          },
          quantity: 2
        }
      ],
      subtotal: 3998,
      discount: 399,
      shipping: 149,
      tax: 648,
      total: 4396,
      paymentMethod: "CREDIT_CARD",
      status: "Delivered",
      createdAt: "June 25, 2026, 11:45 AM",
      trackingNumber: "IN-CCU-98214"
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSearchedOrder(null);

    const query = searchQuery.trim().toUpperCase();
    if (!query) {
      setErrorMsg("Please enter an Order ID.");
      return;
    }

    // Check user placed orders first
    const userOrder = orders.find(o => o.id.toUpperCase() === query);
    if (userOrder) {
      setSearchedOrder(userOrder);
      return;
    }

    // Check pre-populated mock orders
    const staticOrder = mockOrders[query];
    if (staticOrder) {
      setSearchedOrder(staticOrder);
    } else {
      setErrorMsg("Order ID not found. Try searching default orders: 'IBHA-884910' or 'IBHA-224490'.");
    }
  };

  // Status mapping
  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const activeStep = searchedOrder ? getStatusStep(searchedOrder.status) : 0;

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top bar with Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </button>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">IBHAFINTECH Logistics Core</span>
        </div>

        {/* Search Header card */}
        <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-xs space-y-4">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl font-display font-black text-slate-900">Track Your Shipment Status</h2>
            <p className="text-xs text-slate-500 max-w-md">
              Enter your unique Order ID to check real-time transit status of your IBHAZON shipments.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (Ex: IBHA-884910, IBHA-224490)"
                className="w-full text-xs font-mono font-semibold bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
            >
              Track Now
            </button>
          </form>

          {errorMsg && (
            <p className="text-xs text-rose-600 font-medium bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
              {errorMsg}
            </p>
          )}

          {/* Quick suggestions box */}
          <div className="flex gap-2 items-center text-[10px] text-slate-400">
            <span>Try searching test IDs:</span>
            <button 
              onClick={() => { setSearchQuery('IBHA-884910'); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold"
            >
              IBHA-884910
            </button>
            <button 
              onClick={() => { setSearchQuery('IBHA-224490'); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold"
            >
              IBHA-224490
            </button>
          </div>
        </div>

        {/* Display tracked order status */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 md:p-8 space-y-8">
            {/* Meta Order specs */}
            <div className="flex flex-col md:flex-row justify-between border-b border-slate-100 pb-5 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Active Consignment</span>
                <h3 className="text-lg font-display font-bold text-slate-900">{searchedOrder.id}</h3>
                <p className="text-xs text-slate-400 font-mono">Date Placed: {searchedOrder.createdAt}</p>
              </div>

              <div className="text-left md:text-right space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Consignment Status</span>
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
                  searchedOrder.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                  searchedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  searchedOrder.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Tracking Progress Bar */}
            <div className="relative pt-4">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>
              {/* Active fill */}
              <div 
                className="absolute top-1/2 left-4 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500 hidden md:block"
                style={{ width: `${(activeStep - 1) * 32}%` }}
              ></div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {[
                  { step: 1, label: "Order Placed", icon: <Package className="w-5 h-5" />, desc: "Order details verified & checked" },
                  { step: 2, label: "Processing", icon: <CheckCircle2 className="w-5 h-5" />, desc: "Packaged & sorted at IBHA warehouse" },
                  { step: 3, label: "Shipped", icon: <Truck className="w-5 h-5" />, desc: "Handed over to logistical courier partners" },
                  { step: 4, label: "Delivered", icon: <CheckCircle2 className="w-5 h-5" />, desc: "Arrived at destination address" }
                ].map((st) => {
                  const isPast = activeStep >= st.step;
                  const isCurrent = activeStep === st.step;

                  return (
                    <div key={st.step} className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
                        isCurrent ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100' :
                        isPast ? 'border-emerald-600 bg-emerald-50 text-emerald-600' :
                        'border-slate-200 bg-white text-slate-300'
                      }`}>
                        {st.icon}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isCurrent ? 'text-indigo-600' : isPast ? 'text-slate-800' : 'text-slate-400'}`}>
                          {st.label}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-normal max-w-[150px] mx-auto">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Logistic Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="space-y-3">
                <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px] text-slate-400">Logistical Dispatch Details</p>
                <div className="space-y-1.5 font-mono">
                  <p className="text-slate-500">Logistics Vendor: <span className="font-bold text-slate-700">IBHAFINTECH Logistics Pvt Ltd</span></p>
                  <p className="text-slate-500">Waybill Air Tracking Code: <span className="font-bold text-indigo-600">{searchedOrder.trackingNumber}</span></p>
                  <p className="text-slate-500">Method: <span className="font-bold text-slate-700">Surface Express Standard Delivery</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-slate-800 uppercase tracking-widest text-[9px] text-slate-400">Recipient Consignee Info</p>
                <div className="space-y-1 text-slate-600 leading-normal">
                  <p className="font-semibold text-slate-800">{searchedOrder.customerName}</p>
                  <p className="text-slate-500">{searchedOrder.address}</p>
                  <p className="text-slate-500">{searchedOrder.city}, {searchedOrder.state} - {searchedOrder.zipCode}</p>
                </div>
              </div>
            </div>

            {/* Delivery Assistance */}
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs text-indigo-950">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>Having trouble tracking or delays? Reach IBHAFINTECH Logistics directly.</span>
              </div>
              <a 
                href="tel:9100094484"
                className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-lg font-bold text-[10px] transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                9100094484
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
