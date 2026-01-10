import React, { useEffect, useState } from 'react';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { useAuth } from '../context/AuthProvider';
import {
  FaUser,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useLogoutUser } from '../hooks/useLogoutUser';

// --- AccountDetails Component (Theming applied) ---
const AccountDetails = ({ profile }) => (
  <div className="p-5 bg-gray-900 text-gray-100 rounded-lg shadow-lg border border-gray-700">
    <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-gray-700 pb-2">Personal Information</h3>

    {profile ? (
      <>
        <p className="mb-2">
          <strong className="font-medium text-gray-300">Name:</strong> {profile.name}
        </p>
        <p className="mb-2">
          <strong className="font-medium text-gray-300">Email:</strong> {profile.email}
        </p>
      </>
    ) : (
      <p className="text-gray-500">Loading profile...</p>
    )}
  </div>
);

// --- Orders Component (Theming applied) ---
const Orders = () => (
  <div className="p-5">
    <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-gray-700 pb-2">Recent Orders</h3>
    
    {/* Item Card 1: Dark background for elegance */}
    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md mb-3 border border-gray-700">
      <p className="font-semibold text-lg">#1001 - <span className="text-green-400">Delivered</span></p>
      <p className="text-sm text-gray-400">Placed on Nov 1, 2025</p>
    </div>
    
    {/* Item Card 2 */}
    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md border border-gray-700">
      <p className="font-semibold text-lg">#1002 - <span className="text-yellow-400">Processing</span></p>
      <p className="text-sm text-gray-400">Placed on Nov 15, 2025</p>
    </div>
  </div>
);

// --- componentMap (Theming applied to inline components) ---
const componentMap = {
  account: AccountDetails,
  orders: Orders,
  addresses: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-gray-700 pb-2">Saved Addresses</h3>
      <p className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md border border-gray-700">123 Main St, Anytown, USA</p>
    </div>
  ),
  payment: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-gray-700 pb-2">Payment Methods</h3>
      <p className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-md border border-gray-700">Visa ending in 4242</p>
    </div>
  ),
  settings: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4 border-b border-gray-700 pb-2">Settings</h3>
      <p className='text-gray-100'>
        Notifications <span className="text-green-400 font-semibold">ON</span>
      </p>
    </div>
  ),
};

// --- UserProfile Component (Theming applied) ---
export const UserProfile = () => {
  const {handleLogOut} = useLogoutUser()
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const { uid } = useParams(); // uid is currently unused but kept for clarity

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      // NOTE: useGetUserProfile is called as a function here, not a hook.
      const fetchedProfile = await useGetUserProfile(user.uid);
      setProfile(fetchedProfile);
    };
    loadProfile();
  }, [user]);

  const [activeTab, setActiveTab] = useState('account');

  const navItems = [
    { id: 'account', icon: FaUser, label: 'Account Details' },
    { id: 'orders', icon: FaClipboardList, label: 'My Orders' },
    { id: 'addresses', icon: FaMapMarkerAlt, label: 'Addresses' },
    { id: 'payment', icon: FaCreditCard, label: 'Payment Methods' },
    { id: 'settings', icon: FaCog, label: 'Settings' },
  ];

  const ActiveComponent = componentMap[activeTab];

  return (
    <div className="max-w-7xl mx-auto my-10 bg-gray-900 rounded-xl shadow-2xl shadow-yellow-400/20 overflow-hidden border border-gray-700">
      
      <div className="md:grid md:grid-cols-4 lg:grid-cols-5">

        {/* Sidebar */}
        <div className="col-span-1 border-b md:border-b-0 md:border-r border-gray-700 p-6 bg-gray-900">

          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
            <FaUser className="mr-2" /> My Account
          </h2>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center p-3 text-lg cursor-pointer transition-all duration-200 rounded-lg
                  ${
                    activeTab === item.id
                      // Active state: Yellow text, subtle gray background, yellow border
                      ? 'text-yellow-400 bg-gray-800 border-l-4 border-yellow-400 font-semibold'
                      // Inactive state: Light gray text, dark background, yellow hover
                      : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                  }
                `}
              >
                <item.icon className="mr-3 text-xl" />
                {item.label}
              </div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="flex items-center p-3 text-lg text-gray-400 hover:text-red-500 cursor-pointer mt-8 transition-colors duration-200" onClick={handleLogOut}>
            <FaSignOutAlt className="mr-3 text-xl" />
            Log out
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 lg:col-span-4 bg-gray-800 p-6 sm:p-8 text-gray-100">
          <h1 className="text-3xl font-bold text-gray-100 border-b-2 border-yellow-400 pb-3 mb-6">
            {navItems.find(item => item.id === activeTab).label}
          </h1>

          <div className="min-h-[500px]">
            <ActiveComponent profile={activeTab === 'account' ? profile : undefined} />
          </div>
        </div>

      </div>
    </div>
  );
};