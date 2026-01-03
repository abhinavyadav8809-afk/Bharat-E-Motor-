
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Calendar, MapPin, Zap, Lock } from 'lucide-react';
import { NAV_ITEMS, BUSINESS_NAME, WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Hide main layout elements when in admin mode for a cleaner dashboard feel
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 glass-effect border-b border-slate-200 ${isAdmin ? 'lg:pl-64' : ''} transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight leading-none">
                Bharat E Motors
                <span className="block text-[10px] text-emerald-600 uppercase font-black tracking-[0.2em]">Ampere EV Authorized</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold transition-colors ${
                    location.pathname === item.path ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 text-slate-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 border-t border-slate-100"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`flex-grow pt-16 ${isAdmin ? '' : 'pb-24'}`}>
        {children}
      </main>

      {/* Footer (Hidden on Admin page) */}
      {!isAdmin && (
        <footer className="bg-slate-900 text-slate-300 py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Bharat E Motors</h3>
              <p className="text-sm leading-relaxed">
                Leading the EV revolution in Deoghar. Your authorized partner for Ampere Electric Scooters and world-class service.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/models" className="hover:text-emerald-400">Our Models</Link></li>
                <li><Link to="/service" className="hover:text-emerald-400">Service Center</Link></li>
                <li><Link to="/finance" className="hover:text-emerald-400">Finance Options</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400">Get Directions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-between">
                <span>Connect</span>
                <Link to="/admin" className="text-slate-800 hover:text-slate-700 transition-colors" title="Admin Login">
                  <Lock size={14} />
                </Link>
              </h3>
              <p className="text-sm">Castair's Town, Near Tower Chowk</p>
              <p className="text-sm">Deoghar, Jharkhand - 814112</p>
              <p className="mt-2 text-sm">Call: {PHONE_NUMBER}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © {new Date().getFullYear()} Bharat E Motors - Ampere Authorized. All prices are ex-showroom.
          </div>
        </footer>
      )}

      {/* Mobile Sticky Action Bar (Hidden on Admin page) */}
      {!isAdmin && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-slate-200 h-16 flex justify-around items-center px-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex flex-col items-center text-slate-600">
            <Phone size={20} />
            <span className="text-[10px] font-bold mt-1">Call</span>
          </a>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`} 
            target="_blank" 
            rel="noreferrer" 
            className="flex flex-col items-center text-emerald-600"
          >
            <MessageCircle size={20} />
            <span className="text-[10px] font-bold mt-1">WhatsApp</span>
          </a>
          <Link to="/book" className="flex flex-col items-center text-blue-600">
            <Calendar size={20} />
            <span className="text-[10px] font-bold mt-1">Test Ride</span>
          </Link>
          <Link to="/contact" className="flex flex-col items-center text-slate-600">
            <MapPin size={20} />
            <span className="text-[10px] font-bold mt-1">Location</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
