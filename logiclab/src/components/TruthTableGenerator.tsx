import { useState, useRef, useEffect } from 'react';
import { generateTruthTable, TruthTableResult, normalizeExpression } from '../utils/logicParser';
import { addRecentActivity } from '../utils/dbHelper';
import { Table, Download, Info, CheckCircle2, AlertCircle, HelpCircle, Delete } from 'lucide-react';

interface TruthTableGeneratorProps {
  initialExpression?: string;
}

export default function TruthTableGenerator({ initialExpression }: TruthTableGeneratorProps) {
  const [expression, setExpression] = useState(initialExpression || '');
  const [result, setResult] = useState<TruthTableResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialExpression) {
      setExpression(initialExpression);
      // Automatically trigger generation if an expression is preloaded from dashboard
      const table = generateTruthTable(initialExpression);
      if (table) setResult(table);
    }
  }, [initialExpression]);

  const insertSymbol = (symbol: string) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const currentVal = input.value;

    const newVal = currentVal.substring(0, start) + symbol + currentVal.substring(end);
    setExpression(newVal);

    // Reposition cursor forward
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = start + symbol.length;
      input.focus();
    }, 0);
  };

  const handleGenerate = async () => {
    if (!expression.trim()) return;
    setIsProcessing(true);

    // Simulate short processing feedback delay shown in interactive HTML spec
    setTimeout(async () => {
      try {
        const table = generateTruthTable(expression);
        if (table) {
          setResult(table);
          // Persist to Firebase or LocalStorage
          await addRecentActivity({
            expression: normalizeExpression(expression),
            type: 'Truth Table',
            timestamp: 'Hace unos instantes',
            resultSummary: 'Tabla de Verdad Generada'
          });
        } else {
          setResult(null);
        }
      } catch (err) {
        console.error('Logic statement evaluation error.', err);
      } finally {
        setIsProcessing(false);
      }
    }, 450);
  };

  const handleClear = () => {
    setExpression('');
    setResult(null);
    inputRef.current?.focus();
  };

  const handleExportCSV = () => {
    if (!result) return;
    
    // Assemble CSV String
    const headers = result.headers.join(',');
    const rows = result.rows.map(row => {
      // mapping booleans to Spanish academic standard V/F
      const valuationCells = result.variables.map(v => row.values[v] ? 'V' : 'F');
      const finalVal = row.finalValue ? 'V' : 'F';
      return [...valuationCells, finalVal].join(',');
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tabla_verdad_${normalizeExpression(expression)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const operators = [
    { symbol: '¬', name: 'NOT (Negación)' },
    { symbol: '∧', name: 'AND (Conjunción)' },
    { symbol: '∨', name: 'OR (Disyunción)' },
    { symbol: '→', name: 'IMPLIES (Condicional)' },
    { symbol: '↔', name: 'IFF (Bicondicional)' },
    { symbol: '(', name: 'Parentesis izquierdo' },
    { symbol: ')', name: 'Parentesis derecho' },
    { symbol: 'P', name: 'Variable Propocicional P', isVar: true },
    { symbol: 'Q', name: 'Variable Propocicional Q', isVar: true },
    { symbol: 'R', name: 'Variable Propocicional R', isVar: true },
  ];

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12" id="truth-table-generator-panel">
      {/* Heading Header */}
      <div className="mb-12" id="generator-header-titles">
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Generador de Tablas de Verdad
        </h1>
        <p className="text-base text-slate-500 font-body-lg max-w-2xl leading-relaxed">
          Ingresa una expresión lógica usando variables y operadores. El motor analizará tu declaración y generará una tabla de verdad completa evaluando todos los estados posibles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="generator-panel-grid">
        {/* Left Column Controls */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <div className="premium-card border border-[#e2e2e5]/60 rounded-2xl premium-shadow-sm p-6 relative overflow-hidden">
            {/* Subtle glow border line on top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a80006] to-[#e31820]"></div>
            
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block" htmlFor="logic-expr-input">
              Expresión Lógica
            </label>
            
            {/* Input Element Box */}
            <div className="relative flex items-center mb-6 group/input">
              <span className="absolute left-4 text-slate-400 font-mono text-lg font-bold group-focus-within/input:text-[#a80006] transition-colors">
                ƒ
              </span>
              <input 
                id="logic-expr-input"
                ref={inputRef}
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyDown={(e) => { e.key === 'Enter' && handleGenerate(); }}
                placeholder="e.g., (P ∧ Q) → R"
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-12 py-3.5 font-mono text-lg text-[#1a1c1e] placeholder-slate-400 inset-input-shadow focus:bg-white focus:border-[#a80006] focus:ring-4 focus:ring-[#a80006]/5 focus:outline-none transition-all duration-300"
                type="text"
                autoComplete="off"
                spellCheck={false}
              />
              {expression && (
                <button 
                  onClick={handleClear}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  title="Limpiar"
                >
                  <Delete className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Virtual Keyboard Grid */}
            <div className="bg-slate-50/60 backdrop-blur-sm rounded-xl p-5 border border-slate-200/60">
              <div className="flex items-center justify-between mb-4 border-b border-slate-200/60 pb-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Operadores & Variables
                </span>
                <button 
                  onClick={handleClear}
                  className="text-xs font-bold text-[#a80006] hover:text-[#d31111] hover:underline transition-all duration-200 cursor-pointer"
                >
                  Limpiar Todo
                </button>
              </div>

              {/* Grid Buttons */}
              <div className="grid grid-cols-5 gap-2.5">
                {operators.map((op) => (
                  <button
                    key={op.symbol}
                    onClick={() => insertSymbol(op.symbol)}
                    className={`h-12 rounded-xl flex items-center justify-center font-mono font-bold text-base border transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer tactile-key tactile-key-active ${
                      op.isVar 
                        ? 'bg-gradient-to-tr from-[#ffe5e1] to-[#fff3f1] text-[#a80006] border-[#e7bdb7]' 
                        : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                    title={op.name}
                  >
                    {op.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Execution action Button */}
            <button
              onClick={handleGenerate}
              disabled={!expression.trim() || isProcessing}
              className={`w-full mt-6 bg-gradient-to-r from-[#a80006] to-[#e31820] hover:from-[#c20007] hover:to-[#f0222a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-[#a80006]/20 transition-all duration-300 cursor-pointer ${
                (!expression.trim() || isProcessing) ? 'opacity-50 cursor-not-allowed shadow-none hover:translate-y-0' : 'active:scale-[0.98] hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Table className="w-5 h-5" />
                  <span>Generar Tabla</span>
                </>
              )}
            </button>
          </div>

          {/* Guidelines Tips box */}
          <div className="bg-gradient-to-tr from-[#fbfbfe] to-[#f5f5fa] rounded-2xl p-5 border border-slate-200/60 premium-shadow-sm flex gap-4 items-start relative overflow-hidden">
            <div className="w-9 h-9 bg-rose-50 rounded-lg flex items-center justify-center text-[#a80006] shrink-0 mt-0.5 shadow-sm">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1a1c1e] mb-1">Consejo Pro</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Usa paréntesis para definir precedencia. Los operadores lógicos se evalúan siguiendo los órdenes de precedencia académica estándar: <span className="font-semibold font-mono text-[#a80006]">¬, ∧, ∨, →, ↔</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Table Output Stage */}
        <div className="col-span-1 lg:col-span-7 h-full">
          {!result ? (
            /* Empty State Panel precisely matching mockups */
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center py-20 px-6 h-full min-h-[400px] text-center premium-shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#ffe5e1] to-[#fff3f1] border border-[#e7bdb7]/40 rounded-full flex items-center justify-center mb-5 text-[#a80006] shadow-sm">
                <Table className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-1">
                Esperando Expresión
              </h3>
              <p className="text-sm text-slate-400 max-w-sm font-medium">
                Construye tu expresión lógica a la izquierda y haz clic en generar para visualizar la matriz de verdad aquí.
              </p>
            </div>
          ) : (
            /* Result State Evaluation Matrix */
            <div className="premium-card border border-slate-200/60 rounded-2xl overflow-hidden premium-shadow-md flex flex-col h-full" id="logic-out-matrix">
              {/* Output Header */}
              <div className="bg-slate-50/60 px-6 py-4.5 border-b border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a80006] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a80006]"></span>
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Matriz de Evaluación
                  </span>
                </div>
                <div className="bg-white/80 border border-slate-200/60 px-3.5 py-1.5 rounded-xl font-mono text-sm text-[#a80006] font-bold premium-shadow-sm">
                  {normalizeExpression(expression)}
                </div>
              </div>

              {/* Table Body Element */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/40 border-b border-slate-200/60">
                      {result.variables.map((val) => (
                        <th 
                          key={val} 
                          className="px-6 py-4 font-bold text-slate-500 border-r border-slate-200/60 text-center font-mono w-20 text-xs uppercase tracking-wider"
                        >
                          {val}
                        </th>
                      ))}
                      <th className="px-6 py-4 font-bold text-[#a80006] text-center font-mono bg-gradient-to-b from-[#ffe5e1]/10 to-transparent text-xs uppercase tracking-wider">
                        {normalizeExpression(expression)}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-sm">
                    {result.rows.map((row, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-slate-50/30 transition-colors"
                      >
                        {result.variables.map((v) => (
                          <td 
                            key={v} 
                            className="px-6 py-3.5 border-r border-slate-200/60 text-center"
                          >
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center justify-center min-w-8 ${
                              row.values[v] 
                                ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' 
                                : 'bg-rose-500/10 text-rose-700 border border-rose-500/20'
                            }`}>
                              {row.values[v] ? 'V' : 'F'}
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-3.5 text-center bg-slate-50/20 font-bold">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center justify-center min-w-10 shadow-sm ${
                            row.finalValue 
                              ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                              : 'bg-rose-500 text-white shadow-rose-500/20'
                          }`}>
                            {row.finalValue ? 'V' : 'F'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer with Summary Status Metadata */}
              <div className="mt-auto bg-slate-50/60 px-6 py-4.5 border-t border-slate-200/60 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  {result.isTautology ? (
                    <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      Tautología
                    </span>
                  ) : result.isContradiction ? (
                    <span className="flex items-center gap-1.5 text-rose-700 text-xs font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
                      <AlertCircle className="w-4 h-4" />
                      Contradicción
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-700 text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                      <HelpCircle className="w-4 h-4" />
                      Contingencia
                    </span>
                  )}
                </div>

                <button 
                  onClick={handleExportCSV}
                  className="text-xs font-bold text-[#a80006] hover:text-[#d31111] transition-all flex items-center gap-2 active:scale-95 cursor-pointer bg-white border border-slate-200 px-3.5 py-2 rounded-xl hover:shadow-sm"
                  id="btn-export-csv"
                >
                  <Download className="w-4 h-4" /> EXPORTAR CSV
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
