import React from 'react';
import { Shield, RefreshCw, FileText, ArrowLeft, Landmark, Mail, Phone, Calendar } from 'lucide-react';

interface PolicyPageProps {
  type: 'privacy' | 'refund' | 'terms' | 'shipment';
  onBack: () => void;
}

export default function PolicyPage({ type, onBack }: PolicyPageProps) {
  const content = {
    privacy: {
      title: "Privacy Policy Guidelines",
      subtitle: "How we collect, protect, and process your secure transactions",
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      updated: "Last updated: July 2, 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          body: "IBHAFINTECh PVT LTD (\"we\", \"us\", or \"our\") operates IBHAZON. We collect personal information you provide directly to us when purchasing, creating an account, or communicating with customer support. This includes name, billing address, shipping address, email address, telephone number, and payment credentials processed securely via our encrypted gateways."
        },
        {
          heading: "2. How We Use Your Data",
          body: "We process your information to fulfill orders, verify identities, coordinate courier shipments, detect fraudulent transactions, and send order updates. Under no circumstances is your personal data sold or leased to third-party marketing brokers."
        },
        {
          heading: "3. Cookies & Analytical Indicators",
          body: "Our web platforms use security tokens and tracking cookies to persist your active shopping cart, remember local browser configurations, and compile secure telemetry data for website traffic analysis."
        },
        {
          heading: "4. Data Protection Standards",
          body: "We deploy secure socket layer (SSL) encryption, firewalls, and strict access control guidelines to safeguard your personal credentials. Payments are processed in compliance with PCI-DSS standards."
        }
      ]
    },
    refund: {
      title: "Refund & Cancellation Rules",
      subtitle: "Simple, transparent guidelines for returns and order reversals",
      icon: <RefreshCw className="w-8 h-8 text-amber-500" />,
      updated: "Last updated: July 2, 2026",
      sections: [
        {
          heading: "1. Return Window",
          body: "We offer a 7-day return policy for all eligible household, tool, and lighting products. The return period begins the day your order status is marked as 'Delivered' by our logistical partners."
        },
        {
          heading: "2. Eligibility for Returns",
          body: "To qualify for a refund, products must be unused, unaltered, stored in their original brand boxes, and must include all serial numbers, technical user guides, and accessories. Damaged or modified products will not be approved for refunds."
        },
        {
          heading: "3. Refund Processing",
          body: "Upon receiving and inspecting your returned item in our warehouse, we will notify you of approval or rejection. Approved refunds are credited back to your original payment account (bank account, credit card, or UPI) within 5 to 7 business days."
        },
        {
          heading: "4. Non-Returnable Goods",
          body: "Certain item classifications, such as opened pet foods, customized items, specific heavy agricultural machinery, and intimate personal hygiene equipment are non-returnable due to hygiene and logistical safety constraints."
        }
      ]
    },
    terms: {
      title: "Corporate Terms & Conditions",
      subtitle: "Rules, guidelines, and agreements governing your use of IBHAZON",
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      updated: "Last updated: July 2, 2026",
      sections: [
        {
          heading: "1. Conditions of Use",
          body: "By accessing and placing orders on IBHAZON, you agree to be bound by these corporate terms of service. You certify that you are at least 18 years of age or possess legal guardian approval to transact on this platform."
        },
        {
          heading: "2. Intellectual Property Rights",
          body: "All web styles, catalog lists, custom codebases, vector illustrations, and graphic assets are the exclusive intellectual properties of IBHA PVT LTD. Unauthorized duplication or framing of these materials is strictly prohibited."
        },
        {
          heading: "3. Product Descriptions & Pricing accuracy",
          body: "While we strive to provide 100% accurate listings, minor pricing errors, stock misalignments, or color display variations may occur. We reserve the absolute right to cancel or adjust orders placed with erroneous pricing grids before shipment."
        },
        {
          heading: "4. Dispute Resolution & Jurisdiction",
          body: "Any legal claims, discrepancies, or transactional disputes arising from purchasing on IBHAZON are governed by corporate business laws and fall under the exclusive jurisdiction of the courts in Hyderabad, Telangana, India."
        }
      ]
    },
    shipment: {
      title: "Shipment Policy",
      subtitle: "Rules, guidelines, and agreements governing your use of IBHAZON",
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      updated: "Last updated: July 2, 2026",
      sections: [
         {
          heading: "1. Order Processing",
          body: "All orders are processed within 1–3 business days after successful payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day. If there is any delay due to high order volume or unforeseen circumstances, customers will be informed via email or phone."
        },
        {
          heading: "2. Shipping Time",
          body: "Estimated delivery times are: Local Deliveries: 2–5 business days, Domestic Deliveries (within India): 3–7 business days, Remote Locations: 5–10 business days, Delivery times are estimates and may vary due to weather conditions, courier delays, natural disasters, or other factors beyond our control. "
        },
        {
          heading: "3. Shipping Charges & Courier Partners",
          body: "Shipping charges, if applicable, will be displayed during checkout, Free shipping may be available on selected products or orders above a specified purchase value, Additional shipping charges may apply for remote or special delivery locations, Orders are shipped through trusted courier partners to ensure safe and timely delivery. The courier service may vary depending on the customer's location."
        },
        {
          heading: "4. Damaged or Missing Items",
          body: "If your package arrives damaged or any items are missing : , Notify us within 48 hours of receiving the order, Share clear photographs of the package and products, We will investigate the issue and provide an appropriate resolution."
        }
      ]
    }
  }[type];

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back navigation */}
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Shopping Catalog
      </button>

      {/* Main Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-xl mb-8">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none">
          {content.icon}
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              {content.icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight">{content.title}</h1>
              <p className="text-slate-400 text-xs mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {content.updated}
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            {content.subtitle}. Please review this legal framework of IBHAZON carefully to understand our secure transactional environment operated by <strong>IBHAFINTECH PVT LTD</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left main content panels */}
        <div className="lg:col-span-2 space-y-6">
          {content.sections.map((sec, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                {sec.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Right Help Desk & Secure Sidebar */}
        <div className="space-y-6">
          
          {/* Quick contact / Support info */}
          <div className="bg-slate-50 rounded-2xl border border-slate-150 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Landmark className="w-4 h-4 text-indigo-600" />
              Corporate Registry
            </h4>
            
            <div className="text-xs text-slate-600 space-y-3">
              <p className="leading-relaxed">
                <strong>IBHAFINTECH PVT LTD</strong><br />
                11-5-285, HP ROAD, BHAVANI NAGAR,MOOSAPET,<br />
                Hyderabad, Telangana - 500018<br />
                India
              </p>
              
              <div className="pt-2 border-t border-slate-200/60 space-y-2">
                <a 
                  href="mailto:ibhafintech@gmail.com" 
                  className="flex items-center gap-2 hover:text-indigo-600 transition-colors py-1"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>ibhafintech@gmail.com</span>
                </a>

                <a 
                  href="tel:9100094484" 
                  className="flex items-center gap-2 hover:text-indigo-600 transition-colors py-1"
                >
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>+91 91000 94484</span>
                </a>
              </div>
            </div>
          </div>

          {/* Secure Transaction Guarantee Box */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-3">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              Secure Purchases Assured
            </h4>
            <p className="text-xs text-indigo-900/80 leading-relaxed">
              All transactions on the IBHAZON platform are routed through encrypted gateways in compliance with international data security standards.
            </p>
            <button 
              onClick={onBack}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all mt-2 cursor-pointer"
            >
              Acknowledge & Return
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
