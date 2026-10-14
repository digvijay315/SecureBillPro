import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post("api/auth/login", { email, password });
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        onLoginSuccess(user);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#151D1A] via-[#1E2724] to-[#0E1412] items-center justify-center">
        {/* Abstract shapes & glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-25 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#BA8551]/20 blur-[130px]"></div>
          <div className="absolute top-[60%] left-[50%] w-[50%] h-[50%] rounded-full bg-[#BA8551]/15 blur-[110px]"></div>
        </div>
        
        <div className="relative z-10 p-12 text-center text-[#ffffff] max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/5 p-2 rounded-3xl backdrop-blur-md inline-block mb-8 shadow-2xl border border-white/10">
              <img src="/secure_bill_pro_logo.jpg" alt="Secure Bill Pro Logo" className="w-24 h-24 rounded-2xl object-cover" />
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight font-display text-white !text-white" style={{ color: '#ffffff' }}>
              Secure Bill Pro
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#BA8551] font-bold mb-4">Staff Operations Desk</p>
            <p className="text-lg text-white/80 leading-relaxed font-light">
              High-speed billing, KOT routing, digital room bookings, and operational efficiency for modern hoteliers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden mx-auto mb-6 flex flex-col items-center justify-center">
              <img src="/secure_bill_pro_logo.jpg" alt="Secure Bill Pro Logo" className="w-20 h-20 shadow-2xl rounded-2xl object-cover mb-3" />
              <h1 className="text-2xl font-bold font-display text-[#151D1A]">Secure Bill Pro</h1>
            </div>
            <h2 className="text-3xl font-display font-bold text-[#151D1A] tracking-tight">Staff Sign In</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Access your shift orders, KOT & booking desks</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex border border-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Staff Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#BA8551] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl text-sm shadow-sm focus:outline-none focus:border-[#BA8551] focus:ring-1 focus:ring-[#BA8551] transition-all placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@hotel.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#BA8551] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-gray-800 rounded-xl text-sm shadow-sm focus:outline-none focus:border-[#BA8551] focus:ring-1 focus:ring-[#BA8551] transition-all placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#151D1A] hover:bg-[#2A3430] focus:outline-none shadow-lg shadow-black/20 active:scale-95 transition-all overflow-hidden disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center gap-2 text-white !text-white" style={{ color: '#ffffff' }}>
                  {loading ? "Signing in..." : "Access Operations Desk"} 
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
