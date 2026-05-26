import { useState } from 'react';
import { Lightbulb, Info, Calculator, List, GraduationCap, Play, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface ExamplesProps {
  onSelectExpression?: (expr: string) => void;
}

export default function Examples({ onSelectExpression }: ExamplesProps) {
  const [activePedagogicalTab, setActivePedagogicalTab] = useState<'examen' | 'permiso' | 'parque'>('examen');

  const handleLoadFormula = (expr: string) => {
    if (onSelectExpression) {
      onSelectExpression(expr);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12" id="examples-canvas-viewport">
      {/* Page Header */}
      <header className="mb-8" id="examples-page-header">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#a80006] animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aprende Jugando</span>
        </div>
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Ejemplos Prácticos de Lógica
        </h1>
        <p className="text-base text-slate-500 font-body-lg max-w-2xl leading-relaxed">
          La lógica no es solo matemáticas. Es la forma en que pensamos y tomamos decisiones cotidianas. Explora estos ejemplos sencillos diseñados especialmente para estudiantes.
        </p>
      </header>

      {/* 1. SECTION: High School Pedagogical Examples */}
      <section className="premium-card border border-slate-200/60 rounded-2xl p-8 premium-shadow-md relative overflow-hidden" id="section-pedagogical-examples">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a80006] to-[#e31820]"></div>
        
        <h2 className="text-2xl font-bold text-[#1a1c1e] mb-2 flex items-center gap-2.5 font-headline-md">
          <GraduationCap className="text-[#a80006] w-6 h-6" />
          Lógica en la Vida Real
        </h2>
        <p className="text-xs text-slate-400 mb-6 font-semibold">
          Haz clic en las pestañas para ver cómo modelamos situaciones del día a día con operadores lógicos.
        </p>

        {/* Tab navigation for student cases */}
        <div className="flex border-b border-slate-200 mb-6 select-none" id="pedagogical-tabs">
          <button
            onClick={() => setActivePedagogicalTab('examen')}
            className={`px-4 py-3 font-semibold text-xs transition-all border-b-2 cursor-pointer ${
              activePedagogicalTab === 'examen' 
                ? 'border-b-[#a80006] text-[#a80006]' 
                : 'border-b-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📚 Aprobar Matemáticas
          </button>
          <button
            onClick={() => setActivePedagogicalTab('permiso')}
            className={`px-4 py-3 font-semibold text-xs transition-all border-b-2 cursor-pointer ${
              activePedagogicalTab === 'permiso' 
                ? 'border-b-[#a80006] text-[#a80006]' 
                : 'border-b-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🎉 El Permiso de Salida
          </button>
          <button
            onClick={() => setActivePedagogicalTab('parque')}
            className={`px-4 py-3 font-semibold text-xs transition-all border-b-2 cursor-pointer ${
              activePedagogicalTab === 'parque' 
                ? 'border-b-[#a80006] text-[#a80006]' 
                : 'border-b-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ⚽ Tarde de Fútbol
          </button>
        </div>

        {/* Case 1: Examen */}
        {activePedagogicalTab === 'examen' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-headline-sm">
                Caso 1: El Secreto para Pasar Matemáticas
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Imagina que tu profesor te da una regla: <span className="font-semibold text-slate-800">"Para aprobar Matemáticas, debes entregar todas las tareas Y además estudiar mucho para el examen."</span> Si haces ambas cosas, pasarás la materia de forma asegurada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 1: Definir Proposiciones</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li><strong className="text-[#a80006] font-mono">P:</strong> "Entrego todas las tareas."</li>
                    <li><strong className="text-[#a80006] font-mono">Q:</strong> "Estudio mucho para el examen."</li>
                    <li><strong className="text-[#a80006] font-mono">R:</strong> "Apruebo el curso de Matemáticas."</li>
                  </ul>
                  <div className="mt-4 p-3 bg-slate-100/80 border border-slate-200 rounded-lg">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Fórmula Resultante:</span>
                    <code className="text-sm font-bold font-mono text-[#a80006]">(P ∧ Q) → R</code>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 2: Análisis del Valor de Verdad</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    Si no entregas las tareas (<span className="font-mono">P=F</span>) o no estudias (<span className="font-mono">Q=F</span>), el condicional se mantendrá lógicamente verdadero, pero tú no cumplirás el requisito para aprobar. Solo cuando <span className="font-mono">P=V</span> y <span className="font-mono">Q=V</span>, la lógica de la regla te asegura que <span className="font-mono">R=V</span> (aprobarás).
                  </p>
                  <button
                    onClick={() => handleLoadFormula('(P ∧ Q) → R')}
                    className="mt-2 w-full md:w-auto bg-gradient-to-r from-[#a80006] to-[#e31820] hover:from-[#c20007] hover:to-[#f0222a] text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Probar esta Fórmula en el Generador
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case 2: Permiso */}
        {activePedagogicalTab === 'permiso' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-headline-sm">
                Caso 2: La Condición Absoluta de tus Padres
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tus padres te dicen: <span className="font-semibold text-slate-800">"Saldrás con tus amigos el sábado SI Y SOLO SI limpias y ordenas tu habitación."</span> Aquí no hay términos medios. Es una condición de doble vía.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 1: Definir Proposiciones</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li><strong className="text-[#a80006] font-mono">P:</strong> "Saldré con mis amigos el sábado."</li>
                    <li><strong className="text-[#a80006] font-mono">Q:</strong> "Limpio y ordeno mi habitación."</li>
                  </ul>
                  <div className="mt-4 p-3 bg-slate-100/80 border border-slate-200 rounded-lg">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Fórmula Resultante:</span>
                    <code className="text-sm font-bold font-mono text-[#a80006]">P ↔ Q</code>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 2: Análisis del Valor de Verdad</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    Si ordenas la pieza (<span className="font-mono">Q=V</span>) y sales (<span className="font-mono">P=V</span>), todo es correcto. Si no ordenas la pieza (<span className="font-mono">Q=F</span>) y no sales (<span className="font-mono">P=F</span>), el trato se cumple igualmente. La regla se rompe (es falsa) si sales sin ordenar o si ordenas y no te dejan salir.
                  </p>
                  <button
                    onClick={() => handleLoadFormula('P ↔ Q')}
                    className="mt-2 w-full md:w-auto bg-gradient-to-r from-[#a80006] to-[#e31820] hover:from-[#c20007] hover:to-[#f0222a] text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Probar esta Fórmula en el Generador
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case 3: Parque */}
        {activePedagogicalTab === 'parque' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-headline-sm">
                Caso 3: Tarde de Fútbol con Amigos
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tus amigos te proponen: <span className="font-semibold text-slate-800">"Si terminas tus tareas temprano O no llueve a cántaros, entonces nos juntaremos en la cancha a jugar fútbol."</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 1: Definir Proposiciones</h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li><strong className="text-[#a80006] font-mono">A:</strong> "Termino mis deberes temprano."</li>
                    <li><strong className="text-[#a80006] font-mono">B:</strong> "Llueve a cántaros."</li>
                    <li><strong className="text-[#a80006] font-mono">C:</strong> "Nos juntamos en la cancha a jugar."</li>
                  </ul>
                  <div className="mt-4 p-3 bg-slate-100/80 border border-slate-200 rounded-lg">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Fórmula Resultante:</span>
                    <code className="text-sm font-bold font-mono text-[#a80006]">(A ∨ ¬B) → C</code>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paso 2: Análisis del Valor de Verdad</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    Basta con que una de las dos condiciones se cumpla (terminar las tareas temprano o que haga buen clima, es decir, <span className="font-mono">¬B</span>) para que se active la consecuencia de ir a jugar. ¡Una excelente oportunidad para practicar disyunciones!
                  </p>
                  <button
                    onClick={() => handleLoadFormula('(A ∨ ¬B) → C')}
                    className="mt-2 w-full md:w-auto bg-gradient-to-r from-[#a80006] to-[#e31820] hover:from-[#c20007] hover:to-[#f0222a] text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Probar esta Fórmula en el Generador
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. SECTION: Basic Truth Tables Overview */}
      <section className="premium-info-card p-8 premium-indicator-crimson" id="section-basic-gates">
        <h2 className="text-2xl font-bold text-[#1a1c1e] mb-6 flex items-center gap-2.5 font-headline-md">
          <List className="text-[#a80006] w-6 h-6" />
          Conectores Lógicos Básicos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Negacion */}
          <div className="bg-white/80 p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-[#a80006] border border-rose-500/20">
                  NOT
                </span>
                <button
                  onClick={() => handleLoadFormula('¬ A')}
                  className="text-xs font-bold text-[#a80006] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Cargar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 font-headline-sm">1. Negación (¬ A)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Dice lo opuesto. Si la afirmación es verdadera, su negación es falsa, y viceversa.
              </p>
            </div>
            
            <table className="w-full text-xs text-left border-collapse bg-slate-50/50 rounded-lg overflow-hidden border border-slate-200/80 font-mono">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border-b border-r text-center font-bold">A</th>
                  <th className="p-2 border-b text-center font-bold">¬ A</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-2 border-r text-center">V</td>
                  <td className="p-2 text-center font-bold text-rose-600">F</td>
                </tr>
                <tr>
                  <td className="p-2 border-r text-center">F</td>
                  <td className="p-2 text-center font-bold text-emerald-600">V</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Conjuncion */}
          <div className="bg-white/80 p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-[#a80006] border border-rose-500/20">
                  AND
                </span>
                <button
                  onClick={() => handleLoadFormula('A ∧ B')}
                  className="text-xs font-bold text-[#a80006] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Cargar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 font-headline-sm">2. Conjunción (A ∧ B)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Es verdadera únicamente si ambas proposiciones componentes son verdaderas a la vez.
              </p>
            </div>

            <table className="w-full text-xs text-left border-collapse bg-slate-50/50 rounded-lg overflow-hidden border border-slate-200/80 font-mono">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border-b border-r text-center font-bold">A</th>
                  <th className="p-2 border-b border-r text-center font-bold">B</th>
                  <th className="p-2 border-b text-center font-bold">A ∧ B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">V</td><td className="p-2 border-r text-center">V</td><td className="p-2 text-center font-bold text-emerald-600">V</td></tr>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">V</td><td className="p-2 border-r text-center">F</td><td className="p-2 text-center font-bold text-rose-600">F</td></tr>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">F</td><td className="p-2 border-r text-center">V</td><td className="p-2 text-center font-bold text-rose-600">F</td></tr>
                <tr><td className="p-2 border-r text-center">F</td><td className="p-2 border-r text-center">F</td><td className="p-2 text-center font-bold text-rose-600">F</td></tr>
              </tbody>
            </table>
          </div>

          {/* Disyuncion */}
          <div className="bg-white/80 p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-[#a80006] border border-rose-500/20">
                  OR
                </span>
                <button
                  onClick={() => handleLoadFormula('A ∨ B')}
                  className="text-xs font-bold text-[#a80006] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Cargar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 font-headline-sm">3. Disyunción (A ∨ B)</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Es verdadera si al menos una de las proposiciones componentes es verdadera.
              </p>
            </div>

            <table className="w-full text-xs text-left border-collapse bg-slate-50/50 rounded-lg overflow-hidden border border-slate-200/80 font-mono">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border-b border-r text-center font-bold">A</th>
                  <th className="p-2 border-b border-r text-center font-bold">B</th>
                  <th className="p-2 border-b text-center font-bold">A ∨ B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">V</td><td className="p-2 border-r text-center">V</td><td className="p-2 text-center font-bold text-emerald-600">V</td></tr>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">V</td><td className="p-2 border-r text-center">F</td><td className="p-2 text-center font-bold text-emerald-600">V</td></tr>
                <tr className="border-b border-slate-100"><td className="p-2 border-r text-center">F</td><td className="p-2 border-r text-center">V</td><td className="p-2 text-center font-bold text-emerald-600">V</td></tr>
                <tr><td className="p-2 border-r text-center">F</td><td className="p-2 border-r text-center">F</td><td className="p-2 text-center font-bold text-rose-600">F</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. SECTION: Mathematics and Algebra Examples */}
      <section className="premium-info-card p-8 premium-indicator-crimson" id="section-algebra-examples">
        <h2 className="text-2xl font-bold text-[#1a1c1e] mb-6 flex items-center gap-2.5 font-headline-md">
          <Calculator className="text-[#a80006] w-6 h-6" />
          Ejemplos Básicos de Álgebra
        </h2>
        
        <div className="space-y-6">
          <div className="flex bg-slate-50/40 rounded-xl p-5 border border-slate-200/60 gap-4 items-start hover:shadow-sm transition-all duration-300">
            <div className="bg-white p-2.5 border border-[#e2e2e5] rounded-xl shadow-sm shrink-0">
              <Lightbulb className="text-yellow-500 w-5 h-5"/>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 font-headline-sm">Evaluación de Expresiones</h4>
              <p className="text-sm text-slate-600 mb-2">Calcular el valor de <strong>3x² + 2x - 5</strong>, cuando x = 2.</p>
              <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4 font-semibold font-mono">
                <li>Sustituimos x por 2: 3(2)² + 2(2) - 5</li>
                <li>Hacemos las potencias: 3(4) + 4 - 5</li>
                <li>Multiplicamos: 12 + 4 - 5</li>
                <li>Sumamos y restamos: 16 - 5 = <strong className="text-[#a80006]">11</strong></li>
              </ul>
            </div>
          </div>
          
          <div className="flex bg-slate-50/40 rounded-xl p-5 border border-slate-200/60 gap-4 items-start hover:shadow-sm transition-all duration-300">
            <div className="bg-white p-2.5 border border-[#e2e2e5] rounded-xl shadow-sm shrink-0">
              <Info className="text-blue-500 w-5 h-5"/>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 font-headline-sm">Ley de Signos en Multiplicación</h4>
              <p className="text-sm text-slate-600 mb-2">Reglas fundamentales para multiplicar números positivos y negativos.</p>
              <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4 font-mono font-semibold">
                <li>(+) * (+) = (+) : 3 * 4 = 12</li>
                <li>(-) * (-) = (+) : (-3) * (-4) = 12</li>
                <li>(+) * (-) = (-) : 3 * (-4) = -12</li>
                <li>(-) * (+) = (-) : (-3) * 4 = -12</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
