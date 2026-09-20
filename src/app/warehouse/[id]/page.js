'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { 
  LayoutDashboard, Truck, Wrench, Building2, QrCode, FileText, 
  ClipboardCheck, BarChart2, Settings, Lock, Bell, AlertTriangle, 
  ShieldAlert, Plus, Package, Maximize2, ChevronDown, ChevronUp,
  Wifi, WifiOff, Download, Filter, Search, Calendar, CheckCircle2, Clock, AlertCircle 
} from 'lucide-react';
export default function SingleWarehousePage() {
  const params = useParams();
  const router = useRouter();

  // ከ URL ወይም ከ Default 'adama' መሠረት የተመረጠውን ብራንች መለየት
  const rawId = params?.id || 'adama'; 
  const warehouseId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [activeTab, setActiveTab] = useState('warehouses');

  // 1. ለእያንዳንዱ ብራንች የተዘጋጀ ዳታቤዝ (Branch-Specific Data)
  const warehouseDatabase = {
    'addis-ababa': {
      id: 'addis-ababa',
      name: 'ADDIS ABABA CENTRAL HQ',
      shortName: 'Addis Ababa HQ',
      panelTitle: 'Addis Ababa HQ Warehouse Management Dashboard',
      manager: 'Abebe Bikila',
      role: 'HQ General Warehouse Manager',
      locationTag: 'Addis Ababa HQ',
      totalValue: 'ETB 112.4M',
      utilization: '92%',
      pendingTransfers: '12',
      discrepancyRate: '0.02%',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      transfers: [
        { id: 1, item: '20 TAFE Tractors', source: 'Importing / Port', type: 'Outgoing', status: 'In Transit' },
        { id: 2, item: '100 Rain-gun Pumps', source: 'Local Supplier', type: 'Incoming', status: 'Received' },
      ],
      shelfTracking: [
        { name: 'TAFE Tractor Engine Assemblies', rack: 'Rack A', aisle: 'Aisle 1', shelf: 'Shelf 1', status: 'In Stock', risk: false },
        { name: 'High-Pressure Irrigation Kits', rack: 'Rack C', aisle: 'Aisle 3', shelf: 'Shelf 2', status: 'In Stock', risk: false },
      ],
      scannerActivity: [
        { staff: 'Dawit M.', scans: 45, accuracy: '98%', lastActive: 'Exp 78b, 2026' },
        { staff: 'Marta T.', scans: 28, accuracy: '100%', lastActive: 'Feb 18b, 2026' },
      ],
      staff: [
        { name: 'Dawit M.', scans: 45, accuracy: '98%', lastActive: 'Exp 78b, 2026' },
        { name: 'Marta T.', scans: 28, accuracy: '100%', lastActive: 'Feb 18b, 2026' },
      ],
      alerts: [
        { title: 'Heavy Duty Oil Filters - Batch HQ', count: '50 units', critical: true },
      ],
      lowStock: [
        { title: 'Heavy Duty Oil Filters - Batch HQ', count: '50 units', critical: true },
      ]
    },
    'adama': {
      id: 'adama',
      name: 'ADAMA BRANCH',
      shortName: 'Adama Branch',
      panelTitle: 'Adama Branch Warehouse Management Dashboard',
      manager: 'Kenenisa Bekele',
      role: 'Adama Branch Manager',
      locationTag: 'Adama Branch',
      totalValue: 'ETB 68.1M',
      utilization: '82%',
      pendingTransfers: '5',
      discrepancyRate: '0.08%',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      transfers: [
        { id: 1, item: '10 TAFE Tractors', source: 'From HQ', type: 'Shipped', status: 'Shipped' },
        { id: 2, item: '50 Rain-gun Pumps', source: 'From HQ', type: 'Shipped', status: 'Shipped' },
      ],
      shelfTracking: [
        { name: 'TAFE Tractor Piston Rings', rack: 'Rack B', aisle: 'Aisle 2', shelf: 'Shelf 3', status: 'In Stock', risk: false },
        { name: 'Rain-gun Pumps', rack: 'Rack D', aisle: 'Aisle 1', shelf: 'Shelf 1', status: 'Critical Risk', risk: true },
      ],
      scannerActivity: [
        { staff: 'Aberra G.', scans: 13, accuracy: '100%', lastActive: 'Exp 78b, 2026' },
        { staff: 'Tsehay N.', scans: 13, accuracy: '93%', lastActive: 'Feb 18b, 2026' },
        { staff: 'Keneni R.', scans: 30, accuracy: '100%', lastActive: 'Feb 18b, 2026' },
      ],
      staff: [
        { name: 'Aberra G.', scans: 13, accuracy: '100%', lastActive: 'Exp 78b, 2026' },
        { name: 'Tsehay N.', scans: 13, accuracy: '93%', lastActive: 'Feb 18b, 2026' },
        { name: 'Keneni R.', scans: 30, accuracy: '100%', lastActive: 'Feb 18b, 2026' },
      ],
      alerts: [
        { title: 'Rain-gun Pump Seals - Batch A1', count: '15 units', critical: true },
        { title: 'TAFE Tractor Filters - Serial B7', count: '18 units', critical: true },
      ],
      lowStock: [
        { title: 'Rain-gun Pump Seals - Batch A1', count: '15 units', critical: true },
        { title: 'TAFE Tractor Filters - Serial B7', count: '18 units', critical: true },
      ]
    },
    'bahir-dar': {
      id: 'bahir-dar',
      name: 'BAHIR DAR BRANCH',
      shortName: 'Bahir Dar Branch',
      panelTitle: 'Bahir Dar Branch Warehouse Management Dashboard',
      manager: 'Almaz Ayana',
      role: 'Bahir Dar Hub Supervisor',
      locationTag: 'Bahir Dar Branch',
      totalValue: 'ETB 42.5M',
      utilization: '74%',
      pendingTransfers: '3',
      discrepancyRate: '0.04%',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      transfers: [
        { id: 1, item: '5 TAFE Tractors', source: 'From HQ', type: 'Pending', status: 'In Transit' },
      ],
      shelfTracking: [
        { name: 'Water Pump Nozzles', rack: 'Rack A', aisle: 'Aisle 1', shelf: 'Shelf 2', status: 'In Stock', risk: false },
      ],
      scannerActivity: [
        { staff: 'Sileshi B.', scans: 22, accuracy: '95%', lastActive: 'Feb 18b, 2026' },
      ],
      staff: [
        { name: 'Sileshi B.', scans: 22, accuracy: '95%', lastActive: 'Feb 18b, 2026' },
      ],
      alerts: [
        { title: 'Hydraulic Hoses - BD-02', count: '8 units', critical: true },
      ],
      lowStock: [
        { title: 'Hydraulic Hoses - BD-02', count: '8 units', critical: true },
      ]
    }
  };

  // 2. በዲዛይኑ ያልተመዘገበ አዲስ ብራንች (እንደ Bishoftu) ሲገባ Safety Fallback Object
  const formattedTitle = warehouseId ? warehouseId.replace(/-/g, ' ').toUpperCase() : 'BRANCH';
  const currentWh = warehouseDatabase[warehouseId] || {
    id: warehouseId,
    name: `${formattedTitle} BRANCH`,
    shortName: `${formattedTitle} Branch`,
    panelTitle: `${formattedTitle} Branch Warehouse Management Dashboard`,
    manager: 'Assigned Manager',
    role: 'Branch Warehouse Supervisor',
    locationTag: `${formattedTitle} Branch`,
    totalValue: 'ETB 0.00M',
    utilization: '0%',
    pendingTransfers: '0',
    discrepancyRate: '0.00%',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    transfers: [],
    shelfTracking: [],
    scannerActivity: [],
    staff: [],
    alerts: [],
    lowStock: [] 
  };

  // Safe Arrays (ባዶ ከሆኑ ወይም ያልተገለጹ ከሆኑ እንዳይበላሹ)
  const safeTransfers = currentWh.transfers || [];
  const safeShelfTracking = currentWh.shelfTracking || [];
  const safeScannerActivity = currentWh.scannerActivity || [];
  const safeStaff = currentWh.staff || [];
  const safeAlerts = currentWh.alerts || [];
  const safeLowStock = currentWh.lowStock || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans antialiased select-none">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1b222c] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 sticky top-0">
        
        {/* LOGO */}
        <div className="p-4 flex items-center gap-3 border-b border-slate-800/60 shrink-0 bg-[#1b222c]">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 border-2 border-cyan-500 overflow-hidden shrink-0 shadow-sm">
            <img 
              src="/jabdu-logo.jpg" 
              alt="Jabdu Motors Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-xs text-white tracking-wide leading-tight">JABDU MOTORS S.C.</h1>
            <p className="text-[10px] font-amharic text-slate-400">ጃብዱ ሞተርስ</p>
            <p className="text-[9px] text-slate-500 font-medium">Stock Pro</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="p-3 space-y-1 text-xs font-medium flex-1 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('machinery')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${activeTab === 'machinery' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 shrink-0" />
              <span>Machinery & Irrigation Pumps</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          <button 
            onClick={() => setActiveTab('spare-parts')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${activeTab === 'spare-parts' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <div className="flex items-center gap-3">
              <Wrench className="h-4 w-4 shrink-0" />
              <span>Spare Parts & Products</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* WAREHOUSES BUTTON (ቀጥታ የዚያን አካውንት/ብራንች መረጃ ብቻ ያሳያል) */}
          <button 
            onClick={() => setActiveTab('warehouses')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'warehouses' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            <span>Warehouses</span>
          </button>

          <button 
            onClick={() => setActiveTab('scanner')} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'scanner' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <QrCode className="h-4 w-4 shrink-0" />
            <span>QR/Barcode Scanner</span>
          </button>

          <button 
            onClick={() => setActiveTab('reports')} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'reports' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Reports</span>
          </button>

          <button 
            onClick={() => setActiveTab('audits')} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'audits' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <ClipboardCheck className="h-4 w-4 shrink-0" />
            <span>Audits</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'analytics' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <BarChart2 className="h-4 w-4 shrink-0" />
            <span>Analytics</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')} 
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${activeTab === 'settings' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Settings</span>
          </button>
        </nav>

        {/* POWERED BY FOOTER */}
        <div className="p-3 border-t border-slate-800/80 bg-[#151b23] shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                Powered By
              </p>
              <p className="text-xs font-bold text-white tracking-wide">
                FaidATech
              </p>
            </div>
            <div className="w-20 h-8 rounded bg-white flex items-center justify-center px-1.5 py-1 shadow-sm shrink-0">
              <img 
                src="/faidatech-logo.png" 
                alt="FaidATech Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {currentWh.panelTitle}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-medium text-slate-600">Friday, September 18, 2026</span>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img 
                src={currentWh.avatar} 
                alt="Manager Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm" 
              />
              <div className="text-left leading-tight">
                <h4 className="text-xs font-bold text-slate-900">{currentWh.manager}</h4>
                <p className="text-[10px] text-slate-500">{currentWh.role}</p>
                <p className="text-[9px] font-semibold text-cyan-700">{currentWh.locationTag}</p>
              </div>
            </div>
          </div>
        </header>
        {/* --- SCOPED DASHBOARD CONTENT --- */}
        {activeTab === 'dashboard' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* 1. TOP 4 SCOPED KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <p className="text-xs font-medium text-slate-500">In-Store Stock Value</p>
                <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.totalValue || 'ETB 0.00M'}</h2>
                <span className="text-[10px] text-slate-400 font-medium">scoped down</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-slate-500">Warehouse Utilization ({currentWh.shortName})</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.utilization || '0%'}</h2>
                </div>
                <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-lg">
                  <Building2 className="h-5 w-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-slate-500">Pending Transfer Requests</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.pendingTransfers || '0'}</h2>
                </div>
                <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-slate-500">Local Discrepancy Rate ({currentWh.shortName})</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.discrepancyRate || '0.00%'}</h2>
                </div>
                <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
                  <ShieldAlert className="h-5 w-5" />
                </div>
              </div>

            </div>

            {/* 2. MIDDLE ROW: SCOPED TRANSFERS TABLE & SHELF OCCUPANCY CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Inter-Warehouse Transfer Requests */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Inter-Warehouse Transfer Requests</h3>
                    <span className="text-[11px] text-slate-400 font-medium">Scoped for {currentWh.shortName}</span>
                  </div>
                  <button className="bg-[#ce2a37] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition flex items-center gap-1 shadow-xs">
                    <Plus className="h-3.5 w-3.5" /> Create Order
                  </button>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">Item Name</th>
                      <th className="pb-2">Incoming (from HQ)</th>
                      <th className="pb-2">Outgoing</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {safeTransfers.length > 0 ? (
                      safeTransfers.map((req, idx) => {
                        const statusColor = 
                          req.status === 'Outgoing' ? 'bg-[#3b5998]' :
                          req.status === 'Shipped' ? 'bg-slate-800' :
                          'bg-[#ce2a37]';
                        
                        return (
                          <tr key={req.id || idx}>
                            <td className="py-3 font-semibold text-slate-800">{req.item}</td>
                            <td className="py-3 text-slate-500">{req.incoming || req.source || 'from HQ'}</td>
                            <td className="py-3 text-slate-500">{req.outgoing || req.type || 'To Branch'}</td>
                            <td className="py-3 text-right">
                              <span className={`${statusColor} text-white font-semibold text-[10px] px-2.5 py-1 rounded-full`}>
                                {req.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-slate-400 italic">ምንም አይነት Transfer Request የለም።</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Right: Shelf Occupancy Bar Chart */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-slate-900">Shelf Occupancy by Product Category</h3>
                  <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {currentWh.shortName}
                  </span>
                </div>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={
                        currentWh.occupancy && currentWh.occupancy.length > 0 
                          ? currentWh.occupancy 
                          : [
                              { category: 'Spares', Spare: 70, Category: 50 },
                              { category: 'Machinery', Spare: 35, Category: 65 },
                              { category: 'Irrigation', Spare: 50, Category: 28 },
                              { category: 'Spares II', Spare: 40, Category: 28 },
                              { category: 'Canopy', Spare: 28, Category: 14 }
                            ]
                      }
                    >
                      <XAxis dataKey="category" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Bar dataKey="Spare" fill="#00a8cc" radius={[2, 2, 0, 0]} name="Spare" />
                      <Bar dataKey="Category" fill="#ce2a37" radius={[2, 2, 0, 0]} name="Category" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* 3. BOTTOM ROW: SCANNER PERFORMANCE & LOCAL ALERTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Scanner Operator Activity & Performance */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-900">Scanner Operator Activity & Performance ({currentWh.shortName} Staff)</h3>
                  <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Viera Staff</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">Staff</th>
                      <th className="pb-2">Scans Today</th>
                      <th className="pb-2">Accuracy</th>
                      <th className="pb-2 text-right">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {safeStaff.length > 0 ? (
                      safeStaff.map((st, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 flex items-center gap-2 font-semibold text-slate-800">
                            {st.avatar ? (
                              <img src={st.avatar} alt={st.name || st.staff} className="w-6 h-6 rounded-full object-cover" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                                {(st.name || st.staff || 'U').charAt(0)}
                              </div>
                            )}
                            {st.name || st.staff}
                          </td>
                          <td className="py-2.5 text-slate-700 font-bold">{st.scans}</td>
                          <td className="py-2.5 text-slate-700 font-bold">{st.accuracy}</td>
                          <td className="py-2.5 text-right text-slate-500">{st.lastActive}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-slate-400 italic">ምንም አይነት ንቁ Scanner Operator የለም።</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Right: Local Low Stock & Expiry Alerts */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-900">Local Low Stock & Expiry Alerts</h3>
                  <span className="bg-[#ce2a37] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    ({currentWh.shortName} Stock)
                  </span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">SKU</th>
                      <th className="pb-2 text-right">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {safeLowStock.length > 0 ? (
                      safeLowStock.map((alert, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                            {alert.sku || alert.title}
                          </td>
                          <td className="py-2.5 text-right font-bold text-slate-900">{alert.items || alert.count}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-4 text-center text-slate-400 italic">ምንም አይነት Low Stock አልተመዘገበም።</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </main>
        )}

{/* --- 2. MACHINERY & IRRIGATION PUMPS TAB CONTENT --- */}
          {activeTab === 'machinery' && (
            <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
              
              {/* 1. TOP 4 KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: In-Store Machinery Stock Value */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <p className="text-xs font-medium text-slate-500">In-Store Machinery Stock Value</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.machineryValue || "ETB 42.5M"}</h2>
                  <span className="text-[10px] text-slate-400 font-medium">scoped down</span>
                </div>

                {/* Card 2: Tractors Available */}
                <div className="bg-[#ce2a37] p-4 rounded-xl text-white shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-white/80">Tractors Available ({currentWh.shortName})</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.tractorsCount || "18"} <span className="text-sm font-semibold">Units</span></h2>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Card 3: Irrigation Pumps */}
                <div className="bg-[#a5f3fc] p-4 rounded-xl text-slate-900 shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-slate-700">Irrigation Pumps ({currentWh.shortName})</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.irrigationCount || "142"} <span className="text-sm font-semibold">Units</span></h2>
                  </div>
                  <div className="p-2 bg-cyan-600/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-cyan-800" />
                  </div>
                </div>

                {/* Card 4: Maintenance Status */}
                <div className="bg-[#ce2a37] p-4 rounded-xl text-white shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-white/80">Maintenance Status ({currentWh.shortName})</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.maintenanceCount || "3"} <span className="text-sm font-semibold">Under Inspection</span></h2>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                </div>

              </div>

              {/* 2. MIDDLE ROW: DETAILED MACHINERY STOCK & STOCK AVAILABILITY CHART */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Detailed Machinery Stock */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Detailed Machinery Stock (Scoped for {currentWh.shortName})</h3>
                    <button className="bg-[#ce2a37] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition flex items-center gap-1 shadow-xs">
                      <Plus className="h-3.5 w-3.5" /> Create Order
                    </button>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Model</th>
                        <th className="pb-2">Stock Qty</th>
                        <th className="pb-2">Unit Value</th>
                        <th className="pb-2">Location</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.machineryStock && currentWh.machineryStock.length > 0 ? (
                        currentWh.machineryStock.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-3 font-semibold text-slate-800">{item.category}</td>
                            <td className="py-3 text-slate-600 font-medium">{item.model}</td>
                            <td className="py-3 text-slate-700 font-bold">{item.qty}</td>
                            <td className="py-3 text-slate-600">{item.unitValue}</td>
                            <td className="py-3 text-slate-600">{item.location}</td>
                            <td className="py-3 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-1 rounded-full ${
                                item.status === 'In Stock' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-3 font-semibold text-slate-800" rowSpan={2}>TAFE Tractors</td>
                            <td className="py-3 text-slate-600 font-medium">45DI</td>
                            <td className="py-3 text-slate-700 font-bold">30</td>
                            <td className="py-3 text-slate-600">42.5M</td>
                            <td className="py-3 text-slate-600">In Stama</td>
                            <td className="py-3 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">In Stock</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 text-slate-600 font-medium">75DI</td>
                            <td className="py-3 text-slate-700 font-bold">75</td>
                            <td className="py-3 text-slate-600">40.0M</td>
                            <td className="py-3 text-slate-600">Bahir Dar</td>
                            <td className="py-3 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">In Stock</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 font-semibold text-slate-800" rowSpan={2}>Irrigation Pumps</td>
                            <td className="py-3 text-slate-600 font-medium">Solar</td>
                            <td className="py-3 text-slate-700 font-bold">160</td>
                            <td className="py-3 text-slate-600">3800M</td>
                            <td className="py-3 text-slate-600">In Stama</td>
                            <td className="py-3 text-right">
                              <span className="bg-red-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">Low</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 text-slate-600 font-medium">Engine</td>
                            <td className="py-3 text-slate-700 font-bold">50</td>
                            <td className="py-3 text-slate-600">4200M</td>
                            <td className="py-3 text-slate-600">Bahir Dar</td>
                            <td className="py-3 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">In Stock</span>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Stock Availability by Category Chart */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-slate-900">Stock Availability by Category</h3>
                    <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Machinery</span>
                  </div>

                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentWh.machineryChartData || [
                        { name: 'Tractors', Tractors: 75, Category: 65 },
                        { name: 'Solar Pumps', Tractors: 30, Category: 25 },
                        { name: 'Engine Pumps', Tractors: 55, Category: 48 },
                        { name: 'Spares', Tractors: 22, Category: 5 },
                        { name: 'Heavy Machinery', Tractors: 3, Category: 2 },
                      ]}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Bar dataKey="Tractors" fill="#00a8cc" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Category" fill="#ce2a37" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* 3. BOTTOM ROW: MAINTENANCE LOG & LOW STOCK ALERTS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Active Machinery Maintenance Log */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Active Machinery Maintenance Log ({currentWh.shortName} Workshop)</h3>
                    <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Viern Staff</span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Unit ID</th>
                        <th className="pb-2">Model</th>
                        <th className="pb-2">Issue</th>
                        <th className="pb-2">Scheduled Date</th>
                        <th className="pb-2">Assigned Tech</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.maintenanceLog && currentWh.maintenanceLog.length > 0 ? (
                        currentWh.maintenanceLog.map((log, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{log.unitId}</td>
                            <td className="py-2.5 text-slate-700 font-medium">{log.model}</td>
                            <td className="py-2.5 text-slate-600">{log.issue}</td>
                            <td className="py-2.5 text-slate-600">{log.date}</td>
                            <td className="py-2.5 text-slate-700 font-medium">{log.tech}</td>
                            <td className="py-2.5 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-1 rounded-full ${
                                log.status === 'Ready' ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-slate-900'
                              }`}>
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">00001</td>
                            <td className="py-2.5 text-slate-700 font-medium">45DI</td>
                            <td className="py-2.5 text-slate-600 truncate max-w-[100px]">Issue in issu...</td>
                            <td className="py-2.5 text-slate-600">Feb Feb, 2026</td>
                            <td className="py-2.5 text-slate-700 font-medium">Assigned A</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-amber-400 text-slate-900 font-semibold text-[10px] px-2.5 py-1 rounded-full">In Repair</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">00003</td>
                            <td className="py-2.5 text-slate-700 font-medium">75DI</td>
                            <td className="py-2.5 text-slate-600">Solar Pumps</td>
                            <td className="py-2.5 text-slate-600">Feb Feb, 2026</td>
                            <td className="py-2.5 text-slate-700 font-medium">Assigned T</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">Ready</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">00007</td>
                            <td className="py-2.5 text-slate-700 font-medium">75DI</td>
                            <td className="py-2.5 text-slate-600">In Repair</td>
                            <td className="py-2.5 text-slate-600">Feb Feb, 2026</td>
                            <td className="py-2.5 text-slate-700 font-medium">Assigned R</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">Ready</span>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Local Low Stock & Expiry Alerts */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Local Low Stock & Expiry Alerts</h3>
                    <span className="bg-[#ce2a37] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      (Machinery Stock)
                    </span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">SKU</th>
                        <th className="pb-2 text-right">Items</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.machineryAlerts && currentWh.machineryAlerts.length > 0 ? (
                        currentWh.machineryAlerts.map((alert, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              {alert.sku}
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">{alert.items}</td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              Solar Controller SPC-009
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">5 units</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              Pump Impellers - SN-BZ
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">18 units</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              TAFE Piston Rings
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">8 units</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </main>
          )}
          {/* --- 3. SPARE PARTS & PRODUCTS TAB CONTENT --- */}
          {activeTab === 'spare-parts' && (
            <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
              
              {/* 1. TOP 4 KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: In-Store Spare Parts Value */}
                <div className="bg-[#e0f2fe]/60 p-4 rounded-xl border border-sky-100 shadow-2xs">
                  <p className="text-xs font-medium text-slate-600">In-Store Spare Parts Value</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.sparePartsValue || "ETB 21.8M"}</h2>
                  <span className="text-[10px] text-slate-500 font-medium">scoped down</span>
                </div>

                {/* Card 2: Critical Spare SKUs */}
                <div className="bg-[#ce2a37] p-4 rounded-xl text-white shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-white/80">Critical Spare SKUs ({currentWh.shortName})</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.criticalSkusCount || "12"} <span className="text-sm font-semibold">Units</span></h2>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Card 3: Fast-Moving Spares */}
                <div className="bg-[#fecdd3] p-4 rounded-xl text-slate-900 shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-rose-900">Fast-Moving Spares ({currentWh.shortName})</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.fastMovingCount || "28"} <span className="text-sm font-semibold">items</span></h2>
                  </div>
                  <div className="p-2 bg-rose-900/10 rounded-lg">
                    <Package className="h-5 w-5 text-rose-900" />
                  </div>
                </div>

                {/* Card 4: Shelf Occupancy Rate */}
                <div className="bg-[#a5f3fc] p-4 rounded-xl text-slate-900 shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-cyan-950">Shelf Occupancy Rate (Spare Racks)</p>
                    <h2 className="text-2xl font-black mt-1">{currentWh.occupancyRate || "88%"}</h2>
                  </div>
                  <div className="p-2 bg-cyan-800/10 rounded-lg">
                    <Maximize2 className="h-5 w-5 text-cyan-900" />
                  </div>
                </div>

              </div>

              {/* 2. MIDDLE ROW: DETAILED SPARE PARTS STOCK & SUB-CATEGORY CHART */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Detailed Spare Parts Stock */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Detailed Spare Parts Stock (Scoped for {currentWh.shortName})</h3>
                    <div className="flex items-center gap-2">
                      <button className="bg-cyan-500 text-white text-[11px] font-bold px-2.5 py-1 rounded hover:bg-cyan-600 transition">
                        Create Reorder
                      </button>
                      <button className="bg-[#ce2a37] text-white text-[11px] font-bold px-2.5 py-1 rounded hover:bg-red-700 transition">
                        Import New SKUs
                      </button>
                    </div>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">SKU</th>
                        <th className="pb-2">Part Name</th>
                        <th className="pb-2">Sub-Category</th>
                        <th className="pb-2">Unit Value</th>
                        <th className="pb-2">Qty in Stock</th>
                        <th className="pb-2">Location</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.sparePartsStock && currentWh.sparePartsStock.length > 0 ? (
                        currentWh.sparePartsStock.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{item.sku}</td>
                            <td className="py-2.5 text-slate-700 font-medium">{item.partName}</td>
                            <td className="py-2.5 text-slate-600">{item.subCategory}</td>
                            <td className="py-2.5 text-slate-600">{item.unitValue}</td>
                            <td className="py-2.5 text-slate-800 font-bold">{item.qty}</td>
                            <td className="py-2.5 text-slate-600">{item.location}</td>
                            <td className="py-2.5 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full ${
                                item.status === 'In Stock' ? 'bg-emerald-600 text-white' :
                                item.status === 'Low Stock' ? 'bg-amber-300 text-slate-900' : 'bg-[#ce2a37] text-white'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">SKU4501</td>
                            <td className="py-2.5 text-slate-700 font-medium">TAFE 45DI Piston Rings</td>
                            <td className="py-2.5 text-slate-600">Engine Components</td>
                            <td className="py-2.5 text-slate-600">18,200</td>
                            <td className="py-2.5 text-slate-800 font-bold">150</td>
                            <td className="py-2.5 text-slate-600">Shelf 3</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">In Stock</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">SKU7522</td>
                            <td className="py-2.5 text-slate-700 font-medium">TAFE 75DI Fuel Filter</td>
                            <td className="py-2.5 text-slate-600">Filters & Hydraulics</td>
                            <td className="py-2.5 text-slate-600">4,100</td>
                            <td className="py-2.5 text-slate-800 font-bold">85</td>
                            <td className="py-2.5 text-slate-600">Shelf 1</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-amber-300 text-slate-900 font-semibold text-[10px] px-2.5 py-0.5 rounded-full">Low Stock</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">SKU-RG01</td>
                            <td className="py-2.5 text-slate-700 font-medium">Rain-gun Pump Impeller</td>
                            <td className="py-2.5 text-slate-600">Irrigation Parts</td>
                            <td className="py-2.5 text-slate-600">12,500</td>
                            <td className="py-2.5 text-slate-800 font-bold">20</td>
                            <td className="py-2.5 text-slate-600">Shelf 2</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-[#ce2a37] text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">Critical</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">SKU5050</td>
                            <td className="py-2.5 text-slate-700 font-medium">Solar Controller Case</td>
                            <td className="py-2.5 text-slate-600">Electronics</td>
                            <td className="py-2.5 text-slate-600">3,800</td>
                            <td className="py-2.5 text-slate-800 font-bold">30</td>
                            <td className="py-2.5 text-slate-600">Shelf 4</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">In Stock</span>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Stock Availability by Spare Sub-Category Chart */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-slate-900">Stock Availability by Spare Sub-Category</h3>
                    <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">{currentWh.shortName}</span>
                  </div>

                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentWh.spareCategoryChartData || [
                        { name: 'Engine Parts', Tractors: 70, Category: 65 },
                        { name: 'Filters & Hydraulics', Tractors: 40, Category: 58 },
                        { name: 'Irrigation Spares', Tractors: 28, Category: 18 },
                        { name: 'Electronics', Tractors: 60, Category: 28 },
                        { name: 'Others', Tractors: 50, Category: 15 },
                      ]}>
                        <XAxis dataKey="name" tick={{ fontSize: 8 }}Interval={0} />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Bar dataKey="Tractors" fill="#00a8cc" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="Category" fill="#ce2a37" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* 3. BOTTOM ROW: PENDING REORDERS & CRITICAL SPARE ALERTS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Pending Spare Parts Reorders */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Pending Spare Parts Reorders ({currentWh.shortName} Branch)</h3>
                    <button className="bg-[#ce2a37] text-white text-[11px] font-bold px-2.5 py-1 rounded hover:bg-red-700 transition">
                      Import New SKUs
                    </button>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Order ID</th>
                        <th className="pb-2">Part Name</th>
                        <th className="pb-2">Supplier</th>
                        <th className="pb-2">Qty</th>
                        <th className="pb-2">Estimated Arrival</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.pendingReorders && currentWh.pendingReorders.length > 0 ? (
                        currentWh.pendingReorders.map((order, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{order.orderId}</td>
                            <td className="py-2.5 text-slate-700 font-medium">{order.partName}</td>
                            <td className="py-2.5 text-slate-600">{order.supplier}</td>
                            <td className="py-2.5 text-slate-800 font-bold">{order.qty}</td>
                            <td className="py-2.5 text-slate-600">{order.eta}</td>
                            <td className="py-2.5 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full ${
                                order.status === 'Shipped' ? 'bg-emerald-600 text-white' :
                                order.status === 'Pending' ? 'bg-amber-300 text-slate-900' : 'bg-sky-500 text-white'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">A1101</td>
                            <td className="py-2.5 text-slate-700 font-medium">Piston Rings</td>
                            <td className="py-2.5 text-slate-600">TAFE India</td>
                            <td className="py-2.5 text-slate-800 font-bold">50</td>
                            <td className="py-2.5 text-slate-600">Oct 10, 2026</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">Shipped</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">B1202</td>
                            <td className="py-2.5 text-slate-700 font-medium">Rain-gun Seals</td>
                            <td className="py-2.5 text-slate-600">Apex Hydraulics</td>
                            <td className="py-2.5 text-slate-800 font-bold">200</td>
                            <td className="py-2.5 text-slate-600">Sept 25, 2026</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-amber-300 text-slate-900 font-semibold text-[10px] px-2.5 py-0.5 rounded-full">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-semibold text-slate-800">C1303</td>
                            <td className="py-2.5 text-slate-700 font-medium">Fuel Filters</td>
                            <td className="py-2.5 text-slate-600">filtercorp</td>
                            <td className="py-2.5 text-slate-800 font-bold">100</td>
                            <td className="py-2.5 text-slate-600">Oct 5, 2026</td>
                            <td className="py-2.5 text-right">
                              <span className="bg-sky-500 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded-full">Confirmed</span>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Fast-Moving & Critical Spare Alerts */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Fast-Moving & Critical Spare Alerts</h3>
                    <span className="bg-[#ce2a37] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      ({currentWh.shortName} Stock)
                    </span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">SKU</th>
                        <th className="pb-2 text-right">Items</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentWh.spareAlerts && currentWh.spareAlerts.length > 0 ? (
                        currentWh.spareAlerts.map((alert, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              {alert.sku}
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">{alert.items}</td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              TAFE 45DI Piston Rings
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">5 units</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              Fuel Filter - F505
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">18 units</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              Irrigation Seal - RG99
                            </td>
                            <td className="py-2.5 text-right font-bold text-slate-900">8 units</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </main>
          )}

          {/* --- 4. WAREHOUSES TAB CONTENT (SINGLE BRANCH SCOPED VIEW) --- */}
          {activeTab === 'warehouses' && (
            <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
              
              {/* 1. TOP 4 KPI CARDS FOR THIS WAREHOUSE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Warehouse Stock Value */}
                <div className="bg-[#e0f2fe]/60 p-4 rounded-xl border border-sky-100 shadow-2xs">
                  <p className="text-xs font-medium text-slate-600">Total Stock Value</p>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">{currentWh.totalValue || "ETB 68.1M"}</h2>
                  <span className="text-[10px] text-slate-500 font-medium">scoped for {currentWh.shortName}</span>
                </div>

                {/* Card 2: Space Utilization */}
                <div className="bg-[#1b222c] p-4 rounded-xl text-white shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-slate-300">Space Utilization</p>
                    <h2 className="text-2xl font-black mt-1 text-emerald-400">{currentWh.utilization || "82%"}</h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Capacity filled</p>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Card 3: Pending Stock Transfers */}
                <div className="bg-[#fecdd3] p-4 rounded-xl text-slate-900 shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-rose-900">Pending Transfers</p>
                    <h2 className="text-2xl font-black mt-1 text-slate-900">{currentWh.pendingTransfers || "5"} <span className="text-sm font-semibold">Orders</span></h2>
                    <p className="text-[10px] text-rose-800 mt-0.5">In-bound / Out-bound</p>
                  </div>
                  <div className="p-2 bg-rose-900/10 rounded-lg">
                    <Truck className="h-5 w-5 text-rose-900" />
                  </div>
                </div>

                {/* Card 4: Discrepancy Rate */}
                <div className="bg-[#a5f3fc] p-4 rounded-xl text-slate-900 shadow-2xs flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-cyan-950">Audit Discrepancy Rate</p>
                    <h2 className="text-2xl font-black mt-1 text-slate-900">{currentWh.discrepancyRate || "0.08%"}</h2>
                    <p className="text-[10px] text-cyan-900 mt-0.5">Very low variance</p>
                  </div>
                  <div className="p-2 bg-cyan-800/10 rounded-lg">
                    <ClipboardCheck className="h-5 w-5 text-cyan-900" />
                  </div>
                </div>

              </div>

              {/* 2. MIDDLE ROW: INCOMING TRANSFERS & SCANNER ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Stock Transfers & Receiving */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Incoming Transfers & Stock Receiving ({currentWh.shortName})</h3>
                    <div className="flex items-center gap-2">
                      <button className="bg-[#ce2a37] text-white text-[11px] font-bold px-2.5 py-1 rounded hover:bg-red-700 transition">
                        New Transfer Request
                      </button>
                    </div>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Item Name</th>
                        <th className="pb-2">Source / Destination</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {safeTransfers.length > 0 ? (
                        safeTransfers.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{item.item}</td>
                            <td className="py-2.5 text-slate-600">{item.source}</td>
                            <td className="py-2.5 font-medium text-slate-700">{item.type || 'Incoming'}</td>
                            <td className="py-2.5 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full ${
                                item.status === 'Received' || item.status === 'Shipped' ? 'bg-emerald-600 text-white' :
                                item.status === 'In Transit' ? 'bg-amber-400 text-slate-900' : 'bg-sky-500 text-white'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-4 text-center text-slate-400 text-xs">
                            ምንም የትራንስፈር መረጃ አልተገኘም።
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Active Scanner Staff & Accuracy */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Active Scanner Staff ({currentWh.shortName})</h3>
                    <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">Live Audit</span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Staff Name</th>
                        <th className="pb-2">Total Scans</th>
                        <th className="pb-2 text-right">Accuracy Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {safeStaff.length > 0 ? (
                        safeStaff.map((st, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{st.name || st.staff}</td>
                            <td className="py-2.5 text-slate-600 font-medium">{st.scans} items</td>
                            <td className="py-2.5 text-right font-bold text-emerald-600">{st.accuracy}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="py-4 text-center text-slate-400 text-xs">
                            ምንም የስካነር እንቅስቃሴ አልተመዘገበም።
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* 3. BOTTOM ROW: INTERNAL SHELF TRACKING & LOCAL ALERTS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Internal Shelf & Rack Tracking */}
                <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Internal Shelf & Rack Location Tracking</h3>
                    <span className="bg-[#1b222c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Rack Layout
                    </span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Category / Item</th>
                        <th className="pb-2">Rack Location</th>
                        <th className="pb-2">Aisle / Shelf</th>
                        <th className="pb-2 text-right">Stock Condition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {safeShelfTracking.length > 0 ? (
                        safeShelfTracking.map((sh, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-semibold text-slate-800">{sh.name}</td>
                            <td className="py-2.5 text-slate-600">{sh.rack}</td>
                            <td className="py-2.5 text-slate-600">{sh.aisle} - {sh.shelf}</td>
                            <td className="py-2.5 text-right">
                              <span className={`font-semibold text-[10px] px-2.5 py-0.5 rounded-full ${
                                sh.risk ? 'bg-[#ce2a37] text-white' : 'bg-emerald-600 text-white'
                              }`}>
                                {sh.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-4 text-center text-slate-400 text-xs">
                            ምንም የ Shelf tracking መረጃ አልተመዘገበም።
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Right: Low Stock & Critical Branch Alerts */}
                <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900">Branch Stock Alerts</h3>
                    <span className="bg-[#ce2a37] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Critical
                    </span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Alert Details</th>
                        <th className="pb-2 text-right">Remaining Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {safeLowStock.length > 0 ? (
                        safeLowStock.map((alert, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 flex items-center gap-2 font-medium text-slate-800">
                              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                              <span>{alert.title}</span>
                            </td>
                            <td className="py-2.5 text-right font-bold text-red-600">{alert.count}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="py-4 text-center text-slate-400 text-xs">
                            ምንም የ Stock Alert የለም።
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </main>
          )}

         {/* ---5 SCOPED QR/BARCODE SCANNER CONTENT --- */}
        {activeTab === 'scanner' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* 1. REAL-TIME SCANNER ACTIVITY & DEVICE STATUS (4 CARDS) */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900">
                Real-Time Scanner Activity & Device Status ({currentWh.shortName})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Operator 1 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Aberra G." className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Aberra G.</h4>
                        {typeof Wifi !== 'undefined' ? <Wifi className="h-3.5 w-3.5 text-teal-600 shrink-0" /> : <span className="text-[10px] text-teal-600 font-bold">ON</span>}
                      </div>
                      <p className="text-[11px] font-semibold text-teal-600 mt-0.5">Active - Device: Handheld 01</p>
                      <p className="text-[10px] text-slate-400 font-medium">Location: Aisle 3</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <div><span className="font-semibold text-slate-700">Signal Strength</span></div>
                    <div className="flex gap-0.5"><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <div><span className="font-semibold text-slate-700">Battery Level</span></div>
                    <div className="w-8 h-3.5 border border-slate-300 rounded-xs p-0.5 flex items-center"><div className="w-3/4 h-full bg-teal-600 rounded-2xs"></div></div>
                  </div>
                </div>

                {/* Operator 2 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Tsehay N." className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Tsehay N.</h4>
                        {typeof Wifi !== 'undefined' ? <Wifi className="h-3.5 w-3.5 text-teal-600 shrink-0" /> : <span className="text-[10px] text-teal-600 font-bold">ON</span>}
                      </div>
                      <p className="text-[11px] font-semibold text-teal-600 mt-0.5">Active - Device: Handheld 02</p>
                      <p className="text-[10px] text-slate-400 font-medium">Location: Receiving D</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <div><span className="font-semibold text-slate-700">Signal Strength</span></div>
                    <div className="flex gap-0.5"><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <div><span className="font-semibold text-slate-700">Battery Level</span></div>
                    <div className="w-8 h-3.5 border border-slate-300 rounded-xs p-0.5 flex items-center"><div className="w-full h-full bg-teal-600 rounded-2xs"></div></div>
                  </div>
                </div>

                {/* Operator 3 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Keneni R." className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Keneni R.</h4>
                        {typeof Wifi !== 'undefined' ? <Wifi className="h-3.5 w-3.5 text-teal-600 shrink-0" /> : <span className="text-[10px] text-teal-600 font-bold">ON</span>}
                      </div>
                      <p className="text-[11px] font-semibold text-teal-600 mt-0.5">Active - Device: Tablet 01</p>
                      <p className="text-[10px] text-slate-400 font-medium">Location: Rack B</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <div><span className="font-semibold text-slate-700">Signal Strength</span></div>
                    <div className="flex gap-0.5"><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-teal-600 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <div><span className="font-semibold text-slate-700">Battery Level</span></div>
                    <div className="w-8 h-3.5 border border-slate-300 rounded-xs p-0.5 flex items-center"><div className="w-1/2 h-full bg-amber-500 rounded-2xs"></div></div>
                  </div>
                </div>

                {/* Operator 4 (Offline) */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3 opacity-80">
                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" alt="Moti B." className="w-10 h-10 rounded-full object-cover shrink-0 grayscale" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Moti B.</h4>
                        {typeof WifiOff !== 'undefined' ? <WifiOff className="h-3.5 w-3.5 text-[#ce2a37] shrink-0" /> : <span className="text-[10px] text-[#ce2a37] font-bold">OFF</span>}
                      </div>
                      <p className="text-[11px] font-semibold text-[#ce2a37] mt-0.5">Offline - Last Active: 10 mins ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <div><span className="font-semibold text-slate-700">Signal Strength</span></div>
                    <div className="flex gap-0.5"><div className="w-1.5 h-3 bg-[#ce2a37]/60 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div><div className="w-1.5 h-3 bg-slate-200 rounded-xs"></div></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <div><span className="font-semibold text-slate-700">Battery Level</span></div>
                    <div className="w-8 h-3.5 border border-slate-300 rounded-xs p-0.5 flex items-center"><div className="w-1/4 h-full bg-[#ce2a37] rounded-2xs"></div></div>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. MIDDLE ROW: INCOMING TRANSFER & RECENT SCAN LOG CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Incoming Transfer & Stock Receiving */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-900">
                    Incoming Transfer & Stock Receiving <span className="text-slate-400 font-normal">(Scoped for {currentWh.shortName})</span>
                  </h3>
                  <button className="bg-[#ce2a37] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-800 transition shadow-xs">
                    Create Receiving Log
                  </button>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">Item Name</th>
                      <th className="pb-2">Incoming from</th>
                      <th className="pb-2">Outgoing</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-3 font-semibold text-slate-800">10 TAFE Tractors</td>
                      <td className="py-3 text-slate-500">From HQ</td>
                      <td className="py-3 text-slate-500">Shipped</td>
                      <td className="py-3 text-right">
                        <span className="bg-teal-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">
                          Shipped
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-800">50 Rain-gun Pumps</td>
                      <td className="py-3 text-slate-500">From HQ</td>
                      <td className="py-3 text-slate-500">Shipped</td>
                      <td className="py-3 text-right">
                        <span className="bg-teal-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-full">
                          Shipped
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right: Recent Scan Log with Chart */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Recent Scan Log ({currentWh.shortName})
                </h3>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">Aisle/Rack</th>
                      <th className="pb-2">Data Accuracy</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-[11px]">
                    <tr>
                      <td className="py-2 font-medium text-slate-700">Rec. Bay D</td>
                      <td className="py-2 font-bold text-slate-900">100%</td>
                      <td className="py-2 text-right">
                        <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">
                          Accepted
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-700">Aberra G.</td>
                      <td className="py-2 font-bold text-slate-900">98%</td>
                      <td className="py-2 text-right">
                        <span className="bg-amber-400 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded">
                          Warning (Batch)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Minimal Performance Mini-Bar Chart */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Top Performer
                    </span>
                  </div>
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Aberra G.', val: 80 },
                        { name: 'Tsehay N.', val: 45 },
                        { name: 'Keneni R.', val: 95 },
                      ]}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Bar dataKey="val" fill="#0088A6" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

            {/* 3. BOTTOM ROW: SCANNER OPERATOR PERFORMANCE OVERVIEW & LOCAL STOCK ALERTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Scanner Operator Performance Overview */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Scanner Operator Performance Overview ({currentWh.shortName} Staff)
                </h3>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">SKU/Part Name</th>
                      <th className="pb-2">Scan Time</th>
                      <th className="pb-2">User</th>
                      <th className="pb-2 text-right">Avg Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-800">
                        TAFE Tractor Piston Rings <span className="block text-[10px] text-slate-400 font-normal">(SKU4501)</span>
                      </td>
                      <td className="py-2.5 text-slate-600 font-mono text-[11px]">14:32:01</td>
                      <td className="py-2.5 text-slate-700 font-medium">
                        Tsehay N. <span className="block text-[10px] text-slate-400">Rec. Bay D</span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-900">
                        4.1% <span className="block text-[9px] text-slate-400 font-normal">Scans/Hour</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-800">
                        Rain-gun Pumps <span className="block text-[10px] text-slate-400 font-normal">(SKU-RG01)</span>
                      </td>
                      <td className="py-2.5 text-slate-600 font-mono text-[11px]">14:28:45</td>
                      <td className="py-2.5 text-slate-700 font-medium">
                        Aberra G. <span className="block text-[10px] text-slate-400">Aisle 3</span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-900">
                        Avg Accuracy
                        <span className="block text-[9px] text-teal-600 font-bold">Top Performer</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right: Local Stock Alerts */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-900">Local Stock Alerts</h3>
                  <span className="bg-[#ce2a37] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    ({currentWh.shortName} scoped)
                  </span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="pb-2">SKU</th>
                      <th className="pb-2 text-right">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-3 flex items-center gap-2 font-semibold text-slate-800">
                        {typeof AlertTriangle !== 'undefined' && <AlertTriangle className="h-4 w-4 text-[#ce2a37] shrink-0" />}
                        Rain-gun Pump Seals - Batch A1
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">15 units</td>
                    </tr>
                    <tr>
                      <td className="py-3 flex items-center gap-2 font-semibold text-slate-800">
                        {typeof AlertTriangle !== 'undefined' && <AlertTriangle className="h-4 w-4 text-[#ce2a37] shrink-0" />}
                        TAFE Tractor Filters - Serial B7
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">18 units</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </main>
        )}

        {/* ---6 SCOPED REPORTS & ANALYTICS CONTENT --- */}
        {activeTab === 'reports' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* TOP ROW: REPORT BUILDER & KEY PERFORMANCE INDICATORS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Branch Report Builder & Filter */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  Branch Report Builder & Filter ({currentWh.shortName})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Report Type */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">Report Type:</label>
                    <div className="space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                        <input type="radio" name="repType" defaultChecked className="accent-[#ce2a37]" /> Inventory Valuation
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="repType" className="accent-[#ce2a37]" /> Receiving Log
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="repType" className="accent-[#ce2a37]" /> Scanner Performance
                      </label>
                    </div>
                  </div>

                  {/* Range & Categories */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Range:</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400">
                        <option>Monthly Inventory Valuation</option>
                        <option>Weekly Scan Logs</option>
                        <option>Custom Date Range</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Categories:</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400">
                        <option>All Categories</option>
                        <option>Machinery & Pumps</option>
                        <option>Spare Parts</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[11px] font-semibold text-slate-700">Format:</span>
                    <label className="flex items-center gap-1 cursor-pointer text-slate-800 text-[11px] font-medium">
                      <input type="radio" name="format" defaultChecked className="accent-[#ce2a37]" /> PDF
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer text-slate-600 text-[11px]">
                      <input type="radio" name="format" className="accent-[#ce2a37]" /> Excel
                    </label>
                  </div>

                  <button className="bg-[#ce2a37] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-800 transition shadow-xs flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Generate & Export Report
                  </button>
                </div>
              </div>

              {/* Right: Key Branch Performance Indicators */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  Key Branch Performance Indicators (Scoped for {currentWh.shortName})
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Monthly Inventory Accuracy</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">99.4%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">Optimal</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Avg Receiving Time (HQ to {currentWh.shortName})</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">4 days</span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">Fast</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Scanner Operator Efficiency</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">97%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">+2% vs HQ</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Pending Transfers</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-[#ce2a37]">3 Requests</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Action Req.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* MIDDLE ROW: RECENT SCOPED REPORTS TABLE */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900">
                  Recent {currentWh.shortName} Reports (Scoped)
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search reports..." 
                      className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Report ID</th>
                    <th className="pb-2">Report Name</th>
                    <th className="pb-2">Generated Date</th>
                    <th className="pb-2">Generated By</th>
                    <th className="pb-2">Report Type</th>
                    <th className="pb-2">Scope</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">R1101</td>
                    <td className="py-2.5 font-semibold text-slate-800">Monthly Valuation (Aug 2026)</td>
                    <td className="py-2.5 text-slate-500">18 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Kenenisa Bekele</td>
                    <td className="py-2.5 text-slate-600">Inventory Valuation</td>
                    <td className="py-2.5 text-slate-500">{currentWh.shortName} Stock</td>
                    <td className="py-2.5 text-right">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">Complete</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">R1102</td>
                    <td className="py-2.5 font-semibold text-slate-800">Scanner Perf (Aberra G.)</td>
                    <td className="py-2.5 text-slate-500">18 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Tsehay N.</td>
                    <td className="py-2.5 text-slate-600">Scanner Perf.</td>
                    <td className="py-2.5 text-slate-500">Inter-Warehouse</td>
                    <td className="py-2.5 text-right">
                      <span className="bg-amber-400 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded">In Progress</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">R1103</td>
                    <td className="py-2.5 font-semibold text-slate-800">Inter-warehouse Transfer Log</td>
                    <td className="py-2.5 text-slate-500">17 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Moti B.</td>
                    <td className="py-2.5 text-slate-600">Transfer Audit</td>
                    <td className="py-2.5 text-slate-500">HQ &lt;-&gt; {currentWh.shortName}</td>
                    <td className="py-2.5 text-right">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">Complete</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM ROW: CHARTS (LINE CHART & COMPARATIVE BAR CHART) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Line Chart: Stock Value Trend */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Monthly Stock Value Trend (Line Chart)
                </h3>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'May', val: 7500000 },
                      { month: 'Jun', val: 6800000 },
                      { month: 'Jul', val: 11200000 },
                      { month: 'Aug', val: 10500000 },
                      { month: 'Sep', val: 14200000 },
                      { month: 'Oct', val: 16500000 },
                    ]}>
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${v/1000000}M`} />
                      <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, 'Stock Value']} />
                      <Line type="monotone" dataKey="val" stroke="#0088A6" strokeWidth={2.5} dot={{ r: 4, fill: '#0088A6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Bar Chart: Scan Accuracy by Staff Member */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    Scan Accuracy by Staff Member ({currentWh.shortName})
                  </h3>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    Comparative
                  </span>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Aberra G.', speed: 95, accuracy: 98 },
                      { name: 'Tsehay N.', speed: 60, accuracy: 92 },
                      { name: 'Keneni R.', speed: 40, accuracy: 99 },
                    ]}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="speed" name="Avg Speed %" fill="#334155" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="accuracy" name="Avg Accuracy %" fill="#0088A6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </main>
        )}

{/* ---7 SCOPED AUDITS PANEL CONTENT --- */}
        {activeTab === 'audits' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* TOP ROW: AUDIT BUILDER & PERFORMANCE INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Audit Builder & Filter */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  Audit Builder & Filter (Scoped for {currentWh.shortName})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Audit Type */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">Audit Type:</label>
                    <div className="space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="auditType" className="accent-[#ce2a37]" /> Physical Count
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                        <input type="radio" name="auditType" defaultChecked className="accent-[#ce2a37]" /> Cycle Count
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="auditType" className="accent-[#ce2a37]" /> System Recon
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="auditType" className="accent-[#ce2a37]" /> Third Party Audit
                      </label>
                    </div>
                  </div>

                  {/* Range & Categories */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Range:</label>
                      <div className="flex gap-1.5">
                        <select className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                          <option>Presets</option>
                        </select>
                        <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                          <option>Custom Dates</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        <input type="text" readOnly value="Aug 18 - Sept 18" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-[11px] text-slate-600 text-center" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Categories:</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                        <option>Machinery Parts</option>
                        <option>Machinery All</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[11px] font-semibold text-slate-700">View:</span>
                    <label className="flex items-center gap-1 cursor-pointer text-slate-800 text-[11px] font-medium">
                      <input type="radio" name="viewFormat" defaultChecked className="accent-[#ce2a37]" /> PDF
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer text-slate-600 text-[11px]">
                      <input type="radio" name="viewFormat" className="accent-[#ce2a37]" /> Excel
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer text-slate-600 text-[11px]">
                      <input type="radio" name="viewFormat" className="accent-[#ce2a37]" /> System View
                    </label>
                  </div>

                  <button className="bg-[#ce2a37] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-800 transition shadow-xs flex items-center gap-1.5">
                    Initiate & Record Audit
                  </button>
                </div>
              </div>

              {/* Right: Audit Performance & Insights */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Audit Performance & Insights (Scoped)
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Monthly Physical Count Compliance</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">100%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">Complete</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Audit Reconciled rate</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">99.2%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">High</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Average Variance ETB (local stock)</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">15K</span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">Minor</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Pending Audits (scoped)</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-[#ce2a37]">1 Request</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Review</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* MIDDLE ROW: RECENT AUDITS TABLE */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900">
                  Recent Audits (Scoped for {currentWh.shortName} Branch)
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search audits..." 
                      className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs rounded-lg text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Audit ID</th>
                    <th className="pb-2">Audit Name</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Initiated By</th>
                    <th className="pb-2">Focus</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1101</td>
                    <td className="py-2.5 font-semibold text-slate-800">cycle-count machinery parts (Aug 2026)</td>
                    <td className="py-2.5 text-slate-500">18 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Kenenisa Bekele</td>
                    <td className="py-2.5 text-slate-600">Machinery Spares</td>
                    <td className="py-2.5">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">Complete</span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1102</td>
                    <td className="py-2.5 font-semibold text-slate-800">full-recon electronic spares</td>
                    <td className="py-2.5 text-slate-500">17 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Tsehay N.</td>
                    <td className="py-2.5 text-slate-600">Electronics</td>
                    <td className="py-2.5">
                      <span className="bg-amber-400 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded">In Progress</span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1103</td>
                    <td className="py-2.5 font-semibold text-slate-800">TAFE Tractor Stock Verification</td>
                    <td className="py-2.5 text-slate-500">16 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Moti B.</td>
                    <td className="py-2.5 text-slate-600">Machinery</td>
                    <td className="py-2.5">
                      <span className="bg-[#ce2a37] text-white font-bold text-[9px] px-2 py-0.5 rounded">Reconciliation Needed</span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM ROW: CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Line Chart: Variance Value Trend */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Variance Value Trend (local stock) (Line Chart)
                </h3>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'May', val: 5000000 },
                      { month: 'Jun', val: 6000000 },
                      { month: 'Jul', val: 11500000 },
                      { month: 'Aug', val: 11000000 },
                      { month: 'Sep', val: 14200000 },
                      { month: 'Oct', val: 17500000 },
                    ]}>
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${v/1000000}M`} />
                      <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, 'Variance Value']} />
                      <Line type="monotone" dataKey="val" stroke="#0088A6" strokeWidth={2.5} dot={{ r: 4, fill: '#0088A6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Bar Chart: Audit Compliance by Internal Auditor */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    Audit Compliance by Internal Auditor ({currentWh.shortName})
                  </h3>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    Stacked
                  </span>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Kenenisa.', physical: 90, recon: 95 },
                      { name: 'Tsehay N.', physical: 85, recon: 88 },
                      { name: 'Moti.', physical: 92, recon: 96 },
                    ]}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="physical" name="Physical Counts" fill="#0886bc" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="recon" name="Reconciliation Time" fill="#ae2f2f" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </main>
        )}

        {/* ---8 SCOPED ANALYTICS PANEL CONTENT --- */}
        {activeTab === 'analytics' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* TOP ROW: ANALYTIC METRIC & CATEGORY FILTER & KEY INSIGHTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Analytics Metric & Category Filter */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  Analytics Metric & Category Filter (Scoped for {currentWh.shortName})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Metric Type */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">Metric Type:</label>
                    <div className="space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                        <input type="radio" name="metricType" defaultChecked className="accent-[#ce2a37]" /> Inventory Turn
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="metricType" className="accent-[#ce2a37]" /> Sales Performance
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="metricType" className="accent-[#ce2a37]" /> Variance Value
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="radio" name="metricType" className="accent-[#ce2a37]" /> Stock Valuation
                      </label>
                    </div>
                  </div>

                  {/* Range & Categories */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Range:</label>
                      <div className="flex gap-1.5">
                        <select className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                          <option>Presets</option>
                        </select>
                        <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                          <option>Custom Dates</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        <input type="text" readOnly value="Aug 1 - Sept 18" className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-[11px] text-slate-600 text-center" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700">Categories:</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none">
                        <option>Machinery All</option>
                        <option>Electronics</option>
                        <option>Machinery Parts</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[11px] font-semibold text-slate-700">Metric:</span>
                    <span className="text-[11px] text-slate-600">Inventory Turn, Range: Sept 18, Category: All</span>
                  </div>

                  <button className="bg-[#ce2a37] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-800 transition shadow-xs flex items-center gap-1.5">
                    Generate & View Analytics
                  </button>
                </div>
              </div>

              {/* Right: Key Analytics Insights */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Key Analytics Insights (Scoped)
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Avg Inventory Turn (overall)</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">4.2x</span>
                      <span className="text-[10px] font-bold text-[#ce2a37] bg-red-50 px-1.5 py-0.5 rounded">Optimal</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Sales Performance VS Goal</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">108%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">Exceeded</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Local Stock Value trend</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">+8%</span>
                      <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">Growth</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Pending Sales orders (scoped)</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-[#ce2a37]">5 Requests</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Review</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* MIDDLE ROW: KEY ANALYTICS DASHBOARDS TABLE */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900">
                  Key {currentWh.shortName} Analytics Dashboards (Scoped)
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search dashboards..." 
                      className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs rounded-lg text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Audit ID</th>
                    <th className="pb-2">Local Namer Dashboard</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Initiated By</th>
                    <th className="pb-2">Focus</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">View</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1101</td>
                    <td className="py-2.5 font-semibold text-slate-800">Local Sales VS Forecast (Monthly)</td>
                    <td className="py-2.5 text-slate-500">18 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Kenenisa Bekele</td>
                    <td className="py-2.5 text-slate-600">Machinery Spares</td>
                    <td className="py-2.5">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">Performance</span>
                    </td>
                    <td className="py-2.5 text-slate-600">3 Views</td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1102</td>
                    <td className="py-2.5 font-semibold text-slate-800">Local Stock Turn by Category</td>
                    <td className="py-2.5 text-slate-500">17 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Tsehay N.</td>
                    <td className="py-2.5 text-slate-600">Electronics</td>
                    <td className="py-2.5">
                      <span className="bg-amber-400 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded">In Progress</span>
                    </td>
                    <td className="py-2.5 text-slate-600">2 Views</td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">A1103</td>
                    <td className="py-2.5 font-semibold text-slate-800">Local Variance Value by Staff Member</td>
                    <td className="py-2.5 text-slate-500">16 Sept 2026</td>
                    <td className="py-2.5 text-slate-700 font-medium">Moti B.</td>
                    <td className="py-2.5 text-slate-600">Machinery</td>
                    <td className="py-2.5">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded">Complete</span>
                    </td>
                    <td className="py-2.5 text-slate-600">1 View</td>
                    <td className="py-2.5 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM ROW: CHARTS (Using Logo Colors: Red #ce2a37, Blue #0088A6, Dark #1e293b) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Line Chart: Stock Value & Sales Trend */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Stock Value & Sales Trend (Dual Line Chart)
                </h3>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'May', stock: 6000000, sales: 4000000 },
                      { month: 'Jun', stock: 8000000, sales: 6500000 },
                      { month: 'Jul', stock: 11000000, sales: 9000000 },
                      { month: 'Aug', stock: 10500000, sales: 8500000 },
                      { month: 'Sep', stock: 14200000, sales: 12000000 },
                    ]}>
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${v/1000000}M`} />
                      <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`]} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Line type="monotone" dataKey="stock" name="Overal Stock Value" stroke="#1e293b" strokeWidth={2.5} dot={{ r: 4, fill: '#1e293b' }} />
                      <Line type="monotone" dataKey="sales" name="Sales Value (ETB)" stroke="#ce2a37" strokeWidth={2.5} dot={{ r: 4, fill: '#ce2a37' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Bar Chart: Inventory Turn Rate by Category */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    Inventory Turn Rate by Category ({currentWh.shortName})
                  </h3>
                  <span className="text-[10px] font-bold text-[#ce2a37] bg-red-50 px-2 py-0.5 rounded">
                    Grouped Bar
                  </span>
                </div>

                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Machinery', mach: 40, spares: 50, elec: 75 },
                      { name: 'Spares', mach: 30, spares: 60, elec: 40 },
                      { name: 'Electronics', mach: 80, spares: 70, elec: 25 },
                    ]}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="mach" name="Machinery" fill="#1e293b" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="spares" name="Spares" fill="#0088A6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="elec" name="Electronics" fill="#ce2a37" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </main>
        )}

        {/* ---9 SCOPED SETTINGS PANEL CONTENT (WITH FULL FUNCTIONAL ACTIONS) --- */}
        {activeTab === 'settings' && (
          <main className="p-6 space-y-5 bg-[#f8fafc] flex-1">
            
            {/* TOP ROW: BRANCH STAFF & ROLE MANAGEMENT & KEY OPERATIONAL SETTINGS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left: Branch Staff & Role Management */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Branch Staff & Role Management (Scoped)
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Audit ID</th>
                        <th className="pb-2">System Role</th>
                        <th className="pb-2">Active</th>
                        <th className="pb-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[11px]">
                      <tr>
                        <td className="py-2.5 font-bold text-slate-900">Abera G.</td>
                        <td className="py-2.5 text-slate-700">Stock Keeper</td>
                        <td className="py-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block shadow-xs"></span>
                        </td>
                        <td className="py-2.5 text-right space-x-1.5">
                          <button 
                            onClick={() => alert('Editing role for Abera G.')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Edit Role
                          </button>
                          <button 
                            onClick={() => alert('Managing permissions for Abera G.')}
                            className="bg-[#0088A6]/10 hover:bg-[#0088A6]/20 text-[#0088A6] px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Permissions
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-slate-900">Tsehay N.</td>
                        <td className="py-2.5 text-slate-700">Scanner Operator</td>
                        <td className="py-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block shadow-xs"></span>
                        </td>
                        <td className="py-2.5 text-right space-x-1.5">
                          <button 
                            onClick={() => alert('Editing role for Tsehay N.')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Edit Role
                          </button>
                          <button 
                            onClick={() => alert('Managing permissions for Tsehay N.')}
                            className="bg-[#0088A6]/10 hover:bg-[#0088A6]/20 text-[#0088A6] px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Permissions
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-slate-900">Moti B.</td>
                        <td className="py-2.5 text-slate-700">Machinery Lead</td>
                        <td className="py-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block shadow-xs"></span>
                        </td>
                        <td className="py-2.5 text-right space-x-1.5">
                          <button 
                            onClick={() => alert('Editing role for Moti B.')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Edit Role
                          </button>
                          <button 
                            onClick={() => alert('Managing permissions for Moti B.')}
                            className="bg-[#0088A6]/10 hover:bg-[#0088A6]/20 text-[#0088A6] px-2.5 py-1 rounded text-[10px] font-bold transition">
                            Permissions
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Add New User Form */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-800">Create New Branch User / አዲስ ሰራተኛ ለመፍጠር</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input type="text" placeholder="Full Name" className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#ce2a37]" />
                    <select className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#ce2a37]">
                      <option>Inventory Analyst</option>
                      <option>Quality Auditor</option>
                      <option>Branch Assistant</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Contact Phone / Email" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#ce2a37]" />
                    <button 
                      onClick={() => alert('Invite sent successfully to new branch user!')}
                      className="bg-[#ce2a37] hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-1">
                      Send Invite
                    </button>
                  </div>
                </div>

              </div>

              {/* Right: Key Operational Settings & Quick Actions */}
              <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                  {currentWh.shortName} Key Branch Operational Settings & Actions
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Local System Uptime</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">99.9%</span>
                      <button 
                        onClick={() => alert('Refreshing server uptime metrics...')}
                        className="text-[10px] font-bold text-[#0088A6] hover:underline">
                        Diagnostics
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Scanner Device Calibration</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">100%</span>
                      <button 
                        onClick={() => alert('Initiating hardware scanner recalibration sequence...')}
                        className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded hover:bg-teal-100 transition">
                        Recalibrate
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Local Threshold Compliance</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-slate-900">94%</span>
                      <button 
                        onClick={() => alert('Exporting compliance audit report...') }
                        className="text-[10px] font-bold text-[#1e293b] hover:underline">
                        View Report
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Pending Access Requests</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-[#ce2a37]">1 Request</span>
                      <button 
                        onClick={() => alert('Opening access authorization modal...')}
                        className="text-[10px] font-bold text-white bg-[#ce2a37] px-2 py-0.5 rounded hover:bg-red-800 transition">
                        Review Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Enterprise Actions Toolbar */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                  <button 
                    onClick={() => alert('Branch database cache successfully cleared.')}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-3 rounded-lg transition text-center">
                    Clear Local Cache
                  </button>
                  <button 
                    onClick={() => alert('Syncing local offline stock transactions with Addis Ababa HQ server...')}
                    className="flex-1 bg-[#1e293b] hover:bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-lg transition text-center">
                    Force Cloud Sync
                  </button>
                </div>
              </div>

            </div>

            {/* MIDDLE & BOTTOM: GLOBAL STANDARD CONFIGURATION & ADVANCED ACTION CONSOLES */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900">
                  Global Standard Configuration & Execution Console ({currentWh.shortName})
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Search configurations & actions..." 
                      className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs rounded-lg text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Major Local System Module</th>
                    <th className="pb-2">Configuration Focus</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Views</th>
                    <th className="pb-2 text-right">Direct Action Execution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  <tr>
                    <td className="py-3 font-bold text-slate-900">System-wide Localizations (Language / Currency / Timestamps)</td>
                    <td className="py-3 text-slate-600">Active Regional Settings</td>
                    <td className="py-3">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-2xs">Current</span>
                    </td>
                    <td className="py-3 text-slate-600">3 Views</td>
                    <td className="py-3 text-right space-x-1.5">
                      <button 
                        onClick={() => alert('Opening Localization Setup Wizard')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded text-[10px] font-bold transition">
                        Configure
                      </button>
                      <button 
                        onClick={() => alert('Deploying localization update to branch terminals')}
                        className="bg-[#ce2a37] hover:bg-red-800 text-white px-3 py-1 rounded text-[10px] font-bold transition">
                        Deploy
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Scanner & Device Global Parameters & API Handlers</td>
                    <td className="py-3 text-slate-600">Hardware & Firmware Sync</td>
                    <td className="py-3">
                      <span className="bg-teal-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-2xs">Current</span>
                    </td>
                    <td className="py-3 text-slate-600">3 Views</td>
                    <td className="py-3 text-right space-x-1.5">
                      <button 
                        onClick={() => alert('Opening Scanner Parameters Configuration')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded text-[10px] font-bold transition">
                        Configure
                      </button>
                      <button 
                        onClick={() => alert('Testing hardware handshake protocol')}
                        className="bg-[#0088A6] hover:bg-cyan-800 text-white px-3 py-1 rounded text-[10px] font-bold transition">
                        Test Handshake
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Stock Alerts Thresholds (Min/Max per Category & Auto-Lock)</td>
                    <td className="py-3 text-slate-600">Inventory Safeguards</td>
                    <td className="py-3">
                      <span className="bg-amber-500 text-slate-900 font-bold text-[9px] px-2 py-0.5 rounded shadow-2xs">Review Req.</span>
                    </td>
                    <td className="py-3 text-slate-600">1 View</td>
                    <td className="py-3 text-right space-x-1.5">
                      <button 
                        onClick={() => alert('Opening Threshold Limits Editor')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded text-[10px] font-bold transition">
                        Edit Thresholds
                      </button>
                      <button 
                        onClick={() => alert('Enforcing strict category stock lock rules')}
                        className="bg-[#1e293b] hover:bg-slate-800 text-white px-3 py-1 rounded text-[10px] font-bold transition">
                        Enforce Rules
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </main>
        )}
      </div>
    </div>
  );
}