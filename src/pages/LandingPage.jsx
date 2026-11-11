import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Share2,
  TrendingUp,
  Cpu,
  GraduationCap,
  ShoppingBag,
  Wallet,
  Award,
  ArrowRight,
  ChevronDown,
  Layers,
  Globe,
  Lock,
  Users,
  Check,
  Star,
  PlayCircle,
  HelpCircle,
  BarChart3,
  Flame,
} from 'lucide-react';

export const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  // Refs for GSAP counter numbers
  const statPlansRef = useRef(null);
  const statCommRef = useRef(null);
  const statToolsRef = useRef(null);
  const statCapRef = useRef(null);

  useEffect(() => {
    // GSAP animated number counters
    const ctx = gsap.context(() => {
      if (statPlansRef.current) {
        gsap.fromTo(
          statPlansRef.current,
          { innerText: 0 },
          {
            innerText: 7,
            duration: 1.8,
            snap: { innerText: 1 },
            ease: 'power2.out',
          }
        );
      }
      if (statCommRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 9.5,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (statCommRef.current) {
              statCommRef.current.innerText = obj.val.toFixed(1) + '%';
            }
          },
        });
      }
      if (statToolsRef.current) {
        gsap.fromTo(
          statToolsRef.current,
          { innerText: 0 },
          {
            innerText: 50,
            duration: 2.2,
            snap: { innerText: 1 },
            ease: 'power2.out',
          }
        );
      }
      if (statCapRef.current) {
        gsap.fromTo(
          statCapRef.current,
          { innerText: 0 },
          {
            innerText: 3,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: 'back.out(1.7)',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const subscriptionPlans = [
    {
      id: 'plan-1',
      name: 'Plan 1 — Foundation Tier',
      amount: '$100 – $1,000',
      dailyRate: '2.0%',
      badge: 'Starter',
      color: 'blue',
      features: [
        '2.0% Daily Income Rate',
        'Level 1: Social Media Fundamentals',
        'Instant Account Activation',
        'Unlocks 6-Level Referral Network',
        '3X Milestone Earning Progress',
      ],
    },
    {
      id: 'plan-2',
      name: 'Plan 2 — Creator Tier',
      amount: '$1,000 – $2,000',
      dailyRate: '2.5%',
      badge: 'Creator',
      color: 'indigo',
      features: [
        '2.5% Daily Income Rate',
        'Level 2: Content Creation & Video Academy',
        'AI Content & Marketing Assistants',
        'Fast-Track Screenshot Approvals',
        'Enhanced Referral Multipliers',
      ],
    },
    {
      id: 'plan-3',
      name: 'Plan 3 — Growth Tier',
      amount: '$2,000 – $3,000',
      dailyRate: '3.0%',
      badge: 'Popular',
      color: 'blue',
      isPopular: true,
      features: [
        '3.0% Daily Income Rate',
        'Level 3: Audience Growth Automation',
        '50+ AI Tools & Templates Access',
        'Silver Badge Eligibility ($1,000+ topup)',
        'Priority USDT Withdrawals',
      ],
    },
    {
      id: 'plan-4',
      name: 'Plan 4 — Influencer Tier',
      amount: '$3,000 – $4,000',
      dailyRate: '3.5%',
      badge: 'Growth',
      color: 'emerald',
      features: [
        '3.5% Daily Income Rate',
        'Level 4: Influencer Marketing & Brand Deals',
        'Gold Badge Eligibility (2% Daily CTO)',
        'Exclusive High-Payout Partner Tasks',
        'Dedicated 24/7 Account Support',
      ],
    },
    {
      id: 'plan-5',
      name: 'Plan 5 — Business Tier',
      amount: '$4,000 – $5,000',
      dailyRate: '4.0%',
      badge: 'Pro Business',
      color: 'violet',
      features: [
        '4.0% Daily Income Rate',
        'Level 5: Global E-Commerce Business Suite',
        'Dropshipping & Store Setup Automation',
        'Multi-Tier Team Commission Acceleration',
        'Instant Payout Verification',
      ],
    },
    {
      id: 'plan-6',
      name: 'Plan 6 — Executive Tier',
      amount: '$5,000 – $10,000',
      dailyRate: '5.0%',
      badge: 'High Yield',
      color: 'cyan',
      features: [
        '5.0% Daily Income Rate',
        'Level 6: Advanced Digital Business Suite',
        'Diamond Achievement (3% Daily CTO)',
        'Unlimited Daily Educational Tasks',
        'VIP Mastermind Networking',
      ],
    },
    {
      id: 'plan-7',
      name: 'Plan 7 — Elite Crown Tier',
      amount: '$10,000+',
      dailyRate: '10.0%',
      badge: 'Maximum Return',
      color: 'amber',
      isElite: true,
      features: [
        '10.0% Daily Return Rate (Max ROI)',
        'Red Diamond Achievement (4% Daily CTO)',
        'Full 50+ AI Tools & Enterprise License',
        'Maximum 6-Level Commission Structure',
        '1-on-1 Growth Advisory & Support',
      ],
    },
  ];

  const referralLevels = [
    { level: 'Level 1', name: 'Direct Referrals', comm: '3.0%', desc: 'Immediate direct sponsors' },
    { level: 'Level 2', name: 'Team Network Tier 2', comm: '2.5%', desc: 'Invited by your Level 1 partners' },
    { level: 'Level 3', name: 'Team Network Tier 3', comm: '1.5%', desc: 'Exponential community growth' },
    { level: 'Level 4', name: 'Team Network Tier 4', comm: '1.0%', desc: 'Deep tier distribution' },
    { level: 'Level 5', name: 'Team Network Tier 5', comm: '0.50%', desc: 'Passive network rewards' },
    { level: 'Level 6', name: 'Executive Network Tier 6', comm: '1.0%', desc: 'Leadership incentive boost' },
  ];

  const achievements = [
    {
      name: 'Silver Achievement',
      req: '$1,000 Top-Up; 100,000 Followers Target',
      cto: '1% Daily CTO',
      badge: 'Silver Rank',
      accent: 'border-slate-300 text-slate-700 bg-slate-50',
    },
    {
      name: 'Gold Achievement',
      req: '$3,000 Top-Up; 5,000 Subscribers Target',
      cto: '2% Daily CTO',
      badge: 'Gold Rank',
      accent: 'border-amber-300 text-amber-700 bg-amber-50',
    },
    {
      name: 'Diamond Achievement',
      req: '$10,000 Top-Up Milestone',
      cto: '3% Daily CTO',
      badge: 'Diamond Rank',
      accent: 'border-cyan-300 text-cyan-700 bg-cyan-50',
    },
    {
      name: 'Red Diamond Achievement',
      req: '$15,000 Top-Up Milestone',
      cto: '4% Daily CTO',
      badge: 'Elite Crown Rank',
      accent: 'border-rose-300 text-rose-700 bg-rose-50',
    },
  ];

  const developmentCurriculum = [
    { level: 'Level 1', focus: 'Social Media Fundamentals', desc: 'Platform mechanics, viral hooks, bio optimization, and algorithm basics.' },
    { level: 'Level 2', focus: 'Content Creation & Video', desc: 'Short-form video editing, storytelling, captions, and batch production.' },
    { level: 'Level 3', focus: 'Audience Growth & SEO', desc: 'Organic reach tactics, hashtag strategy, engagement funnels, and retention.' },
    { level: 'Level 4', focus: 'Influencer Marketing', desc: 'Brand deal outreach, rate card pricing, contracts, and sponsor relations.' },
    { level: 'Level 5', focus: 'E-Commerce Business', desc: 'Product research, supplier sourcing, Shopify store setup, and ad scaling.' },
    { level: 'Level 6', focus: 'Advanced Digital Management', desc: 'Agency scaling, team delegation, revenue diversifications, and exit strategy.' },
  ];

  const aiAssistants = [
    { name: 'AI Content Assistant', desc: 'Social media captions, viral video scripts, content outlines, and blog ideas.' },
    { name: 'AI Marketing Assistant', desc: 'Campaign planning, audience research, marketing strategies, and ad copy.' },
    { name: 'AI E-Commerce Assistant', desc: 'Product descriptions, catalog management, customer response drafts, and store copy.' },
    { name: 'AI Business Assistant', desc: 'Market research, competitor analysis, business plans, and executive decks.' },
    { name: 'AI Learning Assistant', desc: 'Course explanations, personalized study roadmaps, and instant Q&A answering.' },
  ];

  const faqs = [
    {
      q: 'How do I activate my NEXORA account and unlock my referral link?',
      a: 'When you register, your account begins in Inactive status. Once you purchase any of the 7 subscription plans (starting from $100), your account is instantly activated and your personal referral link is unlocked for sharing.',
    },
    {
      q: 'Can inactive users earn referral commissions or share links?',
      a: 'No. Per platform rules, users must have an active subscription package before they can refer friends or earn network commissions.',
    },
    {
      q: 'How does the task completion and screenshot verification work?',
      a: 'Navigate to the Tasks tab, complete the assigned social media action (joining groups, liking videos, posting reels), and upload a screenshot (SS) proof. Our administration team verifies and approves the reward directly into your balance.',
    },
    {
      q: 'What is the 3X Milestone Guarantee?',
      a: 'The platform tracks your cumulative earnings against your subscription. The system aims for 3X total returns before requiring a renewal/top-up milestone.',
    },
    {
      q: 'What cryptocurrency networks are supported for USDT deposits and withdrawals?',
      a: 'We support USDT on both TRC20 and BEP20 networks for low transaction fees and instant ledger confirmation.',
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Top Announcement Bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 py-2 px-4 text-center text-xs text-white font-medium shadow-xs relative z-50 flex items-center justify-center gap-2"
      >
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-300" /> New
        </span>
        <span>
          NEXORA Social Media Education & Income Ecosystem with 50+ AI Tools and 6-Level Rewards.
        </span>
      </motion.div>

      {/* Main Navbar (White Theme) */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.png" alt="NEXORA Logo" className="h-11 w-auto object-contain" />
            </motion.div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block group-hover:text-blue-600 transition leading-tight">
                NEX<span className="text-blue-600">VORA</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                Social Media Education & Income
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#plans" className="hover:text-blue-600 transition">Subscription Plans</a>
            <a href="#referrals" className="hover:text-blue-600 transition">6-Level Referrals</a>
            <a href="#achievements" className="hover:text-blue-600 transition">Achievements & CTO</a>
            <a href="#education" className="hover:text-blue-600 transition">Curriculum</a>
            <a href="#ai-tools" className="hover:text-blue-600 transition">50+ AI Tools</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 block"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Floating Animated Background Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-b from-white via-blue-50/25 to-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-6 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>NEXORA Official SRS Platform Baseline</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-none mb-6"
          >
            Social Media Education & <br />
            <span className="text-gradient-blue">Guaranteed Income Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Combine world-class social media growth mastery, global e-commerce training, 50+ AI-powered business tools, and verified daily income rewards on an auditable USDT ledger.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2"
              >
                <span>Create Account & Join NEXORA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#plans"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-300 transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore 7 Subscription Plans</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Quick Metrics Ticker with GSAP Animating Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 12px 25px -5px rgba(37,99,235,0.1)' }}
              className="p-5 rounded-2xl white-card text-center transition"
            >
              <div className="flex items-center justify-center gap-1">
                <span ref={statPlansRef} className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                  7
                </span>
                <span className="text-2xl font-bold text-blue-600">Plans</span>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-1 block">Up to 10% Daily Rate</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 12px 25px -5px rgba(79,70,229,0.1)' }}
              className="p-5 rounded-2xl white-card text-center transition"
            >
              <div className="flex items-center justify-center gap-1">
                <span ref={statCommRef} className="text-3xl sm:text-4xl font-extrabold text-indigo-600">
                  9.5%
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-1 block">6-Level Referral Comm</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 12px 25px -5px rgba(16,185,129,0.1)' }}
              className="p-5 rounded-2xl white-card text-center transition"
            >
              <div className="flex items-center justify-center gap-1">
                <span ref={statToolsRef} className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                  50
                </span>
                <span className="text-2xl font-bold text-emerald-600">+</span>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-1 block">AI Assist & Video Courses</span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 12px 25px -5px rgba(245,158,11,0.1)' }}
              className="p-5 rounded-2xl white-card text-center transition"
            >
              <div className="flex items-center justify-center gap-1">
                <span ref={statCapRef} className="text-3xl sm:text-4xl font-extrabold text-amber-600">
                  3
                </span>
                <span className="text-3xl font-extrabold text-amber-600">X</span>
              </div>
              <span className="text-xs text-slate-500 font-medium mt-1 block">Income Milestone Cap</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Complete Digital Education Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Structured to help international members learn, produce, automate, and monetize.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl white-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Social Media Mastery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive training in video production, storytelling, viral content, and channel monetization.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl white-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 shadow-xs">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">E-Commerce Academy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step guides for online store creation, dropshipping, logistics, and global customer acquisition.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl white-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 shadow-xs">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">50+ AI Power Tools</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-trained AI assistants for instant caption writing, ad scripts, product listings, and market analysis.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl white-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">USDT Daily Earnings</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent daily returns, task reward bonuses, and instant ledger distributions in Tether USDT.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7 Subscription Plans (SRS Baseline) */}
      <section id="plans" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
              Official SRS Investment Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              7 Structured Subscription Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Purchasing any plan instantly activates your user account and reveals your personal 6-level referral link.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {subscriptionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`white-card-hover rounded-2xl p-6 flex flex-col justify-between relative transition ${plan.isPopular ? 'ring-2 ring-blue-600 shadow-md shadow-blue-600/10' : ''
                  } ${plan.isElite ? 'ring-2 ring-amber-500 bg-amber-50/20' : ''}`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-sm uppercase tracking-wider">
                    Most Popular Choice
                  </span>
                )}
                {plan.isElite && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm uppercase tracking-wider">
                    Crown High Yield
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                      Daily {plan.dailyRate}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1">{plan.name}</h3>
                  <div className="my-4 pb-4 border-b border-slate-100">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {plan.amount}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">USDT Tier Range</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-slate-600">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/register"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition block ${plan.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                      : plan.isElite
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                >
                  Activate with {plan.badge}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6-Level Multi-Tier Referral Program */}
      <section id="referrals" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 inline-block mb-3">
              9.5% Total Network Payout
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              6-Level Exponential Referral Hierarchy
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Share your unique referral link with partners. As your downline expands through 6 tiers, earn passive USDT commissions on every subscription and top-up.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {referralLevels.map((ref, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="white-card-hover rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                    {ref.level}
                  </span>
                  <span className="text-2xl font-black text-gradient-blue">{ref.comm}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">{ref.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{ref.desc}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Audited Instant Credit</span>
                  <Share2 className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements & CTO Rank Pool */}
      <section id="achievements" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-block mb-3">
              Company Turnover (CTO) Pool
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Prestigious Achievement Ranks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Reach milestone volumes and subscriber targets to claim daily profit-share dividends from platform CTO.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="white-card-hover rounded-2xl p-6 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 border ${ach.accent} shadow-xs`}>
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{ach.name}</h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 my-2">
                  {ach.cto}
                </span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{ach.req}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6-Level Practical Development Curriculum */}
      <section id="education" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-3">
              Comprehensive Learning Matrix
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              6-Level Social Media & E-Commerce Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Structured courses delivered in video, masterclasses, and practical hands-on workshops.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {developmentCurriculum.map((curr, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="white-card-hover rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{curr.focus}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{curr.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 50+ AI Assistants Suite */}
      <section id="ai-tools" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 inline-block mb-3">
              Automate Your Workflows
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              50+ AI Tools & Creative Assistants
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Accelerate content creation, copywriting, ad generation, and business analysis with proprietary AI workflows.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {aiAssistants.map((tool, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="white-card-hover rounded-2xl p-5 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4 shadow-xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{tool.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  AI Ready
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion with Framer Motion AnimatePresence */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Everything you need to know about NEXORA packages, tasks, and activations.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="white-card rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition"
                >
                  <span className="font-bold text-slate-900 text-sm">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NEXORA Logo" className="h-10 w-auto object-contain bg-white/10 p-1 rounded-xl" />
            <div>
              <span className="text-lg font-bold tracking-tight block leading-tight">
                NEX<span className="text-blue-400">VORA</span>
              </span>
              <span className="text-[10px] text-slate-400 block">
                Social Media Education & Income Ecosystem
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
            <a href="#plans" className="hover:text-white transition">Plans</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} NEXORA Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
