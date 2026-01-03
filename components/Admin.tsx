
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bike, 
  Settings, 
  LogOut, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  Trash2,
  AlertCircle,
  Eye,
  Edit3,
  X,
  Save,
  RefreshCw,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  User,
  Loader2,
  ExternalLink,
  Copy
} from 'lucide-react';
import { SCOOTER_MODELS } from '../constants';
import { ScooterModel } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<any[]>([]);
  const [models, setModels] = useState<ScooterModel[]>([]);
  const [editingModel, setEditingModel] = useState<ScooterModel | null>(null);
  const [inventoryStatus, setInventoryStatus] = useState<Record<string, string>>({});
  const [siteSettings, setSiteSettings] = useState({
    status: 'Open',
    inquiryMethod: 'WhatsApp'
  });

  useEffect(() => {
    // Check for existing session on load
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Initialize data
    const savedLeads = JSON.parse(localStorage.getItem('test_ride_bookings') || '[]');
    setLeads(savedLeads);

    const savedModels = JSON.parse(localStorage.getItem('custom_scooter_models') || 'null');
    if (!savedModels) {
      setModels(SCOOTER_MODELS);
      localStorage.setItem('custom_scooter_models', JSON.stringify(SCOOTER_MODELS));
    } else {
      setModels(savedModels);
    }

    const savedInv = JSON.parse(localStorage.getItem('admin_inventory_status') || '{}');
    if (Object.keys(savedInv).length === 0) {
      const initial: Record<string, string> = {};
      SCOOTER_MODELS.forEach(m => initial[m.id] = 'In Stock');
      setInventoryStatus(initial);
    } else {
      setInventoryStatus(savedInv);
    }

    const savedSettings = JSON.parse(localStorage.getItem('admin_site_settings') || '{"status":"Open","inquiryMethod":"WhatsApp"}');
    setSiteSettings(savedSettings);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    // Simulate "Secured" verification delay
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticating(false);
      } else {
        setError('Unauthorized credentials. Access Denied.');
        setIsAuthenticating(false);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1200);
  };

  const handleLogout = () => {
    if (window.confirm('Terminate secure management session?')) {
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_authenticated');
      setUsername('');
      setPassword('');
      setError('');
    }
  };

  const deleteLead = (id: number) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem('test_ride_bookings', JSON.stringify(updated));
  };

  const clearAllLeads = () => {
    if (window.confirm('Are you sure you want to delete all leads? This cannot be undone.')) {
      setLeads([]);
      localStorage.setItem('test_ride_bookings', '[]');
    }
  };

  const toggleStock = (id: string) => {
    const statuses = ['In Stock', 'Limited', 'Sold Out'];
    const current = inventoryStatus[id] || 'In Stock';
    const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
    const updated = { ...inventoryStatus, [id]: next };
    setInventoryStatus(updated);
    localStorage.setItem('admin_inventory_status', JSON.stringify(updated));
  };

  const saveSettings = () => {
    localStorage.setItem('admin_site_settings', JSON.stringify(siteSettings));
    alert('Global settings updated successfully!');
  };

  const handleUpdateModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModel) return;

    const updatedModels = models.map(m => m.id === editingModel.id ? editingModel : m);
    setModels(updatedModels);
    localStorage.setItem('custom_scooter_models', JSON.stringify(updatedModels));
    setEditingModel(null);
    alert('Scooter specifications updated.');
  };

  const resetModelsToDefault = () => {
    if (window.confirm('Reset all scooter details to factory defaults?')) {
      setModels(SCOOTER_MODELS);
      localStorage.setItem('custom_scooter_models', JSON.stringify(SCOOTER_MODELS));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-slate-100 px-4">
        <div className={`max-w-md w-full transition-transform duration-500 ${shake ? 'animate-bounce' : ''}`}>
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-400/20 p-10 md:p-12 border border-slate-200 relative overflow-hidden">
            {/* Security Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600"></div>
            
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-emerald-600/30 rotate-3 transform transition-transform hover:rotate-0">
                <Lock size={36} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Showroom Admin</h2>
              <p className="text-slate-500 mt-2 text-sm font-medium">Bharat E Motors • Deoghar Hub</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold flex items-center animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} className="mr-2 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    disabled={isAuthenticating}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-semibold text-slate-900"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    disabled={isAuthenticating}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-semibold text-slate-900"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isAuthenticating}
                className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all transform active:scale-95 shadow-xl disabled:opacity-70 flex items-center justify-center space-x-3"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>Secure Login</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center space-x-2 text-slate-400">
               <ShieldCheck size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Authorized Access Only</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 -mt-16 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white p-8 hidden lg:flex flex-col border-r border-slate-800">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Bike size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-black tracking-tight">Bharat E Motors</h3>
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Management Suite v2.0</p>
        </div>
        
        <nav className="space-y-3 flex-1">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Overview" />
          <SidebarItem id="leads" icon={Users} label={`Leads (${leads.length})`} />
          <SidebarItem id="inventory" icon={Bike} label="Inventory Hub" />
          <SidebarItem id="settings" icon={Settings} label="Configuration" />
        </nav>

        <div className="pt-8 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Logout System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-24 pb-12 px-8 lg:px-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Live Management</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-right px-4">
              <p className="text-xs font-bold text-slate-400 uppercase">Current Admin</p>
              <p className="text-sm font-black text-slate-900">Showroom Manager</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg">
              SM
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Live Leads', val: leads.length, icon: Users, color: 'blue' },
                { label: 'Conversion', val: '12.4%', icon: TrendingUp, color: 'emerald' },
                { label: 'Open Tasks', val: leads.filter(l => !l.contacted).length, icon: AlertCircle, color: 'amber' },
                { label: 'Site Status', val: siteSettings.status, icon: CheckCircle, color: 'purple' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Recent Test Ride Requests</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-emerald-600 text-sm font-bold hover:underline">View CRM</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                      <tr>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Model</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {leads.slice(0, 5).map((lead, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-8 py-4">
                            <p className="font-bold text-slate-900">{lead.name}</p>
                            <p className="text-[10px] text-slate-400">{lead.phone}</p>
                          </td>
                          <td className="px-8 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{lead.model}</span></td>
                          <td className="px-8 py-4 text-slate-500">{lead.date}</td>
                          <td className="px-8 py-4">
                            <button onClick={() => deleteLead(lead.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr><td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">No inquiries recorded.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                 <h3 className="text-xl font-bold mb-6">Inventory Status</h3>
                 <div className="space-y-4">
                    {models.map(m => (
                      <div key={m.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-sm font-bold">{m.name}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                          inventoryStatus[m.id] === 'In Stock' ? 'bg-emerald-500/20 text-emerald-400' : 
                          inventoryStatus[m.id] === 'Limited' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {inventoryStatus[m.id] || 'In Stock'}
                        </span>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setActiveTab('inventory')} className="w-full mt-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-emerald-400 transition-colors">Manage Stock</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm animate-in slide-in-from-right duration-500 overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Lead Database</h3>
                  <p className="text-xs text-slate-500">Manage customer inquiries and bookings</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={clearAllLeads} className="flex items-center space-x-2 text-red-500 hover:bg-red-50 rounded-xl text-sm font-bold transition-colors">
                    <Trash2 size={16} />
                    <span>Purge All</span>
                  </button>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-600/20">Export Records</button>
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                    <tr>
                      <th className="px-8 py-5">Customer</th>
                      <th className="px-8 py-5">Vehicle Choice</th>
                      <th className="px-8 py-5">Booking Date</th>
                      <th className="px-8 py-5">Timestamp</th>
                      <th className="px-8 py-5 text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leads.map((lead, i) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 group">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-900">{lead.name}</p>
                          <p className="text-xs text-slate-400">{lead.phone}</p>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-700">{lead.model}</td>
                        <td className="px-8 py-5 text-sm text-slate-500">{lead.date}</td>
                        <td className="px-8 py-5 text-[10px] font-mono text-slate-300">{new Date(lead.timestamp).toLocaleString()}</td>
                        <td className="px-8 py-5 text-center">
                           <div className="flex justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Eye size={18} /></button>
                             <button onClick={() => deleteLead(lead.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr><td colSpan={5} className="px-8 py-24 text-center text-slate-400">Database is empty. New leads will appear here automatically.</td></tr>
                    )}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500 relative">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Inventory Management</h3>
                <p className="text-xs text-slate-400">Update model specs, pricing, and availability</p>
              </div>
              <button 
                onClick={resetModelsToDefault}
                className="flex items-center space-x-2 px-4 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all"
              >
                <RefreshCw size={14} />
                <span>Reset to Default</span>
              </button>
            </div>

            {/* Editing Modal/Overlay */}
            {editingModel && (
              <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in zoom-in duration-200">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">Edit Scooter: {editingModel.name}</h3>
                      <p className="text-sm text-slate-400 font-medium">Real-time Catalog Synchronization</p>
                    </div>
                    <button onClick={() => setEditingModel(null)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                      <X size={28} />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateModel} className="space-y-12">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                      {/* Left Column: Form Details */}
                      <div className="xl:col-span-7 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Model Name</label>
                            <input 
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
                              value={editingModel.name}
                              onChange={(e) => setEditingModel({...editingModel, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Price Label</label>
                            <input 
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-600"
                              value={editingModel.price}
                              onChange={(e) => setEditingModel({...editingModel, price: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                            <span>Direct Image URL</span>
                            <span className="text-[10px] text-emerald-500 lowercase normal-case">Supported: Unsplash, Imgur, CDN links</span>
                          </label>
                          <div className="relative group">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                              required
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-600 text-sm"
                              placeholder="https://images.unsplash.com/..."
                              value={editingModel.image}
                              onChange={(e) => setEditingModel({...editingModel, image: e.target.value})}
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(editingModel.image);
                                alert('URL copied to clipboard');
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Range</label>
                            <input 
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                              value={editingModel.range}
                              onChange={(e) => setEditingModel({...editingModel, range: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Top Speed</label>
                            <input 
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                              value={editingModel.topSpeed}
                              onChange={(e) => setEditingModel({...editingModel, topSpeed: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sales Description</label>
                          <textarea 
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium text-slate-600 leading-relaxed"
                            value={editingModel.description}
                            onChange={(e) => setEditingModel({...editingModel, description: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Right Column: Live Media Preview */}
                      <div className="xl:col-span-5 space-y-6">
                         <div className="flex items-center justify-between">
                            <p className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">High-Fidelity Preview</p>
                            <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Real-Time</span>
                         </div>
                         
                         <div className="relative group rounded-[2.5rem] overflow-hidden bg-slate-100 border-2 border-slate-200 aspect-[4/3] shadow-inner flex items-center justify-center">
                            {editingModel.image ? (
                              <>
                                <img 
                                  key={editingModel.image}
                                  src={editingModel.image} 
                                  className="w-full h-full object-cover transition-opacity duration-300 animate-in fade-in" 
                                  alt="Live Preview"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const fallback = parent.querySelector('.fallback-notice');
                                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                    }
                                  }}
                                  onLoad={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'block';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const fallback = parent.querySelector('.fallback-notice');
                                      if (fallback) (fallback as HTMLElement).style.display = 'none';
                                    }
                                  }}
                                />
                                <div className="fallback-notice hidden absolute inset-0 flex-col items-center justify-center text-slate-400 bg-slate-50">
                                   <AlertCircle size={48} className="mb-4 opacity-20" />
                                   <p className="font-black text-xs uppercase tracking-widest opacity-40">Invalid Image URL</p>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center text-slate-400">
                                <ImageIcon size={64} className="mb-4 opacity-10" />
                                <p className="font-black text-xs uppercase tracking-widest opacity-20">Awaiting URL Source</p>
                              </div>
                            )}
                            
                            {/* Overlay Badge */}
                            <div className="absolute top-6 left-6 flex space-x-2">
                               <div className="bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-wider">4:3 Aspect</div>
                               <div className="bg-emerald-600/90 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-wider">Catalog Ready</div>
                            </div>
                         </div>

                         <div className="p-6 bg-slate-900 rounded-[2rem] text-white border border-slate-800">
                            <div className="flex items-start space-x-3">
                               <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><CheckCircle size={18} /></div>
                               <div>
                                  <p className="text-sm font-bold">Automatic Sync</p>
                                  <p className="text-xs text-slate-400 leading-relaxed mt-1">Changes to images and specs reflect instantly on the Home and Models page for all customers.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={() => setEditingModel(null)} 
                        className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors bg-slate-50 md:bg-transparent rounded-2xl"
                      >
                        Cancel Edits
                      </button>
                      <button 
                        type="submit" 
                        className="px-14 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-500 shadow-2xl shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center space-x-3"
                      >
                        <Save size={20} />
                        <span>Publish Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {models.map(model => (
                <div key={model.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img src={model.image} alt={model.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-xl ${
                      inventoryStatus[model.id] === 'Sold Out' ? 'bg-red-500' : 
                      inventoryStatus[model.id] === 'Limited' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}>
                      {inventoryStatus[model.id] || 'In Stock'}
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{model.name}</h3>
                      <button 
                        onClick={() => setEditingModel(model)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                    <p className="text-emerald-600 font-black mb-4">{model.price}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest bg-slate-50 p-2 rounded-lg">
                        Range: <span className="text-slate-900">{model.range}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest bg-slate-50 p-2 rounded-lg">
                        Speed: <span className="text-slate-900">{model.topSpeed}</span>
                      </div>
                    </div>

                    <div className="mt-auto space-y-2">
                      <button 
                        onClick={() => toggleStock(model.id)}
                        className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2"
                      >
                        <RefreshCw size={14} />
                        <span>Toggle Status</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 md:p-16 animate-in fade-in duration-500">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Platform Configuration</h2>
              <p className="text-slate-500 mb-12">Control global showroom parameters and customer inquiry routing.</p>
              
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <AlertCircle size={14} />
                      <span>Showroom Global Status</span>
                    </label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                      {['Open', 'Closed', 'Holiday'].map(s => (
                        <button 
                          key={s}
                          onClick={() => setSiteSettings({...siteSettings, status: s})}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${siteSettings.status === s ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <MessageSquare size={14} />
                      <span>Preferred Contact Route</span>
                    </label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                      {['WhatsApp', 'Call'].map(m => (
                        <button 
                          key={m}
                          onClick={() => setSiteSettings({...siteSettings, inquiryMethod: m})}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${siteSettings.inquiryMethod === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-start space-x-4">
                   <div className="p-3 bg-white text-amber-500 rounded-xl shadow-sm"><Settings size={20} /></div>
                   <div>
                      <p className="font-bold text-slate-900 text-sm">Automated Alerts</p>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">Changes here reflect immediately across the public website. Toggle "Closed" to display a notice on the homepage for customers visiting during off-hours.</p>
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <button onClick={saveSettings} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                    Save Site Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
