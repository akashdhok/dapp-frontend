import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useAuth } from '../../context/AuthContext';
import { api, getAssetUrl } from '../../services/api';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Package,
  Share2,
  CheckSquare,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
  Target,
  Users,
} from 'lucide-react';

export const UserDashboard = () => {
  const { user, isActive } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const walletRef = useRef(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.user.getDashboard();
      if (res.success) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // GSAP animation for wallet balance
  useEffect(() => {
    if (!loading && walletRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 40.0,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (walletRef.current) {
            walletRef.current.innerText = `$${obj.val.toFixed(2)}`;
          }
        },
      });
    }
  }, [loading]);

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

  const { stats, recentSubmissions } = dashboardData || {
    stats: {},
    recentSubmissions: [],
  };

  const planPrice = user?.purchasedPackage?.price || 0;
  const target3X = planPrice * 3;
  const totalEarned = (stats.approvedSubmissions || 0) * 35;
  const progressPercent = target3X > 0 ? Math.min(100, Math.round((totalEarned / target3X) * 100)) : 0;

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="white-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-sm"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-500">Welcome,</span>
            <strong className="text-slate-900 text-sm">{user?.name || 'Gaurang Patel'}</strong>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {user?.userId || user?.referralCode || 'OL667275'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>NEXORA Member Dashboard</span>
            {isActive ? (
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ACTIVE
              </motion.span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                INACTIVE
              </span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
            {isActive
              ? 'Your subscription is active. Complete daily tasks, manage your 6-level referral earnings, and track your 3X milestone progress.'
              : 'Your account is currently inactive. Select any subscription plan from $100 to activate your account and unlock your referral link!'}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          {!isActive ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/packages"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Purchase Plan & Activate</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/tasks"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Complete Daily Tasks</span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* 4-Card Wallet & Metric Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wallet Balance Card */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-5 rounded-2xl white-card-hover flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fund Wallet</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 ref={walletRef} className="text-3xl font-extrabold text-blue-600">
              $40.00
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Available USDT Balance</span>
          </div>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-5 rounded-2xl white-card-hover flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Plan</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-slate-900 truncate">
              {user?.purchasedPackage?.name || 'No Plan Active'}
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {user?.purchasedPackage?.price ? `$${user.purchasedPackage.price} Subscription` : 'Buy plan to activate'}
            </span>
          </div>
        </motion.div>

        {/* 6-Level Team Total */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-5 rounded-2xl white-card-hover flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">6-Level Network</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalReferrals || 0}</h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {stats.activeReferrals || 0} Active Downline Partners
            </span>
          </div>
        </motion.div>

        {/* Completed Tasks */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-5 rounded-2xl white-card-hover flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasks Rewarded</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-emerald-600">{stats.approvedSubmissions || 0}</h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {stats.pendingSubmissions || 0} Pending Verifications
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 3X Income Milestone Progress Bar */}
      <motion.div variants={itemVariants} className="p-6 rounded-2xl white-card shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Three-Times (3X) Income Milestone Progress</h3>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Earned: <strong className="text-emerald-600">${totalEarned} USDT</strong> / Target: <strong className="text-slate-900">${target3X > 0 ? target3X : 300} USDT</strong>
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          Per SRS rules, your membership tracks cumulative earnings toward your 3X initial subscription milestone.
        </p>

        <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(5, progressPercent)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full shadow-xs"
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
          <span>0X Initial Subscription</span>
          <span className="text-blue-600 font-bold">{progressPercent}% Completed</span>
          <span>3X Milestone Cap</span>
        </div>
      </motion.div>

      {/* Personal Referral System (Locked vs Unlocked Rule) */}
      <motion.div variants={itemVariants} className="white-card rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <span>NEXORA 6-Level Referral Program</span>
          </h3>
          {isActive ? (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Referral Link Unlocked
            </span>
          ) : (
            <span className="text-xs text-amber-700 font-bold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Lock className="w-4 h-4 text-amber-600" />
              Link Locked (Requires Active Plan)
            </span>
          )}
        </div>

        {isActive ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Share your link with your network. Earn commissions across 6 levels: <strong>Level 1 (3%)</strong>, <strong>Level 2 (2.5%)</strong>, <strong>Level 3 (1.5%)</strong>, <strong>Level 4 (1%)</strong>, <strong>Level 5 (0.5%)</strong>, and <strong>Level 6 (1%)</strong>!
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
                <span>{copied ? 'Link Copied!' : 'Copy Referral Link'}</span>
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-amber-50/50 border border-dashed border-amber-300 text-center space-y-3">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center"
            >
              <Lock className="w-6 h-6" />
            </motion.div>
            <h4 className="text-sm font-bold text-slate-900">Your Referral Link is Locked</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              <em>Bina active account ke aap kisi ko refer nahi kar sakte.</em> Select and activate any subscription plan to unlock your personal referral link and start receiving multi-tier commissions!
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition shadow-xs"
              >
                <span>Unlock Referral Link Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Recent Submissions */}
      <motion.div variants={itemVariants} className="white-card rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>My Submitted Task Verifications</span>
          </h3>
          <Link to="/tasks" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
            View All Tasks →
          </Link>
        </div>

        {recentSubmissions.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No task submissions yet. Complete tasks in the Tasks tab to earn USDT!
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentSubmissions.map((sub) => (
              <motion.div
                key={sub._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-3.5 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{sub.taskId?.title}</p>
                  <p className="text-xs text-slate-500">
                    Submitted: {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${sub.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : sub.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                  >
                    {sub.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {sub.status === 'rejected' && <XCircle className="w-3 h-3 text-rose-600" />}
                    {sub.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                    {sub.status.toUpperCase()}
                  </span>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">${sub.taskId?.reward || 0} USDT</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
