import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Package,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  PartyPopper,
} from 'lucide-react';

export const UserPackages = () => {
  const { user, isActive, updateUserState } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchasingId, setPurchasingId] = useState(null);
  const [activationSuccess, setActivationSuccess] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.user.getPackages();
      if (res.success) {
        setPackages(res.packages);
      }
    } catch (err) {
      setError(err.message || 'Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handlePurchase = async (pkg) => {
    try {
      setPurchasingId(pkg._id);
      const res = await api.user.purchasePackage(pkg._id);
      if (res.success) {
        updateUserState({
          status: 'active',
          purchasedPackage: res.user.purchasedPackage,
        });
        setActivationSuccess(pkg);
      }
    } catch (err) {
      alert(err.message || 'Failed to activate package');
    } finally {
      setPurchasingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3 shadow-xs">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>NEXORA Official Subscription Plans (SRS 5.1)</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Select a Subscription Plan & Activate Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Purchasing any plan automatically changes your status to <strong>ACTIVE</strong>, begins daily income tracking (up to 10%), and unlocks your personal 6-level referral link!
        </p>
      </motion.div>

      {/* Packages Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-9 w-9 rounded-full border-4 border-blue-600 border-t-transparent shadow-md"
          />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-rose-600 text-sm">{error}</div>
      ) : packages.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          No plans available at this moment.
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {packages.map((pkg) => {
            const isCurrentPlan =
              user?.purchasedPackage?.packageId === pkg._id ||
              user?.purchasedPackage?.name === pkg.name;

            return (
              <motion.div
                key={pkg._id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-6 flex flex-col justify-between transition relative ${isCurrentPlan
                    ? 'bg-white border-2 border-emerald-500 shadow-md ring-4 ring-emerald-50'
                    : 'white-card-hover'
                  }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {pkg.badge || 'Active Tier'}
                  </span>
                  {isCurrentPlan && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      Active Plan
                    </span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  <div className="flex items-baseline gap-1 pb-4 mb-4 border-b border-slate-100">
                    <span className="text-3xl font-extrabold text-blue-600">${pkg.price}</span>
                    <span className="text-xs text-slate-500 font-medium">USDT / tier</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Tier Inclusions:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {pkg.features && pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-slate-100 text-emerald-700 text-xs font-bold border border-emerald-200 cursor-default flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Current Active Tier</span>
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePurchase(pkg)}
                      disabled={purchasingId === pkg._id}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>
                        {purchasingId === pkg._id
                          ? 'Activating...'
                          : isActive
                            ? 'Upgrade to this Plan'
                            : 'Purchase & Activate'}
                      </span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ACTIVATION SUCCESS MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {activationSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-8 shadow-2xl text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-sm border border-emerald-200">
                <PartyPopper className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Account Activated! 🎉</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                You have successfully activated <strong>"{activationSuccess.name}"</strong>.
                Your account status is now <strong>ACTIVE</strong> and your 6-level referral link is immediately unlocked for team sharing!
              </p>

              <div className="space-y-2.5">
                <Link
                  to="/referrals"
                  onClick={() => setActivationSuccess(null)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>View My 6-Level Referral Link</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActivationSuccess(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
