'use client';
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  LayoutDashboard, 
  Truck, 
  Wrench, 
  Building2, 
  QrCode, 
  FileText, 
  ClipboardCheck, 
  BarChart2, 
  Settings, 
  AlertCircle, 
  AlertTriangle, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

// --- DATA SETS ---
const stockVsSalesData = [
  { name: 'Addis', Stock: 370, Sales: 170 },
  { name: 'Adama', Stock: 320, Sales: 260 },
  { name: 'Bishoftu', Stock: 270, Sales: 160 },
];

const capacityData = [
  { day: 'Day 1', Line1: 100, Line2: 80 },
  { day: 'Day 7', Line1: 250, Line2: 180 },
  { day: 'Day 10', Line1: 150, Line2: 120 },
  { day: 'Day 14', Line1: 300, Line2: 260 },
  { day: 'Day 20', Line1: 180, Line2: 360 },
  { day: 'Day 30', Line1: 310, Line2: 200 },
  { day: 'Days', Line1: 280, Line2: 240 },
];

const salesTransfersData = [
  { name: 'Addis', Outgoing: 1900, Incoming: 800 },
  { name: 'Adama', Outgoing: 1200, Incoming: 800 },
  { name: 'Bishoftu', Outgoing: 700, Incoming: 200 },
];

const machineryLocationData = [
  { name: 'Addis', CurrentStock: 1900, MinimumRequired: 800 },
  { name: 'Adama', CurrentStock: 1200, MinimumRequired: 800 },
  { name: 'Bishoftu', CurrentStock: 700, MinimumRequired: 200 },
];

const sparePartsLocationData = [
  { name: 'Addis HQ', CurrentStock: 2400, MinimumRequired: 1000 },
  { name: 'Adama', CurrentStock: 1800, MinimumRequired: 900 },
  { name: 'Bishoftu', CurrentStock: 950, MinimumRequired: 400 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Separate state for warehouse dropdown
  const [warehousesOpen, setWarehousesOpen] = useState(true);

  // Helper active tab verifiers
  const isMachineryActive = activeTab === 'machinery';
  const isSparePartsActive = activeTab === 'spare-parts';
  const isWarehouseActive = activeTab === 'warehouses' || activeTab === 'addis-ababa' || activeTab === 'adama' || activeTab === 'bahir-dar';
  const [settingsTab, setSettingsTab] = useState('general');

  return (
    
  <div className="min-h-screen bg-slate-100 text-slate-800 flex font-sans antialiased select-none">
  
  {/* 1. FIXED & COMPACT SIDEBAR NAVIGATION */}
  <aside className="w-64 bg-[#1b222c] text-slate-300 flex flex-col justify-between h-screen sticky top-0 shrink-0 border-r border-slate-800 overflow-hidden">
    <div className="flex flex-col h-full overflow-hidden">
      {/* HEADER / LOGO */}
      <div className="p-3.5 flex items-center gap-3 border-b border-slate-800/60 shrink-0">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 border-2 border-cyan-500 overflow-hidden shrink-0 shadow-sm">
          <img 
            src="/jabdu-logo.jpg" 
            alt="Jabdu Motors Logo" 
            className="w-full h-full object-contain rounded-full scale-105"
          />
        </div>
        <div>
          <h1 className="font-bold text-xs text-white tracking-wide leading-tight">JABDU MOTORS S.C.</h1>
          <p className="text-[10px] text-slate-400 font-medium">Stock Pro</p>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="p-2 space-y-1 text-xs font-medium flex-1 overflow-y-auto">
        {/* DASHBOARD */}
        <button 
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          <span>Dashboard</span>
        </button>

        {/* MACHINERY & IRRIGATION */}
        <button 
          type="button"
          onClick={() => setActiveTab('machinery')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${isMachineryActive ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
        >
          <Truck className="h-4 w-4 shrink-0" />
          <span className="leading-tight">Machinery & Irrigation</span>
        </button>

        {/* SPARE PARTS & PRODUCTS */}
        <button 
          type="button"
          onClick={() => setActiveTab('spare-parts')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${isSparePartsActive ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
        >
          <Wrench className="h-4 w-4 shrink-0" />
          <span className="leading-tight">Spare Parts & Products</span>
        </button>

        {/* WAREHOUSES DROPDOWN MENU */}
        <div>
          <button 
            type="button"
            onClick={() => {
              setWarehousesOpen(!warehousesOpen);
              setActiveTab('warehouses');
            }} 
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition cursor-pointer ${isWarehouseActive ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 shrink-0" />
              <span>Warehouses</span>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${warehousesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {warehousesOpen && (
            <div className="ml-7 mt-1 space-y-0.5 text-[11px]">
              <button 
                type="button"
                onClick={() => setActiveTab('addis-ababa')}
                className={`w-full flex items-center justify-between py-1 px-2 rounded transition cursor-pointer ${activeTab === 'addis-ababa' ? 'text-white bg-slate-800 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <span>Addis Ababa HQ</span>
                <span className="w-3 h-1.5 rounded-sm bg-emerald-500 inline-block"></span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('adama')}
                className={`w-full flex items-center justify-between py-1 px-2 rounded transition cursor-pointer ${activeTab === 'adama' ? 'text-white bg-slate-800 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <span>Adama Branch</span>
                <span className="w-3 h-1.5 rounded-sm bg-yellow-500 inline-block"></span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('bahir-dar')}
                className={`w-full flex items-center justify-between py-1 px-2 rounded transition cursor-pointer ${activeTab === 'bahir-dar' ? 'text-white bg-slate-800 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <span>Bishoftu Branch</span>
                <span className="w-3 h-1.5 rounded-sm bg-blue-500 inline-block"></span>
              </button>
            </div>
          )}
        </div>

        <button type="button" onClick={() => setActiveTab('scanner')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'scanner' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}>
          <QrCode className="h-4 w-4 shrink-0 text-red-400" />
          <span>QR/Barcode Scanner</span>
        </button>

        <button type="button" onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'reports' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}>
          <FileText className="h-4 w-4 shrink-0" />
          <span>Reports</span>
        </button>

        <button type="button" onClick={() => setActiveTab('audits')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'audits' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}>
          <ClipboardCheck className="h-4 w-4 shrink-0" />
          <span>Audits</span>
        </button>

        <button type="button" onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'analytics' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}>
          <BarChart2 className="h-4 w-4 shrink-0" />
          <span>Analytics</span>
        </button>

        <button type="button" onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer ${activeTab === 'settings' ? 'bg-[#ce2a37] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'}`}>
          <Settings className="h-4 w-4 shrink-0" />
          <span>Settings</span>
        </button>
      </nav>

      {/* POWERED BY FOOTER */}
      <div className="p-2.5 border-t border-slate-800/80 bg-[#151b23] shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">
              Powered By
            </p>
            <p className="text-[11px] font-bold text-white tracking-wide">
              FaidATech
            </p>
          </div>
          <div className="w-20 h-8 rounded bg-white flex items-center justify-center px-1 py-0.5 shadow-sm shrink-0">
            <img 
              src="/faidatech-logo.png" 
              alt="FaidATech Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </aside>

  {/* MAIN CONTENT AREA */}
  <div className="flex-1 flex flex-col min-w-0">
    
    {/* TOP HEADER */}
    <header className="bg-white border-b border-slate-200 px-8 py-3 flex justify-between items-center sticky top-0 z-10 shadow-xs">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {activeTab === 'dashboard' && 'Inventory Pro'}
          {isMachineryActive && 'Machinery & Irrigation Pumps Inventory'}
          {isSparePartsActive && 'Spare Parts & Products Inventory'}
          {isWarehouseActive && 'Warehouse Overview'}
          {activeTab === 'scanner' && 'QR/Barcode Scanner'}
          {activeTab === 'reports' && 'Inventory Reports'}
          {activeTab === 'audits' && 'Inventory Audits'}
          {activeTab === 'analytics' && 'Analytics Overview'}
          {activeTab === 'settings' && 'System Settings'}
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-slate-600">Friday, September 18, 2026</span>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden border border-slate-300">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" alt="Sintayehu Abera" className="w-full h-full object-cover" />
          </div>
          <div className="text-left leading-tight">
            <h4 className="text-sm font-semibold text-slate-800">Sintayehu Abera</h4>
            <p className="text-[11px] text-slate-500">Inventory Manager <br/><span className="text-slate-400">Addis Ababa HQ</span></p>
          </div>
          <Bell className="h-5 w-5 text-slate-600 ml-2 cursor-pointer hover:text-slate-900" />
        </div>
      </div>
    </header>

        {/* PAGE 1: DASHBOARD CONTENT */}
        {activeTab === 'dashboard' && (
          <main className="p-6 space-y-6 bg-[#f4f6f9] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <p className="text-xs font-semibold text-slate-500">Total Stock Value</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">ETB 184.2M</h3>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Active SKUs</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">20,450</h3>
                </div>
                <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-lg"><Building2 className="h-6 w-6" /></div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Critical Low Stock</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">14 Batches</h3>
                </div>
                <div className="p-2.5 bg-red-50 text-red-600 rounded-lg"><AlertTriangle className="h-6 w-6" /></div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Expiry Warning</p>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">8 Units</h3>
                </div>
                <div className="p-2.5 bg-red-50 text-red-600 rounded-lg"><AlertCircle className="h-6 w-6" /></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">Low Stock Items & Expiry Risk</h3>
                    <span className="bg-[#ce2a37] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">5 Critical</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="font-medium text-slate-700">Rain-gun Pump Seals - Batch A1</span>
                      </div>
                      <span className="text-red-500 font-semibold text-[11px]">Exp 10-26-2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="font-medium text-slate-700">TAFE Tractor Filters - Serial B7</span>
                      </div>
                      <span className="text-slate-800 font-semibold">2 Units</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-2">Warehouse Inventory</h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockVsSalesData}>
                      <Bar dataKey="Stock" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="Sales" fill="#b91c1c" radius={[3, 3, 0, 0]} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-2">Warehouse Capacity Utilization</h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={capacityData}>
                      <Line type="monotone" dataKey="Line1" stroke="#06b6d4" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Line2" stroke="#b91c1c" strokeWidth={2} dot={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-2">Machinery Parts Inventory</h3>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="pb-2">Part ID</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Qty</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 font-semibold">TAFE 21</td>
                      <td className="py-2">TAFE 45DI Piston</td>
                      <td className="py-2 font-bold">148</td>
                      <td className="py-2"><span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px]">In Stock</span></td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">MF 385</td>
                      <td className="py-2">Rain-gun Seal</td>
                      <td className="py-2 font-bold">23</td>
                      <td className="py-2"><span className="px-2 py-0.5 bg-red-700 text-white rounded-full text-[10px]">Low Stock</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Recent Audits & Discrepancies</h3>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-slate-800">✓ 4 units out (Sonalika 60 Tires)</p>
                  <p className="font-semibold text-slate-800">- 4 units in (Sonalika 60 Tires)</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                <h3 className="font-bold text-slate-800 text-sm mb-2">Sales & Transfers by Warehouse</h3>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesTransfersData}>
                      <Bar dataKey="Outgoing" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="Incoming" fill="#b91c1c" radius={[3, 3, 0, 0]} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </main>
        )}


{/* --- PAGE 2: MACHINERY & IRRIGATION PUMPS INVENTORY --- */}
{(activeTab === 'machinery' || activeTab.startsWith('machinery-')) && (
  <main className="p-6 space-y-6 bg-[#f4f6f9] text-slate-800 flex-1 overflow-y-auto">
    {/* Page Header Bar */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Machinery & Irrigation Pumps Inventory
          </h2>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-amber-200">
            Heavy Machinery
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Rain-gun Pumps, Tractor Parts, Solar Controllers & Agricultural Machinery Tracking
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button 
          type="button" 
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>🛒</span> Create Order
        </button>
        <button 
          type="button" 
          className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>➕</span> Register New SKU
        </button>
      </div>
    </div>

    {/* Main Inventory Table Card */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Inventory Overview</h3>
          <p className="text-[11px] text-slate-400">Stock distribution across Bishoftu, Adama, and Regional Warehouses</p>
        </div>

        {/* Filter / Search Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search Machinery or SKU..." 
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-600">
            <option value="">All Warehouses</option>
            <option value="Bishoftu">Bishoftu</option>
            <option value="Adama">Adama</option>
            <option value="Addis Ababa">Addis Ababa</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3">SKU Code</th>
              <th className="pb-3">Item Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Warehouse Location</th>
              <th className="pb-3">Batch/Serial</th>
              <th className="pb-3">Mfg Date</th>
              <th className="pb-3 text-center">Quantity</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
            {[
              {
                sku: 'RGP-102',
                name: 'RGP-102 (Rain-gun Pump)',
                sub: 'Batch A1 (Bishoftu)',
                category: 'Tractor / Pump',
                location: 'Bishoftu',
                locColor: 'bg-emerald-500',
                serial: 'A1',
                mfgDate: '2023-10-26',
                qty: 266,
                status: 'In Stock',
                statusBg: 'bg-emerald-600',
                qtyColor: 'text-slate-900'
              },
              {
                sku: 'MF 7885',
                name: 'TAFE Tractor Piston',
                sub: 'SN-B7 (Adama)',
                category: 'Tractor',
                location: 'Adama',
                locColor: 'bg-amber-400',
                serial: 'SN. A1-9872',
                mfgDate: '2023-09-01',
                qty: 14,
                status: 'Low Stock Risk',
                statusBg: 'bg-amber-500',
                qtyColor: 'text-amber-600'
              }
            ].map((item) => (
              <tr key={item.sku} className="hover:bg-slate-50/80 transition">
                <td className="py-3 font-bold text-slate-900">{item.sku}</td>
                <td className="py-3 font-sans font-medium text-slate-900">
                  {item.name}<br />
                  <span className="text-[10px] text-slate-400 font-normal">{item.sub}</span>
                </td>
                <td className="py-3 font-sans">
                  <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md text-[10px] font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 font-sans">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                    <span className={`w-2.5 h-2.5 ${item.locColor} rounded-full`}></span>{item.location}
                  </span>
                </td>
                <td className="py-3 text-slate-500">{item.serial}</td>
                <td className="py-3 text-slate-600 font-sans">{item.mfgDate}</td>
                <td className={`py-3 text-center font-bold text-sm ${item.qtyColor}`}>{item.qty}</td>
                <td className="py-3 text-right font-sans">
                  <span className={`px-2.5 py-1 ${item.statusBg} text-white rounded-full text-[10px] font-bold shadow-2xs`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Bottom Details Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Detailed Spec View (Dark Card) */}
      <div className="lg:col-span-2 bg-[#1b222c] text-white rounded-2xl p-6 border border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-slate-700/60 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>📊</span> Detailed Item View
            </h3>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700">
              SERIAL CHECK
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 font-mono">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
              <p className="font-sans font-bold text-white text-sm">
                Rain-gun Pump Impeller: RGP-102-M - Diameter 150mm
              </p>
              <p className="text-emerald-400 font-bold">Status: Certified Operational</p>
            </div>

            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 space-y-1">
              <p className="font-sans font-semibold text-slate-200">
                Solar Controller SPC-009: FW V2.1
              </p>
              <p className="text-slate-400 font-sans text-[11px]">
                Last Maintained: 2026-05-20 | Calibration Standard: ISO-9901
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>Equipment Category: Agricultural Irrigation</span>
          <button type="button" className="text-cyan-400 hover:underline font-sans cursor-pointer">
            View Maintenance Logs
          </button>
        </div>
      </div>

      {/* Availability by Location Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Availability by Location</h3>
          <p className="text-[10px] text-slate-400">Current vs Required Stock Levels</p>
        </div>

        <div className="h-44 w-full pt-2">
          {typeof ResponsiveContainer !== 'undefined' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Addis', CurrentStock: 1900, MinimumRequired: 800 },
                { name: 'Adama', CurrentStock: 1200, MinimumRequired: 800 },
                { name: 'Bishoftu', CurrentStock: 700, MinimumRequired: 200 },
              ]}>
                <Bar dataKey="CurrentStock" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MinimumRequired" fill="#ce2a37" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-end justify-between px-4 pb-2 border-b border-slate-200 gap-3">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-full rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-1/2 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Addis</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-3/4 rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-1/2 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Adama</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-2/5 rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-1/5 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Bishoftu</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-[10px] pt-1">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <span className="w-2.5 h-2.5 bg-cyan-500 rounded-xs"></span> Current Stock
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <span className="w-2.5 h-2.5 bg-[#ce2a37] rounded-xs"></span> Min Required
          </span>
        </div>
      </div>

    </div>
  </main>
)}

{/* --- PAGE 3: SPARE PARTS & PRODUCTS INVENTORY (HQ EXTENDED EDITION) --- */}
{(activeTab === 'spare-parts' || activeTab.startsWith('spare-parts-')) && (
  <main className="p-6 space-y-6 bg-[#f4f6f9] text-slate-800 flex-1 overflow-y-auto">
    {/* Page Header Bar */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Spare Parts & Products Inventory
          </h2>
          <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-cyan-200">
            Catalog & Stock
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Engine Components, Hydraulic Filters, Seals, and Regional Branch Allocation
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button 
          type="button" 
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>🛒</span> Create Order
        </button>
        <button 
          type="button" 
          className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>➕</span> Register New Part
        </button>
      </div>
    </div>

    {/* Spare Parts Primary Data Table */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Active Spare Parts Master List</h3>
          <p className="text-[11px] text-slate-400">Live inventory across Addis Ababa, Adama, and Bishoftu branches</p>
        </div>

        {/* Quick Search & Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search Part Name or SKU..." 
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-600">
            <option value="">All Categories</option>
            <option value="Piston">Piston</option>
            <option value="Hydraulics">Hydraulics</option>
            <option value="Filters">Filters</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3">SKU Code</th>
              <th className="pb-3">Part / Item Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Warehouse Location</th>
              <th className="pb-3">Batch/Serial</th>
              <th className="pb-3">Mfg Date</th>
              <th className="pb-3 text-center">Quantity</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
            {[
              {
                sku: 'TAFE 21',
                name: 'TAFE 45DI Piston Ring Set',
                sub: 'Engine Components',
                category: 'Piston',
                catBg: 'bg-amber-100 text-amber-800',
                location: 'Addis Ababa HQ',
                locColor: 'bg-emerald-500',
                serial: 'PR-8821',
                mfgDate: '2024-01-15',
                qty: 148,
                status: 'In Stock',
                statusBg: 'bg-emerald-600',
                qtyColor: 'text-slate-900'
              },
              {
                sku: 'MF-990',
                name: 'Hydraulic Pump Filter Element',
                sub: 'Fluid Systems',
                category: 'Hydraulics',
                catBg: 'bg-cyan-100 text-cyan-800',
                location: 'Adama Branch',
                locColor: 'bg-amber-400',
                serial: 'HF-4011',
                mfgDate: '2023-11-20',
                qty: 12,
                status: 'Low Stock',
                statusBg: 'bg-amber-500',
                qtyColor: 'text-amber-600'
              },
              {
                sku: 'BD-004',
                name: 'Heavy Duty Brake Lining Set',
                sub: 'Braking Mechanisms',
                category: 'Brakes',
                catBg: 'bg-slate-100 text-slate-800',
                location: 'Bishoftu Branch',
                locColor: 'bg-cyan-500',
                serial: 'BL-0019',
                mfgDate: '2024-02-10',
                qty: 85,
                status: 'In Stock',
                statusBg: 'bg-emerald-600',
                qtyColor: 'text-slate-900'
              }
            ].map((part) => (
              <tr key={part.sku} className="hover:bg-slate-50/80 transition">
                <td className="py-3 font-bold text-[#ce2a37]">{part.sku}</td>
                <td className="py-3 font-sans font-medium text-slate-900">
                  {part.name}<br />
                  <span className="text-[10px] text-slate-400 font-normal">{part.sub}</span>
                </td>
                <td className="py-3 font-sans">
                  <span className={`${part.catBg} px-2.5 py-0.5 rounded-md text-[10px] font-bold`}>
                    {part.category}
                  </span>
                </td>
                <td className="py-3 font-sans">
                  <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                    <span className={`w-2.5 h-2.5 ${part.locColor} rounded-full`}></span>{part.location}
                  </span>
                </td>
                <td className="py-3 text-slate-500">{part.serial}</td>
                <td className="py-3 text-slate-600 font-sans">{part.mfgDate}</td>
                <td className={`py-3 text-center font-bold text-sm ${part.qtyColor}`}>{part.qty}</td>
                <td className="py-3 text-right font-sans">
                  <span className={`px-2.5 py-1 ${part.statusBg} text-white rounded-full text-[10px] font-bold shadow-2xs`}>
                    {part.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Technical Specs & Branch Breakdown Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left (2 Cols): Technical Specifications Card */}
      <div className="lg:col-span-2 bg-[#1b222c] text-white rounded-2xl p-6 border border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-slate-700/60 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>🔧</span> Parts Technical Specifications
            </h3>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700">
              ISO 9001 VERIFIED
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 font-mono">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
              <p className="font-sans font-bold text-white text-sm">
                TAFE 45DI Piston Ring Set (PR-8821)
              </p>
              <p className="text-slate-400 font-sans">
                Material: High Grade Chrome Cast Iron | Heat Treated Anti-Friction Coating
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-700/40">
                <span className="text-slate-400 block font-sans">Cylinder Bore Size:</span>
                <strong className="text-cyan-400 text-xs">91.44 mm</strong>
              </div>
              <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-700/40">
                <span className="text-slate-400 block font-sans">Tolerance Level:</span>
                <strong className="text-cyan-400 text-xs">± 0.02 mm</strong>
              </div>
            </div>

            <p className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
              <span>✓</span> Quality Check: Passed (Verified by HQ Technical Desk)
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>Manufacturer: TAFE Genuine Motors</span>
          <button type="button" className="text-cyan-400 hover:underline font-sans cursor-pointer">
            Download Spec Sheet (PDF)
          </button>
        </div>
      </div>

      {/* Right (1 Col): Spare Parts Stock by Branch */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Spare Parts Stock by Branch</h3>
          <p className="text-[10px] text-slate-400">Current Stock vs Minimum Threshold</p>
        </div>

        {/* Chart Visualization Container */}
        <div className="h-44 w-full pt-2">
          {typeof ResponsiveContainer !== 'undefined' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Addis HQ', CurrentStock: 2200, MinimumRequired: 1000 },
                { name: 'Adama', CurrentStock: 1800, MinimumRequired: 900 },
                { name: 'Bishoftu', CurrentStock: 1000, MinimumRequired: 400 },
              ]}>
                <Bar dataKey="CurrentStock" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MinimumRequired" fill="#ce2a37" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            /* Fallback Graphic Visualization */
            <div className="h-full flex items-end justify-between px-4 pb-2 border-b border-slate-200 gap-3">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-full rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-1/2 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Addis HQ</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-3/4 rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-2/5 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Adama</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-28">
                  <div className="w-1/2 bg-cyan-500 h-2/5 rounded-t"></div>
                  <div className="w-1/2 bg-[#ce2a37] h-1/4 rounded-t"></div>
                </div>
                <span className="text-[9px] font-bold text-slate-600">Bishoftu</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 text-[10px] pt-1">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <span className="w-2.5 h-2.5 bg-cyan-500 rounded-xs"></span> Current Stock
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <span className="w-2.5 h-2.5 bg-[#ce2a37] rounded-xs"></span> Min Required
          </span>
        </div>
      </div>

    </div>
  </main>
)}

{/* --- PAGE 4: WAREHOUSES SECTION (OVERVIEW & BRANCH INDIVIDUAL DASHBOARDS) --- */}
{activeTab === 'warehouses' && (
  <main className="p-6 space-y-6 bg-[#f4f6f9] flex-1 overflow-y-auto">
    {/* Top Action Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">Warehouse Overview (All Branches)</h2>
      <div className="flex gap-3">
        <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition cursor-pointer">
          Create Transfer
        </button>
        <button type="button" className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition cursor-pointer">
          Warehouse Analytics
        </button>
      </div>
    </div>

    {/* Top Metrics Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Total Warehouses</p>
        <p className="text-xl font-bold text-slate-800 mt-1">3 Active</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Total SKU Storage</p>
        <p className="text-xl font-bold text-slate-800 mt-1">185,500 units</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Total Value (ETB)</p>
        <p className="text-xl font-bold text-slate-800 mt-1">ETB 3.2B</p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Average Space Utilization</p>
        <p className="text-xl font-bold text-slate-800 mt-1">89%</p>
      </div>
    </div>

    {/* Middle Main Section: Warehouse Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Addis Ababa HQ Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Addis Ababa HQ (Warehousing Central)</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full border-[10px] border-[#ce2a37] flex items-center justify-center border-t-slate-200">
              <span className="text-lg font-bold text-slate-800">95%</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Capacity</span>
                <span className="text-slate-700 font-bold">Total Area</span>
                <p className="text-slate-800 font-semibold">15,000 sqm</p>
              </div>
              <div>
                <span className="text-slate-700 font-bold">Current SKUs</span>
                <p className="text-slate-800 font-semibold">98,000</p>
              </div>
              <div>
                <span className="text-slate-700 font-bold">Top Category</span>
                <p className="text-slate-800 font-semibold">Tractor Spares</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-36 h-28 border border-slate-300 rounded bg-slate-50 p-1">
            <svg className="w-full h-full text-slate-400" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="5" y="5" width="90" height="70" strokeWidth="1.5" />
              <line x1="25" y1="5" x2="25" y2="75" />
              <line x1="50" y1="5" x2="50" y2="55" />
              <line x1="75" y1="5" x2="75" y2="75" />
              <rect x="30" y="15" width="15" height="8" fill="currentColor" opacity="0.3" />
              <rect x="30" y="30" width="15" height="8" fill="currentColor" opacity="0.3" />
              <rect x="55" y="15" width="15" height="8" fill="currentColor" opacity="0.3" />
              <rect x="55" y="30" width="15" height="8" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Adama Branch Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Adama Branch (Irrigation Hub)</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full border-[10px] border-cyan-500 flex items-center justify-center border-t-slate-200">
              <span className="text-lg font-bold text-slate-800">82%</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Capacity</span>
                <span className="text-slate-700 font-bold">Total Area</span>
                <p className="text-slate-800 font-semibold">10,000 sqm</p>
              </div>
              <div>
                <span className="text-slate-700 font-bold">Current SKUs</span>
                <p className="text-slate-800 font-semibold">54,500</p>
              </div>
              <div>
                <span className="text-slate-700 font-bold">Top Category</span>
                <p className="text-slate-800 font-semibold">Irrigation Systems</p>
              </div>
            </div>
          </div>

          <div className="w-44 text-[11px]">
            <p className="font-bold text-slate-700 mb-1">Irrigation Pump Stock Levels</p>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-0.5">Item</th>
                  <th className="py-0.5 text-right">Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-1">Centrifugal Pump 5HP</td>
                  <td className="py-1 text-right font-medium text-emerald-600">20</td>
                </tr>
                <tr>
                  <td className="py-1">Submersible Pump 10HP</td>
                  <td className="py-1 text-right font-medium text-emerald-600">15</td>
                </tr>
                <tr>
                  <td className="py-1">Drip Hose Rolls (100m)</td>
                  <td className="py-1 text-right font-medium text-amber-600">42</td>
                </tr>
                <tr>
                  <td className="py-1">Rain-gun Sprinklers</td>
                  <td className="py-1 text-right font-medium text-red-600">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Section: Bishoftu & Stock Transfers */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Bishoftu Branch (Regional Distro)</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full border-[10px] border-[#ce2a37] flex items-center justify-center border-t-slate-300">
            <span className="text-lg font-bold text-slate-800">70%</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="inline-block w-2.5 h-2.5 bg-[#ce2a37] mr-1.5 rounded-xs"></span>
              <span className="text-slate-700 font-bold">Total Area</span>
              <p className="text-slate-800 font-semibold pl-4">5,000 sqm</p>
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 bg-cyan-500 mr-1.5 rounded-xs"></span>
              <span className="text-slate-700 font-bold">Current SKUs</span>
              <p className="text-slate-800 font-semibold pl-4">33,000</p>
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 bg-slate-400 mr-1.5 rounded-xs"></span>
              <span className="text-slate-700 font-bold">Top Category</span>
              <p className="text-slate-800 font-semibold pl-4">General Spares</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Stock Transfers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold">
                <th className="pb-2.5">Transfer ID</th>
                <th className="pb-2.5">Item Name</th>
                <th className="pb-2.5">From Warehouse</th>
                <th className="pb-2.5">To Warehouse</th>
                <th className="pb-2.5">Date</th>
                <th className="pb-2.5">Quantity</th>
                <th className="pb-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 font-semibold text-slate-800">TPR-450</td>
                <td className="py-3 font-medium">TAFE Tractor Piston Ring</td>
                <td className="py-3">Addis Ababa HQ</td>
                <td className="py-3">Adama Warehouse</td>
                <td className="py-3">Sept 18, 2026</td>
                <td className="py-3 font-bold">148</td>
                <td className="py-3 text-right">
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-bold inline-block">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 font-semibold text-slate-800">RSS-101</td>
                <td className="py-3 font-medium">Rain-gun Seal Kit</td>
                <td className="py-3">Adama Branch</td>
                <td className="py-3">Bishoftu</td>
                <td className="py-3">Sept 18, 2026</td>
                <td className="py-3 font-bold">23</td>
                <td className="py-3 text-right">
                  <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-bold inline-block">
                    In Transit
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
)}

{/* --- INDIVIDUAL BRANCH DASHBOARDS (INDIVIDUAL CITY DASHBOARDS) --- */}
{(activeTab === 'addis-ababa' || activeTab === 'adama' || activeTab === 'bahir-dar') && (
  <main className="p-6 space-y-6 bg-[#f4f6f9] flex-1 overflow-y-auto">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {activeTab === 'addis-ababa' && 'Addis Ababa HQ Warehouse Dashboard'}
          {activeTab === 'adama' && 'Adama Branch Warehouse Dashboard'}
          {activeTab === 'bahir-dar' && 'Bishoftu Branch Warehouse Dashboard'}
        </h2>
        <p className="text-xs text-slate-500">Dedicated local inventory control, staff management, and stock status.</p>
      </div>
      <div className="flex gap-3">
        <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition cursor-pointer">
          Add Local Stock
        </button>
        <button type="button" className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition cursor-pointer">
          Branch Audit
        </button>
      </div>
    </div>

    {/* Branch Specific Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Branch Occupancy</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">
          {activeTab === 'addis-ababa' && '95%'}
          {activeTab === 'adama' && '82%'}
          {activeTab === 'bahir-dar' && '70%'}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Total Items in Stock</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">
          {activeTab === 'addis-ababa' && '98,000 SKUs'}
          {activeTab === 'adama' && '54,500 SKUs'}
          {activeTab === 'bahir-dar' && '33,000 SKUs'}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <p className="text-xs text-slate-500 font-medium">Branch Manager</p>
        <p className="text-lg font-bold text-slate-800 mt-1">
          {activeTab === 'addis-ababa' && 'Sintayehu Abera'}
          {activeTab === 'adama' && 'Abebe Kebede'}
          {activeTab === 'bahir-dar' && 'Mulugeta Tadesse'}
        </p>
      </div>
    </div>

    {/* Branch Inventory Table */}
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
      <h3 className="font-bold text-slate-800 text-sm mb-4">Local Stock Inventory</h3>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 text-slate-600 font-semibold">
            <th className="pb-2.5">SKU Code</th>
            <th className="pb-2.5">Item Name</th>
            <th className="pb-2.5">Category</th>
            <th className="pb-2.5">Quantity</th>
            <th className="pb-2.5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 font-semibold text-slate-800">TAFE-21</td>
            <td className="py-3 font-medium">TAFE 45DI Piston Ring Set</td>
            <td className="py-3">Piston</td>
            <td className="py-3 font-bold">148</td>
            <td className="py-3 text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">In Stock</span>
            </td>
          </tr>
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 font-semibold text-slate-800">IRR-90</td>
            <td className="py-3 font-medium">Centrifugal Pump 5HP</td>
            <td className="py-3">Irrigation</td>
            <td className="py-3 font-bold">45</td>
            <td className="py-3 text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">In Stock</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
)}
              {/* --- PAGE 5: QR SCANNING & MOBILE APP SYNCHRONIZATION (HQ LIGHT EDITION - COMPLIANT) --- */}
              {(activeTab === 'scanner' || activeTab === 'qr-scanner') && (
                <main className="p-6 space-y-6 bg-[#f8fafc] text-slate-800 flex-1 overflow-y-auto">
                  {/* Top Bar Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                          QR Scanning & Regional Synchronization
                        </h2>
                        <span className="bg-red-100 text-[#ce2a37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
                          HQ Command Center
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Real-time Audit Trail, System Compliance, Discrepancy Resolution & Node Health
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-700">Sync Active (0.8s Latency)</span>
                      </div>
                      <button type="button" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition cursor-pointer">
                        Force Global Resync
                      </button>
                    </div>
                  </div>

                  {/* Dashboard Header Title */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">HQ Regional Control Dashboard</h3>
                    <div className="flex gap-2">
                      <button type="button" className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                        Export Audit Log (CSV)
                      </button>
                      <button type="button" className="text-xs font-semibold text-[#ce2a37] hover:underline px-2 py-1.5 cursor-pointer">
                        + Register Regional Node
                      </button>
                    </div>
                  </div>

                  {/* Main HQ Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN (5 Cols): HQ Discrepancy Action Center & Network Topology */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Active Discrepancies Requiring HQ Action */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">Flagged Discrepancies (HQ Approval)</h4>
                          <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            2 Pending Action
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          {/* Item 1 */}
                          <div className="bg-red-50/60 border border-red-200 p-3 rounded-xl space-y-2">
                            <div className="flex items-center justify-between font-bold text-red-900">
                              <span className="truncate">TAFE Piston (SN-B6-9872)</span>
                              <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded">Mismatch</span>
                            </div>
                            <div className="text-[11px] text-slate-600 space-y-0.5">
                              <p>📍 Location: <span className="font-medium text-slate-800">Adama Branch</span></p>
                              <p>👤 Operator: <span className="font-medium text-slate-800">Abebe K. (ID: OP-402)</span></p>
                              <p>🕒 Timestamp: <span className="font-mono text-slate-800">2026-09-18 19:32:10</span></p>
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded transition">
                                Approve Override
                              </button>
                              <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded transition">
                                Reject & Flag
                              </button>
                            </div>
                          </div>

                          {/* Item 2 */}
                          <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl space-y-2">
                            <div className="flex items-center justify-between font-bold text-amber-900">
                              <span className="truncate">Rain-gun Seals Batch A1</span>
                              <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded">Quantity Error</span>
                            </div>
                            <div className="text-[11px] text-slate-600 space-y-0.5">
                              <p>📍 Location: <span className="font-medium text-slate-800">Addis Ababa HQ Whse</span></p>
                              <p>👤 Operator: <span className="font-medium text-slate-800">Sintayehu A. (ID: OP-101)</span></p>
                              <p>🕒 Timestamp: <span className="font-mono text-slate-800">2026-09-18 19:28:45</span></p>
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded transition">
                                Approve Override
                              </button>
                              <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded transition">
                                Reject & Flag
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Live Scanner Network Map */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">Regional Edge Node Network</h4>
                          <span className="text-[10px] font-semibold text-slate-400">3 Regional Nodes Connected</span>
                        </div>
                        
                        <div className="relative h-44 bg-slate-900 rounded-xl border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 160">
                            <path d="M 50 110 Q 150 20 250 110" stroke="#22d3ee" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                            <path d="M 90 130 Q 150 30 250 110" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
                          </svg>

                          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-800 border border-cyan-400 p-1.5 rounded-xl text-center shadow-lg">
                            <span className="text-[11px] font-bold text-cyan-300">☁️ HQ Main Server</span>
                          </div>

                          <div className="absolute bottom-3 left-4 text-center">
                            <div className="bg-slate-800 border border-emerald-400 p-1 rounded-md inline-block text-xs">🏢</div>
                            <p className="text-[10px] font-bold text-slate-200">Addis Branch</p>
                            <span className="text-[9px] text-emerald-400 font-bold block">Online</span>
                          </div>

                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
                            <div className="bg-slate-800 border border-amber-400 p-1 rounded-md inline-block text-xs">🏢</div>
                            <p className="text-[10px] font-bold text-slate-200">Bishoftu Branch</p>
                            <span className="text-[9px] text-amber-400 font-bold block">Syncing</span>
                          </div>

                          <div className="absolute bottom-3 right-4 text-center">
                            <div className="bg-slate-800 border border-red-400 p-1 rounded-md inline-block text-xs">🏢</div>
                            <p className="text-[10px] font-bold text-slate-200">Adama Branch</p>
                            <span className="text-[9px] text-red-400 font-bold block">Action Req.</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN (7 Cols): Comprehensive Compliant Audit Log */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Full Compliant System Audit Log Table */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">Master Audit Log & Scanned Items</h4>
                            <p className="text-[10px] text-slate-400">Compliant real-time event ledger</p>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">Total Scans Today: <strong className="text-slate-900">1,248</strong></span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[11px]">
                            <thead>
                              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                                <th className="pb-2">Timestamp</th>
                                <th className="pb-2">SKU / Item Name</th>
                                <th className="pb-2">Location</th>
                                <th className="pb-2">Operator ID</th>
                                <th className="pb-2 text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:35:12</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">TAFE 21</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">TAFE Piston</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Addis A1</td>
                                <td className="py-2.5 text-slate-600">OP-101</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ✓ Confirmed
                                  </span>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:32:10</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">TAFE 401</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">TAFE 45DI Piston</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Adama B7</td>
                                <td className="py-2.5 text-slate-600">OP-402</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ! Flagged
                                  </span>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:30:05</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">MF 7885</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">Rain-gun Seal</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Addis A1</td>
                                <td className="py-2.5 text-slate-600">OP-104</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ✓ Confirmed
                                  </span>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:28:45</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">MPP0001</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">Rain-gun Seals</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Addis Whse</td>
                                <td className="py-2.5 text-slate-600">OP-101</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ⚠️ Mismatch
                                  </span>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:24:18</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">MP0001</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">MF Brake Pad</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Bishoftu C2</td>
                                <td className="py-2.5 text-slate-600">OP-309</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ✓ Confirmed
                                  </span>
                                </td>
                              </tr>

                              <tr className="hover:bg-slate-50/80">
                                <td className="py-2.5 text-slate-500 text-[10px]">19:19:02</td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-900">TMP0003</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">TAFE Piston Head</span>
                                </td>
                                <td className="py-2.5 text-slate-600">Addis A1</td>
                                <td className="py-2.5 text-slate-600">OP-101</td>
                                <td className="py-2.5 text-right">
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    ✓ Confirmed
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                  </div>
                </main>
              )}
{/* --- PAGE 6: INVENTORY REPORTS DASHBOARD (HQ LIGHT EDITION) --- */}
{(activeTab === 'reports' || activeTab === 'inventory-reports') && (
  <main className="p-6 space-y-6 bg-[#f8fafc] text-slate-800 flex-1 overflow-y-auto">
    {/* Top Bar Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Reports Dashboard
          </h2>
          <span className="bg-red-100 text-[#ce2a37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
            HQ Executive
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Enterprise Financial Valuation, Stock Turnover, Expiry Analytics & Scheduled Audits
        </p>
      </div>

      {/* Global Quick Export Buttons */}
      <div className="flex items-center gap-2">
        <button type="button" className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📄 PDF Export
        </button>
        <button type="button" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📊 Excel
        </button>
        <button type="button" className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          💾 CSV
        </button>
      </div>
    </div>

    {/* Top 4 KPI Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Total Reports Generated</p>
        <p className="text-2xl font-black text-slate-900">1,280</p>
        <span className="text-[10px] text-emerald-600 font-bold">↑ 12% from last month</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Reports Scheduled</p>
        <p className="text-2xl font-black text-slate-900">15</p>
        <span className="text-[10px] text-slate-400 font-medium">Auto-executing weekly</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">New Insights Detected</p>
        <p className="text-2xl font-black text-cyan-600">4</p>
        <span className="text-[10px] text-cyan-700 font-semibold">Requires HQ review</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Discrepancy Alerts</p>
        <p className="text-2xl font-black text-[#ce2a37]">8</p>
        <span className="text-[10px] text-red-600 font-bold">Action Required</span>
      </div>
    </div>

    {/* 4 Analytics Grid Widgets */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
      
      {/* Widget 1: Stock Valuation & Costing */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Stock Valuation & Costing</h4>
          <p className="text-[10px] text-slate-400">Inventory Value Trend (last 12 months)</p>
        </div>

        {/* Minimal Bar Chart Visualization */}
        <div className="h-24 flex items-end justify-between gap-1.5 pt-4 px-2 border-b border-slate-100 pb-2">
          <div className="w-full bg-slate-200 h-12 rounded-t"></div>
          <div className="w-full bg-red-400 h-16 rounded-t"></div>
          <div className="w-full bg-[#ce2a37] h-20 rounded-t"></div>
          <div className="w-full bg-slate-800 h-24 rounded-t"></div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div>
            <p className="text-[10px] text-slate-400">Total Value</p>
            <p className="font-extrabold text-slate-900">ETB 3.2B</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">YTD Increase</p>
            <p className="font-extrabold text-emerald-600">+12%</p>
          </div>
        </div>
      </div>

      {/* Widget 2: Product Performance & Turns */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Product Performance</h4>
          <p className="text-[10px] text-slate-400">Top 5 Selling Items (last quarter)</p>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
              <span>Irrigation Pump Model X</span>
              <span className="font-bold">85%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
              <span>Tractor Tire Assy</span>
              <span className="font-bold">62%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-slate-700 h-2 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-xs">
          <span className="text-slate-500 text-[11px]">Stock Turn Ratio:</span>
          <span className="font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">6.2x</span>
        </div>
      </div>

      {/* Widget 3: Expiry & Obsolescence */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Expiry & Obsolescence</h4>
          <p className="text-[10px] text-slate-400">Stock Age Analysis & Aging Risk</p>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
            <span className="text-slate-600 font-medium">&lt; 6 Months</span>
            <span className="font-bold text-emerald-600">70% (Healthy)</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-amber-50/60 rounded-lg">
            <span className="text-slate-600 font-medium">6-12 Months</span>
            <span className="font-bold text-amber-700">20% (Watch)</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-red-50/60 rounded-lg">
            <span className="text-slate-600 font-medium">&gt; 1 Year (At Risk)</span>
            <span className="font-bold text-red-600">10% (Action)</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 text-center">Items at Risk Total: <strong className="text-slate-800">11 SKUs</strong></p>
      </div>

      {/* Widget 4: Scheduled Reports */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Scheduled Reports</h4>
          <p className="text-[10px] text-slate-400">Automated Enterprise Deliveries</p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 border border-slate-100 rounded-xl space-y-0.5">
            <p className="font-bold text-slate-800">Weekly Stock Reconciliation</p>
            <p className="text-[10px] text-slate-400">Every Monday @ 08:00 AM</p>
          </div>
          <div className="p-2 border border-slate-100 rounded-xl space-y-0.5">
            <p className="font-bold text-slate-800">Quarterly Valuation Audit</p>
            <p className="text-[10px] text-slate-400">First Day of Quarter</p>
          </div>
        </div>

        <button type="button" className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-xl transition cursor-pointer">
          Manage Schedules
        </button>
      </div>

    </div>

    {/* Generated Report History Table */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Generated Report History</h3>
          <p className="text-xs text-slate-400">Download and inspect completed audit documentation</p>
        </div>

        <div className="flex gap-2">
          <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer">
            + Generate Custom Report
          </button>
          <button type="button" className="bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-cyan-100 transition cursor-pointer">
            Report Templates
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3">Report ID</th>
              <th className="pb-3">Report Name</th>
              <th className="pb-3">Parameters</th>
              <th className="pb-3">Format</th>
              <th className="pb-3">Date Generated</th>
              <th className="pb-3">Generated By</th>
              <th className="pb-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-450</td>
              <td className="py-3 font-sans font-bold text-slate-900">Weekly Stock Reconciliation</td>
              <td className="py-3 text-slate-500 font-sans">Warehouse, Date Range, Inventory Status</td>
              <td className="py-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-[10px]">PDF</span></td>
              <td className="py-3 text-slate-500">Sept 18, 2026</td>
              <td className="py-3 font-sans font-medium text-slate-800">Sintayehu Abera</td>
              <td className="py-3 text-right">
                <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-1.5 rounded-lg transition cursor-pointer" title="Download">
                  📥
                </button>
              </td>
            </tr>

            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-101</td>
              <td className="py-3 font-sans font-bold text-slate-900">Adama Branch Performance</td>
              <td className="py-3 text-slate-500 font-sans">Adama Node, Discrepancies, Scan Logs</td>
              <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">CSV</span></td>
              <td className="py-3 text-slate-500">Sept 18, 2026</td>
              <td className="py-3 font-sans font-medium text-slate-800">Sintayehu Abera</td>
              <td className="py-3 text-right">
                <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-1.5 rounded-lg transition cursor-pointer" title="Download">
                  📥
                </button>
              </td>
            </tr>

            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-088</td>
              <td className="py-3 font-sans font-bold text-slate-900">Quarterly Valuation Audit</td>
              <td className="py-3 text-slate-500 font-sans">All Regional Warehouses, Costing Model</td>
              <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">XLSX</span></td>
              <td className="py-3 text-slate-500">Sept 15, 2026</td>
              <td className="py-3 font-sans font-medium text-slate-800">HQ Auditor (Abebe)</td>
              <td className="py-3 text-right">
                <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-1.5 rounded-lg transition cursor-pointer" title="Download">
                  📥
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
)}
{/* --- PAGE 7: INVENTORY AUDITS DASHBOARD (HQ LIGHT EDITION) --- */}
{(activeTab === 'audits' || activeTab === 'inventory-audits') && (
  <main className="p-6 space-y-6 bg-[#f8fafc] text-slate-800 flex-1 overflow-y-auto">
    {/* Top Bar Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Audits Dashboard
          </h2>
          <span className="bg-red-100 text-[#ce2a37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
            HQ Compliance
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Cycle Counting, Discrepancy Reconciliation, Physical vs System Quantity Audits
        </p>
      </div>

      {/* Quick Export Actions */}
      <div className="flex items-center gap-2">
        <button type="button" className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📄 PDF
        </button>
        <button type="button" className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📊 Excel
        </button>
        <button type="button" className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          💾 CSV
        </button>
      </div>
    </div>

    {/* Top 4 KPI Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Total Audits Conducted</p>
        <p className="text-2xl font-black text-slate-900">345</p>
        <span className="text-[10px] text-emerald-600 font-bold">1.2M Total Items Audited</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Scheduled Audits</p>
        <p className="text-2xl font-black text-slate-900">12</p>
        <span className="text-[10px] text-slate-400 font-medium">Upcoming cycle counts</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Audit Discrepancies Found</p>
        <p className="text-2xl font-black text-amber-600">18</p>
        <span className="text-[10px] text-amber-700 font-semibold">Under Investigation</span>
      </div>

      <div className="bg-white p-4 text-white rounded-2xl border border-red-200 shadow-xs space-y-1 bg-gradient-to-br from-red-600 to-[#ce2a37]">
        <p className="text-xs font-medium opacity-90">Critical Variances</p>
        <p className="text-2xl font-black text-white">2</p>
        <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full inline-block">
          HQ Action Required
        </span>
      </div>
    </div>

    {/* 3 Status & Hotspot Overview Panels */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      
      {/* Panel 1: Audit Status Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Audit Status Overview</h4>
          <p className="text-[10px] text-slate-400">Completion & System Accuracy Metric</p>
        </div>

        <div className="flex items-center justify-around py-2">
          <div className="relative w-28 h-28 rounded-full border-8 border-emerald-500 border-t-amber-400 border-r-cyan-500 flex items-center justify-center text-center">
            <div>
              <p className="text-xl font-black text-slate-900">345</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold">Audits</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-600">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="text-slate-600">Scheduled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ce2a37]"></span>
              <span className="text-slate-600">Discrepancies</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
          <span className="text-slate-500">Overall Accuracy:</span>
          <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            99.85%
          </span>
        </div>
      </div>

      {/* Panel 2: Discrepancy Hotspots */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Discrepancy Hotspots</h4>
          <p className="text-[10px] text-slate-400">Top Categories with Mismatches (Units)</p>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-medium mb-1">
              <span>Engine Parts</span>
              <span className="font-bold text-red-600">5 units</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-medium mb-1">
              <span>Hydraulic Spares</span>
              <span className="font-bold text-amber-600">4 units</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-medium mb-1">
              <span>Tractor Tires</span>
              <span className="font-bold text-slate-700">3 units</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full">
              <div className="bg-slate-700 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 text-center">
          <span className="text-[10px] text-slate-400">Overall Inventory Turn: <strong className="text-slate-800">6.2x</strong></span>
        </div>
      </div>

      {/* Panel 3: Active Audit Queue */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <h4 className="font-bold text-sm text-slate-900">Active Audit Queue</h4>
          <p className="text-[10px] text-slate-400">Pending Regional Reconciliation Tasks</p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <p className="font-bold text-slate-900">Adama Branch Reconciliation</p>
            <p className="text-[10px] text-red-600 font-semibold">Due: Sept 20, 2026</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
            <p className="font-bold text-slate-900">Monthly Valuation Count</p>
            <p className="text-[10px] text-slate-500">Due: Sept 25, 2026</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-xl transition cursor-pointer">
            Start Audit
          </button>
          <button type="button" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-xl transition cursor-pointer">
            View Scheduled
          </button>
        </div>
      </div>

    </div>

    {/* Detailed Audit Log Table */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Detailed Audit Log & Table</h3>
          <p className="text-xs text-slate-400">System vs Physical inventory variance tracking</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer">
            + Start New Cycle Count (QR)
          </button>
          <button type="button" className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer">
            Audit Analytics
          </button>
          <button type="button" className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-amber-100 transition cursor-pointer">
            Reconcile Discrepancies
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="pb-3">Audit ID</th>
              <th className="pb-3">Audit Name</th>
              <th className="pb-3">Target Warehouse</th>
              <th className="pb-3">Auditor</th>
              <th className="pb-3 text-center">System Qty</th>
              <th className="pb-3 text-center">Physical Qty</th>
              <th className="pb-3 text-center">Variance</th>
              <th className="pb-3 text-right">Adj. Value</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-450</td>
              <td className="py-3 font-sans font-bold text-slate-900">Weekly Piston Count</td>
              <td className="py-3 font-sans text-slate-600">Addis Ababa HQ</td>
              <td className="py-3 font-sans text-slate-800">Sintayehu Abera</td>
              <td className="py-3 text-center">120</td>
              <td className="py-3 text-center">120</td>
              <td className="py-3 text-center text-emerald-600 font-bold">0</td>
              <td className="py-3 text-right text-slate-500">ETB 0.00</td>
              <td className="py-3 text-right font-sans">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Confirmed
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-101</td>
              <td className="py-3 font-sans font-bold text-slate-900">Tractor Tires Check</td>
              <td className="py-3 font-sans text-slate-600">Adama Branch</td>
              <td className="py-3 font-sans text-slate-800">Abebe K.</td>
              <td className="py-3 text-center">55</td>
              <td className="py-3 text-center font-bold text-red-600">51</td>
              <td className="py-3 text-center text-red-600 font-bold">-4</td>
              <td className="py-3 text-right font-bold text-red-600">-ETB 24,000</td>
              <td className="py-3 text-right font-sans">
                <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Discrepancy
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50/80">
              <td className="py-3 font-bold text-[#ce2a37]">TPR-098</td>
              <td className="py-3 font-sans font-bold text-slate-900">Hydraulic Pump Audit</td>
              <td className="py-3 font-sans text-slate-600">Bishoftu Branch</td>
              <td className="py-3 font-sans text-slate-800">Sintayehu Abera</td>
              <td className="py-3 text-center">37</td>
              <td className="py-3 text-center">34</td>
              <td className="py-3 text-center text-amber-600 font-bold">-3</td>
              <td className="py-3 text-right font-bold text-amber-600">-ETB 18,500</td>
              <td className="py-3 text-right font-sans">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  In Progress
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
)}
{/* --- PAGE 8: STOCK ANALYTICS DASHBOARD (HQ LIGHT EDITION) --- */}
{(activeTab === 'analytics' || activeTab === 'stock-analytics') && (
  <main className="p-6 space-y-6 bg-[#f8fafc] text-slate-800 flex-1 overflow-y-auto">
    {/* Top Bar Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Stock Analytics Dashboard
          </h2>
          <span className="bg-red-100 text-[#ce2a37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
            HQ Intelligence
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Predictive Forecasting, Warehouse Capacity Utilization, Low Stock & Expiry Intelligence
        </p>
      </div>

      {/* Global Export & Configure Actions */}
      <div className="flex items-center gap-2">
        <button type="button" className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          ⚙️ Configure Analytics
        </button>
        <button type="button" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📄 PDF
        </button>
        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📊 Excel
        </button>
        <button type="button" className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          💾 CSV
        </button>
      </div>
    </div>

    {/* Top 5 Key Analytical Metrics Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Total Inventory Value</p>
        <p className="text-2xl font-black text-slate-900">ETB 18.2M</p>
        <span className="text-[10px] text-emerald-600 font-bold">↑ +8.4% YoY Growth</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Total Active SKUs</p>
        <p className="text-2xl font-black text-slate-900">20,450</p>
        <span className="text-[10px] text-slate-400 font-medium">Across 3 Warehouses</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Avg Capacity Utilization</p>
        <p className="text-2xl font-black text-cyan-600">85%</p>
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>Addis: 92%</span>
          <span>Adama: 88%</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-500">Stock Turn Ratio</p>
        <p className="text-2xl font-black text-slate-900">6.2x</p>
        <span className="text-[10px] text-emerald-600 font-bold">Optimal Velocity</span>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl text-white shadow-xs space-y-1">
        <p className="text-xs font-medium text-slate-300">Predictive Forecasting</p>
        <p className="text-lg font-bold text-cyan-300">📈 Stockout Risk: Low</p>
        <span className="text-[10px] text-slate-400 block">AI Restock Auto-Trigger ON</span>
      </div>
    </div>

    {/* Analytics Grid Section 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left (7 Cols): Inventory Performance Chart */}
      <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Inventory Performance Trend</h4>
            <p className="text-[10px] text-slate-400">Stock Level vs Sales Volume (Last 12 Months)</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Stock Level</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Sales Volume</span>
          </div>
        </div>

        {/* Multi-line Wave Visualization Representation */}
        <div className="h-40 relative flex items-end justify-between border-b border-slate-200 pb-2 px-2">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-slate-300 w-full"></div>
            <div className="border-b border-slate-300 w-full"></div>
            <div className="border-b border-slate-300 w-full"></div>
          </div>
          
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month, idx) => (
            <div key={month} className="flex flex-col items-center gap-1 z-10">
              <div className="flex items-end gap-1 h-28">
                <div className="w-2 bg-red-400 rounded-t" style={{ height: `${(idx * 7 + 30) % 90 + 10}%` }}></div>
                <div className="w-2 bg-cyan-500 rounded-t" style={{ height: `${(idx * 9 + 20) % 85 + 15}%` }}></div>
              </div>
              <span className="text-[9px] font-mono text-slate-400">{month}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs pt-1">
          <span className="text-slate-500">Category Sales Breakdown: <strong className="text-slate-800">Tractor Spares (45%)</strong></span>
          <span className="text-emerald-600 font-bold">✓ Sales Target On Track</span>
        </div>
      </div>

      {/* Right (5 Cols): Warehouse Efficiency & Operational Insights */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        
        {/* Capacity Gauges */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-slate-900">Warehouse Utilization Efficiency</h4>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-lg font-black text-slate-900">92%</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">Addis Ababa HQ</p>
              <span className="text-[9px] text-red-600 font-bold">Near Capacity</span>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-lg font-black text-slate-900">88%</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">Adama Branch</p>
              <span className="text-[9px] text-emerald-600 font-bold">Optimal</span>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-lg font-black text-slate-900">75%</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">Bishoftu Branch</p>
              <span className="text-[9px] text-emerald-600 font-bold">Space Available</span>
            </div>
          </div>
        </div>

        {/* Operational Insights Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h4 className="font-bold text-sm text-slate-900">Operational Key Insights</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Order Processing Time</span>
              <span className="font-bold text-slate-900">Avg 2.1 days</span>
            </div>

            <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Scanner Network Latency</span>
              <span className="font-bold text-emerald-600">0.8s (Fast)</span>
            </div>

            <div className="flex justify-between items-center p-2 bg-red-50/60 rounded-lg">
              <span className="text-slate-600">Audit Discrepancy Rate</span>
              <span className="font-bold text-red-600">0.15% (Target &lt; 0.2%)</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    {/* Analytics Grid Section 2: Low Stock & SKU Performance */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Low Stock & Expiry Analysis (6 Cols) */}
      <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Low Stock & Expiry Risk Analysis</h4>
            <p className="text-[10px] text-slate-400">Items Expiring within 30 days or Below Threshold</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            5 Items Flagged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px]">
                <th className="pb-2">SKU Code</th>
                <th className="pb-2">Item Name</th>
                <th className="pb-2">Expiry Date</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              <tr>
                <td className="py-2 font-bold text-[#ce2a37]">TPR-450</td>
                <td className="py-2 font-sans font-medium text-slate-800">TAFE Piston Gasket</td>
                <td className="py-2 text-red-600 font-bold">2026-10-15</td>
                <td className="py-2 text-right font-sans">
                  <button type="button" className="bg-red-50 text-red-700 hover:bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold transition">Discount</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-[#ce2a37]">MF-7885</td>
                <td className="py-2 font-sans font-medium text-slate-800">Rain-gun Seal Set</td>
                <td className="py-2 text-amber-600 font-bold">2026-11-02</td>
                <td className="py-2 text-right font-sans">
                  <button type="button" className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-0.5 rounded text-[10px] font-bold transition">Restock</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 font-bold text-[#ce2a37]">MPP0001</td>
                <td className="py-2 font-sans font-medium text-slate-800">Massey Ferguson Brake Pad</td>
                <td className="py-2 text-amber-600 font-bold">2026-11-20</td>
                <td className="py-2 text-right font-sans">
                  <button type="button" className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-0.5 rounded text-[10px] font-bold transition">Restock</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top/Bottom SKU Performance Table (6 Cols) */}
      <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h4 className="font-bold text-sm text-slate-900">SKU Performance Top 5 (by Value/Turns)</h4>
            <p className="text-[10px] text-slate-400">Highest grossing inventory assets</p>
          </div>
          <span className="text-xs font-bold text-emerald-600">HQ Ranking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px]">
                <th className="pb-2">Item Name</th>
                <th className="pb-2">Value</th>
                <th className="pb-2 text-center">Turns</th>
                <th className="pb-2 text-right">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              <tr>
                <td className="py-2 font-sans font-bold text-slate-900">TAFE 45DI Piston Assembly</td>
                <td className="py-2 font-bold text-emerald-600">ETB 18.2M</td>
                <td className="py-2 text-center">3x</td>
                <td className="py-2 text-right font-sans text-slate-500">Engine Spares</td>
              </tr>
              <tr>
                <td className="py-2 font-sans font-bold text-slate-900">MF Brake Pad Set</td>
                <td className="py-2 font-bold text-emerald-600">ETB 7.38M</td>
                <td className="py-2 text-center">2x</td>
                <td className="py-2 text-right font-sans text-slate-500">Braking</td>
              </tr>
              <tr>
                <td className="py-2 font-sans font-bold text-slate-900">TAFE Piston Cylinder Head</td>
                <td className="py-2 font-bold text-emerald-600">ETB 5.31M</td>
                <td className="py-2 text-center">1x</td>
                <td className="py-2 text-right font-sans text-slate-500">Engine Spares</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </main>
)}

{/* --- PAGE 9: SYSTEM SETTINGS DASHBOARD --- */}
{(activeTab === 'settings' || activeTab === 'system-settings') && (
  <main className="p-6 space-y-6 bg-[#f8fafc] text-slate-800 flex-1 overflow-y-auto">
    
    {/* Top Bar Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            System Settings
          </h2>
          <span className="bg-red-100 text-[#ce2a37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-200">
            HQ Control Panel
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Enterprise Configuration, Multi-Warehouse Controls, Access Permissions & System Security
        </p>
      </div>

      {/* Global Export & Quick Action Buttons */}
      <div className="flex items-center gap-2">
        <button type="button" className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer flex items-center gap-1">
          💾 Backup & Restore
        </button>
        <button type="button" className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer flex items-center gap-1">
          ⚙️ Advanced Config
        </button>
        <button type="button" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📄 PDF
        </button>
        <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          📊 Excel
        </button>
        <button type="button" className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer">
          💾 CSV
        </button>
      </div>
    </div>

    {/* Dynamic Section Tabs Bar */}
    <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
      <button 
        type="button" 
        onClick={() => setSettingsTab('general')} 
        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
          settingsTab === 'general' 
            ? 'bg-[#ce2a37] text-white shadow-xs' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }`}
      >
        ⚙️ General Configuration
      </button>
      <button 
        type="button" 
        onClick={() => setSettingsTab('warehouses')} 
        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
          settingsTab === 'warehouses' 
            ? 'bg-[#ce2a37] text-white shadow-xs' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }`}
      >
        🏢 Warehouses & Locations
      </button>
      <button 
        type="button" 
        onClick={() => setSettingsTab('users')} 
        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
          settingsTab === 'users' 
            ? 'bg-[#ce2a37] text-white shadow-xs' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }`}
      >
        👥 Users & Access Roles
      </button>
      <button 
        type="button" 
        onClick={() => setSettingsTab('integrations')} 
        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
          settingsTab === 'integrations' 
            ? 'bg-[#ce2a37] text-white shadow-xs' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }`}
      >
        🔗 APIs & Integrations
      </button>
      <button 
        type="button" 
        onClick={() => setSettingsTab('security')} 
        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
          settingsTab === 'security' 
            ? 'bg-[#ce2a37] text-white shadow-xs' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }`}
      >
        🛡️ Security & Backup
      </button>
    </div>

    {/* TAB CONTENT 1: GENERAL CONFIGURATION */}
    {settingsTab === 'general' && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900">System Information & Preferences</h4>
              <p className="text-[10px] text-slate-400">Basic enterprise details and system parameters</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono font-bold">
              v2.4 Enterprise Pro
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Company / System Name</label>
                <input 
                  type="text" 
                  defaultValue="JABDU MOTORS S.C. Stock Pro" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:border-[#ce2a37]"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Tax Identification Number (TIN)</label>
                <input 
                  type="text" 
                  defaultValue="0048291039" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs font-mono focus:outline-none focus:border-[#ce2a37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Default Currency</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-mono">
                  <option value="ETB">ETB (Ethiopian Birr)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Timezone</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-mono">
                  <option value="EAT">EAT (East Africa Time - UTC+3)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Language</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium">
                  <option value="AM">አማርኛ (Amharic)</option>
                  <option value="EN">English</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Barcode / Scanner Standard</label>
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 gap-1">
                  <button type="button" className="flex-1 py-1.5 bg-[#ce2a37] text-white text-[11px] font-bold rounded-md shadow-xs">Dynamic QR</button>
                  <button type="button" className="flex-1 py-1.5 bg-white text-slate-700 text-[11px] font-bold rounded-md hover:bg-slate-200">Code 128</button>
                </div>
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Automatic Valuation Method</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium">
                  <option value="FIFO">FIFO (First-In, First-Out)</option>
                  <option value="LIFO">LIFO (Last-In, First-Out)</option>
                  <option value="AVCO">Weighted Average Cost (AVCO)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-sm text-slate-900">Inventory Alert Thresholds</h4>
            <p className="text-[10px] text-slate-400">Automated triggers and notification controls</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Global Low Stock Limit</p>
                <p className="text-[10px] text-slate-500">Triggers reorder flag</p>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="number" defaultValue={10} className="bg-white border border-slate-300 text-slate-900 text-xs w-16 text-center rounded-lg py-1.5 font-bold font-mono" />
                <span className="text-[10px] text-slate-500 font-bold">Units</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Expiry Alert Buffer</p>
                <p className="text-[10px] text-slate-500">Warns before item expiration</p>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="number" defaultValue={30} className="bg-white border border-slate-300 text-slate-900 text-xs w-16 text-center rounded-lg py-1.5 font-bold font-mono" />
                <span className="text-[10px] text-slate-500 font-bold">Days</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">AI Predictive Reorder Auto-Trigger</p>
                <p className="text-[10px] text-slate-500">Generates draft purchase orders automatically</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#ce2a37] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    )}

    {/* TAB CONTENT 2: WAREHOUSES & LOCATIONS */}
    {settingsTab === 'warehouses' && (
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Multi-Warehouse & Branch Network</h4>
            <p className="text-[10px] text-slate-400">Manage stock hubs, storage capacity, and regional distribution points</p>
          </div>
          <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
            + Register New Warehouse
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px]">
                <th className="pb-3">Warehouse / Hub Name</th>
                <th className="pb-3">Location / Region</th>
                <th className="pb-3 text-center">Capacity Used</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-bold text-slate-900">Addis Ababa Central HQ</td>
                <td className="py-3 text-slate-600">Kality Sub-City, Addis Ababa</td>
                <td className="py-3 text-center font-mono font-bold text-amber-600">92% (Near Max)</td>
                <td className="py-3 text-center"><span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span></td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Disable</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900">Adama Hub & Distribution</td>
                <td className="py-3 text-slate-600">Bole District, Adama</td>
                <td className="py-3 text-center font-mono font-bold text-emerald-600">88% (Optimal)</td>
                <td className="py-3 text-center"><span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span></td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Disable</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900">Bishoftu Branch Depot</td>
                <td className="py-3 text-slate-600">Industrial Zone, Bishoftu</td>
                <td className="py-3 text-center font-mono font-bold text-cyan-600">75% (Space Avail)</td>
                <td className="py-3 text-center"><span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span></td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Disable</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* TAB CONTENT 3: USERS & ACCESS ROLES */}
    {settingsTab === 'users' && (
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h4 className="font-bold text-sm text-slate-900">User Accounts & Role Permissions</h4>
            <p className="text-[10px] text-slate-400">Configure access levels for Inventory Managers, Store Keepers, and Auditors</p>
          </div>
          <button type="button" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
            + Add New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px]">
                <th className="pb-3">Full Name</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Role Level</th>
                <th className="pb-3">Assigned Branch</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-bold text-slate-900">Sintayehu Abera</td>
                <td className="py-3 text-slate-500 font-mono">sintayehu@jabdumotors.com</td>
                <td className="py-3"><span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">System Admin</span></td>
                <td className="py-3 text-slate-700">Addis Ababa HQ</td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Revoke</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900">Abebe Bikila</td>
                <td className="py-3 text-slate-500 font-mono">abebe.b@jabdumotors.com</td>
                <td className="py-3"><span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Branch Manager</span></td>
                <td className="py-3 text-slate-700">Adama Branch</td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Revoke</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900">Kebede Tassew</td>
                <td className="py-3 text-slate-500 font-mono">kebede.t@jabdumotors.com</td>
                <td className="py-3"><span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Store Keeper</span></td>
                <td className="py-3 text-slate-700">Addis Ababa HQ</td>
                <td className="py-3 text-right space-x-1">
                  <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">✏️ Edit</button>
                  <button type="button" className="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">🗑️ Revoke</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}

          {/* TAB CONTENT 4: INTEGRATIONS & APIS */}
          {settingsTab === 'integrations' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-bold text-sm text-slate-900">External Integrations & Hardware APIs</h4>
                <p className="text-[10px] text-slate-400">Connect to ERP systems, Telebirr/Bank payment gateways, and Bluetooth Scanners</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-slate-900 text-xs">Enterprise ERP Sync</h5>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[11px] text-slate-500">Automatic synchronization of purchases and inventory accounting.</p>
                  <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg w-full">
                    Configure Endpoints
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-slate-900 text-xs">QR / Scanner Hardware</h5>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[11px] text-slate-500">WebSocket integration for handheld QR code readers.</p>
                  <button type="button" className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg w-full">
                    Manage Devices
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-slate-900 text-xs">Payment & Telebirr Gateway</h5>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  </div>
                  <p className="text-[11px] text-slate-500">Integrated billing and digital payments verification.</p>
                  <button type="button" className="bg-[#ce2a37] hover:bg-red-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg w-full">
                    Connect Gateway
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 5: SECURITY & BACKUP */}
          {settingsTab === 'security' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-bold text-sm text-slate-900">Database Backup & Security Audit Log</h4>
                <p className="text-[10px] text-slate-400">PostgreSQL automated backups, encryption keys, and system activity logs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <h5 className="font-bold text-xs text-slate-900">Manual & Scheduled Backups</h5>
                  <p className="text-[11px] text-slate-500">Last automated backup created today at 03:00 AM (EAT).</p>
                  <div className="flex gap-2">
                    <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl">
                      ⬇️ Download DB Dump
                    </button>
                    <button type="button" className="bg-slate-800 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl">
                      🔄 Force Backup Now
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <h5 className="font-bold text-xs text-slate-900">Security Policies</h5>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 text-slate-700">
                      <input type="checkbox" defaultChecked className="accent-[#ce2a37]" /> Enforce Two-Factor Authentication (2FA) for Admins
                    </label>
                    <label className="flex items-center gap-2 text-slate-700">
                      <input type="checkbox" defaultChecked className="accent-[#ce2a37]" /> Auto-logout after 15 minutes of inactivity
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      )}
    </div>

      </div>
)}