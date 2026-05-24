import { useState, useEffect } from 'react';
import { ScreenType, UserProfile, RecentActivity } from '../types';
import { getRecentActivities } from '../utils/dbHelper';
import { Grid, Calculator, History, ChevronRight, Compass } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  onScreenChange: (screen: ScreenType) => void;
  onSelectSavedExpression?: (expr: string) => void;
}

export default function Dashboard({ userProfile, onScreenChange, onSelectSavedExpression }: DashboardProps) {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const list = await getRecentActivities();
        // Take the 3 most recent activities as shown in screenshot
        setActivities(list.slice(0, 3));
      } catch (err) {
        console.error('Failed to load recent activities.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const handleRecentClick = (activity: RecentActivity) => {
    if (onSelectSavedExpression) {
      onSelectSavedExpression(activity.expression);
    }
    if (activity.type === 'Truth Table' || activity.type === 'Logic') {
      onScreenChange('truth-tables');
    } else {
      onScreenChange('calculator');
    }
  };

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12" id="dashboard-content-canvas">
      {/* Dynamic Welcome Heading */}
      <div className="mb-12 relative" id="dashboard-header-block">
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          ¡Hola, {userProfile.name}!
        </h1>
        <p className="text-lg text-[#5d3f3b] font-body-lg font-medium opacity-90">
          ¿Qué vamos a resolver hoy?
        </p>
      </div>

      {/* Quick Access Bento-styled Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12" id="quick-access-bento">
        {/* Table Generator Card */}
        <div 
          onClick={() => onScreenChange('truth-tables')}
          className="md:col-span-6 premium-card border border-[#e2e2e5]/60 hover:border-[#a80006]/40 rounded-2xl p-8 premium-shadow-sm hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          id="quick-card-truthtable"
        >
          {/* Subtle Glowing Corner Orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#a80006]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#a80006] to-[#e31820] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#a80006]/20 group-hover:scale-110 transition-transform duration-300">
              <Grid className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#a80006] group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
          <h2 className="text-2xl font-bold font-headline-md text-[#1a1c1e] mb-3 group-hover:text-[#a80006] transition-colors duration-300">
            Tablas de Verdad
          </h2>
          <p className="text-sm font-normal text-slate-500 leading-relaxed">
            Genera y analiza proposiciones lógicas complejas al instante empleando variables y operadores.
          </p>
        </div>

        {/* Matrix Calculator Card */}
        <div 
          onClick={() => onScreenChange('calculator')}
          className="md:col-span-6 premium-card border border-[#e2e2e5]/60 hover:border-[#fed700]/40 rounded-2xl p-8 premium-shadow-sm hover:premium-shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          id="quick-card-calculator"
        >
          {/* Subtle Glowing Corner Orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#fed700]/15 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#7c5800] to-[#fed700] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#7c5800]/10 group-hover:scale-110 transition-transform duration-300">
              <Calculator className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#7c5800] group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
          <h2 className="text-2xl font-bold font-headline-md text-[#1a1c1e] mb-3 group-hover:text-[#7c5800] transition-colors duration-300">
            Calculadora Matemática
          </h2>
          <p className="text-sm font-normal text-slate-500 leading-relaxed">
            Resolución de ecuaciones, constantes y funciones científicas avanzadas con historial de cálculo.
          </p>
        </div>
      </div>

      {/* Recents Log Feed (Activity Log) */}
      <div className="mt-8" id="dashboard-recent-activity-section">
        <div className="flex items-center gap-2.5 mb-6">
          <History className="w-5 h-5 text-[#a80006]" />
          <h3 className="text-2xl font-bold font-headline-md text-[#1a1c1e]">
            Actividad Reciente
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-[#a80006] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleRecentClick(item)}
                className="premium-card border border-[#e2e2e5]/50 hover:border-[#a80006]/30 rounded-2xl p-6 premium-shadow-sm hover:premium-shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-4 h-4 text-slate-400 group-hover:text-[#a80006] transition-colors duration-300">
                    <History className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider">
                    {item.timestamp}
                  </span>
                </div>
                
                {/* Math background formula display styled as high-end console */}
                <div className="bg-[#1e1e24] text-slate-100 p-4 rounded-xl mb-4 font-mono text-sm overflow-x-auto whitespace-nowrap scrollbar-none border border-slate-800/80 shadow-inner group-hover:bg-[#15151a] transition-colors duration-300">
                  {item.expression}
                </div>

                <p className="text-sm font-bold text-[#a80006] group-hover:text-[#d31111] group-hover:underline transition-all duration-300">
                  {item.resultSummary || item.type}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="premium-card border border-dashed border-[#e2e2e5] p-12 text-center rounded-2xl">
            <p className="text-sm text-slate-400 font-semibold">Aún no hay actividad reciente. Comienza a resolver arriba.</p>
          </div>
        )}
      </div>
    </div>
  );
}
