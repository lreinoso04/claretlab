import { useState, useEffect } from 'react';
import { evaluateMathExpression } from '../utils/mathEvaluator';
import { getCalcHistory, addCalcHistory, clearCalcHistory } from '../utils/dbHelper';
import { CalcHistoryItem } from '../types';
import { Trash, Delete, CornerDownLeft, Disc } from 'lucide-react';

interface MathCalculatorProps {
  initialExpression?: string;
}

export default function MathCalculator({ initialExpression }: MathCalculatorProps) {
  const [expression, setExpression] = useState(initialExpression || '');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<CalcHistoryItem[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (initialExpression) {
      setExpression(initialExpression);
      const res = evaluateMathExpression(initialExpression);
      setResult(res);
    }
  }, [initialExpression]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const list = await getCalcHistory();
        setHistory(list);
      } catch (err) {
        console.error('Failed to load calculation history.', err);
      }
    }
    fetchHistory();
  }, []);

  const handleKeyPress = (btn: string) => {
    setIsError(false);
    if (btn === 'AC') {
      setExpression('');
      setResult('');
    } else if (btn === '⌫') {
      setResult('');
      setExpression(prev => {
        if (!prev) return '';
        if (prev.endsWith('sin(') || prev.endsWith('cos(') || prev.endsWith('tan(') || prev.endsWith('log(')) {
          return prev.slice(0, -4);
        } else if (prev.endsWith('ln(')) {
          return prev.slice(0, -3);
        } else if (prev.endsWith('√(')) {
          return prev.slice(0, -2);
        } else {
          return prev.slice(0, -1);
        }
      });
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(btn)) {
      setResult('');
      setExpression(prev => prev + `${btn}(`);
    } else if (btn === '=') {
      if (!expression.trim()) return;
      const solved = evaluateMathExpression(expression);
      if (solved === 'Error') {
        setIsError(true);
        setResult('Error');
      } else {
        setResult(solved);
        // Save to Firebase/LocalDB
        addCalcHistory(expression, solved).then(() => {
          // Reload History
          getCalcHistory().then(setHistory);
        });
      }
    } else {
      // Numbers or operands
      setResult('');
      setExpression(prev => prev + btn);
    }
  };

  const handleClearHistory = async () => {
    const confirm = window.confirm('¿Deseas vaciar el historial de cálculos?');
    if (!confirm) return;
    try {
      await clearCalcHistory();
      setHistory([]);
    } catch (err) {
      console.error('Error emptying history.', err);
    }
  };

  const loadHistoryItem = (item: CalcHistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
    setIsError(false);
  };

  const scientificButtons = ['sin', 'cos', 'tan', 'log', 'ln', '√', '^', 'π'];

  return (
    <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#f9f9fc] p-6 lg:p-12 gap-8" id="math-calculator-screen">
      {/* Left Column: Scientific Calculator */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#e2e2e5] shadow-sm overflow-hidden min-h-[550px]" id="calculator-keypad-panel">
        {/* Screen/Display Layout */}
        <div className="p-8 bg-slate-50 flex flex-col justify-end border-b-4 border-l-4 border-l-[#a80006] border-b-[#a80006] h-48 select-text">
          <div className="text-slate-500 font-mono text-lg text-right mb-2 opacity-80 tracking-widest min-h-[28px] overflow-x-auto whitespace-nowrap scrollbar-none">
            {expression || '0'}
          </div>
          <div className={`text-right font-bold text-4xl font-headline-xl tracking-tight break-all ${isError ? 'text-red-500' : 'text-[#1a1c1e]'}`}>
            {result || '0.0'}
          </div>
        </div>

        {/* Keypad Pad Elements */}
        <div className="flex-grow p-6 grid grid-cols-4 md:grid-cols-5 gap-3 bg-[#eeeef0]/50" id="keypad-grid-elements">
          {/* Scientific Functions List for Medium-to-Large devices */}
          <div className="hidden md:flex flex-col gap-3 col-span-1 pr-4 border-r border-[#e2e2e5]">
            {scientificButtons.map(fn => (
              <button
                key={fn}
                onClick={() => handleKeyPress(fn)}
                className="flex items-center justify-center h-12 bg-[#eeeef0] rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-200 hover:shadow-sm font-semibold text-sm active:scale-95 transition-all cursor-pointer"
              >
                {fn}
              </button>
            ))}
          </div>

          {/* Core Numerical Keyboard layout */}
          <div className="col-span-4 grid grid-cols-4 gap-3 content-start h-full">
            {/* Row 1 actions */}
            <button 
              onClick={() => handleKeyPress('AC')}
              className="col-span-2 flex items-center justify-center h-14 bg-[#ffe5e1]/80 hover:bg-[#ffe5e1] border border-[#e7bdb7] text-[#a80006] rounded-xl text-lg font-bold active:scale-95 transition-all cursor-pointer"
              id="btn-calc-clear"
            >
              AC
            </button>
            <button 
              onClick={() => handleKeyPress('⌫')}
              className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-slate-600 rounded-xl hover:shadow-sm active:scale-95 transition-all cursor-pointer"
              id="btn-calc-backspace"
            >
              <Delete className="w-5 h-5 pointer-events-none" />
            </button>
            <button 
              onClick={() => handleKeyPress('/')}
              className="flex items-center justify-center h-14 bg-[#ffe5e1] hover:bg-[#ffe5e1]/95 border border-[#e7bdb7] text-[#a80006] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button onClick={() => handleKeyPress('7')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">7</button>
            <button onClick={() => handleKeyPress('8')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">8</button>
            <button onClick={() => handleKeyPress('9')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">9</button>
            <button onClick={() => handleKeyPress('*')} className="flex items-center justify-center h-14 bg-[#ffe5e1] hover:bg-[#ffe5e1]/85 border border-[#e7bdb7] text-[#a80006] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">×</button>

            {/* Row 3 */}
            <button onClick={() => handleKeyPress('4')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">4</button>
            <button onClick={() => handleKeyPress('5')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">5</button>
            <button onClick={() => handleKeyPress('6')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">6</button>
            <button onClick={() => handleKeyPress('-')} className="flex items-center justify-center h-14 bg-[#ffe5e1] hover:bg-[#ffe5e1]/85 border border-[#e7bdb7] text-[#a80006] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">-</button>

            {/* Row 4 */}
            <button onClick={() => handleKeyPress('1')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">1</button>
            <button onClick={() => handleKeyPress('2')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">2</button>
            <button onClick={() => handleKeyPress('3')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">3</button>
            <button onClick={() => handleKeyPress('+')} className="flex items-center justify-center h-14 bg-[#ffe5e1] hover:bg-[#ffe5e1]/85 border border-[#e7bdb7] text-[#a80006] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">+</button>

            {/* Row 5 */}
            <button 
              onClick={() => handleKeyPress('0')}
              className="col-span-2 flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer"
            >
              0
            </button>
            <button onClick={() => handleKeyPress('.')} className="flex items-center justify-center h-14 bg-white hover:bg-slate-100 border border-[#e2e2e5] text-[#1a1c1e] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer">.</button>
            <button 
              onClick={() => handleKeyPress('=')}
              className="flex items-center justify-center h-14 bg-[#fed700] hover:bg-[#feb700] text-[#7c5800] rounded-xl text-xl font-bold active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow"
              id="btn-calc-equals"
            >
              =
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: History panel exactly matching layouts */}
      <aside className="w-full lg:w-80 bg-white border border-[#e2e2e5] rounded-2xl shadow-sm flex flex-col shrink-0 overflow-hidden" id="calculator-history-sidebar">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#e2e2e5] bg-[#f3f3f6] flex justify-between items-center select-none">
          <h2 className="text-md font-bold text-[#1a1c1e] font-headline-md">Historial</h2>
          {history.length > 0 && (
            <button 
              onClick={handleClearHistory}
              className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-[#ffdad6]/20 transition-all cursor-pointer"
              title="Vaciar Historial"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* History records */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[160px]">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => loadHistoryItem(item)}
                className="group cursor-pointer hover:bg-[#ffe5e1]/20 p-3 rounded-xl transition-all border border-transparent hover:border-[#e7bdb7]"
                title="Cargar cálculo"
              >
                <div className="text-slate-500 font-mono text-xs text-right mb-1 select-all" style={{ wordBreak: 'break-all' }}>
                  {item.expression}
                </div>
                <div className="text-[#a80006] font-bold text-xl text-right">
                  {item.result}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 font-sans">
              <Disc className="w-8 h-8 opacity-40 animate-pulse mb-2 text-slate-500" />
              <p className="text-xs">Sin registros aún.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
