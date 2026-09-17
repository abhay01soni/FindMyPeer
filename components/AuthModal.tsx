'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Terminal, 
  User, 
  Briefcase, 
  Loader2, 
  RefreshCw,
  Database
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    signInWithMagicLink, 
    verifyOtp, 
    isConfigured 
  } = useAuth();

  const [step, setStep] = useState<'email' | 'otp_sent'>('email');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'client' | 'expert'>('client');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Reset state on modal open/close
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep('email');
      setOtpCode('');
      setErrorMessage(null);
      setSuccessMessage(null);
      setLoading(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error, success } = await signInWithMagicLink(email.trim().toLowerCase(), role);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (success) {
      setStep('otp_sent');
      setResendCooldown(60);
      setSuccessMessage('Magic link sent! Check your inbox or enter code.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length < 6) {
      setErrorMessage('Please enter the 6-digit code sent to your email.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error, success } = await verifyOtp(email.trim().toLowerCase(), otpCode.trim());
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (success) {
      closeAuthModal();
    }
  };

  const handleDemoInstantLogin = async () => {
    setLoading(true);
    await verifyOtp(email || 'demo.builder@findmypeer.io', '123456');
    setLoading(false);
    closeAuthModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-dark-900 border border-dark-700 rounded-xl shadow-2xl overflow-hidden z-10 font-sans"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-950 border-b border-dark-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-coral-500/80 inline-block"></span>
              <span className="text-techGray-400">auth_daemon:</span>
              <span className="text-coral-400 font-bold">
                {step === 'email' ? 'init_magiclink' : 'verify_token'}
              </span>
            </div>
            
            <button
              onClick={closeAuthModal}
              className="text-techGray-400 hover:text-white p-1 rounded-md hover:bg-dark-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Supabase Status Banner */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-dark-850 border border-dark-800 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-techGray-300">DATA STORE:</span>
                <span className="text-emerald-400 font-semibold">
                  {isConfigured ? 'SUPABASE_LIVE' : 'SANDBOX_DEMO'}
                </span>
              </div>
              <span className="text-techGray-500">AUTH: MAGICLINK/OTP</span>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2.5 text-red-400 text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* STEP 1: Request Magic Link */}
            {step === 'email' ? (
              <form onSubmit={handleSendLink} className="space-y-5">
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                    Sign in to <span className="text-coral-500 font-mono">FindMyPeer_</span>
                  </h3>
                  <p className="text-techGray-300 text-xs sm:text-sm">
                    Enter your email to receive a passwordless magic login link & one-time passcode.
                  </p>
                </div>

                {/* Account Type / Role Selection */}
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-techGray-300">LOGIN AS ROLE</label>
                  <div className="grid grid-cols-2 gap-2 bg-dark-850 p-1 rounded-lg border border-dark-750">
                    <button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all ${
                        role === 'client'
                          ? 'bg-coral-500 text-dark-950 font-bold shadow'
                          : 'text-techGray-400 hover:text-white hover:bg-dark-800'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Client / Peer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('expert')}
                      className={`py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all ${
                        role === 'expert'
                          ? 'bg-coral-500 text-dark-950 font-bold shadow'
                          : 'text-techGray-400 hover:text-white hover:bg-dark-800'
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Verified Expert</span>
                    </button>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-techGray-300">
                    EMAIL ADDRESS <span className="text-coral-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none placeholder-dark-600 transition-colors"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-dark-950 font-mono font-bold py-3.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-coral-500/10 active:scale-[0.99] cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING_MAGIC_LINK...</span>
                    </>
                  ) : (
                    <>
                      <span>&gt; send_magic_link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {!isConfigured && (
                  <div className="pt-2 border-t border-dark-800">
                    <button
                      type="button"
                      onClick={handleDemoInstantLogin}
                      className="w-full bg-dark-800 hover:bg-dark-750 border border-dark-700 text-techGray-300 hover:text-white font-mono text-xs py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-coral-400" />
                      <span>Instant Sandbox Sign In (No Supabase keys needed)</span>
                    </button>
                  </div>
                )}
              </form>
            ) : (
              /* STEP 2: Magic Link Sent & OTP Input */
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">
                      Check your email
                    </h3>
                    <p className="text-techGray-300 text-xs sm:text-sm mt-1">
                      We sent a secure magic login link to:
                    </p>
                    <div className="inline-block mt-1 font-mono text-xs text-coral-400 bg-dark-850 px-3 py-1 rounded border border-dark-800">
                      {email}
                    </div>
                  </div>
                </div>

                {/* OTP Verification Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-xs text-techGray-300">
                        OR ENTER 6-DIGIT CODE
                      </label>
                      <span className="text-[11px] text-techGray-500 font-mono">FROM EMAIL</span>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-techGray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full bg-dark-850 border border-dark-700 focus:border-coral-500 text-white rounded-lg pl-10 pr-4 py-3 text-sm font-mono tracking-widest text-center focus:outline-none placeholder-dark-600 transition-colors"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 6}
                    className="w-full bg-coral-500 hover:bg-coral-600 disabled:opacity-40 text-dark-950 font-mono font-bold py-3.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-coral-500/10 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>VERIFYING_CODE...</span>
                      </>
                    ) : (
                      <>
                        <span>&gt; verify_and_sign_in</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Resend & Back options */}
                <div className="flex items-center justify-between pt-2 border-t border-dark-800 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-techGray-400 hover:text-white transition-colors"
                  >
                    &lt; change_email
                  </button>

                  <button
                    type="button"
                    disabled={resendCooldown > 0 || loading}
                    onClick={handleSendLink}
                    className="text-coral-400 hover:text-coral-300 disabled:text-techGray-600 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>
                      {resendCooldown > 0 ? `resend in ${resendCooldown}s` : 'resend_link'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Notice */}
            <div className="text-center font-mono text-[11px] text-techGray-500">
              SECURED VIA SUPABASE AUTH & ROW LEVEL ENCRYPTION
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
