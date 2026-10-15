import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  User, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  MapPin, 
  FileText, 
  CreditCard, 
  Upload, 
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Globe,
  Clock
} from 'lucide-react';
import api from '../../api';

const HOTEL_TYPES = ['Hotel', 'Resort', 'Guest house', 'Restaurant only'];
const STAR_RATINGS = ['1-Star', '2-Star', '3-Star', '4-Star', '5-Star', 'Luxury'];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Hotel Primary Information (Hotel Model)
    hotelName: '',
    hotelEmail: '',
    hotelContact: '',
    hotelType: 'Hotel',
    starRating: '3-Star',

    // Address Details (Hotel Model)
    hotelAddress: '',
    hotelCity: '',
    hotelState: 'Delhi',
    hotelPincode: '',

    // Legal & Tax Compliance (Hotel Model)
    gstin: '',
    panNumber: '',
    fssaiNumber: '',
    tradeLicenseNumber: '',

    // Timings & Operations (Hotel Model)
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',

    // Admin / Owner Details (User Model)
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminMobile: '',
    adminAge: '30',
    adminAddress: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState('hotel'); // 'hotel' | 'legal' | 'admin'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let logoUrl = '';
    try {
      if (logoFile) {
        const uploadData = new FormData();
        uploadData.append('files', logoFile);
        const uploadRes = await api.post('/api/upload/public-upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          showLoader: false,
        });
        if (uploadRes.data?.success && uploadRes.data?.urls?.length > 0) {
          logoUrl = uploadRes.data.urls[0];
        }
      }

      // Payload aligned with backend/models/Hotel and backend/models/User
      const payload = {
        // Hotel model
        hotelName: formData.hotelName.trim(),
        hotelEmail: formData.hotelEmail.trim().toLowerCase(),
        hotelPhone: formData.hotelContact.trim(),
        hotelAddress: formData.hotelAddress.trim(),
        hotelCity: formData.hotelCity.trim(),
        hotelState: formData.hotelState,
        hotelPincode: formData.hotelPincode.trim(),
        hotelType: formData.hotelType,
        hotelLogo: logoUrl,
        gstin: formData.gstin.trim(),
        panNumber: formData.panNumber.trim(),
        fssaiNumber: formData.fssaiNumber.trim(),
        tradeLicenseNumber: formData.tradeLicenseNumber.trim(),
        starRating: formData.starRating,
        checkInTime: formData.checkInTime || '12:00 PM',
        checkOutTime: formData.checkOutTime || '11:00 AM',

        // Admin User model
        adminName: formData.adminName.trim(),
        adminEmail: formData.adminEmail.trim().toLowerCase(),
        adminPassword: formData.adminPassword,
        adminMobile: formData.adminMobile.trim(),
        adminAge: Number(formData.adminAge) || 30,
        adminAddress: formData.adminAddress.trim() || formData.hotelAddress.trim() || formData.hotelCity.trim(),
      };

      const response = await api.post('/api/auth/register-hotel', payload);

      if (response.data.success) {
        setSuccessData({
          email: response.data.adminUser?.email || response.data.user?.email || formData.adminEmail,
          hotelName: response.data.hotel?.name || formData.hotelName,
          city: response.data.hotel?.city || formData.hotelCity,
          type: response.data.hotel?.type || formData.hotelType,
        });
      } else {
        setError(response.data.message || 'Failed to onboard hotel.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register hotel. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl surface-ink border border-border/20 shadow-luxe overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-border/20 flex items-center justify-between sticky top-0 surface-ink z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold bg-gold/5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-gold leading-tight">Hotel Onboarding</h2>
                  <p className="text-ink-foreground/70 text-[0.75rem] tracking-wide mt-0.5">
                    Register your property & create your Master Admin Account
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                type="button"
                className="p-2 hover:bg-white/5 transition-colors border border-transparent hover:border-border/30"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-ink-foreground/60 hover:text-gold" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--gold) transparent' }}>
              {successData ? (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 bg-gold/10 text-gold border border-gold flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl text-ink-foreground mb-2">Onboarding Successful!</h3>
                  <p className="text-ink-foreground/80 mb-6 text-sm">
                    Welcome to Secure Bill Pro, <span className="font-semibold text-gold">{successData.hotelName}</span> ({successData.city}).
                  </p>
                  
                  <div className="bg-background/40 border border-border/20 p-5 mb-8 max-w-lg mx-auto text-left shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" /> Save Master Login Credentials
                    </div>
                    <div>
                      <label className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Admin Login Email</label>
                      <div className="font-mono text-xs sm:text-sm text-gold mt-1 bg-background px-3 py-2 border border-border/30 flex items-center justify-between">
                        <span>{successData.email}</span>
                        <button 
                          type="button" 
                          onClick={() => copyToClipboard(successData.email)} 
                          className="text-[0.65rem] uppercase tracking-wider text-muted-foreground hover:text-gold"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Password</label>
                      <div className="font-mono text-xs sm:text-sm text-gold mt-1 bg-background px-3 py-2 border border-border/30">
                        •••••••• (Password configured during registration)
                      </div>
                    </div>
                    <p className="text-[0.72rem] text-ink-foreground/60 pt-2 border-t border-border/15">
                      Hotel admin can now login to manage billing, rooms, inventory, and staff permissions.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button 
                      type="button"
                      onClick={() => window.location.href = "https://admin.securebillpro.com"}
                      className="px-8 py-3 bg-gold text-ink text-[0.7rem] uppercase tracking-[0.22em] font-semibold transition-opacity hover:opacity-90 shadow-sm"
                    >
                      Login to Hotel Admin Panel
                    </button>
                    <button 
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-border/40 text-ink-foreground text-[0.7rem] uppercase tracking-[0.22em] hover:border-gold hover:text-gold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                      <span className="font-bold">Error:</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Section Navigation Tabs */}
                  <div className="flex border-b border-border/20 gap-2 sm:gap-4 overflow-x-auto pb-1">
                    {[
                      { id: 'hotel', label: '1. Hotel Profile', icon: Building2 },
                      { id: 'legal', label: '2. Legal & Operations', icon: FileText },
                      { id: 'admin', label: '3. Admin Account', icon: User },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeSection === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveSection(tab.id)}
                          className={`flex items-center gap-2 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] whitespace-nowrap transition-colors border-b-2 -mb-1 ${
                            isActive
                              ? 'border-gold text-gold font-semibold'
                              : 'border-transparent text-ink-foreground/60 hover:text-ink-foreground'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* SECTION 1: HOTEL PROFILE */}
                  {activeSection === 'hotel' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-medium">
                          Property Details
                        </span>
                        <span className="text-[0.65rem] text-ink-foreground/50">Required fields marked with *</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Hotel / Property Name *
                          </label>
                          <input 
                            name="hotelName" 
                            value={formData.hotelName}
                            placeholder="e.g. Grand Portico Hotel & Suites" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Hotel Email *
                          </label>
                          <input 
                            name="hotelEmail" 
                            type="email" 
                            value={formData.hotelEmail}
                            placeholder="reservations@hotel.com" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Contact Phone Number *
                          </label>
                          <input 
                            name="hotelContact" 
                            value={formData.hotelContact}
                            placeholder="+91 9876543210" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                              Property Type *
                            </label>
                            <select
                              name="hotelType"
                              value={formData.hotelType}
                              onChange={handleInputChange}
                              className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3 py-2.5 text-sm outline-none focus:border-gold"
                            >
                              {HOTEL_TYPES.map((t) => (
                                <option key={t} value={t} className="bg-white text-slate-900">{t}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                              Star Rating
                            </label>
                            <select
                              name="starRating"
                              value={formData.starRating}
                              onChange={handleInputChange}
                              className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3 py-2.5 text-sm outline-none focus:border-gold"
                            >
                              {STAR_RATINGS.map((r) => (
                                <option key={r} value={r} className="bg-white text-slate-900">{r}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Full Street Address *
                          </label>
                          <input 
                            name="hotelAddress" 
                            value={formData.hotelAddress}
                            placeholder="Plot / Street / Area, Landmark" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            City *
                          </label>
                          <input 
                            name="hotelCity" 
                            value={formData.hotelCity}
                            placeholder="e.g. New Delhi, Mumbai, Jaipur" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                              State
                            </label>
                            <select
                              name="hotelState"
                              value={formData.hotelState}
                              onChange={handleInputChange}
                              className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3 py-2.5 text-sm outline-none focus:border-gold"
                            >
                              {INDIAN_STATES.map((s) => (
                                <option key={s} value={s} className="bg-white text-slate-900">{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                              Pincode
                            </label>
                            <input 
                              name="hotelPincode" 
                              value={formData.hotelPincode}
                              placeholder="110001" 
                              onChange={handleInputChange} 
                              className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                            />
                          </div>
                        </div>

                        {/* Hotel Logo */}
                        <div className="md:col-span-2 pt-2 border-t border-border/15">
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                            Hotel Brand Logo (Optional)
                          </label>
                          <div className="flex items-center gap-4">
                            {logoPreview && (
                              <img 
                                src={logoPreview} 
                                alt="Logo preview" 
                                className="w-14 h-14 object-cover border border-gold/40 shadow-sm"
                              />
                            )}
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleFileChange} 
                              className="w-full bg-background border border-input px-3 py-2 text-xs text-ink-foreground outline-none focus:border-gold file:mr-3 file:py-1.5 file:px-3 file:border file:border-gold/30 file:text-[0.65rem] file:uppercase file:tracking-widest file:bg-transparent file:text-gold hover:file:bg-gold/10 transition-colors" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-3">
                        <button
                          type="button"
                          onClick={() => setActiveSection('legal')}
                          className="px-6 py-2.5 bg-gold/10 border border-gold text-gold text-[0.7rem] uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-ink transition-colors"
                        >
                          Next: Legal & Operations →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* SECTION 2: LEGAL & OPERATIONS */}
                  {activeSection === 'legal' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-medium">
                          Compliance & Invoicing Setup (Optional / Can be edited later)
                        </span>
                        <span className="text-[0.65rem] text-ink-foreground/50">Backend Model: Hotel</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            GSTIN (GST Number)
                          </label>
                          <input 
                            name="gstin" 
                            value={formData.gstin}
                            placeholder="e.g. 07AAAAA0000A1Z5" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm uppercase outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            PAN Number
                          </label>
                          <input 
                            name="panNumber" 
                            value={formData.panNumber}
                            placeholder="e.g. ABCDE1234F" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm uppercase outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            FSSAI License Number
                          </label>
                          <input 
                            name="fssaiNumber" 
                            value={formData.fssaiNumber}
                            placeholder="14-digit FSSAI Number" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Trade License / Municipal Reg.
                          </label>
                          <input 
                            name="tradeLicenseNumber" 
                            value={formData.tradeLicenseNumber}
                            placeholder="e.g. TL-2026-9812" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Standard Check-In Time
                          </label>
                          <input 
                            name="checkInTime" 
                            value={formData.checkInTime}
                            placeholder="12:00 PM" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Standard Check-Out Time
                          </label>
                          <input 
                            name="checkOutTime" 
                            value={formData.checkOutTime}
                            placeholder="11:00 AM" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-3">
                        <button
                          type="button"
                          onClick={() => setActiveSection('hotel')}
                          className="px-5 py-2.5 border border-border/30 text-ink-foreground text-[0.7rem] uppercase tracking-[0.2em] hover:text-gold transition-colors"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSection('admin')}
                          className="px-6 py-2.5 bg-gold/10 border border-gold text-gold text-[0.7rem] uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-ink transition-colors"
                        >
                          Next: Admin Account →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* SECTION 3: ADMIN ACCOUNT */}
                  {activeSection === 'admin' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-medium">
                          Hotel Master Administrator (Role: hotel_admin)
                        </span>
                        <span className="text-[0.65rem] text-ink-foreground/50">Required for portal login</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Administrator Full Name *
                          </label>
                          <input 
                            name="adminName" 
                            value={formData.adminName}
                            placeholder="e.g. Rahul Sharma" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Admin Login Email *
                          </label>
                          <input 
                            name="adminEmail" 
                            type="email" 
                            value={formData.adminEmail}
                            placeholder="admin@hotel.com" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Admin Login Password *
                          </label>
                          <div className="relative w-full">
                            <input 
                              name="adminPassword" 
                              type={showPassword ? "text" : "password"} 
                              value={formData.adminPassword}
                              placeholder="Create strong password" 
                              required 
                              onChange={handleInputChange} 
                              className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input pl-3.5 pr-11 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gold transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Admin Mobile Number *
                          </label>
                          <input 
                            name="adminMobile" 
                            value={formData.adminMobile}
                            placeholder="+91 9876543210" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Admin Age *
                          </label>
                          <input 
                            name="adminAge" 
                            type="number" 
                            min="18" 
                            max="99" 
                            value={formData.adminAge}
                            placeholder="30" 
                            required 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>

                        <div>
                          <label className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
                            Admin Address / Location
                          </label>
                          <input 
                            name="adminAddress" 
                            value={formData.adminAddress}
                            placeholder="Optional (Defaults to hotel address)" 
                            onChange={handleInputChange} 
                            className="w-full register-modal-input bg-white text-slate-900 font-medium border border-input px-3.5 py-2.5 text-sm outline-none focus:border-gold placeholder:text-slate-400" 
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-3">
                        <button
                          type="button"
                          onClick={() => setActiveSection('legal')}
                          className="px-5 py-2.5 border border-border/30 text-ink-foreground text-[0.7rem] uppercase tracking-[0.2em] hover:text-gold transition-colors"
                        >
                          ← Back
                        </button>
                        <span className="text-[0.65rem] text-gold/80 italic self-center">
                          Ready to onboard your hotel
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submission Sticky Action Bar */}
                  <div className="pt-5 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[0.68rem] text-ink-foreground/60 text-center sm:text-left">
                      By submitting, you agree to create a dedicated property instance on Secure Bill Pro.
                    </p>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full sm:w-auto px-9 py-3.5 bg-gold text-ink text-[0.7rem] uppercase tracking-[0.22em] font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-luxe"
                    >
                      {loading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                          <span>Onboarding Property...</span>
                        </>
                      ) : (
                        'Complete Hotel Onboarding'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
