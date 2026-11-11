import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import {
  Users,
  UserCheck,
  UserX,
  Package,
  CheckSquare,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.admin.getDashboardStats();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      setError(err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
        {error}
      </div>
    );
  }

  const { stats, recentUsers, recentSubmissions } = data || {
    stats: {},
    recentUsers: [],
    recentSubmissions: [],
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      link: '/admin/users?status=all',
    },
    {
      title: 'Active Members',
      value: stats.activeUsers || 0,
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      link: '/admin/users?status=active',
    },
    {
      title: 'Inactive Accounts',
      value: stats.inactiveUsers || 0,
      icon: UserX,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      link: '/admin/users?status=inactive',
    },
    {
      title: 'Subscription Plans',
      value: stats.totalPackages || 0,
      icon: Package,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      link: '/admin/packages',
    },
    {
      title: 'Active Tasks',
      value: stats.totalTasks || 0,
      icon: CheckSquare,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      link: '/admin/tasks',
    },
    {
      title: 'Pending SS Verifications',
      value: stats.pendingSubmissions || 0,
      icon: Clock,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      link: '/admin/tasks',
    },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="white-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>NEXORA Administrator Control</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Overview & Analytics</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage users, subscription tiers, social media tasks, and inspect user screenshot proofs.
          </p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/admin/tasks"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
            >
              <span>Review Proofs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/admin/packages"
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center"
            >
              <span>Manage Plans</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-2xl"
          >
            <Link
              to={card.link}
              className="p-5 rounded-2xl white-card-hover flex items-center justify-between group h-full block"
            >
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2 group-hover:text-blue-600 transition origin-left">
                  {card.value}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Two Columns: Recent Users & Submissions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="white-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Recently Registered Members</span>
            </h3>
            <Link to="/admin/users" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentUsers.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No users registered yet.</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${u.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                    >
                      {u.status.toUpperCase()}
                    </span>
                    <p className="text-[11px] font-mono text-blue-600 mt-0.5 font-bold">{u.referralCode || 'N/A'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="white-card rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>Pending Proof Submissions</span>
            </h3>
            <Link to="/admin/tasks" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              Review All →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentSubmissions.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No task submissions currently pending.</p>
            ) : (
              recentSubmissions.map((s) => (
                <div key={s._id} className="py-3 flex items-center justify-between">
                  <div className="truncate mr-3">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {s.taskId?.title || 'Task'}
                    </p>
                    <p className="text-xs text-slate-500">
                      By {s.userId?.name || 'User'} ({s.userId?.email})
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${s.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                    >
                      {s.status.toUpperCase()}
                    </span>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">${s.taskId?.reward || 0} USDT</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
