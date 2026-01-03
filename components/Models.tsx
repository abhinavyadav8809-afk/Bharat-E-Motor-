
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SCOOTER_MODELS, WHATSAPP_NUMBER } from '../constants';
import { Battery, Zap, Timer, Gauge, MessageCircle, Calendar } from 'lucide-react';
import { ScooterModel } from '../types';

const Models: React.FC = () => {
  const [models, setModels] = useState<ScooterModel[]>([]);

  useEffect(() => {
    const savedModels = JSON.parse(localStorage.getItem('custom_scooter_models') || 'null');
    setModels(savedModels || SCOOTER_MODELS);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 animate-in slide-in-from-bottom duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Electric Scooter Lineup</h1>
        <p className="text-slate-500 max-w-2xl">From powerful long-range flagships to economical local commuters, we have an Ampere for everyone.</p>
      </div>

      <div className="space-y-16">
        {models.map((model, index) => (
          <div key={model.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center bg-white p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100`}>
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-100 rounded-[2rem] transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                <img src={model.image} alt={model.name} className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl" />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{model.name}</h2>
              <p className="text-emerald-600 font-bold text-2xl mb-6">{model.price} <span className="text-sm font-normal text-slate-400">*Ex-Showroom Price</span></p>
              <p className="text-slate-600 mb-8 leading-relaxed">{model.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Zap size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Range</p>
                    <p className="font-bold text-slate-800">{model.range}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Gauge size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Top Speed</p>
                    <p className="font-bold text-slate-800">{model.topSpeed}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Timer size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Charging</p>
                    <p className="font-bold text-slate-800">{model.chargingTime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Battery size={20}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Battery Type</p>
                    <p className="font-bold text-slate-800">{model.batteryType}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
                  <Calendar size={18} />
                  <span>Book Test Ride</span>
                </Link>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi Bharat E Motors, I am interested in the ${model.name}. Please share the current on-road price and available finance options.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Get Price on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Want to compare models?</h3>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">Visit our showroom in Castair's Town for a side-by-side comparison and live demo.</p>
        <Link to="/contact" className="inline-block py-3 px-8 bg-white text-slate-900 rounded-xl font-bold hover:bg-emerald-400 transition-colors">Get Directions</Link>
      </div>
    </div>
  );
};

export default Models;
