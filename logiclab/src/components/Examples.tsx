import { Lightbulb, Info, Calculator, List } from 'lucide-react';

export default function Examples() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline-md text-[#1a1c1e] tracking-tight mb-2">Ejemplos Prácticos</h1>
        <p className="text-slate-600">Comprende cómo funcionan las tablas de verdad y operaciones algebraicas simples, paso a paso.</p>
      </header>

      <section className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e2e2e5] p-6">
        <h2 className="text-xl font-bold text-[#1a1c1e] mb-4 flex items-center gap-2">
          <List className="text-[#a80006] w-5 h-5" />
          Ejemplos de Tablas de Verdad
        </h2>
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">1. Negación (¬ A)</h3>
            <p className="text-sm text-slate-600 mb-4">La negación invierte el valor de verdad. Si A es verdadero (1), ¬ A es falso (0).</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded shadow-sm">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border">A</th>
                  <th className="p-2 border text-center">¬ A</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr><td className="p-2 border">1</td><td className="p-2 border text-center font-bold">0</td></tr>
                <tr><td className="p-2 border">0</td><td className="p-2 border text-center font-bold">1</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">2. Conjunción "Y" (A ∧ B)</h3>
            <p className="text-sm text-slate-600 mb-4">Es verdadero únicamente cuando ambas proposiciones (A y B) son verdaderas.</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded shadow-sm">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border">A</th>
                  <th className="p-2 border">B</th>
                  <th className="p-2 border text-center">A ∧ B</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr><td className="p-2 border">1</td><td className="p-2 border">1</td><td className="p-2 border text-center font-bold">1</td></tr>
                <tr><td className="p-2 border">1</td><td className="p-2 border">0</td><td className="p-2 border text-center font-bold">0</td></tr>
                <tr><td className="p-2 border">0</td><td className="p-2 border">1</td><td className="p-2 border text-center font-bold">0</td></tr>
                <tr><td className="p-2 border">0</td><td className="p-2 border">0</td><td className="p-2 border text-center font-bold">0</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">3. Disyunción "O" (A ∨ B)</h3>
            <p className="text-sm text-slate-600 mb-4">Es verdadero cuando al menos una de las proposiciones es verdadera.</p>
            <table className="w-full text-sm text-left border-collapse bg-white rounded shadow-sm">
              <thead className="bg-[#ffe5e1] text-[#a80006]">
                <tr>
                  <th className="p-2 border">A</th>
                  <th className="p-2 border">B</th>
                  <th className="p-2 border text-center">A ∨ B</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr><td className="p-2 border">1</td><td className="p-2 border">1</td><td className="p-2 border text-center font-bold">1</td></tr>
                <tr><td className="p-2 border">1</td><td className="p-2 border">0</td><td className="p-2 border text-center font-bold">1</td></tr>
                <tr><td className="p-2 border">0</td><td className="p-2 border">1</td><td className="p-2 border text-center font-bold">1</td></tr>
                <tr><td className="p-2 border">0</td><td className="p-2 border">0</td><td className="p-2 border text-center font-bold">0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e2e2e5] p-6">
        <h2 className="text-xl font-bold text-[#1a1c1e] mb-4 flex items-center gap-2">
          <Calculator className="text-[#a80006] w-5 h-5" />
          Ejemplos Básicos de Álgebra
        </h2>
        
        <div className="space-y-4">
          <div className="flex bg-slate-50 rounded-lg p-4 border border-slate-200 gap-4 items-start">
            <div className="bg-white p-2 border border-slate-300 rounded shadow-sm shrink-0">
              <Lightbulb className="text-yellow-500 w-5 h-5"/>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Evaluación de Expresiones</h4>
              <p className="text-sm text-slate-600 mb-2">Calcular el valor de <strong>3x² + 2x - 5</strong>, cuando x = 2.</p>
              <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4">
                <li>Sustituimos x por 2: 3(2)² + 2(2) - 5</li>
                <li>Hacemos las potencias: 3(4) + 4 - 5</li>
                <li>Multiplicamos: 12 + 4 - 5</li>
                <li>Sumamos y restamos: 16 - 5 = <strong className="text-[#a80006]">11</strong></li>
              </ul>
            </div>
          </div>
          
          <div className="flex bg-slate-50 rounded-lg p-4 border border-slate-200 gap-4 items-start">
            <div className="bg-white p-2 border border-slate-300 rounded shadow-sm shrink-0">
              <Info className="text-blue-500 w-5 h-5"/>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Ley de Signos en Multiplicación</h4>
              <p className="text-sm text-slate-600 mb-2">Reglas fundamentales para multiplicar números positivos y negativos.</p>
              <ul className="text-sm text-slate-700 space-y-1 list-disc pl-4 font-mono">
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
