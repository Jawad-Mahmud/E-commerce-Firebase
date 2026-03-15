import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-100">

          {/* Branding */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold tracking-wide text-gray-900">
              Timeless Co.
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Curating the world's finest timepieces, delivered with guaranteed authenticity.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { href: "https://instagram.com", icon: FaInstagram },
                { href: "https://facebook.com", icon: FaFacebookF },
                { href: "https://twitter.com", icon: FaTwitter },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900 transition duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
              Customer Service
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'FAQ', to: '/faq' },
                { label: 'Shipping & Returns', to: '/shipping' },
                { label: 'Warranty', to: '/warranty' },
                { label: 'Contact Us', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-gray-900 transition duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
              Shop
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Shop All', to: '/products' },
                { label: "Men's Watches", to: '/categories/mens' },
                { label: "Women's Watches", to: '/categories/womens' },
                { label: 'Brands A–Z', to: '/brands' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-gray-900 transition duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', to: '/about' },
                { label: 'Careers', to: '/careers' },
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Service', to: '/terms' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-gray-900 transition duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
            &copy; {currentYear} Timeless Co. All rights reserved.
          </p>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-300">
            Built with React &amp; Firebase
          </p>
        </div>

      </div>
    </footer>
  );
};