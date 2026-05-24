import { useState, useEffect, FormEvent } from 'react';
import { UserProfile, SupportTicket } from '../types';
import { getUserProfile, updateUserProfile, getSupportTickets, createSupportTicket } from '../utils/dbHelper';
import { Settings, Shield, HelpCircle, Send, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

interface SettingsSupportProps {
  initialTab?: 'settings' | 'support';
  onProfileUpdated: (profile: UserProfile) => void;
  userProfile: UserProfile;
}

export default function SettingsSupport({ initialTab = 'settings', onProfileUpdated, userProfile }: SettingsSupportProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'support'>(initialTab);
  
  // Settings edit state
  const [profileName, setProfileName] = useState(userProfile.name);
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [premiumStatus, setPremiumStatus] = useState(userProfile.isPremium);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Support tickets state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [submittingTicket, setSubmittingTicket] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const list = await getSupportTickets();
        setTickets(list);
      } catch (err) {
        console.error('Failed to load tickets', err);
      }
    }
    if (activeTab === 'support') {
      fetchTickets();
    }
  }, [activeTab]);

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);

    const updatedProfile: UserProfile = {
      ...userProfile,
      name: profileName,
      email: profileEmail,
      isPremium: premiumStatus,
      role: premiumStatus ? 'Premium Student' : 'Standard Student'
    };

    setTimeout(async () => {
      try {
        await updateUserProfile(updatedProfile);
        onProfileUpdated(updatedProfile);
        setSettingsSuccess(true);
      } catch (err) {
        console.error('Error updating user profile.', err);
      } finally {
        setSavingSettings(false);
      }
    }, 400);
  };

  const handleSubmitTicket = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSubmittingTicket(true);
    setTicketSuccess(false);

    setTimeout(async () => {
      try {
        await createSupportTicket(subject, message);
        setSubject('');
        setMessage('');
        setTicketSuccess(true);
        // Reload ticket feed
        const list = await getSupportTickets();
        setTickets(list);
        setTimeout(() => setTicketSuccess(false), 3000);
      } catch (err) {
        console.error('Error writing support ticket.', err);
      } finally {
        setSubmittingTicket(false);
      }
    }, 450);
  };

  return (
    <div className="flex-grow overflow-y-auto bg-[#f9f9fc] p-6 md:p-12Select" id="settings-support-canvas-panel">
      {/* Tab Select Header */}
      <div className="flex border-b border-[#e2e2e5] mb-8 select-none" id="settings-support-tabs">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'settings' 
              ? 'border-b-[#a80006] text-[#a80006]' 
              : 'border-b-transparent text-slate-500 hover:text-slate-800'
          }`}
          id="btn-tab-settings"
        >
          <Settings className="w-4 h-4" /> Configuración
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'support' 
              ? 'border-b-[#a80006] text-[#a80006]' 
              : 'border-b-transparent text-slate-500 hover:text-slate-800'
          }`}
          id="btn-tab-support"
        >
          <HelpCircle className="w-4 h-4" /> Mesa de Soporte
        </button>
      </div>

      {/* 1. Settings Section Layout */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="max-w-xl bg-white border border-[#e2e2e5] rounded-xl p-8 border-t-4 border-t-[#a80006] shadow-sm" id="form-settings">
          <h2 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-2 flex items-center gap-2">
            Configuración Académica
          </h2>
          <p className="text-xs text-slate-400 mb-6 font-medium">Personaliza las credenciales institucionales y roles en tu ClaretLab local.</p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2" htmlFor="input-profile-name">
                Nombre del Estudiante
              </label>
              <input
                id="input-profile-name"
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#f9f9fc] border border-[#e2e2e5] outline-none rounded-lg px-4 py-2.5 focus:border-[#a80006] text-sm text-[#1a1c1e] font-medium"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2" htmlFor="input-profile-email">
                Correo Institucional
              </label>
              <input
                id="input-profile-email"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full bg-[#f9f9fc] border border-[#e2e2e5] outline-none rounded-lg px-4 py-2.5 focus:border-[#a80006] text-sm text-[#1a1c1e] font-medium"
                required
              />
            </div>

            <div className="bg-[#f3f3f6] rounded-xl p-4 border border-[#e2e2e5] flex items-center justify-between">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-[#a80006] mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Membresía Universitaria</h4>
                  <p className="text-xs text-slate-500 font-medium">Desbloquea historial ilimitado, descargas CSV, y soporte preferente con profesores.</p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="toggle-premium"
                  checked={premiumStatus}
                  onChange={(e) => setPremiumStatus(e.target.checked)}
                  className="w-5 h-5 accent-[#a80006] cursor-pointer"
                />
              </div>
            </div>

            {settingsSuccess && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 font-semibold text-xs border border-green-200 p-3.5 rounded-lg select-all">
                <CheckCircle2 className="w-4 h-4" />
                <span>Perfil académico actualizado y guardado correctamente.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={savingSettings}
              className="w-full bg-[#a80006] hover:bg-[#d31111] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow transition-all active:scale-[0.98] cursor-pointer text-sm mt-4"
              id="btn-settings-save"
            >
              {savingSettings ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      )}

      {/* 2. Helpdesk Support ticketing Section */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="grid-support">
          <form onSubmit={handleSubmitTicket} className="lg:col-span-5 bg-white border border-[#e2e2e5] rounded-xl p-8 border-t-4 border-t-[#a80006] shadow-sm" id="form-support">
            <h2 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-2 flex items-center gap-2">
              Enviar Consulta Académica
            </h2>
            <p className="text-xs text-slate-400 mb-6 font-medium">¿Tienes dudas con el funcionamiento o un teorema? Escribe al tutor de Claret.</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2" htmlFor="input-ticket-subject">
                  Asunto (Tema)
                </label>
                <input
                  id="input-ticket-subject"
                  type="text"
                  placeholder="Ej., Problema con ley distributiva o cálculo de Pi"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#f9f9fc] border border-[#e2e2e5] outline-none rounded-lg px-4 py-2.5 focus:border-[#a80006] text-sm text-[#1a1c1e] font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2" htmlFor="textarea-ticket-message">
                  Descripción Detallada
                </label>
                <textarea
                  id="textarea-ticket-message"
                  rows={4}
                  placeholder="Describe detalladamente el teorema o elemento en el que requieres asistencia..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#f9f9fc] border border-[#e2e2e5] outline-none rounded-lg px-4 py-2.5 focus:border-[#a80006] text-sm text-[#1a1c1e] font-medium resize-none"
                  required
                />
              </div>

              {ticketSuccess && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 font-semibold text-xs border border-green-200 p-3.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Consulta registrada en Firestore! Tutor notificará a tu correo.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submittingTicket || !subject.trim() || !message.trim()}
                className="w-full bg-[#a80006] hover:bg-[#d31111] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow transition-all active:scale-[0.98] cursor-pointer text-sm"
                id="btn-ticket-submit"
              >
                {submittingTicket ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Registrando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Enviar Consulta
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Submitted tickets feed list */}
          <div className="lg:col-span-7 flex flex-col h-full bg-white border border-[#e2e2e5] rounded-xl overflow-hidden shadow-sm" id="support-history-feed">
            <div className="p-4 border-b border-[#e2e2e5] bg-[#f3f3f6]">
              <h3 className="text-sm font-bold text-[#1a1c1e] font-headline-md">Tus Consultas Recientes</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-[250px]">
              {tickets.length > 0 ? (
                tickets.map((t) => (
                  <div key={t.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-slate-800">{t.subject}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          t.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-200'
                        }`}>
                          {t.status === 'pending' ? 'Pendiente' : 'Respondido'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3 white-space-pre-wrap">{t.message}</p>
                    </div>
                    
                    <span className="text-[10px] text-slate-400 font-mono font-bold text-right">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <AlertCircle className="w-8 h-8 opacity-40 mb-2" />
                  <p className="text-xs">No has enviado consultas aún. Escribe al tutor sobre dudas lógicas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
