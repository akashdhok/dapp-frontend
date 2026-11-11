import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import {
  Package,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Zap,
  X,
} from 'lucide-react';

export const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add Package Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('100');
  const [badge, setBadge] = useState('Daily 2.0%');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState(
    '2.0% Daily Income Rate\nLevel 1: Social Media Fundamentals\nInstant Account Activation\nUnlocks 6-Level Referral Network'
  );
  const [submitting, setSubmitting] = useState(false);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.admin.getPackages();
      if (res.success) {
        setPackages(res.packages);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const featuresArray = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await api.admin.createPackage({
        name,
        price: Number(price),
        badge,
        description,
        features: featuresArray,
      });

      if (res.success) {
        setIsAddModalOpen(false);
        setName('');
        setPrice('100');
        setDescription('');
        setFeaturesText(
          '2.0% Daily Income Rate\nLevel 1: Social Media Fundamentals\nInstant Account Activation\nUnlocks 6-Level Referral Network'
        );
        await fetchPackages();
        alert('Package created successfully!');
      }
    } catch (err) {
      alert(err.message || 'Failed to create package');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePackage = async (packageId, packageName) => {
    if (!window.confirm(`Are you sure you want to delete package "${packageName}"?`)) {
      return;
    }
    try {
      const res = await api.admin.deletePackage(packageId);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => p._id !== packageId));
      }
    } catch (err) {
      alert(err.message || 'Failed to delete package');
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
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            <span>NEXORA Subscription Plans & Package Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create or delete subscription plans. Purchasing any plan instantly turns the user status to ACTIVE and unlocks referral privileges.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </motion.button>
      </motion.div>

      {/* Package Notice */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5 shadow-xs"
      >
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          <strong>Activation Rule:</strong> Purchasing any package instantly activates the user's account and reveals their unique 6-level referral link.
        </span>
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
        <div className="p-12 text-center text-slate-500 text-xs">
          No packages created yet. Click "Add New Package" above to create one.
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg._id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="white-card-hover rounded-2xl p-6 shadow-sm flex flex-col justify-between transition group relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {pkg.badge || 'Active Plan'}
                </span>
                <button
                  onClick={() => handleDeletePackage(pkg._id, pkg.name)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-600 mb-4">{pkg.description}</p>
                <div className="flex items-baseline gap-1 my-3 pb-3 border-b border-slate-100">
                  <span className="text-3xl font-extrabold text-gradient-blue">${pkg.price}</span>
                  <span className="text-xs text-slate-500">USDT / tier</span>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-slate-600">
                  {pkg.features && pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Status: Active
                </span>
                <button
                  onClick={() => handleDeletePackage(pkg._id, pkg.name)}
                  className="text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                >
                  Delete Package
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CREATE PACKAGE MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Add New Subscription Package</span>
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Create a new tier with daily return percentage, perks, and activation capability.
              </p>

              <form onSubmit={handleCreatePackage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Plan 8 — Royal Mastermind"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Price (USDT)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="500"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. Daily 3.5%"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe package access and daily return percentage..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Features (One feature per line)
                  </label>
                  <textarea
                    rows={4}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="3.5% Daily Income&#10;Instant Account Activation&#10;Unlock Referral Link&#10;Access to AI Tools"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Publish Package'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
