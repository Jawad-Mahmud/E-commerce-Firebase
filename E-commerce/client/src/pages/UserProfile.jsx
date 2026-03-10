import React, { useEffect, useState } from 'react';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { useAuth } from '../context/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import { HiAdjustments } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useLogoutUser } from '../hooks/useLogoutUser';

// ─── Account Details ────────────────────────────────────────────────────────
const AccountDetails = ({ profile }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { label: 'Full Name', value: profile?.name },
        { label: 'Email Address', value: profile?.email },
        { label: 'Member Since', value: 'January 2025' },
        { label: 'Account Status', value: 'Active' },
      ].map((field) => (
        <div key={field.label} className="border border-gray-200 rounded-xl p-4 bg-white">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
            {field.label}
          </p>
          {profile ? (
            <p className="text-gray-900 font-medium text-sm">{field.value ?? '—'}</p>
          ) : (
            <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3 mt-1" />
          )}
        </div>
      ))}
    </div>

    <div className="border border-gray-200 rounded-xl p-5 bg-white">
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">
        Edit Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Full Name"
          defaultValue={profile?.name}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={profile?.email}
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition placeholder-gray-300"
        />
      </div>
      <button className="mt-4 px-6 py-2.5 bg-gray-900 text-white text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-gray-700 transition duration-300">
        Save Changes
      </button>
    </div>
  </div>
);

// ─── Orders ─────────────────────────────────────────────────────────────────
const Orders = () => {
  const orders = [
    { id: '#1001', status: 'Delivered', date: 'Nov 1, 2025', total: '$320.00', items: 2, icon: FaCheckCircle, color: 'text-green-500' },
    { id: '#1002', status: 'Processing', date: 'Nov 15, 2025', total: '$890.00', items: 1, icon: FaClock, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-gray-400 transition duration-300"
        >
          <div className="flex items-center gap-4">
            <order.icon className={`text-xl ${order.color}`} />
            <div>
              <p className="font-bold text-gray-900 font-serif text-sm">{order.id}</p>
              <p className="text-[11px] text-gray-400 tracking-wide">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
              order.status === 'Delivered'
                ? 'border-green-200 text-green-600 bg-green-50'
                : 'border-amber-200 text-amber-600 bg-amber-50'
            }`}>
              {order.status}
            </span>
            <p className="text-sm font-bold text-gray-900">{order.total}</p>
            <button className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition border border-gray-200 hover:border-gray-900 px-3 py-1.5 rounded-lg">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Addresses ───────────────────────────────────────────────────────────────
const Addresses = () => (
  <div className="space-y-4">
    <div className="border border-gray-900 rounded-xl p-5 bg-white relative">
      <span className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase bg-gray-900 text-white px-2 py-1 rounded">
        Default
      </span>
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Home</p>
      <p className="text-gray-900 text-sm font-medium">123 Main Street</p>
      <p className="text-gray-500 text-sm">Anytown, NY 10001, USA</p>
      <button className="mt-3 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-gray-900 transition">
        Edit Address
      </button>
    </div>
    <button className="w-full border border-dashed border-gray-300 rounded-xl p-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:border-gray-900 hover:text-gray-900 transition duration-300">
      + Add New Address
    </button>
  </div>
);

// ─── Payment ─────────────────────────────────────────────────────────────────
const Payment = () => (
  <div className="space-y-4">
    <div className="border border-gray-200 rounded-xl p-5 bg-white flex items-center justify-between hover:border-gray-400 transition">
      <div className="flex items-center gap-4">
        <div className="w-10 h-6 bg-blue-600 rounded text-white text-[8px] font-bold flex items-center justify-center tracking-wider">VISA</div>
        <div>
          <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
          <p className="text-[11px] text-gray-400">Expires 08/27</p>
        </div>
      </div>
      <span className="text-[9px] font-bold tracking-widest uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded">Default</span>
    </div>
    <button className="w-full border border-dashed border-gray-300 rounded-xl p-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:border-gray-900 hover:text-gray-900 transition duration-300">
      + Add Payment Method
    </button>
  </div>
);

// ─── Settings ────────────────────────────────────────────────────────────────
const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const Toggle = ({ value, onToggle }) => (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-all duration-300 relative ${value ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${value ? 'translate-x-5' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-3">
      {[
        { label: 'Order Notifications', desc: 'Get notified about order status updates', value: notifications, onToggle: () => setNotifications(!notifications) },
        { label: 'Newsletter', desc: 'Receive curated watch news and offers', value: newsletter, onToggle: () => setNewsletter(!newsletter) },
      ].map((setting) => (
        <div key={setting.label} className="border border-gray-200 rounded-xl p-5 bg-white flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900">{setting.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{setting.desc}</p>
          </div>
          <Toggle value={setting.value} onToggle={setting.onToggle} />
        </div>
      ))}
    </div>
  );
};

// ─── Component Map ────────────────────────────────────────────────────────────
const componentMap = {
  account: AccountDetails,
  orders: Orders,
  addresses: Addresses,
  payment: Payment,
  settings: Settings,
};

// ─── UserProfile ──────────────────────────────────────────────────────────────
export const UserProfile = () => {
  const { handleLogOut } = useLogoutUser();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const { uid } = useParams();
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const fetchedProfile = await useGetUserProfile(user.uid);
      setProfile(fetchedProfile);
    };
    loadProfile();
  }, [user]);

  const navItems = [
    { id: 'account', icon: FaUser, label: 'Account Details' },
    { id: 'orders', icon: FaClipboardList, label: 'My Orders' },
    { id: 'addresses', icon: FaMapMarkerAlt, label: 'Addresses' },
    { id: 'payment', icon: FaCreditCard, label: 'Payment Methods' },
    { id: 'settings', icon: FaCog, label: 'Settings' },
  ];

  const ActiveComponent = componentMap[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Timeless Co.</p>
          <h1 className="text-3xl font-serif font-bold text-gray-900">My Account</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

              {/* Profile Badge */}
              <div className="p-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
                  <FaUser className="text-white text-lg" />
                </div>
                {profile ? (
                  <>
                    <p className="font-serif font-bold text-gray-900 text-sm">{profile.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{profile.email}</p>
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-gray-100 rounded animate-pulse w-24" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-32" />
                  </div>
                )}
              </div>

              {/* Nav */}
              <nav className="p-3 space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      activeTab === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`text-sm flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`} />
                    <span className="text-[11px] font-bold tracking-widest uppercase">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                >
                  <FaSignOutAlt className="text-sm flex-shrink-0" />
                  <span className="text-[11px] font-bold tracking-widest uppercase">Log Out</span>
                </button>
              </div>

            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

              {/* Section Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <HiAdjustments className="text-gray-400" size={18} />
                <h2 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  {navItems.find((item) => item.id === activeTab)?.label}
                </h2>
              </div>

              {/* Animated Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <ActiveComponent profile={activeTab === 'account' ? profile : undefined} />
                </motion.div>
              </AnimatePresence>

            </div>
          </main>

        </div>
      </div>
    </div>
  );
};