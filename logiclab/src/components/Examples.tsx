import { Lightbulb, Info, Calculator, List } from 'lucide-react';

export default function Examples() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline-md text-[#1a1c1e] tracking-tight mb-2">Ejemplos Prácticos</h1>
        <p className="text-slate-600">Comprende cómo funcionan las tablas de verdad y operaciones algebraicas simples, paso a paso.</p>
      </header>

      <section className="premium-info-card p-8 premium-indicator-crimson">
        <h2 className="text-2xl font-bold text-[#1a1c1e] mb-6 flex items-center gap-2.5 font-headline-md">
          <List className="text-[#a80006] w-6 h-6" />
          Ejemplos de Tablas de Verdad
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/80 hover:shadow-sm transition-all duration-300">
            <h3 className="font-bold text-slate-800 mb-2 font-headline-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a80006]"></span>
              1. Negación (¬ A)
            </h3>
            <p className="text-sm text-slate-600 mb-4">La negación invierte el valor de verdad. Si la proposición A es verdadera (V), ¬ A es falsa (F).</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm max-w-sm">
              <thead className="bg-[#ffe5e1] text-[#a80006] font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3 border-b border-r text-center font-bold w-1/2">A</th>
                  <th className="p-3 border-b text-center font-bold w-1/2">¬ A</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-mono">
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b text-center font-bold text-rose-600 bg-rose-500/5">F</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-r text-center">F</td><td className="p-2.5 text-center font-bold text-emerald-600 bg-emerald-500/5">V</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/80 hover:shadow-sm transition-all duration-300">
            <h3 className="font-bold text-slate-800 mb-2 font-headline-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a80006]"></span>
              2. Conjunción "Y" (A ∧ B)
            </h3>
            <p className="text-sm text-slate-600 mb-4">Es verdadera únicamente cuando ambas proposiciones (A y B) son verdaderas simultáneamente.</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm max-w-md">
              <thead className="bg-[#ffe5e1] text-[#a80006] font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3 border-b border-r text-center font-bold w-1/4">A</th>
                  <th className="p-3 border-b border-r text-center font-bold w-1/4">B</th>
                  <th className="p-3 border-b text-center font-bold w-2/4">A ∧ B</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-mono">
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b text-center font-bold text-emerald-600 bg-emerald-500/5">V</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b border-r text-center">F</td><td className="p-2.5 border-b text-center font-bold text-rose-600 bg-rose-500/5">F</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">F</td><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b text-center font-bold text-rose-600 bg-rose-500/5">F</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-r text-center">F</td><td className="p-2.5 border-r text-center">F</td><td className="p-2.5 text-center font-bold text-rose-600 bg-rose-500/5">F</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-200/80 hover:shadow-sm transition-all duration-300">
            <h3 className="font-bold text-slate-800 mb-2 font-headline-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a80006]"></span>
              3. Disyunción "O" (A ∨ B)
            </h3>
            <p className="text-sm text-slate-600 mb-4">Es verdadera cuando al menos una de las proposiciones componentes es verdadera.</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm max-w-md">
              <thead className="bg-[#ffe5e1] text-[#a80006] font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3 border-b border-r text-center font-bold w-1/4">A</th>
                  <th className="p-3 border-b border-r text-center font-bold w-1/4">B</th>
                  <th className="p-3 border-b text-center font-bold w-2/4">A ∨ B</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-mono">
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b text-center font-bold text-emerald-600 bg-emerald-500/5">V</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b border-r text-center">F</td><td className="p-2.5 border-b text-center font-bold text-emerald-600 bg-emerald-500/5">V</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-b border-r text-center">F</td><td className="p-2.5 border-b border-r text-center">V</td><td className="p-2.5 border-b text-center font-bold text-emerald-600 bg-emerald-500/5">V</td></tr>
                <tr className="hover:bg-slate-50/50"><td className="p-2.5 border-r text-center">F</td><td className="p-2.5 border-r text-center">F</td><td className="p-2.5 text-center font-bold text-rose-600 bg-rose-500/5">F</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="premium-info-card p-8 premium-indicator-crimson">
        <h2 className="text-2xl font-bold text-[#1a1c1e] mb-6 flex items-center gap-2.5 font-headline-md">
          <Calculator className="text-[#a80006] w-6 h-6" />
          Ejemplos Básicos de Álgebra
        </h2>
        
        <div className="space-y-6">
          <div className="flex bg-slate-50/40 rounded-xl p-5 border border-slate-200/60 gap-4 items-start">
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
          
          <div className="flex bg-slate-50/40 rounded-xl p-5 border border-slate-200/60 gap-4 items-start">
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
