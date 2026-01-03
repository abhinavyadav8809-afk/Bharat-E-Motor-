
import { ScooterModel } from './types';

export const BUSINESS_NAME = "Ampere EV by Greaves – Bharat E Motors";
export const LOCATION = "Deoghar, Jharkhand";
export const PHONE_NUMBER = "+91 70048 94722";
export const WHATSAPP_NUMBER = "+91 70048 94722";
export const SERVICE_PHONE = "+91 91101 18839"; // Corrected service center number
export const ADDRESS = "Castair's Town, Near Tower Chowk, Deoghar, Jharkhand 814112";
export const EMAIL = "contact@bharatemotors.com";
export const HOURS = "Monday - Saturday: 9:30 AM to 8:00 PM | Sunday: Closed";

export const SCOOTER_MODELS: ScooterModel[] = [
  {
    id: 'nexus',
    name: 'Ampere Nexus',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    range: '136 km',
    topSpeed: '93 kmph',
    chargingTime: '3.3 Hours',
    batteryType: 'LFP (Lithium Iron Phosphate)',
    price: '₹ 1,09,900*',
    description: 'The high-performance flagship EV designed for the modern rider.',
    features: ['Disc Brakes', 'LED Headlamps', 'Bluetooth Connectivity']
  },
  {
    id: 'magnus-ex',
    name: 'Ampere Magnus EX',
    image: 'https://images.unsplash.com/photo-1594411643387-3475f46a3626?auto=format&fit=crop&q=80&w=800',
    range: '121 km',
    topSpeed: '50 kmph',
    chargingTime: '6-7 Hours',
    batteryType: 'Lithium-ion',
    price: '₹ 94,900*',
    description: 'The family scooter that combines comfort with exceptional range.',
    features: ['Large Boot Space', 'Comfort Seat', 'Anti-theft Alarm']
  },
  {
    id: 'reo-li',
    name: 'Ampere Reo Li Plus',
    image: 'https://images.unsplash.com/photo-1623079400394-f07956928c3f?auto=format&fit=crop&q=80&w=800',
    range: '70 km',
    topSpeed: '25 kmph',
    chargingTime: '5-6 Hours',
    batteryType: 'Lithium-ion',
    price: '₹ 69,900*',
    description: 'Affordable and perfect for local city commutes and students.',
    features: ['Lightweight', 'Easy to Handle', 'Low Maintenance']
  }
];

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Models', path: '/models' },
  { label: 'Book Test Ride', path: '/book' },
  { label: 'Service', path: '/service' },
  { label: 'Finance', path: '/finance' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
