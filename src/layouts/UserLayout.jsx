import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  CheckSquare,
  Share2,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  ArrowRight,
  Globe,
} from 'lucide-react';

export const UserLayout = () => {
  const { user, logout, isAdmin, isActive } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/packages', icon: Package, label: 'Subscription Plans' },
    { to: '/tasks', icon: CheckSquare, label: 'Daily Tasks' },
    {
      to: '/referrals',
      icon: Share2,
      label: '6-Level Referrals',
      locked: !isActive,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-blue-600 selection:text-white pb-16 lg:pb-0">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed inset-y-0 z-30 hidden lg:flex shadow-sm">
        {/* Brand */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="NEXORA Logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight">
                NEX<span className="text-blue-600">VORA</span>
              </h1>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                User Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="p-3.5 mx-3 my-3 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-bold text-slate-800">
              {user?.userId || user?.referralCode || 'NX-USER'}
            </span>
            {isActive ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ACTIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                INACTIVE
              </span>
            )}
          </div>
          <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: isLinkActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isLinkActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.locked && (
                <span title="Locked until active">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Public Website</span>
          </Link>

          {isAdmin && (
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Switch to Admin Panel</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <Link to="/" className="lg:hidden flex items-center gap-2">
              <img src="/logo.png" alt="NEXORA Logo" className="h-8 w-auto object-contain" />
              <span className="font-extrabold text-slate-900 text-base">NEXORA</span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Member ID: {user?.userId || user?.referralCode || 'NX-USER'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isActive ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACTIVE MEMBER
              </span>
            ) : (
              <Link
                to="/packages"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shadow-xs"
              >
                <Sparkles className="w-3 h-3" />
                <span>Activate Account</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-rose-600 transition cursor-pointer lg:hidden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Inactive Warning Alert Banner */}
        {!isActive && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-3 text-xs sm:text-sm text-amber-900 flex items-center justify-between sticky top-16 z-10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Your account is currently INACTIVE.</strong> Purchase any subscription plan to activate your account and unlock your referral link & 6-level earnings!
              </span>
            </div>
            <Link
              to="/packages"
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shrink-0 ml-4 shadow-xs"
            >
              <span>Activate Now</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (White Theme) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 flex items-center justify-around py-2 px-1 shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive: isLinkActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-medium transition ${isLinkActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
