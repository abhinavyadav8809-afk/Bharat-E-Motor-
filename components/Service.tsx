import React from 'react';
import { Settings, Battery, Wrench, ShieldCheck, PhoneCall, CheckCircle2 } from 'lucide-react';
import { SERVICE_PHONE } from '../constants';

const Service: React.FC = () => {
  const services = [
    { title: 'Regular Servicing', desc: 'Periodic maintenance to keep your Ampere running smoothly.', icon: <Settings /> },
    { title: 'Battery Health Check', desc: 'Detailed diagnostic of your lithium-ion battery life.', icon: <Battery /> },
    { title: 'Genuine Spare Parts', desc: '100% authentic Greaves spares for long-term reliability.', icon: <CheckCircle2 /> },
    { title: 'Warranty Support', desc: 'Hassle-free warranty claims and expert technical support.', icon: <ShieldCheck /> },
    { title: 'Motor Diagnostics', desc: 'Professional check for BLDC motor performance.', icon: <Wrench /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 animate-in slide-in-from-bottom duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Authorized Service Center</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Expert care for your Ampere EV by certified technicians in Deoghar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              {React.cloneElement(s.icon as React.ReactElement, { size: 24 })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
            <p className="text-slate-500 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Book a Service Appointment</h2>
            <p className="text-slate-400 max-w-md">Don't wait in queues. Schedule your service over a call and get priority support.</p>
          </div>
          <a 
            href={`tel:${SERVICE_PHONE.replace(/\D/g, '')}`}
            className="flex items-center space-x-3 bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            <PhoneCall size={24} />
            <span>Call Service Center</span>
          </a>
        </div>
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Service;