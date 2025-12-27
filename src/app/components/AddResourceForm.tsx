import { useState, useRef } from 'react';
import { X, Upload, MapPin, Loader2, BookOpen, Package, DollarSign, Camera, FileText } from 'lucide-react';
import { Resource } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AddResourceFormProps {
  onClose: () => void;
  onSubmit: (resource: Resource) => void;
}

type ListingType = 'notes' | 'physical';

export function AddResourceForm({ onClose, onSubmit }: AddResourceFormProps) {
  const [listingType, setListingType] = useState<ListingType>('notes');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'textbook',
    description: '',
    location: '',
    condition: 'good' as Resource['condition'],
    price: '',
    imageUrl: '',
    subject: '',
    college: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay for "loading" state
    await new Promise(resolve => setTimeout(resolve, 2000));

    onSubmit({
      ...formData,
      id: Date.now().toString(),
      owner: 'You',
      availability: 'available',
      price: formData.price === '' ? 0 : parseFloat(formData.price),
      createdAt: new Date().toISOString(),
      // Ensure required category types match
      category: formData.category as Resource['category'],
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here if actual file upload was implemented
    // For now we just ack the drop
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Placeholder for file handling
    }
  };

  const isFree = formData.price === '' || formData.price === '0';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">List an Item</h2>
              <p className="text-slate-500 text-sm mt-0.5">Share resources with your campus community</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">
            <form id="resource-form" onSubmit={handleSubmit} className="space-y-8">

              {/* Listing Type Toggle */}
              <div className="bg-slate-100 p-1 rounded-xl flex">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${listingType === 'notes'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                  onClick={() => setListingType('notes')}
                >
                  <BookOpen className="w-4 h-4" />
                  Upload Notes
                </button>
                <button
                  type="button"
                  onClick={() => setListingType('physical')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${listingType === 'physical'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <Package className="w-4 h-4" />
                  List Physical Item
                </button>
              </div>

              {/* Upload Zone */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-900">
                  {listingType === 'notes' ? 'Upload Document' : 'Project/Item Photos'}
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${dragActive
                    ? 'border-indigo-500 bg-indigo-50/50'
                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={listingType === 'notes' ? ".pdf,.doc,.docx" : "image/*"}
                  />
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {listingType === 'notes' ? (
                      <Upload className="w-8 h-8 text-indigo-600" />
                    ) : (
                      <Camera className="w-8 h-8 text-indigo-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {listingType === 'notes' ? 'Click to upload or drag and drop' : 'Add photos of your item'}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {listingType === 'notes' ? 'PDF, DOCX up to 10MB' : 'PNG, JPG supported'}
                  </p>
                </div>
              </div>

              {/* Core Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Item Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Engineering Mechanics - Statics (14th Ed)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Category</label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                    >
                      <option value="textbook">Textbook</option>
                      <option value="electronics">Electronics</option>
                      <option value="supplies">Supplies</option>
                      <option value="notes">Class Notes</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as Resource['condition'] })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                  >
                    <option value="like-new">Brand New / Like New</option>
                    <option value="good">Good Condition</option>
                    <option value="fair">Fair (Usable)</option>
                    <option value="used">Heavily Used</option>
                  </select>
                </div>
              </div>

              {/* Smart Pricing */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Set Price
                  </label>
                  {isFree && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase tracking-wide">
                      Free Item
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none font-medium text-lg"
                  />
                </div>
                <p className="text-xs text-slate-500">Enter 0 to mark as free. Suggested price for used items is 40-60% of original.</p>
              </div>

              {/* Context Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Subject / Dept</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">College (Optional)</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. JNTUH"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Safety Field - Conditional */}
              {listingType === 'physical' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    Preferred Meeting Point
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required={listingType === 'physical'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                  >
                    <option value="">Select a safe location...</option>
                    <option value="library">Main Library Entrance</option>
                    <option value="canteen">College Canteen</option>
                    <option value="admin">Admin Block</option>
                    <option value="security">Main Security Gate</option>
                    <option value="dorm">Student Dorm Lobby</option>
                  </select>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 bg-white z-10 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-xs text-slate-400 hidden sm:block">
              By publishing, you agree to our <a href="#" className="text-indigo-600 underline">Community Guidelines</a>.
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="resource-form"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Publish Item'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
