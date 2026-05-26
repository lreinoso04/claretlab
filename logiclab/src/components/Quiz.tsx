import { ClipboardList, Sparkles } from 'lucide-react';

export default function Quiz() {
  return (
    <div className="flex-grow flex flex-col h-full bg-[#f6f6f9] p-6 md:p-8" id="quiz-canvas-panel">
      {/* Title Header */}
      <div className="mb-6 shrink-0" id="quiz-header-section">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#a80006] animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ponte a prueba</span>
        </div>
        <h1 className="text-3xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-1 leading-tight">
          Formulario de Proposiciones y Tablas de Verdad
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Completa este cuestionario interactivo para evaluar tu comprensión sobre proposiciones lógicas y tablas de verdad.
        </p>
      </div>

      {/* Embedded Google Form Iframe Card */}
      <div className="flex-grow w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden relative p-1 md:p-2 flex flex-col">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScXbrtV-1ZiIhH_pAdwmFDZ2Q7cqwg89iitCBRQsTjfv4YjNA/viewform?embedded=true"
          className="w-full flex-grow border-0 rounded-xl"
          title="Formulario de Proposiciones y Tablas de Verdad"
          style={{ minHeight: '500px' }}
        >
          Cargando formulario...
        </iframe>
      </div>
    </div>
  );
}
