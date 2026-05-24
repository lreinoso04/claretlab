import { UserProfile } from '../types';
import claretLogo from '@/img/Logo.jpg';
import avatarAlejandro from '@/img/Foto_Alejandro.jpeg';
import avatarLaura from '@/img/Foto_Laura.png';
import avatarAmelia from '@/img/Foto_Amelia.png';

const avatarMap: Record<string, string> = {
  alejandro: avatarAlejandro,
  laura: avatarLaura,
  amelia: avatarAmelia
};

interface ProfileSelectionProps {
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
}

export default function ProfileSelection({ profiles, onSelectProfile }: ProfileSelectionProps) {
  return (
    <div className="min-h-screen w-screen bg-[#090a0f] flex flex-col justify-between p-6 md:p-12 text-white font-sans relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,0,6,0.12)_0%,transparent_75%)] pointer-events-none" />

      {/* Header Logo */}
      <header className="flex items-center gap-3 self-center md:self-start z-10">
        <img
          src={claretLogo}
          alt="Colegio Claret"
          className="h-11 w-11 object-contain rounded-full border border-white/20 shadow-md bg-white p-0.5"
        />
        <span className="text-xl font-bold font-headline-md text-[#e11d24] tracking-tight">ClaretLab</span>
      </header>

      {/* Profile Selector Section */}
      <div className="flex-grow flex flex-col items-center justify-center z-10 py-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 font-headline-xl tracking-tight mb-3 text-center transition-all duration-300">
          ¿Quién está usando ClaretLab?
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-12 text-center max-w-md px-4 leading-relaxed font-medium">
          Selecciona tu perfil académico para cargar tus fórmulas, historial de cálculos y configuraciones.
        </p>

        {/* Profile Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14 max-w-4xl px-4">
          {profiles.map((profile) => {
            const avatar = avatarMap[profile.photoURL || ''] || avatarAlejandro;
            return (
              <div
                key={profile.uid}
                onClick={() => onSelectProfile(profile)}
                className="group flex flex-col items-center cursor-pointer transition-all duration-300 transform active:scale-95"
              >
                {/* Avatar Wrapper with Netflix Glow Hover effect */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-slate-800/80 group-hover:border-[#e11d24] group-hover:shadow-[0_0_30px_rgba(225,29,36,0.5)] transition-all duration-300 bg-slate-900 mb-4">
                  <img
                    src={avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  {profile.isPremium && (
                    <div className="absolute top-2 right-2 bg-[#feb700] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                      PRO
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <span className="text-base md:text-lg font-bold text-slate-300 group-hover:text-white transition-colors duration-200 text-center">
                  {profile.name}
                </span>
                <span className="text-xs text-slate-500 font-semibold mt-0.5 group-hover:text-slate-400 transition-colors duration-200">
                  {profile.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="text-center text-xs text-slate-600 z-10">
        Consola Académica ClaretLab &copy; {new Date().getFullYear()} &middot; Colegio Claret.
      </footer>
    </div>
  );
}
