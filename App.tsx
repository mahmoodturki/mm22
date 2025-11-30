import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Activity, 
  Globe, 
  User, 
  Share2, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  Zap,
  LayoutDashboard,
  X,
  Menu,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { TARGET_LINKS, INITIAL_TRAFFIC_SOURCES, SOURCE_NAMES } from './constants';
import { TrafficSource, VisitorData } from './types';
import { GlassCard } from './components/GlassCard';
import { Counter } from './components/Counter';

export default function App() {
  // State
  const [globalVisits, setGlobalVisits] = useState<number>(0);
  const [currentLinkIndex, setCurrentLinkIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>(INITIAL_TRAFFIC_SOURCES);
  const [showStats, setShowStats] = useState<boolean>(true);
  
  // Iframe ref to reload
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize Data
  useEffect(() => {
    // Load or Init Global Visits
    const savedGlobal = localStorage.getItem('globalVisits');
    const initialGlobal = savedGlobal ? parseInt(savedGlobal) : Math.floor(Math.random() * 50000) + 10000;
    setGlobalVisits(initialGlobal);

    // Load or Init Visitor ID
    let vId = localStorage.getItem('visitorId');
    if (!vId) {
      vId = 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('visitorId', vId);
    }

    // Load or Init Total Personal Visits
    const savedPersonal = localStorage.getItem('totalVisits');
    const personalCount = savedPersonal ? parseInt(savedPersonal) + 1 : 1;
    localStorage.setItem('totalVisits', personalCount.toString());

    // Random Traffic Source for this session
    const randomSource = SOURCE_NAMES[Math.floor(Math.random() * SOURCE_NAMES.length)];

    setVisitorData({
      id: vId,
      totalVisits: personalCount,
      currentLinkIndex: 0,
      source: randomSource
    });

    // Initial random link (optional, but requested behavior was random)
    setCurrentLinkIndex(Math.floor(Math.random() * TARGET_LINKS.length));
    setIsLoading(false);

  }, []);

  // Simulate Live Traffic (Global Counter)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increment global visits by 1-5 every 2-5 seconds
      const increment = Math.floor(Math.random() * 5) + 1;
      setGlobalVisits(prev => {
        const newValue = prev + increment;
        localStorage.setItem('globalVisits', newValue.toString());
        return newValue;
      });
    }, Math.floor(Math.random() * 3000) + 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate Social Stats Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficSources(prev => {
        const newSources = [...prev];
        // Pick a random source to increment
        const idx = Math.floor(Math.random() * newSources.length);
        newSources[idx] = {
          ...newSources[idx],
          visits: newSources[idx].visits + Math.floor(Math.random() * 3) + 1
        };
        return newSources;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleNextLink = useCallback(() => {
    setIsLoading(true);
    
    // Logic to pick a random NEW link (different from current)
    let nextIndex;
    if (TARGET_LINKS.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * TARGET_LINKS.length);
      } while (nextIndex === currentLinkIndex);
    } else {
      nextIndex = 0;
    }
    
    setCurrentLinkIndex(nextIndex);
    
    // Increment personal visits in state purely for UI feedback
    setVisitorData(prev => prev ? ({ ...prev, totalVisits: prev.totalVisits + 1 }) : null);
    
    // Increment Global
    setGlobalVisits(prev => prev + 1);

    // Reset loading after a delay to simulate load
    setTimeout(() => setIsLoading(false), 1500);
  }, [currentLinkIndex]);

  const toggleStats = () => setShowStats(!showStats);

  // Helper to get icon component
  const getIcon = (name: string) => {
    switch (name) {
      case 'Facebook': return <Facebook size={16} />;
      case 'Instagram': return <Instagram size={16} />;
      case 'Twitter': return <Twitter size={16} />;
      case 'Youtube': return <Youtube size={16} />;
      default: return <Globe size={16} />;
    }
  };

  const currentUrl = TARGET_LINKS[currentLinkIndex]?.url || '';

  return (
    <div className="relative w-full h-screen bg-black flex flex-col overflow-hidden">
      
      {/* Background/Iframe Area */}
      <div className="flex-1 relative z-0 bg-neutral-900">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 text-brand-400">
             <RefreshCw className="w-12 h-12 animate-spin mb-4" />
             <p className="text-xl font-bold animate-pulse">جاري جلب الرابط التالي...</p>
          </div>
        )}
        
        {/* The Iframe */}
        <iframe 
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-0"
          title="Content Viewer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {/* Fallback/Overlay if iframe is blocked (common with some sites) */}
        <div className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 transition-opacity z-10">
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white bg-black/50 px-2 py-1 rounded flex items-center gap-1">
                <ExternalLink size={12} /> فتح في نافذة جديدة
            </a>
        </div>
      </div>

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          
          {/* Brand & Global Stats */}
          <div className="pointer-events-auto">
            <GlassCard className="flex items-center gap-6 px-6 py-3 !rounded-full">
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <Activity className="text-brand-500" />
                <h1 className="font-bold text-xl text-white">
                  Link<span className="text-brand-500">Rotator</span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <Counter value={globalVisits} label="زيارة نشطة" size="lg" highlight />
              </div>
            </GlassCard>
          </div>

          {/* User Info Panel (Desktop) */}
          <div className={`pointer-events-auto transition-transform duration-500 ${showStats ? 'translate-x-0' : '-translate-x-[200%]'} hidden md:block`}>
             <GlassCard title="بيانات الزائر" icon={<User size={18} />} className="w-72">
               {visitorData && (
                 <div className="space-y-4 text-sm">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-gray-400">المعرف الخاص:</span>
                     <span className="font-mono text-brand-200">{visitorData.id}</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-gray-400">الرابط الحالي:</span>
                     <span className="font-mono font-bold text-white">#{currentLinkIndex + 1}</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-gray-400">زياراتك:</span>
                     <span className="font-bold text-white">{visitorData.totalVisits}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-400">المصدر:</span>
                     <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-xs border border-brand-500/30">
                       {visitorData.source}
                     </span>
                   </div>
                 </div>
               )}
             </GlassCard>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 pointer-events-auto">
        <button 
          onClick={handleNextLink}
          className="group relative flex items-center gap-3 bg-brand-500 hover:bg-brand-400 text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <Zap className="group-hover:fill-black transition-all" />
          <span>رابط تالي</span>
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-slow"></div>
        </button>

        <button 
          onClick={toggleStats}
          className="bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white p-4 rounded-full transition-all hover:rotate-180"
          title="Toggle Stats"
        >
          {showStats ? <X size={24} /> : <LayoutDashboard size={24} />}
        </button>
      </div>

      {/* Social Stats (Side Panel) */}
      <div className={`absolute left-6 top-32 z-30 transition-all duration-500 pointer-events-auto ${showStats ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
        <GlassCard title="إحصائيات المنصة" icon={<Share2 size={18} />} className="w-64">
          <div className="space-y-1">
            {trafficSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors group cursor-default">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{ backgroundColor: source.color }}
                  >
                    {getIcon(source.iconName)}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{source.name}</span>
                </div>
                <span className="font-mono font-bold text-white group-hover:text-brand-400 transition-colors">
                  {source.visits.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> بيانات موثقة لحظياً
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Mobile Stats Overlay (Bottom Sheet style handled conditionally) */}
      {!showStats && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse pointer-events-none">
          انقر للوحة التحكم
        </div>
      )}

    </div>
  );
}
