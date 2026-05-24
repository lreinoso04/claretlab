import { useState } from 'react';
import { Formula } from '../types';
import { Search, Copy, Check, BookOpen, Layers } from 'lucide-react';

export default function FormulaSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'algebra' | 'trigonometry' | 'logic'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formulas: Formula[] = [
    {
      id: 'f-1',
      name: 'Diferencia de Cuadrados',
      expr: 'a² - b² = (a - b)(a + b)',
      description: 'Factorización de un polinomio que representa la diferencia de dos cuadrados perfectos.',
      category: 'algebra'
    },
    {
      id: 'f-2',
      name: 'Binomio al Cuadrado',
      expr: '(a + b)² = a² + 2ab + b²',
      description: 'Expansión de un binomio elevado al cuadrado, resulta en un trinomio cuadrado perfecto.',
      category: 'algebra'
    },
    {
      id: 'f-3',
      name: 'Fórmula Cuadrática',
      expr: 'x = (-b ± √(b² - 4ac)) / 2a',
      description: 'Fórmula empleada para hallar las raíces o soluciones de cualquier ecuación de segundo grado.',
      category: 'algebra'
    },
    {
      id: 'f-4',
      name: 'Identidad Pitagórica',
      expr: 'sin²(θ) + cos²(θ) = 1',
      description: 'Relación básica e indispensable entre el seno y el coseno de un determinado ángulo.',
      category: 'trigonometry'
    },
    {
      id: 'f-5',
      name: 'Seno de la Suma de Ángulos',
      expr: 'sin(α + β) = sin(α)cos(β) + cos(α)sin(β)',
      description: 'Fórmula que expande el seno de la suma para resolver identidades trigonométricas avanzadas.',
      category: 'trigonometry'
    },
    {
      id: 'f-6',
      name: 'Coseno de Ángulo Doble',
      expr: 'cos(2θ) = cos²(θ) - sin²(θ)',
      description: 'Identidad trigonométrica deducida que relaciona el coseno doble con funciones simples cuadradas.',
      category: 'trigonometry'
    },
    {
      id: 'f-7',
      name: 'Leyes de De Morgan (Conjunción)',
      expr: '¬(P ∧ Q) ↔ (¬P ∨ ¬Q)',
      description: 'Ley de la lógica de proposiciones que establece que la negación de una conjunción equivale a una disyunción negada.',
      category: 'logic'
    },
    {
      id: 'f-8',
      name: 'Leyes de De Morgan (Disyunción)',
      expr: '¬(P ∨ Q) ↔ (¬P ∧ ¬Q)',
      description: 'Establece que la negación de una disyunción lógica es equivalente a la conjunción de las negaciones individuales.',
      category: 'logic'
    },
    {
      id: 'f-9',
      name: 'Contraposición',
      expr: '(P → Q) ↔ (¬Q → ¬P)',
      description: 'Regla de equivalencia por la cual se afirma que si una implicación es verdadera, su contrarecíproco también lo es.',
      category: 'logic'
    },
    {
      id: 'f-10',
      name: 'Implicación Material',
      expr: '(P → Q) ↔ (¬P ∨ Q)',
      description: 'Equivalencia lógica que traduce un operador condicional en términos de operadores básicos alternos.',
      category: 'logic'
    }
  ];

  const handleCopy = (formula: Formula) => {
    navigator.clipboard.writeText(formula.expr);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredFormulas = formulas.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.expr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-grow overflow-y-auto bg-[#f9f9fc] p-6 md:p-12Select" id="formula-sheet-canvas-panel">
      {/* Title Header */}
      <div className="mb-12" id="formula-header-section">
        <h1 className="text-4xl font-bold font-headline-lg text-[#a80006] mb-2 leading-tight">
          Repositorio de Fórmulas
        </h1>
        <p className="text-base text-[#5d3f3b] font-body-lg text-slate-500 max-w-2xl leading-relaxed">
          Un compendio académico simplificado de ecuaciones matemáticas, identidades trigonométricas avanzadas y teoremas de lógica proposicional formuladas por profesores.
        </p>
      </div>

      {/* Lookup controls bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8" id="formula-search-strip">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar fórmula o teorema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e2e2e5] text-slate-800 rounded-xl pl-11 pr-4 py-2.5 outline-none focus:border-[#a80006] focus:ring-1 focus:ring-[#a80006] transition-all text-sm font-medium"
            id="formula-search-input"
          />
        </div>

        {/* Category Filters Pill list */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto" id="formula-category-selector-pills">
          {(['all', 'algebra', 'trigonometry', 'logic'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#a80006] text-white border-[#a80006] shadow-sm'
                  : 'bg-white text-slate-600 border-[#e2e2e5] hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Ver Todas' : cat === 'algebra' ? 'Álgebra' : cat === 'trigonometry' ? 'Trigonometría' : 'Lógica'}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Grid Panel */}
      {filteredFormulas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="formula-cards-grid">
          {filteredFormulas.map((f) => {
            const isCopied = copiedId === f.id;
            return (
              <div 
                key={f.id}
                className="bg-white border border-[#e2e2e5] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card category tags */}
                  <div className="flex items-center justify-between mb-3 select-none">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                      f.category === 'algebra' 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : f.category === 'trigonometry' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-[#ffe5e1] text-[#a80006] border-[#e7bdb7]'
                    }`}>
                      {f.category === 'algebra' ? 'Álgebra' : f.category === 'trigonometry' ? 'Trigo' : 'Lógica'}
                    </span>
                    
                    <button
                      onClick={() => handleCopy(f)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                        isCopied 
                          ? 'bg-green-50 border-green-200 text-green-600' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-[#a80006]'
                      }`}
                      title="Copiar fórmula"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h3 className="text-lg font-bold font-headline-md text-[#1a1c1e] mb-2">{f.name}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{f.description}</p>
                </div>

                {/* Math Expression block */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-[#e2e2e5] font-mono font-code text-sm text-[#a80006] text-center font-bold select-all whitespace-nowrap overflow-x-auto scrollbar-none">
                  {f.expr}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-[#e2e2e5] rounded-2xl p-12 text-center text-slate-400 font-medium max-w-md mx-auto">
          <BookOpen className="w-10 h-10 opacity-30 mx-auto mb-3" />
          <p className="text-sm">No se encontraron fórmulas con esos términos de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
