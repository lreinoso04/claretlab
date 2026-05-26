import { useState, FormEvent } from 'react';
import { UserProfile } from '../types';
import { ClipboardList, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Send } from 'lucide-react';

interface QuizProps {
  userProfile: UserProfile;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
}

export default function Quiz({ userProfile }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: '¿Qué es una proposición?',
      options: [
        'Una oración que puede ser verdadera o falsa',
        'Un dibujo matemático',
        'Una pregunta sin respuesta',
        'Un número decimal'
      ],
      correct: 'Una oración que puede ser verdadera o falsa'
    },
    {
      id: 2,
      text: 'La disyunción se representa con:',
      options: ['∧', '→', '∨', '¬'],
      correct: '∨'
    },
    {
      id: 3,
      text: '¿Qué significa la conjunción?',
      options: ['O', 'Si…entonces', 'Y', 'No'],
      correct: 'Y'
    },
    {
      id: 4,
      text: 'Si p = verdadero y q = falso, entonces p ∨ q es:',
      options: ['Falso', 'Verdadero', 'No se puede saber', 'Ninguna de las anteriores'],
      correct: 'Verdadero'
    },
    {
      id: 5,
      text: '¿Cuál símbolo representa la negación?',
      options: ['∧', '~', '∨', '¬'],
      correct: '¬'
    }
  ];

  const handleSelectOption = (qId: number, option: string) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        score += 2; // Each question is worth 2 points (as indicated in user request)
      }
    });
    return score;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) return;

    setSubmitting(true);
    setError(null);

    const scorePoints = calculateScore();
    const totalQuestions = questions.length;
    const correctCount = scorePoints / 2;

    // Build mail payload
    const payload: Record<string, string> = {
      name: userProfile.name,
      email: userProfile.email,
      _subject: `[ClaretLab] Cuestionario de Proposiciones - ${userProfile.name} (${scorePoints}/10 pts)`,
      "--- DATOS DEL ESTUDIANTE ---": "----------------------------------------",
      "Nombre del Estudiante": userProfile.name,
      "Correo Institucional": userProfile.email,
      "Rol / Curso": userProfile.role,
      "--- CALIFICACIÓN DE LA PRUEBA ---": "----------------------------------------",
      "Puntuación Final": `${scorePoints} / 10 puntos`,
      "Respuestas Correctas": `${correctCount} de ${totalQuestions} correctas`,
      "--- RESPUESTAS DETALLADAS ---": "----------------------------------------"
    };

    // Format details of answers for Alejandro's email
    questions.forEach(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct;
      payload[`Pregunta ${q.id} - ${q.text}`] = `Respuesta: "${userAnswer}" | Resultado: ${isCorrect ? '✅ CORRECTA' : `❌ INCORRECTA (Correcta era: "${q.correct}")`}`;
    });

    try {
      const response = await fetch("https://formsubmit.co/ajax/alejandro.reinoso.sanchez@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quiz answers:', err);
      setError("Ocurrió un problema de red. Por favor, asegúrate de estar conectado a internet e inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setError(null);
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12" id="quiz-canvas-panel">
      {/* Page Header */}
      <div className="mb-10" id="quiz-header-section">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#a80006] animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evaluación de Lógica</span>
        </div>
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Formulario de Proposiciones y Tablas de Verdad
        </h1>
        <p className="text-base text-slate-500 font-body-lg max-w-2xl leading-relaxed">
          Hola, esta es una encuesta corta sobre proposiciones lógicas y tablas de verdad. Completa las preguntas y envía los resultados directamente al tutor.
        </p>
      </div>

      {!submitted ? (
        /* Quiz Form Layout */
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6" id="form-quiz">
          {questions.map((q, idx) => (
            <div 
              key={q.id}
              className="premium-card border border-slate-200/60 rounded-2xl p-6 premium-shadow-sm relative overflow-hidden"
            >
              {/* Top border line indicator */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a80006] to-[#e31820] opacity-80"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pregunta {idx + 1} de {questions.length}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ffe5e1] text-[#a80006] border border-[#e7bdb7]/40">
                  2 Puntos
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-4">{q.text}</h3>

              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <div
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`px-4.5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                        isSelected
                          ? 'border-[#a80006] bg-[#ffe5e1]/20 text-[#a80006] font-bold shadow-sm'
                          : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#a80006] bg-[#a80006]' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <span>{opt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {error && (
            <div className="flex items-center gap-2.5 bg-rose-500/10 text-[#a80006] border border-rose-500/20 p-4 rounded-xl font-semibold text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !isAllAnswered}
            className={`w-full bg-gradient-to-r from-[#a80006] to-[#e31820] hover:from-[#c20007] hover:to-[#f0222a] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-[#a80006]/20 transition-all duration-300 cursor-pointer ${
              (!isAllAnswered || submitting) ? 'opacity-50 cursor-not-allowed shadow-none' : 'active:scale-[0.98]'
            }`}
            id="btn-quiz-submit"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                <span>Enviando respuestas...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Respuestas al Tutor</span>
              </>
            )}
          </button>
        </form>
      ) : (
        /* Results / Success State */
        <div className="max-w-2xl premium-card border border-slate-200/60 rounded-2xl p-8 premium-shadow-md relative overflow-hidden" id="quiz-results">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-headline-md text-slate-800">
                ¡Respuestas Enviadas!
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Evaluación Completada
              </p>
            </div>
          </div>

          <div className="bg-slate-50/60 border border-slate-200/60 rounded-xl p-6 mb-8 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tu Puntuación Estimada</span>
            <span className="text-4xl font-black text-emerald-600 font-mono">
              {calculateScore()} / 10 Puntos
            </span>
            <span className="text-xs text-slate-500 font-medium mt-1">
              ({calculateScore() / 2} de {questions.length} respuestas correctas)
            </span>
            <div className="mt-4 text-xs font-medium text-slate-500 leading-relaxed max-w-sm">
              Tus respuestas detalladas se han enviado exitosamente al correo de tu tutor <strong>(alejandro.reinoso.sanchez@gmail.com)</strong>.
            </div>
          </div>

          {/* Feedback details */}
          <div className="space-y-4 mb-8">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Revisión de Preguntas</h4>
            {questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;
              return (
                <div key={q.id} className="border-b border-slate-100 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold text-slate-800">{q.id}. {q.text}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isCorrect 
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                    }`}>
                      {isCorrect ? 'Correcta' : 'Incorrecta'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tu respuesta: <span className="font-semibold text-slate-700">{userAnswer}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                      Respuesta correcta: <span className="font-semibold">{q.correct}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-[0.98] cursor-pointer"
            id="btn-quiz-reset"
          >
            Realizar el Cuestionario de Nuevo
          </button>
        </div>
      )}
    </div>
  );
}
