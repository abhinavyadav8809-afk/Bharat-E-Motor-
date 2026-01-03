
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BatteryCharging, Zap, IndianRupee, ArrowRight, Star, Phone, MessageCircle, Info } from 'lucide-react';
import { SCOOTER_MODELS, WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants';
import { ScooterModel } from '../types';

const Home: React.FC = () => {
  const [siteStatus, setSiteStatus] = useState('Open');
  const [models, setModels] = useState<ScooterModel[]>([]);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('admin_site_settings') || '{"status":"Open"}');
    setSiteStatus(savedSettings.status);

    const savedModels = JSON.parse(localStorage.getItem('custom_scooter_models') || 'null');
    setModels(savedModels || SCOOTER_MODELS);
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Site Status Notification Bar (Managed from Admin) */}
      {siteStatus !== 'Open' && (siteStatus !== 'Open') && (
        <div className="bg-amber-500 text-white py-3 px-4 text-center text-sm font-bold flex items-center justify-center space-x-2">
          <Info size={16} />
          <span>Note: The showroom is currently {siteStatus.toLowerCase()} for the day. Bookings are still accepted online.</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Ampere Electric Scooter" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-500/30">
              Authorized Ampere Dealer
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Authorized Ampere Electric Scooter Dealer in <span className="text-emerald-400">Deoghar</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-light">
              Affordable • Eco-Friendly • Low Running Cost EV Scooters. Shift to green mobility with Bharat E Motors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-600/20">
                Book Test Ride
              </Link>
              <Link to="/models" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-4 rounded-xl font-bold transition-all border border-white/20">
                View Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Ampere EV?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">Discover the benefits of switching to India's most trusted electric scooter brand.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-hover hover:shadow-xl group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <IndianRupee size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Low Cost</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Save up to 80% on fuel costs. Electricity is much cheaper than petrol!</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-hover hover:shadow-xl group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Zero Pollution</h3>
              <p className="text-slate-500 text-sm leading-relaxed">No tailpipe emissions. Keep the air of beautiful Deoghar clean and fresh.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-hover hover:shadow-xl group">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BatteryCharging size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Easy Charging</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Charge your scooter just like your smartphone, right at your home.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-hover hover:shadow-xl group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Reliable Service</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Authorized service center in Deoghar for total peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Popular Models</h2>
              <p className="text-slate-500">Pick the perfect companion for your daily city rides.</p>
            </div>
            <Link to="/models" className="hidden md:flex items-center text-emerald-600 font-bold hover:underline">
              View All Models <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model) => (
              <div key={model.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-200 flex flex-col h-full group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={model.image} alt={model.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600 border border-emerald-100">
                    Range: {model.range}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{model.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{model.description}</p>
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Starting Price</p>
                        <p className="text-xl font-black text-emerald-600">{model.price}</p>
                      </div>
                      <Link to="/book" className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-colors">
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="text-amber-400 fill-current w-6 h-6" />)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Trusted by Residents across Deoghar</h2>
          <p className="text-lg text-slate-600 italic mb-12">
            "We are committed to providing the best electric mobility solutions to Deoghar. Our showroom offers complete sales, service, and spare parts support."
          </p>
          <div className="inline-flex items-center space-x-4">
            <div className="text-left border-l-4 border-emerald-600 pl-4">
              <p className="font-bold text-slate-900 uppercase tracking-widest text-sm">Bharat E Motors</p>
              <p className="text-slate-500 text-xs">Authorized Dealer since 2021</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTAs Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex items-center justify-center space-x-3 p-6 bg-slate-900 text-white rounded-3xl hover:bg-slate-800 transition-colors">
            <Phone size={24} />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400 uppercase">Call for Details</p>
              <p className="text-lg font-bold">Talk to our Experts</p>
            </div>
          </a>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent("Hi Bharat E Motors, I'm interested in an Ampere Electric Scooter. Please share more details.")}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center space-x-3 p-6 bg-emerald-600 text-white rounded-3xl hover:bg-emerald-500 transition-colors"
          >
            <MessageCircle size={24} />
            <div className="text-left">
              <p className="text-xs font-bold text-emerald-100 uppercase">WhatsApp Inquiry</p>
              <p className="text-lg font-bold">Get Quote on WhatsApp</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
