
import React from 'react';
import { ShieldCheck, Award, Users, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 animate-in slide-in-from-bottom duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Bharat E Motors: Pioneers of Green Mobility in Deoghar</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Founded with a vision to make sustainable transportation accessible to everyone, Bharat E Motors is the premier authorized dealership for Ampere Electric (by Greaves Electric Mobility) in Deoghar, Jharkhand.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            We don't just sell scooters; we provide a complete ecosystem for the EV owner — from expert advice on choosing the right model to reliable after-sales service and spare parts support.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex items-center space-x-3">
              <Award className="text-emerald-600" />
              <span className="font-bold text-slate-900">Authorized Dealer</span>
            </div>
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 flex items-center space-x-3">
              <Users className="text-blue-600" />
              <span className="font-bold text-slate-900">1000+ Happy Owners</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] -z-10 transform rotate-2"></div>
          <img 
            src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=1000" 
            alt="Bharat E Motors Showroom" 
            className="w-full rounded-[2.5rem] shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Target size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
          <p className="text-slate-500 leading-relaxed">To accelerate the transition to sustainable energy by providing high-quality, affordable electric mobility to every household in Deoghar.</p>
        </div>
        <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white text-center">
          <div className="w-16 h-16 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Customer-First</h3>
          <p className="text-slate-400 leading-relaxed">Our relationship with you begins at the sale but doesn't end there. We are committed to a lifetime of service and support for your EV.</p>
        </div>
        <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Join the Tribe</h3>
          <p className="text-slate-500 leading-relaxed">Be a part of a growing community of eco-conscious riders in Jharkhand who are saving money while saving the planet.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
