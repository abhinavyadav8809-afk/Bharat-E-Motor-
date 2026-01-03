import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, CalendarDays, Facebook, Instagram, Youtube, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { ADDRESS, PHONE_NUMBER, WHATSAPP_NUMBER, HOURS } from '../constants';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
      >
        <span className={`font-bold transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-500'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp size={20} className="text-emerald-600" /> : <ChevronDown size={20} className="text-slate-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-500 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const faqs = [
    {
      question: "Is there any charge for a Test Ride?",
      answer: "No, all test rides at Bharat E Motors are completely free of charge. We encourage you to experience the ride before making a decision."
    },
    {
      question: "What documents do I need for EV Finance?",
      answer: "You typically need your Aadhaar Card (linked to mobile), PAN Card, and the last 3 months' bank statement. Our team handles the rest of the process."
    },
    {
      question: "How long does a standard service take?",
      answer: "A regular periodic service usually takes about 2 to 3 hours. We recommend booking an appointment in advance for a faster turnaround."
    },
    {
      question: "What is the warranty period for Ampere batteries?",
      answer: "Most Ampere models come with a standard 3-year or 30,000 km warranty on the battery, whichever comes first, giving you total peace of mind."
    },
    {
      question: "Do you assist with RTO registration and Insurance?",
      answer: "Yes, we provide end-to-end assistance for RTO registration and help you choose the best insurance plans for your new electric scooter."
    }
  ];

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 animate-in slide-in-from-bottom duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visit Our Showroom</h1>
        <p className="text-slate-500">Come over for a coffee and a test ride. We are located in the heart of Deoghar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Our Address</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {ADDRESS}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center ml-2 text-emerald-600 font-bold text-xs hover:underline align-baseline whitespace-nowrap"
                  >
                    View on Google Maps <ExternalLink size={12} className="ml-1" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:shadow-md">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Call or Message</h4>
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="block text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors">
                  {PHONE_NUMBER}
                </a>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-sm text-slate-500 mt-1 hover:text-emerald-600 transition-colors font-medium flex items-center"
                >
                  WhatsApp: {WHATSAPP_NUMBER}
                  <MessageCircle size={14} className="ml-1 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map View */}
        <div className="lg:col-span-2">
          <div className="bg-slate-200 rounded-[2.5rem] w-full h-[400px] overflow-hidden relative shadow-inner border border-slate-100">
            <iframe
              title="Showroom Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-center">
              <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <HelpCircle size={28} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400">Everything you need to know about buying and owning an Ampere EV in Deoghar.</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-widest">Still have questions?</p>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-white hover:text-emerald-400 transition-colors font-bold"
                >
                  <MessageCircle size={18} />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12">
              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Business Hours Section */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden mb-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
            <div className="bg-emerald-500/20 p-5 rounded-[2rem] border border-emerald-500/30">
              <Clock size={40} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Showroom Operating Hours</h2>
              <p className="text-slate-400 flex items-center">
                <CalendarDays size={16} className="mr-2 text-emerald-400" />
                Plan your visit accordingly for test rides and service.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] w-full md:w-auto min-w-[300px] text-center md:text-left">
            <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-3">Official Timings</p>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              {HOURS}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex items-center justify-center space-x-3 p-6 bg-white border border-slate-200 text-slate-900 rounded-[2rem] hover:bg-slate-50 transition-all shadow-sm group">
          <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-slate-200 transition-colors">
            <Phone size={24} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call Showroom</p>
            <p className="font-bold">Contact Expert</p>
          </div>
        </a>
        <a 
          href={whatsappLink} 
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-3 p-6 bg-emerald-600 text-white rounded-[2rem] hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 group"
        >
          <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
            <MessageCircle size={24} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Chat Support</p>
            <p className="font-bold">Message on WhatsApp</p>
          </div>
        </a>
      </div>

      {/* Social Media Section */}
      <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Our Journey</h3>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">Stay updated with the latest offers, new model launches, and EV community news in Deoghar.</p>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 group"
            title="Follow us on Facebook"
          >
            <Facebook size={28} className="transition-transform group-hover:rotate-6" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-pink-600/20 group"
            title="Follow us on Instagram"
          >
            <Instagram size={28} className="transition-transform group-hover:-rotate-6" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20 group"
            title="Subscribe to our YouTube"
          >
            <Youtube size={28} className="transition-transform group-hover:scale-110" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;