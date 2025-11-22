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

const AccountDetails = ({ profile }) => (
  <div className="p-5">
    <h3 className="text-xl font-semibold text-blue-600 mb-4">Personal Information</h3>

    {profile ? (
      <>
        <p className="mb-2">
          <strong className="font-medium">Name:</strong> {profile.name}
        </p>
        <p className="mb-2">
          <strong className="font-medium">Email:</strong> {profile.email}
        </p>
      </>
    ) : (
      <p className="text-gray-500">Loading profile...</p>
    )}
  </div>
);

const Orders = () => (
  <div className="p-5">
    <h3 className="text-xl font-semibold text-blue-600 mb-4">Recent Orders</h3>
    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
      <p className="font-semibold">#1001 - Delivered</p>
      <p className="text-sm text-gray-500">Placed on Nov 1, 2025</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="font-semibold">#1002 - Processing</p>
      <p className="text-sm text-gray-500">Placed on Nov 15, 2025</p>
    </div>
  </div>
);

const componentMap = {
  account: AccountDetails,
  orders: Orders,
  addresses: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Saved Addresses</h3>
      <p className="bg-white p-4 rounded-lg shadow-sm">123 Main St, Anytown, USA</p>
    </div>
  ),
  payment: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Payment Methods</h3>
      <p className="bg-white p-4 rounded-lg shadow-sm">Visa ending in 4242</p>
    </div>
  ),
  settings: () => (
    <div className="p-5">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Settings</h3>
      <p>Notifications <span className="text-green-600 font-semibold">ON</span></p>
    </div>
  ),
};

export const UserProfile = () => {
  const {handleLogOut} = useLogoutUser()
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
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
    <div className="max-w-7xl mx-auto my-10 bg-white rounded-xl shadow-2xl overflow-hidden">
      
      <div className="md:grid md:grid-cols-4 lg:grid-cols-5">

        {/* Sidebar */}
        <div className="col-span-1 border-b md:border-b-0 md:border-r border-gray-200 p-6 bg-white">

          <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
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
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className="mr-3 text-xl" />
                {item.label}
              </div>
            ))}
          </nav>

          <div className="flex items-center p-3 text-lg text-gray-600 hover:text-red-600 cursor-pointer mt-8 transition-colors duration-200" onClick={handleLogOut}>
            <FaSignOutAlt className="mr-3 text-xl" />
            Log out
            
          </div>
        </div>

        {/* Main Content */}
        {/* JSX-safe comment */}
        <div className="md:col-span-3 lg:col-span-4 bg-gray-50 p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6">
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
