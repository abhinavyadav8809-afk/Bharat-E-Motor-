
import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Send, CheckCircle, Shield } from 'lucide-react';
import { SCOOTER_MODELS, WHATSAPP_NUMBER, PHONE_NUMBER } from '../constants';
import { ScooterModel } from '../types';

const Booking: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [models, setModels] = useState<ScooterModel[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    model: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    const savedModels = JSON.parse(localStorage.getItem('custom_scooter_models') || 'null');
    const availableModels = savedModels || SCOOTER_MODELS;
    setModels(availableModels);
    if (availableModels.length > 0) {
      setFormData(prev => ({ ...prev, model: availableModels[0].name }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for the Admin Panel
    const existingLeads = JSON.parse(localStorage.getItem('test_ride_bookings') || '[]');
    const newLead = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    localStorage.setItem('test_ride_bookings', JSON.stringify([newLead, ...existingLeads]));

    // Simulate API call
    setTimeout(() => setSubmitted(true), 800);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
        <p className="text-slate-600 mb-10 text-lg">
          Thank you, {formData.name}. Our team from Bharat E Motors will call you shortly to confirm your test ride for the {formData.model}.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
        >
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in slide-in-from-bottom duration-500">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Experience the Future of Mobility</h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
          Book a <span className="text-emerald-600 font-bold">No-Obligation Test Ride</span> at our Deoghar showroom and feel the Ampere difference.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><Shield size={24}/></div>
            <div>
              <p className="font-bold text-slate-900">Expert Guidance</p>
              <p className="text-sm text-slate-500">Our team will help you pick the right model for your needs.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><MessageCircle size={24}/></div>
            <div>
              <p className="font-bold text-slate-900">Instant Support</p>
              <p className="text-sm text-slate-500">Have questions? We are just a message away.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex flex-col items-center justify-center p-6 bg-slate-100 rounded-3xl hover:bg-slate-200 transition-colors">
            <Phone className="text-slate-900 mb-2" size={24} />
            <span className="font-bold text-slate-900">Call Us</span>
          </a>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent("Hi Bharat E Motors, I'd like to book a test ride.")}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-3xl hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="text-emerald-600 mb-2" size={24} />
            <span className="font-bold text-emerald-600">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Test Ride Details</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Rahul Kumar"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mobile Number</label>
            <input 
              required
              type="tel" 
              placeholder="10-digit number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Preferred Model</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
              >
                {models.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Preferred Date</label>
              <input 
                required
                type="date" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Additional Notes (Optional)</label>
            <textarea 
              rows={3}
              placeholder="Any specific requests, timing preference or questions?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-500 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
          >
            <span>Book Now</span>
            <Send size={18} />
          </button>
          <p className="text-center text-[10px] text-slate-400">By clicking Book Now, you agree to receive a callback from Bharat E Motors.</p>
        </form>
      </div>
    </div>
  );
};

export default Booking;
