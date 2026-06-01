import { ScreenType, UserProfile } from '../types';
import { Grid, Calculator, BookOpen, Settings, HelpCircle, GraduationCap, Award, Users, Send, ClipboardList, Video } from 'lucide-react';
import claretCrestUrl from '@/img/Logo.jpg';
import avatarAlejandro from '@/img/Foto_Alejandro.png';
import avatarLaura from '@/img/Foto_Laura.png';
import avatarAmelia from '@/img/Foto_Amelia.png';

const avatarMap: Record<string, string> = {
  alejandro: avatarAlejandro,
  laura: avatarLaura,
  amelia: avatarAmelia
};

interface SidebarProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  userProfile: UserProfile;
  onSwitchProfile: () => void;
}

export default function Sidebar({ currentScreen, onScreenChange, userProfile, onSwitchProfile }: SidebarProps) {

  const navigationItems = [
    { id: 'truth-tables', label: 'Tablas de Verdad', icon: Grid },
    { id: 'calculator', label: 'Calculadora Matemática', icon: Calculator },
    { id: 'formula-sheet', label: 'Fórmulas', icon: BookOpen },
    { id: 'math-propositions', label: 'Proposiciones Matemáticas', icon: GraduationCap },
    { id: 'examples', label: 'Ejemplos', icon: HelpCircle },
    { id: 'quiz', label: 'Formulario de Proposiciones', icon: ClipboardList },
    { id: 'explanatory-videos', label: 'Videos Explicativos', icon: Video },
  ] as const;

  return (
    <nav className="flex flex-col h-full bg-[#f3f3f6] border-r border-[#e2e2e5] w-64 p-4 select-none shrink-0" id="sidebar-navigation">
      {/* Brand Header */}
      <div
        className="flex items-center gap-3 px-2 py-3 mb-6 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
        onClick={() => onScreenChange('dashboard')}
        id="sidebar-brand-logo"
      >
        <img
          alt="Colegio Claret"
          className="h-10 w-10 object-contain rounded-full border border-white bg-white shadow-sm"
          src={claretCrestUrl}
          onError={(e) => {
            // fallback inside iframe
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="text-xl font-bold font-headline-md text-[#a80006] tracking-tight">ClaretLab</span>
      </div>

      {/* Student Profile Card (Institutional Design) */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#e2e2e5] mb-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="relative">
          <img
            alt={userProfile.name}
            className="w-10 h-10 rounded-full border border-[#a80006] object-cover"
            src={avatarMap[userProfile.photoURL || ''] || avatarAlejandro}
            onError={(e) => {
              // fallback default avatar if loading fails
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80";
            }}
          />
          {userProfile.isPremium && (
            <span className="absolute -bottom-1 -right-1 bg-[#feb700] text-white p-0.5 rounded-full border border-white" title="Premium Access">
              <Award className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#1a1c1e] truncate">{userProfile.name}</p>
          <div className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
            <p className="text-xs text-slate-500 font-medium truncate">{userProfile.role}</p>
          </div>
        </div>
      </div>

      {/* Main Screen Navigation */}
      <ul className="flex flex-col gap-1.5 flex-grow" id="sidebar-nav-list">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <li key={item.id}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer ${isActive
                    ? 'bg-[#ffe5e1] text-[#a80006] border-l-4 border-l-[#a80006]'
                    : 'text-slate-600 hover:bg-[#e8e8ea] hover:text-[#1a1c1e]'
                  }`}
                onClick={() => onScreenChange(item.id)}
                id={`nav-${item.id}`}
              >
                <IconComponent className={`w-[18px] h-[18px] ${isActive ? 'text-[#a80006]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Tertiary Actions and Footer Settings */}
      <div className="pt-4 border-t border-[#e2e2e5] flex flex-col gap-1.5 mt-auto">
        {/* Pro Upgrading Option */}
        <button
          onClick={() => onScreenChange('settings')}
          className="w-full flex items-center justify-center gap-2 bg-[#a80006] hover:bg-[#d31111] text-white text-xs font-semibold py-2.5 px-3 rounded-lg hover:-translate-y-px transition-all shadow-sm cursor-pointer"
          id="btn-sidebar-upgrade"
        >
          <span>Mejorar a Pro</span>
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentScreen === 'settings'
              ? 'bg-[#ffe5e1] text-[#a80006]'
              : 'text-slate-600 hover:bg-[#e8e8ea] hover:text-[#1a1c1e]'
            }`}
          onClick={() => onScreenChange('settings')}
          id="nav-settings"
        >
          <Settings className="w-[18px] h-[18px] text-slate-500" />
          <span>Configuración</span>
        </button>


        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-600 hover:bg-[#e8e8ea] hover:text-[#1a1c1e] cursor-pointer"
          onClick={onSwitchProfile}
          id="btn-sidebar-switch-profile"
        >
          <Users className="w-[18px] h-[18px] text-slate-500" />
          <span>Cambiar Perfil</span>
        </button>
      </div>
    </nav>
  );
}
