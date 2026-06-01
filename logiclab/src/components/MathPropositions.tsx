import { useState } from 'react';
import { 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function MathPropositions() {
  const [activeTab, setActiveTab] = useState<'all' | 'simples' | 'compuestas'>('all');

  const simpleExamples = [
    { text: '7 es un número primo.', value: true, desc: 'Es verdadero, ya que 7 solo tiene como divisores a 1 y a sí mismo.' },
    { text: 'El triángulo equilátero tiene tres lados de igual longitud.', value: true, desc: 'Es verdadero por la definición misma de equilátero.' },
    { text: '8 es un número impar.', value: false, desc: 'Es falso, puesto que 8 es divisible por 2.' },
  ];

  const compoundExamples = [
    { text: '9 es un cuadrado perfecto y 2 es un número par.', value: true, desc: 'Verdadero. Ambas proposiciones simples son verdaderas y están unidas por una conjunción (Y).' },
    { text: 'Si un número termina en 0 o en 5, entonces es divisible por 5.', value: true, desc: 'Verdadero. Es una condicional basada en las reglas de divisibilidad del 5.' },
    { text: '4 es menor que 2 o 5 es mayor que 3.', value: true, desc: 'Verdadero. En una disyunción (O), basta con que una de las proposiciones simples sea verdadera (5 > 3).' },
  ];

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12 font-sans" id="math-propositions-viewport">
      {/* Header Banner */}
      <div className="mb-10 max-w-5xl mx-auto" id="propositions-header-block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#ffe5e1] flex items-center justify-center text-[#a80006]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-[#a80006] tracking-widest bg-[#ffe5e1] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#a80006]" />
            Fundamentos Lógicos
          </span>
        </div>
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Proposiciones Matemáticas
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-3xl leading-relaxed">
          Explora la base de la lógica matemática. Aprende a distinguir enunciados formales, clasificar proposiciones simples y compuestas, y reconocer aquellas expresiones que no poseen valor lógico.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto pb-12" id="propositions-content-grid">
        
        {/* Left Side: Definitions and Types (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Concept Card */}
          <div className="premium-info-card p-6 bg-white border border-[#e2e2e5] rounded-2xl relative overflow-hidden pl-7 premium-indicator-crimson">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-[#a80006] shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a1c1e] mb-2">¿Qué es una Proposición Matemática?</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Es un enunciado oracional declarativo que expresa una afirmación matemática y que tiene la propiedad fundamental de ser **únicamente Verdadero (V) o Falso (F)**, pero no ambos a la vez. En la matemática, las proposiciones nos permiten construir razonamientos complejos y demostrar teoremas mediante valores de verdad objetivos.
                </p>
              </div>
            </div>
          </div>

          {/* Types Section with Filter Tabs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#1a1c1e] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#a80006]" />
                Tipos de Proposiciones
              </h3>
              
              {/* Tab Selector */}
              <div className="flex bg-[#e8e8ea] p-1 rounded-xl">
                {(['all', 'simples', 'compuestas'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-white text-[#a80006] shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab === 'all' ? 'Ver Todas' : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Propositions */}
            {(activeTab === 'all' || activeTab === 'simples') && (
              <div className="bg-white border border-[#e2e2e5] rounded-2xl p-6 mb-6 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-500/20">
                    Proposiciones Simples (Atómicas)
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Son enunciados de estructura básica que expresan una sola idea sobre un concepto u objeto matemático. No contienen conectores lógicos (como "y", "o", "no", "si... entonces") que unan múltiples enunciados independientes.
                </p>
                
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ejemplos Prácticos:</h4>
                <div className="flex flex-col gap-3">
                  {simpleExamples.map((ex, idx) => (
                    <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:bg-[#fafafc] transition-all">
                      <div className="mt-0.5 shrink-0">
                        {ex.value ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4.5 h-4.5 text-rose-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-sm font-bold text-[#1a1c1e] mb-0.5">
                          "{ex.text}"
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          <span className={`font-bold mr-1 ${ex.value ? 'text-emerald-700' : 'text-rose-700'}`}>
                            [{ex.value ? 'Verdadero' : 'Falso'}]
                          </span>
                          {ex.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compound Propositions */}
            {(activeTab === 'all' || activeTab === 'compuestas') && (
              <div className="bg-white border border-[#e2e2e5] rounded-2xl p-6 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-700 border border-purple-500/20">
                    Proposiciones Compuestas (Moleculares)
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Son enunciados más complejos formados por la unión de dos o más proposiciones simples mediante uno o varios **conectores lógicos** (conjunción, disyunción, condicional, bicondicional) o modificados por un operador de negación.
                </p>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ejemplos Prácticos:</h4>
                <div className="flex flex-col gap-3">
                  {compoundExamples.map((ex, idx) => (
                    <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:bg-[#fafafc] transition-all">
                      <div className="mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-bold text-[#1a1c1e] mb-0.5">
                          "{ex.text}"
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          <span className="font-bold text-emerald-700 mr-1">
                            [Verdadero]
                          </span>
                          {ex.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Side: What is NOT a proposition & Video Note (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* What is NOT a mathematical proposition */}
          <div className="bg-[#fff9f9] border border-rose-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#ffe5e1] flex items-center justify-center text-[#a80006] shrink-0">
                <AlertCircle className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-base text-[#1a1c1e] font-headline-sm">
                ¿Qué NO es una Proposición?
              </h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Cualquier expresión oral o escrita que **no afirme nada objetivamente** y que, por ende, **no pueda ser calificada como Verdadera o Falsa**, no califica como proposición matemática.
            </p>

            <div className="flex flex-col gap-3.5">
              <div className="border-l-3 border-[#a80006]/30 pl-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Preguntas (Interrogativas)</span>
                <p className="text-xs font-mono font-bold text-slate-700">"¿Cuánto vale x?"</p>
                <p className="text-[11px] text-slate-500 mt-0.5">No asevera un estado, solo consulta información.</p>
              </div>

              <div className="border-l-3 border-[#a80006]/30 pl-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Exclamaciones u Opiniones</span>
                <p className="text-xs font-mono font-bold text-slate-700">"¡Las matemáticas son hermosas!"</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Es un juicio subjetivo y emocional, no una afirmación factual de la lógica.</p>
              </div>

              <div className="border-l-3 border-[#a80006]/30 pl-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Órdenes (Imperativas)</span>
                <p className="text-xs font-mono font-bold text-slate-700">"Resuelve la ecuación cuadrática."</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Representa una orden o mandato para realizar una acción, carece de valor de verdad.</p>
              </div>

              <div className="border-l-3 border-[#a80006]/30 pl-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Enunciados Abiertos (Indefinidos)</span>
                <p className="text-xs font-mono font-bold text-slate-700">"x + 3 = 8"</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Dado que "x" es una variable no definida en un conjunto, el enunciado no se puede evaluar hasta asignarle un valor.</p>
              </div>
            </div>
          </div>

          {/* Embedded Video Card */}
          <div className="premium-info-card p-6 bg-gradient-to-br from-[#1e1e24] to-[#121216] text-white border border-slate-800 rounded-2xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#a80006]/20 text-[#ff4c52] border border-[#a80006]/30">
                  Nota Importante
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-[#ff4c52] transition-colors">
                ¿Deseas profundizar más?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">
                Si deseas aprender más sobre el fascinante mundo de la lógica proposicional, las tablas de verdad y cómo estructurar tus razonamientos matemáticos de forma impecable, te invitamos a ver el siguiente video explicativo interactivo:
              </p>

              {/* YouTube Responsive Video Embed */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-black mb-5">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/5jzdQn6gcU8"
                  title="Video Explicativo de Proposiciones"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <a
              href="https://www.youtube.com/watch?v=5jzdQn6gcU8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#a80006] hover:bg-[#d31111] text-white text-xs font-semibold py-2.5 px-3 rounded-lg hover:-translate-y-px transition-all shadow-md cursor-pointer"
            >
              <span>Ver en YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
