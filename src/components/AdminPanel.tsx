import React, { useState } from 'react';
import { Settings, Image, Check, AlertCircle, Copy, FileCode, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { saveProductImageOverride, saveProductNameOverride, clearProductImageOverrides } from '../data/products';

interface AdminPanelProps {
  products: Product[];
  onRefreshProducts: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ products, onRefreshProducts, isOpen, onClose }: AdminPanelProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [newProductName, setNewProductName] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedCatalog, setCopiedCatalog] = useState(false);
  const [copiedOverrides, setCopiedOverrides] = useState(false);
  const [copiedNameOverrides, setCopiedNameOverrides] = useState(false);
  const [copiedImagesSkeleton, setCopiedImagesSkeleton] = useState(false);
  const [copiedNamesSkeleton, setCopiedNamesSkeleton] = useState(false);

  if (!isOpen) return null;

  const handleSaveOverride = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedProductId) {
      setErrorMsg('Please select a product from the list.');
      return;
    }

    const trimmedName = newProductName.trim();
    const trimmedImage = newImageUrl.trim();

    if (!trimmedName && !trimmedImage) {
      setErrorMsg('Please enter either a product name or an image URL.');
      return;
    }

    if (trimmedImage && !trimmedImage.startsWith('http://') && !trimmedImage.startsWith('https://')) {
      setErrorMsg('Image URL must start with http:// or https://');
      return;
    }

    const successParts: string[] = [];

    // Save image
    if (trimmedImage) {
      saveProductImageOverride(selectedProductId, trimmedImage);
      successParts.push('Image URL');
    }

    // Save name
    if (trimmedName) {
      saveProductNameOverride(selectedProductId, trimmedName);
      successParts.push('Product name');
    }

    onRefreshProducts();
    setSuccessMsg(`${successParts.join(' and ')} successfully updated! Changes are applied instantly.`);
    
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore all 190 products to their default names and images?')) {
      clearProductImageOverrides();
      onRefreshProducts();
      setSelectedProductId('');
      setNewImageUrl('');
      setNewProductName('');
      setSuccessMsg('All custom product images and names have been reset to defaults.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleCopyFullJSON = () => {
    // Compile current products array to a beautiful raw text block
    const minimalData = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      description: p.description,
      specs: p.specs
    }));
    navigator.clipboard.writeText(JSON.stringify(minimalData, null, 2));
    setCopiedCatalog(true);
    setTimeout(() => setCopiedCatalog(false), 2000);
  };

  const handleCopyOverridesJSON = () => {
    try {
      const data = localStorage.getItem("ibhazon_image_overrides") || "{}";
      navigator.clipboard.writeText(data);
      setCopiedOverrides(true);
      setTimeout(() => setCopiedOverrides(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyNameOverridesJSON = () => {
    try {
      const data = localStorage.getItem("ibhazon_name_overrides") || "{}";
      navigator.clipboard.writeText(data);
      setCopiedNameOverrides(true);
      setTimeout(() => setCopiedNameOverrides(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyImagesSkeleton = () => {
    try {
      const skeleton: Record<string, string> = {};
      products.forEach(p => {
        skeleton[p.id] = p.image;
      });
      navigator.clipboard.writeText(JSON.stringify(skeleton, null, 2));
      setCopiedImagesSkeleton(true);
      setTimeout(() => setCopiedImagesSkeleton(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyNamesSkeleton = () => {
    try {
      const skeleton: Record<string, string> = {};
      products.forEach(p => {
        skeleton[p.id] = p.name;
      });
      navigator.clipboard.writeText(JSON.stringify(skeleton, null, 2));
      setCopiedNamesSkeleton(true);
      setTimeout(() => setCopiedNamesSkeleton(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const selectedProductObj = products.find(p => p.id === selectedProductId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-950 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-indigo-400 animate-spin-slow" />
            <div>
              <h2 className="text-lg font-display font-bold tracking-tight">IBHAZON Developer Console</h2>
              <p className="text-xs text-slate-400">Manage 190 Product Images & Export Code</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Instructions Box */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2.5">
            <h3 className="text-sm font-semibold text-indigo-950 flex items-center gap-2">
              <Image className="w-4 h-4 text-indigo-600" />
              How to Add Custom Product Images:
            </h3>
            <ol className="text-xs text-indigo-900/90 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>Open any web browser (Google Chrome, Bing, etc.).</li>
              <li>Search for your product image (e.g. search "Pressure Cooker" on Google Images or Unsplash).</li>
              <li>Right-click on the image and choose <strong>"Copy image address"</strong> (or link).</li>
              <li>Use the selector tool below, paste the URL, and click <strong>"Apply Image Override"</strong>.</li>
              <li>Alternatively, you can click on the <strong>Edit Image</strong> button directly on any product card in the main shop!</li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveOverride} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">1. Select Product to Modify</label>
              <select 
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  const p = products.find(prod => prod.id === e.target.value);
                  setNewImageUrl(p ? p.image : '');
                  setNewProductName(p ? p.name : '');
                }}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
              >
                <option value="">-- Choose from 190 items --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.name} - ₹{p.price}
                  </option>
                ))}
              </select>
            </div>

            {selectedProductObj && (
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                <img 
                  src={selectedProductObj.image} 
                  alt={selectedProductObj.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594818821915-bc32432617f6?auto=format&fit=crop&w=100&q=80";
                  }}
                />
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">{selectedProductObj.name}</p>
                  <p className="text-slate-500 font-mono mt-0.5 truncate max-w-[280px]">{selectedProductObj.image}</p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">2. Edit Product Name</label>
              <input 
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Enter custom product name"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">3. Paste Copied Browser Image URL</label>
              <textarea 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or any internet image link"
                rows={3}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
              />
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-100 cursor-pointer active:scale-99"
            >
              Apply Override Changes
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <hr className="border-slate-100" />

          {/* GitHub / Deployment Codes */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">GitHub, Vercel & Permanent Customization</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Make your customized names and images permanent on your GitHub repository and Vercel deployment:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopyOverridesJSON}
                  className="p-3 bg-indigo-50/55 hover:bg-indigo-50 border border-indigo-150 rounded-xl text-left transition-all active:scale-98 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <FileCode className="w-4 h-4 text-indigo-600" />
                    {copiedOverrides ? <span className="text-[10px] text-emerald-600 font-semibold uppercase">Copied Map!</span> : <span className="text-[10px] text-indigo-400 font-mono font-bold">IMAGES</span>}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-2">Export Image Overrides</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Copy custom image mappings</p>
                </button>

                <button
                  onClick={handleCopyNameOverridesJSON}
                  className="p-3 bg-violet-50/55 hover:bg-violet-50 border border-violet-150 rounded-xl text-left transition-all active:scale-98 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <FileCode className="w-4 h-4 text-violet-600" />
                    {copiedNameOverrides ? <span className="text-[10px] text-emerald-600 font-semibold uppercase">Copied Names!</span> : <span className="text-[10px] text-violet-400 font-mono font-bold">NAMES</span>}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-2">Export Name Overrides</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Copy custom product names</p>
                </button>
              </div>

              {/* Bulk 190 Products Blank Template Section */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Bulk Customize all 190 Items</h5>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Instead of editing items one-by-one, copy a pre-made JSON list of all 190 product IDs. You can open this list in any text editor, write all your customized product names and paste Google image links, then paste it into your code:
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleCopyImagesSkeleton}
                    className="py-2 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-800 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>190-Image Template</span>
                    {copiedImagesSkeleton ? <span className="text-emerald-600 font-bold">COPIED</span> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyNamesSkeleton}
                    className="py-2 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-800 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>190-Name Template</span>
                    {copiedNamesSkeleton ? <span className="text-emerald-600 font-bold">COPIED</span> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleReset}
                type="button"
                className="w-full p-3 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-xl text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <div>
                    <p className="text-xs font-semibold text-rose-950">Reset All Sandbox Overrides</p>
                    <p className="text-[10px] text-rose-500 mt-0.5">Restore all 190 items to their original default names and image placeholders</p>
                  </div>
                </div>
                <span className="text-[10px] text-rose-500 font-mono uppercase bg-rose-100/50 px-2 py-1 rounded">Reset</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <h5 className="font-semibold text-slate-800">How to Save Permanently:</h5>
            <ol className="text-slate-600 leading-relaxed list-decimal pl-4 space-y-1">
              <li>Click <strong>"Export Image Overrides"</strong> and paste the JSON into <code>PERMANENT_IMAGE_OVERRIDES</code> inside the file <code>src/data/custom_images.ts</code>.</li>
              <li>Click <strong>"Export Name Overrides"</strong> and paste the JSON into <code>PERMANENT_NAME_OVERRIDES</code> in the same file.</li>
              <li>Save and commit your <code>custom_images.ts</code> to Git and push to GitHub/Vercel.</li>
              <li>Your custom names and image links are now 100% permanent on your live web application!</li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
}
