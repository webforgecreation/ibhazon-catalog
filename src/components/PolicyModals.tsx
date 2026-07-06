import React from 'react';
import { X, Shield, RefreshCw, FileText } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'refund' | 'terms' | 'shipment' | null;
  onClose: () => void;
}

export default function PolicyModals({ isOpen, type, onClose }: PolicyModalProps) {
  if (!isOpen || !type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      updated: "Last updated: July 2, 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          body: "IBHAFINTECH PVT LTD (\"we\", \"us\", or \"our\") operates IBHAZON. We collect personal information you provide directly to us when purchasing, creating an account, or communicating with customer support. This includes name, billing address, shipping address, email address, telephone number, and payment credentials processed securely via our encrypted gateways."
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
      title: "Refund & Cancellation Policy",
      icon: <RefreshCw className="w-6 h-6 text-amber-600" />,
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
      title: "Terms & Conditions",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      updated: "Last updated: July 2, 2026",
      sections: [
        {
          heading: "1. Conditions of Use",
          body: "By accessing and placing orders on IBHAZON, you agree to be bound by these corporate terms of service. You certify that you are at least 18 years of age or possess legal guardian approval to transact on this platform."
        },
        {
          heading: "2. Intellectual Property Rights",
          body: "All web styles, catalog lists, custom codebases, vector illustrations, and graphic assets are the exclusive intellectual properties of IBHAFINTECH PVT LTD. Unauthorized duplication or framing of these materials is strictly prohibited."
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
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {content.icon}
            <div>
              <h2 className="text-xl font-display font-semibold text-slate-950">{content.title}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{content.updated}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            Welcome to <strong>IBHAZON</strong>, a high-quality online consumer portal proudly operated and managed by <strong>IBHAFINTECH PVT LTD</strong>. Please read this documentation carefully to understand our corporate legal frameworks.
          </p>

          {content.sections.map((sec, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">{sec.heading}</h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                {sec.body}
              </p>
            </div>
          ))}

          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
            <h4 className="text-xs font-semibold text-indigo-900 uppercase">Support & Corporate Contact</h4>
            <p className="text-xs text-indigo-900/80 leading-relaxed">
              For administrative inquiries, policy disputes, or secure purchase assistance, please reach our dedicated helpline at <strong>+91 91000 94484</strong> or write to <strong>ibhafintech@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
