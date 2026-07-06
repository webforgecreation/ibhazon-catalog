import React from 'react';
import { Mail, Phone, Landmark, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'refund' | 'terms' | 'shipment') => void;
}

export default function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Value Propositions */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800/60">
        <div className="flex items-start gap-3">
          <Landmark className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <h4 className="font-semibold text-slate-200">Corporate Backing</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              IBHAZON is a registered proprietary consumer service owned and powered exclusively by <strong>IBHAFINTECH PVT LTD</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-semibold text-slate-200">Escrow Payment Protection</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Every single UPI, Netbanking, or Card transaction is fully secured under double-layered RBI compliant banking bridges.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <h4 className="font-semibold text-slate-200">Customer Support Desk</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Reach our active desks anytime at <strong>ibhafintech@gmail.com</strong> or dial support call centers at <strong>+91 91000 94484</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Link sections */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Division Desc */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 select-none">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 text-white shadow-md shadow-indigo-500/15 ring-1 ring-white/10">
              <Landmark className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-display font-black text-white tracking-tight flex items-center gap-0.5 leading-none">
                IBHA<span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">ZON</span>
              </h3>
              <span className="text-[7px] text-slate-300 font-mono tracking-[0.18em] font-extrabold mt-0.5 uppercase">
                CONSUMER LOGISTICS
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Supplying premium appliances, professional tools, garden accessories, and high-efficiency farming machinery directly to consumers and businesses.
          </p>
        </div>

        {/* Categories shortcut */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Department Highlights</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li>Home & Kitchen Appliances</li>
            <li>Farming & Agriculture tools</li>
            <li>Gym & High-Intensity Fitness</li>
            <li>Lighting & Bathroom Essentials</li>
          </ul>
        </div>

        {/* Customer Care policies */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Legal Frameworks</h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <a 
                href="#/privacy"
                className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
              >
                Privacy Policy Guidelines
              </a>
            </li>
            <li>
              <a 
                href="#/refund"
                className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
              >
                Refund & Cancellation Rules
              </a>
            </li>
            <li>
              <a 
                href="#/shipment"
                className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
              >
                Shipment Policy
              </a>
            </li>
            <li>
              <a 
                href="#/terms"
                className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
              >
                Corporate Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Corporate Address */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Corporate Address</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong>IBHAFINTECH PVT LTD</strong><br />
            11-5-285,HP ROAD,BHAVANI NAGAR, MOOSAPET,<br />
            Hyderabad, Telangana - 500018<br />
            India
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
            <a href="mailto:ibhafintech@gmail.com" className="hover:text-white flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <a href="tel:9100094484" className="hover:text-white flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Call Support
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 py-6 text-slate-500 text-[10px] border-t border-slate-900">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 IBHAFINTECH PVT LTD. All Corporate Rights Reserved.</p>
          <div className="flex items-center gap-1 text-[9px] text-slate-600 font-mono">
            <span>Powered securely via IBHAFINTECH Payment Services</span>
            <span className="text-slate-800">•</span>
            <span>CIN: U63990TS2026PTC215877</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
