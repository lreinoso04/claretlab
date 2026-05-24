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
    <div className="flex-grow overflow-y-auto bg-[#f9f9fc] p-6 md:p-12Select" id="truth-table-generator-panel">
      {/* Heading Header */}
      <div className="mb-12" id="generator-header-titles">
        <h1 className="text-4xl font-bold font-headline-lg text-[#a80006] mb-2 leading-tight">
          Generador de Tablas de Verdad
        </h1>
        <p className="text-base text-[#5d3f3b] font-body-lg text-slate-500 max-w-2xl leading-relaxed">
          Ingresa una expresión lógica usando variables y operadores. El motor analizará tu declaración y generará una tabla de verdad completa evaluando todos los estados posibles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="generator-panel-grid">
        {/* Left Column Controls */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2e5] rounded-xl shadow-sm overflow-hidden border-t-4 border-t-[#a80006] p-6">
            <label className="text-sm font-semibold text-[#1a1c1e] mb-2 block" htmlFor="logic-expr-input">
              Expresión
            </label>
            
            {/* Input Element Box */}
            <div className="relative flex items-center mb-6">
              <span className="absolute left-3 text-slate-400 font-mono text-base font-bold">
                ƒ
              </span>
              <input 
                id="logic-expr-input"
                ref={inputRef}
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyDown={(e) => { e.key === 'Enter' && handleGenerate(); }}
                placeholder="e.g., (P ∧ Q) → R"
                className="w-full bg-[#f9f9fc] border border-[#e2e2e5] rounded-lg pl-8 pr-10 py-3 font-mono font-code text-lg text-[#1a1c1e] focus:border-[#a80006] focus:ring-1 focus:ring-[#a80006] focus:outline-none transition-all"
                type="text"
                autoComplete="off"
                spellCheck={false}
              />
              {expression && (
                <button 
                  onClick={handleClear}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Limpiar"
                >
                  <Delete className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Virtual Keyboard Grid */}
            <div className="bg-[#f3f3f6] rounded-xl p-4 border border-[#e2e2e5]">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 tracking-wider">
                  Operadores & Variables
                </span>
                <button 
                  onClick={handleClear}
                  className="text-xs font-bold text-[#a80006] hover:text-[#d31111] transition-all cursor-pointer"
                >
                  Limpiar Todo
                </button>
              </div>

              {/* Grid Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {operators.map((op) => (
                  <button
                    key={op.symbol}
                    onClick={() => insertSymbol(op.symbol)}
                    className={`h-11 rounded-lg flex items-center justify-center font-mono font-bold text-base border transition-all active:scale-95 hover:shadow-sm cursor-pointer ${
                      op.isVar 
                        ? 'bg-[#ffe5e1] hover:bg-[#ffe5e1]/80 text-[#a80006] border-[#e7bdb7]' 
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-[#e2e2e5]'
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
              className={`w-full mt-6 bg-[#a80006] hover:bg-[#d31111] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow cursor-pointer ${
                (!expression.trim() || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'
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
          <div className="bg-[#eeeef0] rounded-xl p-4 border border-[#e2e2e5] flex gap-3 items-start">
            <Info className="w-5 h-5 text-[#a80006] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#1a1c1e] mb-1">Consejo Pro</h4>
              <p className="text-xs text-[#5d3f3b] leading-relaxed">
                Usa paréntesis para definir precedencia. Los operadores lógicos se evalúan siguiendo los órdenes de precedencia académica estándar: <span className="font-semibold font-mono">¬, ∧, ∨, →, ↔</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Table Output Stage */}
        <div className="col-span-1 lg:col-span-7 h-full">
          {!result ? (
            /* Empty State Panel precisely matching mockups */
            <div className="bg-white border-2 border-dashed border-[#e2e2e5] rounded-2xl flex flex-col items-center justify-center py-20 px-6 h-full min-h-[400px] text-center">
              <div className="w-16 h-16 bg-[#f3f3f6] rounded-full flex items-center justify-center mb-4 text-[#a80006] shadow-sm">
                <Table className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-headline-md text-[#1a1c1e] mb-1">
                Esperando Expresión
              </h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Construye tu expresión lógica a la izquierda y haz clic en generar para visualizar la matriz de verdad aquí.
              </p>
            </div>
          ) : (
            /* Result State Evaluation Matrix */
            <div className="bg-white border border-[#e2e2e5] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full" id="logic-out-matrix">
              {/* Output Header */}
              <div className="bg-[#f3f3f6] px-6 py-4 border-b border-[#e2e2e5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#a80006] rounded-full"></span>
                  <span className="text-sm font-bold text-[#1a1c1e] tracking-wider">
                    Matriz de Evaluación
                  </span>
                </div>
                <div className="bg-white border border-[#e2e2e5] px-3 py-1 rounded-md font-mono font-code text-[14px] text-[#a80006]">
                  {normalizeExpression(expression)}
                </div>
              </div>

              {/* Table Body Element */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#e2e2e5]">
                      {result.variables.map((val) => (
                        <th 
                          key={val} 
                          className="px-6 py-3.5 font-bold text-slate-600 border-r border-[#e2e2e5] text-center font-mono w-20"
                        >
                          {val}
                        </th>
                      ))}
                      <th className="px-6 py-3.5 font-bold text-[#a80006] text-center font-mono bg-[#ffe5e1]/20">
                        {normalizeExpression(expression)}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono font-code text-sm">
                    {result.rows.map((row, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-slate-50/55 transition-colors"
                      >
                        {result.variables.map((v) => (
                          <td 
                            key={v} 
                            className="px-6 py-3 border-r border-[#e2e2e5] text-center"
                          >
                            <span className={`font-semibold px-2 py-0.5 rounded text-xs inline-block min-w-6 ${
                              row.values[v] 
                                ? 'bg-[#a3f69c]/30 text-[#065f18] font-bold' 
                                : 'bg-red-50 text-[#ba1a1a] font-bold'
                            }`}>
                              {row.values[v] ? 'V' : 'F'}
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-3 text-center bg-slate-50/40 font-bold">
                          <span className={`font-bold px-3 py-1 rounded shadow-sm text-sm inline-block ${
                            row.finalValue 
                              ? 'bg-[#a3f69c] text-[#065f18]' 
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
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
              <div className="mt-auto bg-[#f3f3f6] px-6 py-4 border-t border-[#e2e2e5] flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  {result.isTautology ? (
                    <span className="flex items-center gap-1.5 text-[#065f18] text-xs font-bold bg-[#a3f69c]/40 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tautología
                    </span>
                  ) : result.isContradiction ? (
                    <span className="flex items-center gap-1.5 text-[#ba1a1a] text-xs font-bold bg-[#ffdad6]/50 px-2.5 py-1 rounded-lg">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Contradicción
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#7c5800] text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Contingencia
                    </span>
                  )}
                </div>

                <button 
                  onClick={handleExportCSV}
                  className="text-sm font-semibold text-[#a80006] hover:text-[#d31111] transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#e2e2e5]"
                  id="btn-export-csv"
                >
                  <Download className="w-4 h-4" /> Exportar CSV
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
