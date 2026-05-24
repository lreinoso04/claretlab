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
    <div className="flex-grow overflow-y-auto bg-[#f9f9fc] p-6 md:p-12" id="dashboard-content-canvas">
      {/* Dynamic Welcome Heading */}
      <div className="mb-12" id="dashboard-header-block">
        <h1 className="text-4xl font-bold font-headline-lg text-[#a80006] mb-2 leading-tight">
          ¡Hola, {userProfile.name}!
        </h1>
        <p className="text-lg text-[#5d3f3b] font-body-lg font-normal">
          ¿Qué vamos a resolver hoy?
        </p>
      </div>

      {/* Quick Access Bento-styled Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12" id="quick-access-bento">
        {/* Table Generator Card */}
        <div 
          onClick={() => onScreenChange('truth-tables')}
          className="md:col-span-6 bg-white border border-[#e7bdb7] rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_15px_-3px_rgba(168,0,6,0.08)] hover:-translate-y-0.5 transition-all duration-300 border-t-4 border-t-[#a80006] group cursor-pointer"
          id="quick-card-truthtable"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#ffe5e1] rounded-lg flex items-center justify-center text-[#a80006]">
              <Grid className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#a80006] group-hover:translate-x-1 transition-all" />
          </div>
          <h2 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-2">
            Tablas de Verdad
          </h2>
          <p className="text-sm font-normal text-[#5d3f3b] leading-relaxed">
            Genera y analiza proposiciones lógicas complejas al instante empleando variables y operadores.
          </p>
        </div>

        {/* Matrix Calculator Card */}
        <div 
          onClick={() => onScreenChange('calculator')}
          className="md:col-span-6 bg-white border border-[#e7bdb7] rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_15px_-3px_rgba(168,0,6,0.08)] hover:-translate-y-0.5 transition-all duration-300 border-t-4 border-t-[#fed700] group cursor-pointer"
          id="quick-card-calculator"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-[#7c5800]">
              <Calculator className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#7c5800] group-hover:translate-x-1 transition-all" />
          </div>
          <h2 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-2">
            Calculadora Matemática
          </h2>
          <p className="text-sm font-normal text-[#5d3f3b] leading-relaxed">
            Resolución de ecuaciones, constantes y funciones científicas avanzadas con historial de cálculo.
          </p>
        </div>
      </div>

      {/* Recents Log Feed (Activity Log) */}
      <div className="mt-6" id="dashboard-recent-activity-section">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-[#a80006]" />
          <h3 className="text-xl font-bold font-headline-md text-[#1a1c1e]">
            Actividad Reciente
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-[#a80006] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleRecentClick(item)}
                className="bg-white border border-[#e2e2e5] hover:border-[#a80006] rounded-xl p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#a80006] transition-colors">
                    <History className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider">
                    {item.timestamp}
                  </span>
                </div>
                
                {/* Math background formula display styled exactly like screenshot */}
                <div className="bg-[#f3f3f6] p-4 rounded-lg mb-3 font-mono font-code text-sm text-[#1a1c1e] overflow-x-auto whitespace-nowrap scrollbar-none border border-[#e2e2e5] group-hover:bg-[#ffe5e1]/30 group-hover:border-[#e7bdb7] transition-all">
                  {item.expression}
                </div>

                <p className="text-sm font-bold text-[#a80006] group-hover:underline transition-all">
                  {item.resultSummary || item.type}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#e2e2e5] p-8 text-center rounded-xl">
            <p className="text-sm text-slate-400 font-medium">Aún no hay actividad reciente. Comienza a resolver arriba.</p>
          </div>
        )}
      </div>
    </div>
  );
}
