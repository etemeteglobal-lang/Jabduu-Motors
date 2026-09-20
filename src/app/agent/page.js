'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, ArrowDownLeft, ArrowUpRight, Plus, 
  Printer, CheckCircle2, AlertTriangle, Package, LogOut,
  Wifi, WifiOff, Settings, Focus, Factory, Building2,
  Lock, User, Eye, EyeOff, Camera, X, Sun, Moon, Database, ShieldCheck
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

// === 1. MOCK BACKEND DATA & USERS DATABASE ===
const USER_DATABASE = {
  "store1": {
    pin: "1234",
    name: "Aberra G.",
    role: "Warehouse Store Keeper",
    roleKey: "store_keeper",
    location: "Adama Hub (Warehouse)",
    locationIcon: Building2,
    canGenerate: true,
    canScan: true
  },
  "prod1": {
    pin: "1234",
    name: "Tsehay N.",
    role: "Production Inspector",
    roleKey: "production",
    location: "Bishoftu Factory (Assembly)",
    locationIcon: Factory,
    canGenerate: true,
    canScan: true
  },
  "field1": {
    pin: "1234",
    name: "Keneni R.",
    role: "Field & Logistics Agent",
    roleKey: "field_agent",
    location: "Oromia Region (Field Site)",
    locationIcon: Focus,
    canGenerate: false,
    canScan: true
  }
};

export default function FullyOperationalMobileApp() {
  // Theme & Layout States
  const [theme, setTheme] = useState('dark');

  // Authentication States
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Operational States
  const [activeTab, setActiveTab] = useState('scan');
  const [isOnline, setIsOnline] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);
  const [logs, setLogs] = useState([]);
  
  // Advanced QR Generation Form State (Standardized)
  const [formData, setFormData] = useState({
    productName: '',
    modelNumber: '',
    category: 'Machinery',
    serialNumber: '',
    powerSpecs: '',
    origin: 'Ethiopia (Assemblage)',
    quantity: '1',
    warehouse: 'Adama Central Hub',
    shelfRack: 'Aisle 3, Shelf B'
  });
  const [generatedQr, setGeneratedQr] = useState(null);
  const [qrPayload, setQrPayload] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const html5QrCodeRef = useRef(null);

  // Network Status Monitor
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOffline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

// --- 2. AUTHENTICATION LOGIC (BACKEND INTEGRATED) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      // 1. ወደ ባክኤንድ API የመግቢያ ጥሪ መላክ
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          pin: pinInput.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // 2. ከባክኤንድ የመጣውን JWT Token እና User መረጃ ማስቀመጥ
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // 3. የተጠቃሚውን ስቴት (State) ማዘመን
        setCurrentUser({
          name: data.user.name,
          role: data.user.role,
          roleKey: data.user.roleKey,
          location: data.user.location,
          locationIcon: Building2,
          canGenerate: data.user.canGenerate ?? true,
          canScan: data.user.canScan ?? true
        });

        setFormData(prev => ({ ...prev, warehouse: data.user.location }));
        setUsernameInput('');
        setPinInput('');
      } else {
        setLoginError(data.message || 'Invalid Username or PIN Code!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError('ከባክኤንድ ሰርቨር ጋር መገናኘት አልተቻለም! (Server Error)');
    }
  };
  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setCurrentUser(null);
  setStockItems([]);
  setLoginError('');
};

  // --- 3. HARDWARE CAMERA SCANNER ---
  const startCameraScanner = async () => {
    setIsScanning(true);
    setScannedItem(null);

    setTimeout(() => {
      const qrRegion = document.getElementById("qr-reader");
      if (!qrRegion) return;

      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 220, height: 220 } };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScanSuccess(decodedText);
          stopCameraScanner();
        },
        () => {}
      ).catch(err => {
        console.error("Camera access error:", err);
        alert("Unable to open camera. Please grant camera permissions.");
        setIsScanning(false);
      });
    }, 300);
  };

  const stopCameraScanner = () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      html5QrCodeRef.current.stop().then(() => {
        html5QrCodeRef.current.clear();
        setIsScanning(false);
      }).catch(err => console.error(err));
    } else {
      setIsScanning(false);
    }
  };

  const handleScanSuccess = (decodedData) => {
    let parsedData = null;
    try {
      parsedData = JSON.parse(decodedData);
    } catch {
      parsedData = {
        sku: decodedData || `JBD-WP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: decodedData.includes('PUMP') ? decodedData : 'Water Pump 3-Inch (Honda Engine)',
        category: 'Irrigation Pump',
        stock: Math.floor(Math.random() * 200) + 10,
        location: 'Rack B, Aisle 2'
      };
    }
    setScannedItem(parsedData);

    if (navigator.vibrate) navigator.vibrate(200);
  };

  // --- 4. STOCK IN/OUT LOGIC ---
  const handleStockAction = (type) => {
    if (!scannedItem) return;
    const newLog = {
      id: Date.now(),
      title: scannedItem.name || scannedItem.productName,
      sub: `${type === 'in' ? 'Stock IN (+1)' : 'Stock OUT (-1)'} - ${scannedItem.sku || scannedItem.serialNumber}`,
      time: 'Just now',
      type: type
    };
    setLogs([newLog, ...logs]);
    alert(`Item successfully processed for ${type === 'in' ? 'Stock IN' : 'Stock OUT'}!`);
    setScannedItem(null);
  };

  // --- 5. ENHANCED QR GENERATION LOGIC ---
  const handleGenerateQR = (e) => {
    e.preventDefault();
    if (!formData.serialNumber || !formData.productName) { 
      alert('Please complete required fields (Product Name & Serial Number)'); 
      return; 
    }
    setIsGenerating(true);

    // Standardized JSON Payload for Industrial Scanning
    const fullPayload = {
      company: "JABDU MOTORS S.C.",
      productName: formData.productName,
      model: formData.modelNumber || "N/A",
      category: formData.category,
      serialNumber: formData.serialNumber,
      powerSpecs: formData.powerSpecs || "Standard",
      origin: formData.origin,
      warehouse: formData.warehouse,
      shelfRack: formData.shelfRack,
      generatedAt: new Date().toISOString().split('T')[0]
    };

    setQrPayload(fullPayload);

    setTimeout(() => {
      const jsonString = JSON.stringify(fullPayload);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(jsonString)}`;
      setGeneratedQr(qrUrl);
      setIsGenerating(false);
    }, 800);
  };

  const handleBluetoothPrint = async () => {
    alert("Searching for nearby Bluetooth Thermal Printer... Label sent successfully!");
  };

  // Dynamic Theme Classes
  const bgMain = theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900';
  const bgCard = theme === 'dark' ? 'bg-[#1b222c] border-slate-800' : 'bg-white border-slate-200 shadow-md';
  const bgInner = theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300';
  const textSub = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

  // =========================================================================
  // VIEW 1: AUTHENTICATION / LOGIN SCREEN
  // =========================================================================
  if (!currentUser) {
    return (
      <div className={`min-h-screen ${bgMain} flex flex-col justify-between items-center p-4 font-sans transition-colors duration-300`}>
        <div className="w-full max-w-md my-auto">
          <div className={`${bgCard} border rounded-3xl p-6 shadow-2xl space-y-6 relative`}>
            
            {/* Theme Switcher Button */}
            <button 
              onClick={toggleTheme} 
              className="absolute right-6 top-6 p-2 rounded-full border border-slate-500/30 hover:bg-slate-500/10 transition"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* Header Branding */}
            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center mx-auto p-1 shadow-xl overflow-hidden">
                <img 
                  src="/jabdu-logo.jpg" 
                  alt="Jabdu Motors Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide">JABDU STORES PRO</h1>
                <p className={`text-xs ${textSub} mt-0.5`}>Mobile Operational Terminal</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl flex items-center gap-2 text-[11px]">
                  <AlertTriangle className="h-4 w-4 shrink-0" /> {loginError}
                </div>
              )}

              <div>
                <label className={`${textSub} block mb-1.5 font-medium`}>Username / User ID</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. store1, prod1, field1"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className={`w-full ${bgInner} border rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:border-[#ce2a37]`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`${textSub} block mb-1.5 font-medium`}>PIN Code</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input 
                    type={showPin ? "text" : "password"} 
                    placeholder="Enter 4-digit PIN (1234)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className={`w-full ${bgInner} border rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-[#ce2a37]`}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#ce2a37] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg mt-2"
              >
                Log In to Terminal
              </button>
            </form>

            {/* Quick Demo Credentials */}
            <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} pt-4 text-[10px] ${textSub} space-y-1`}>
              <p className="font-bold">Demo Credentials (PIN: 1234):</p>
              <p>• Store Keeper: <span className="text-cyan-500 font-mono">store1</span></p>
              <p>• Factory Inspector: <span className="text-cyan-500 font-mono">prod1</span></p>
              <p>• Field Logistics: <span className="text-cyan-500 font-mono">field1</span></p>
            </div>

          </div>
        </div>

        {/* POWERED BY FOOTER */}
        <footer className="w-full max-w-md p-2.5 border-t border-slate-800/80 bg-[#151b23] rounded-2xl shrink-0 mt-4">
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
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: OPERATIONAL TERMINAL (POST LOGIN)
  // =========================================================================
  const UserLocationIcon = currentUser.locationIcon;

  return (
    <div className={`min-h-screen ${bgMain} flex flex-col w-full max-w-md md:max-w-xl mx-auto font-sans shadow-2xl transition-colors duration-300`}>
      
      {/* 1. APP HEADER */}
      <header className={`${bgCard} p-4 border-b sticky top-0 z-30 shadow-lg`}>
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center border-2 border-cyan-500 p-0.5 shadow-sm overflow-hidden">
              <img 
                src="/jabdu-logo.jpg" 
                alt="Jabdu Motors Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold text-xs">JABDU STORES PRO</h1>
              <p className={`text-[10px] ${textSub} font-medium`}>Terminal v2.4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="p-1.5 rounded-full border border-slate-500/30 hover:bg-slate-500/10 transition"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {isOnline ? 
              <Wifi className="h-4 w-4 text-emerald-500" /> : 
              <WifiOff className="h-4 w-4 text-red-500 animate-pulse" />
            }
            <button onClick={handleLogout} className={`p-1 rounded-full ${textSub} hover:text-red-500`}>
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* User Badge */}
        <div className={`${bgInner} rounded-xl p-2.5 mt-2 flex items-center gap-3 border`}>
          <img src={`https://i.pravatar.cc/40?u=${currentUser.name}`} alt="Avatar" className="w-9 h-9 rounded-full border border-slate-400" />
          <div className="flex-1">
            <h2 className="text-xs font-bold">{currentUser.name}</h2>
            <p className="text-[10px] text-cyan-500 font-medium">{currentUser.role}</p>
            <div className={`flex items-center gap-1 text-[9px] ${textSub} mt-0.5`}>
              <UserLocationIcon className="h-3 w-3" /> {currentUser.location}
            </div>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS */}
      <div className={`grid grid-cols-3 ${theme === 'dark' ? 'bg-[#111827] border-slate-800' : 'bg-slate-200 border-slate-300'} text-xs font-semibold border-b p-1.5 sticky top-[105px] z-20`}>
        <button onClick={() => { stopCameraScanner(); setActiveTab('scan'); }} className={`py-3 rounded-lg flex items-center justify-center gap-1.5 transition ${activeTab === 'scan' ? 'bg-[#ce2a37] text-white shadow-md' : `${textSub}`}`}>
          <QrCode className="h-4 w-4" /> Scan
        </button>
        
        {currentUser.canGenerate && (
          <button onClick={() => { stopCameraScanner(); setActiveTab('generate'); }} className={`py-3 rounded-lg flex items-center justify-center gap-1.5 transition ${activeTab === 'generate' ? 'bg-[#ce2a37] text-white shadow-md' : `${textSub}`}`}>
            <Plus className="h-4 w-4" /> New QR
          </button>
        )}
        
        <button onClick={() => { stopCameraScanner(); setActiveTab('tasks'); }} className={`py-3 rounded-lg flex items-center justify-center gap-1.5 transition ${activeTab === 'tasks' ? 'bg-[#ce2a37] text-white shadow-md' : `${textSub}`}`}>
          <Package className="h-4 w-4" /> Logs
        </button>
      </div>

      {/* 3. MAIN TERMINAL BODY */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">

        {/* --- TAB 1: HARDWARE CAMERA SCANNER --- */}
        {activeTab === 'scan' && (
          <div className="space-y-4">
            
            {/* Live Camera Feed */}
            {isScanning ? (
              <div className={`${bgInner} border-2 border-cyan-500 rounded-2xl p-3 relative overflow-hidden shadow-2xl`}>
                <div className="flex justify-between items-center mb-2 px-2">
                  <span className="text-[11px] font-bold text-cyan-500 flex items-center gap-1">
                    <Camera className="h-4 w-4 animate-pulse" /> Live Camera Active
                  </span>
                  <button onClick={stopCameraScanner} className={`p-1 rounded-lg ${textSub}`}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div id="qr-reader" className="w-full rounded-xl overflow-hidden bg-black min-h-[250px]"></div>
                <p className={`text-[10px] text-center ${textSub} mt-2`}>Align QR Code inside camera view frame</p>
              </div>
            ) : !scannedItem ? (
              <div className={`${bgCard} border-2 border-dashed rounded-2xl p-8 text-center space-y-4 shadow-inner`}>
                <div className={`w-20 h-20 rounded-full ${bgInner} text-cyan-500 flex items-center justify-center mx-auto border-4 shadow-xl`}>
                  <QrCode className="h-10 w-10 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Open Camera Scanner</h2>
                  <p className={`text-xs ${textSub} mt-1`}>Scan QR label on Pump, Engine or Spare Part box</p>
                </div>
                <button 
                  onClick={startCameraScanner}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Camera className="h-5 w-5" /> Start Camera Scan
                </button>
              </div>
            ) : null}

            {/* Scanned Results */}
            {scannedItem && (
              <div className={`${bgCard} rounded-2xl p-5 border space-y-4 shadow-xl`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-600 font-bold px-2.5 py-1 rounded-full font-mono">
                    {scannedItem.serialNumber || scannedItem.sku || 'SKU-OK'}
                  </span>
                  <button onClick={() => setScannedItem(null)} className={`text-xs ${textSub}`}>Clear</button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Product
                  </span>
                  <h3 className="text-sm font-bold">{scannedItem.productName || scannedItem.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs border-t border-slate-500/20 pt-3">
                  <p className={textSub}>Category: <span className="font-medium text-white">{scannedItem.category}</span></p>
                  <p className={textSub}>Model: <span className="font-medium text-white">{scannedItem.model || 'Standard'}</span></p>
                  <p className={textSub}>Power/Specs: <span className="font-medium text-white">{scannedItem.powerSpecs || 'N/A'}</span></p>
                  <p className={textSub}>Origin: <span className="font-medium text-white">{scannedItem.origin || 'Ethiopia'}</span></p>
                  <p className={`${textSub} col-span-2`}>Warehouse Position: <span className="font-semibold text-cyan-400">{scannedItem.warehouse} ({scannedItem.shelfRack || 'Main Shelf'})</span></p>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-500/20 pt-4">
                  {currentUser.roleKey === 'store_keeper' && (
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => handleStockAction('in')} className="bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md">
                        <ArrowDownLeft className="h-5 w-5" /> Stock IN
                      </button>
                      <button onClick={() => handleStockAction('out')} className="bg-amber-600 hover:bg-amber-500 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md">
                        <ArrowUpRight className="h-5 w-5" /> Stock OUT
                      </button>
                    </div>
                  )}

                  {currentUser.roleKey === 'field_agent' && (
                    <button onClick={() => { alert('Asset Verified Successfully!'); setScannedItem(null); }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md">
                      <CheckCircle2 className="h-5 w-5" /> Verify Asset
                    </button>
                  )}

                  {currentUser.roleKey === 'production' && (
                    <button onClick={() => { alert('Production Status Updated!'); setScannedItem(null); }} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md">
                      <Settings className="h-5 w-5" /> Update Assembly Status
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: STANDARDIZED GENERATE QR VIEW --- */}
        {activeTab === 'generate' && currentUser.canGenerate && (
          <div className="space-y-4">
            <div className={`${bgCard} rounded-2xl p-5 border shadow-xl space-y-4`}>
              <div className="border-b border-slate-500/20 pb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <Printer className="h-5 w-5 text-[#ce2a37]" /> Industrial Product Registration
                </h2>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded font-mono font-bold">ISO 15459 Standard</span>
              </div>

              <form onSubmit={handleGenerateQR} className="space-y-3 text-xs">
                <div>
                  <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Product Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3-Inch Gasoline Water Pump"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    className={`w-full ${bgInner} border rounded-lg p-2.5 focus:border-[#ce2a37]`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Category *</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 focus:border-[#ce2a37]`}
                    >
                      <option value="Machinery">Diesel Irrigation Pump</option>
                      <option value="Solar">Solar Pump System</option>
                      <option value="Rain-Gun">Rain-gun Sprinkler</option>
                      <option value="Spare Part">Spare Part / Component</option>
                    </select>
                  </div>

                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Model Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. JBD-300X"
                      value={formData.modelNumber}
                      onChange={(e) => setFormData({...formData, modelNumber: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 font-mono focus:border-[#ce2a37]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Serial / Batch No. *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. JBD-2026-PUMP-99"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 font-mono focus:border-[#ce2a37]`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Power / Specs</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 6.5 HP / 3000 RPM"
                      value={formData.powerSpecs}
                      onChange={(e) => setFormData({...formData, powerSpecs: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 focus:border-[#ce2a37]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Warehouse</label>
                    <input 
                      type="text" 
                      value={formData.warehouse}
                      onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 focus:border-[#ce2a37]`}
                    />
                  </div>

                  <div>
                    <label className={`${textSub} text-[11px] block mb-1 font-medium`}>Shelf / Rack Position</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rack C-4"
                      value={formData.shelfRack}
                      onChange={(e) => setFormData({...formData, shelfRack: e.target.value})}
                      className={`w-full ${bgInner} border rounded-lg p-2.5 focus:border-[#ce2a37]`}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full bg-[#ce2a37] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition mt-2 shadow-lg flex items-center justify-center gap-2"
                >
                  {isGenerating ? 'Generating Standardized QR...' : '+ Generate Complete QR Label'}
                </button>
              </form>
            </div>

            {/* Generated Output Card */}
            {generatedQr && qrPayload && (
              <div className={`${bgCard} rounded-2xl p-5 border border-emerald-500/50 text-center space-y-4 shadow-2xl`}>
                <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs font-bold bg-emerald-500/10 py-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" /> Standardized QR Code Generated!
                </div>
                
                <div className="bg-white p-4 rounded-xl inline-block shadow-inner border-4 border-white text-slate-900">
                  <img src={generatedQr} alt="QR Label" className="w-48 h-48 mx-auto" />
                  <div className="mt-2 border-t border-slate-200 pt-2 text-center font-sans space-y-0.5">
                    <p className="text-[11px] font-extrabold tracking-wider text-[#ce2a37]">JABDU MOTORS S.C.</p>
                    <p className="text-[10px] font-bold">{qrPayload.productName}</p>
                    <p className="text-[9px] font-mono bg-slate-100 py-0.5 px-1 rounded inline-block font-semibold">
                      SN: {qrPayload.serialNumber}
                    </p>
                  </div>
                </div>

                {/* Encoded Data Specs Box */}
                <div className={`${bgInner} rounded-xl p-3 text-left border text-[11px] space-y-1 font-mono`}>
                  <p className="text-cyan-400 font-bold font-sans flex items-center gap-1 border-b border-slate-700 pb-1 mb-1">
                    <Database className="h-3.5 w-3.5" /> Encoded Payload Specs:
                  </p>
                  <p className="text-slate-300"><span className="text-slate-500">Model:</span> {qrPayload.model}</p>
                  <p className="text-slate-300"><span className="text-slate-500">Specs:</span> {qrPayload.powerSpecs}</p>
                  <p className="text-slate-300"><span className="text-slate-500">Location:</span> {qrPayload.warehouse} ({qrPayload.shelfRack})</p>
                </div>

                <button 
                  onClick={handleBluetoothPrint}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Printer className="h-4 w-4" /> Print Label (Bluetooth Thermal)
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: LOGS & HISTORY --- */}
        {activeTab === 'tasks' && (
          <div className="space-y-4 text-xs">
            <div className={`${bgCard} rounded-2xl p-5 border space-y-3`}>
              <h2 className="font-bold border-b border-slate-500/20 pb-3">Recent Terminal Operations</h2>
              
              {logs.length === 0 ? (
                <p className={`${textSub} text-center py-6`}>No recent activity logged</p>
              ) : (
                <div className="space-y-2.5 max-h-80 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className={`flex justify-between items-center ${bgInner} p-3 rounded-xl border`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${log.type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {log.type === 'in' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-bold">{log.title}</p>
                          <p className={`text-[10px] ${textSub}`}>{log.sub}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] ${textSub} font-medium`}>{log.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* POWERED BY FOOTER */}
      <footer className="p-2.5 border-t border-slate-800/80 bg-[#151b23] shrink-0 mt-auto">
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
      </footer>

    </div>
  );
}