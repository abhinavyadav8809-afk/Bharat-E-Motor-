import React from 'react';
import { CreditCard, IndianRupee, HelpCircle, BadgeCheck, FileText, Smartphone, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const Finance: React.FC = () => {
  const whatsappNumberClean = WHATSAPP_NUMBER.replace(/\D/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 animate-in slide-in-from-bottom duration-500">
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Easy EMI & Finance</h1>
        <p className="text-slate-500 max-w-2xl">Owning an Ampere is easier than ever. We offer flexible finance options and complete assistance with Government EV subsidies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white">
          <BadgeCheck className="mb-6 w-12 h-12 text-emerald-200" />
          <h2 className="text-3xl font-bold mb-4">Finance Partners</h2>
          <p className="mb-8 opacity-90 leading-relaxed">We have partnered with leading banks and NBFCs to provide low down payment and low-interest rate loans specifically for electric vehicles.</p>
          <ul className="space-y-4">
            {['HDFC Bank', 'IDFC First Bank', 'TVS Credit', 'L&T Finance'].map(partner => (
              <li key={partner} className="flex items-center space-x-3 text-sm font-bold bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <FileText className="mb-6 w-12 h-12 text-emerald-600" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">FAME-II Subsidy</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">Most Ampere models qualify for central and state government subsidies, making them highly affordable. Our team handles all the paperwork for you!</p>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Documents Required:</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>• Aadhaar Card (linked with Mobile)</li>
              <li>• PAN Card</li>
              <li>• Electricity Bill or Address Proof</li>
              <li>• Bank Statement (last 3 months)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Finance your EV?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <IndianRupee className="text-emerald-600 mt-1 shrink-0" size={20} />
              <p className="text-sm text-slate-600">Low Down Payment (starting at ₹4,999*)</p>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="text-emerald-600 mt-1 shrink-0" size={20} />
              <p className="text-sm text-slate-600">Paperless digital processing</p>
            </div>
            <div className="flex items-start space-x-3">
              <CreditCard className="text-emerald-600 mt-1 shrink-0" size={20} />
              <p className="text-sm text-slate-600">Flexible tenures up to 48 months</p>
            </div>
            <div className="flex items-start space-x-3">
              <HelpCircle className="text-emerald-600 mt-1 shrink-0" size={20} />
              <p className="text-sm text-slate-600">Instant approval for eligible customers</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <a 
            href={`https://wa.me/${whatsappNumberClean}?text=${encodeURIComponent("Hi, I want to check my loan eligibility for an Ampere Scooter.")}`}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20"
          >
            <MessageCircle size={24} />
            <span>Check EMI on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Finance;