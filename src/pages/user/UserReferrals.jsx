import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Share2,
  Copy,
  Check,
  Lock,
  Sparkles,
  Users,
  UserCheck,
  UserX,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export const UserReferrals = () => {
  const { user, isActive } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const res = await api.user.getReferrals();
      if (res.success) {
        setReferralData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const referralCode = user?.referralCode || user?.userId || 'OL667275';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-9 w-9 rounded-full border-4 border-blue-600 border-t-transparent shadow-md"
        />
      </div>
    );
  }

  const referralCommissionTiers = [
    { level: 'Level 1 (Direct)', rate: '3.0%', desc: 'Immediate direct members' },
    { level: 'Level 2', rate: '2.5%', desc: 'Invited by your Level 1' },
    { level: 'Level 3', rate: '1.5%', desc: 'Tier 3 network partners' },
    { level: 'Level 4', rate: '1.0%', desc: 'Tier 4 network partners' },
    { level: 'Level 5', rate: '0.50%', desc: 'Tier 5 network partners' },
    { level: 'Level 6', rate: '1.0%', desc: 'Executive network tier' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Share2 className="w-6 h-6 text-blue-600" />
          <span>NEXORA Six-Level Referral Program</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Share your referral link with colleagues and community members. Only active accounts with a purchased subscription can invite partners and receive multi-tier network commissions.
        </p>
      </motion.div>

      {/* STATE 1: USER IS INACTIVE -> LOCKED VIEW */}
      {!isActive ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="white-card rounded-2xl p-8 sm:p-12 text-center shadow-sm space-y-4 max-w-2xl mx-auto border-amber-200 bg-amber-50/40"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-xs"
          >
            <Lock className="w-8 h-8" />
          </motion.div>

          <h3 className="text-2xl font-bold text-slate-900">Referral Link is Locked 🔒</h3>

          <div className="p-4 rounded-xl bg-white border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto shadow-xs">
            <p className="font-bold">
              Bina active account ke aap kisi ko refer nahi kar sakte.
            </p>
            <p className="text-slate-600 mt-1">
              Your account is currently in <em>Inactive</em> status. Purchase any subscription plan to activate your account and instantly reveal your personal referral link and unlock 6-level network rewards.
            </p>
          </div>

          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Purchase Subscription & Unlock Referral Link</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* STATE 2: USER IS ACTIVE -> UNLOCKED VIEW */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Link Card */}
          <motion.div variants={itemVariants} className="white-card rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>6-Level Referral Program Active</span>
              </span>
              <span className="text-xs text-slate-500">
                Your Code: <strong className="text-blue-600 font-mono">{referralCode}</strong>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Your Personal Invitation Link</h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Anyone registering with your link will automatically be recorded as your Level 1 partner, unlocking 6 levels of team commission!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between font-mono text-xs text-slate-800 overflow-hidden">
                <span className="truncate mr-2 font-medium">{referralLink}</span>
                <span className="shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                  {referralCode}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyLink}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 6-Level Commission Structure Cards */}
          <motion.div variants={itemVariants} className="white-card rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Multi-Level Network Commission Breakdown</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {referralCommissionTiers.map((tier, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center transition"
                >
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    {tier.level}
                  </span>
                  <span className="text-xl font-extrabold text-emerald-600 font-mono block">
                    {tier.rate}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Commission</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Referral Statistics */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl white-card-hover">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Downline Members
                </span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
                {referralData?.stats?.total || 0}
              </h3>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl white-card-hover">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Team Members
                </span>
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">
                {referralData?.stats?.active || 0}
              </h3>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl white-card-hover">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Inactive Members
                </span>
                <UserX className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-2">
                {referralData?.stats?.inactive || 0}
              </h3>
            </motion.div>
          </motion.div>

          {/* Invited Users List */}
          <motion.div variants={itemVariants} className="white-card rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Referred Partners Roster</span>
              </h3>
            </div>

            {(!referralData?.referrals || referralData.referrals.length === 0) ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                You have not referred any partners yet. Copy your link above and share it with your network!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Partner Name</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Active Plan</th>
                      <th className="py-3.5 px-4 text-right">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {referralData.referrals.map((refUser) => (
                      <tr key={refUser._id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{refUser.name}</div>
                          <div className="text-slate-500 text-[11px]">{refUser.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          {refUser.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              INACTIVE
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-800">
                          {refUser.purchasedPackage?.name ? (
                            <span className="text-blue-600 font-bold">
                              {refUser.purchasedPackage.name} (${refUser.purchasedPackage.price} USDT)
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">No package purchased</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-500">
                          {new Date(refUser.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
