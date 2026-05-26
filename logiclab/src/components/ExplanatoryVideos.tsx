import { useRef, useState } from 'react';
import { Play, Video, User, Clock, CheckCircle2, ChevronRight, Gauge, Download } from 'lucide-react';
import videoAlejandro from '@/videos/Video_Alejandro.mp4';
import videoAmelia from '@/videos/Video_Amelia.mp4';
import videoLaura from '@/videos/Video_Laura.mp4';
import fotoAlejandro from '@/img/Foto_Alejandro.png';
import fotoAmelia from '@/img/Foto_Amelia.png';
import fotoLaura from '@/img/Foto_Laura.png';

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  course: string;
  videoSrc: string;
  posterSrc: string;
  topics: string[];
}

export default function ExplanatoryVideos() {
  const videosList: VideoData[] = [
    {
      id: 'alejandro',
      title: 'Generación de Tablas de Verdad',
      description: 'Aprende a ingresar expresiones lógicas, utilizar los operadores especiales de ClaretLab y analizar los resultados para identificar tautologías, contradicciones y contingencias de forma interactiva.',
      duration: '3:05 Minutos',
      author: 'Alejandro Reinoso',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoAlejandro,
      posterSrc: fotoAlejandro,
      topics: [
        'Ingreso correcto de variables proposicionales (P, Q, R, etc.)',
        'Uso del teclado virtual para conectores lógicos (∧, ∨, →, ↔, ¬)',
        'Evaluación paso a paso de la tabla final',
        'Interpretación del tipo de proposición resultante'
      ]
    },
    {
      id: 'amelia',
      title: 'Uso de la Calculadora Matemática',
      description: 'Una guía completa sobre el funcionamiento de la calculadora científica de la plataforma. Descubre cómo resolver límites, derivadas, integrales y cómo aprovechar el historial para tus tareas diarias.',
      duration: '1:53 Minutos',
      author: 'Amelia Vallejo',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoAmelia,
      posterSrc: fotoAmelia,
      topics: [
        'Sintaxis matemática para funciones avanzadas',
        'Resolución de límites y cálculo de derivadas',
        'Integración indefinida y definida con su desglose',
        'Navegación e importación de fórmulas desde el historial de cálculos'
      ]
    },
    {
      id: 'laura',
      title: 'Formulario de Proposiciones y Repaso',
      description: 'Conoce cómo evaluar tu conocimiento con el Quiz interactivo de proposiciones lógicas y cómo repasar conceptos teóricos clave utilizando la hoja de fórmulas del Colegio Claret.',
      duration: '4:06 Minutos',
      author: 'Laura Soto',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoLaura,
      posterSrc: fotoLaura,
      topics: [
        'Acceso y resolución del Formulario de Proposiciones (Quiz)',
        'Validación de respuestas correctas y retroalimentación',
        'Consulta rápida de leyes de equivalencia lógica (De Morgan, condicionales)',
        'Estrategias de estudio interactivo en ClaretLab'
      ]
    }
  ];

  // Store playback speeds individually
  const [speeds, setSpeeds] = useState<Record<string, number>>({
    alejandro: 1,
    amelia: 1,
    laura: 1
  });

  const videoRefs = {
    alejandro: useRef<HTMLVideoElement>(null),
    amelia: useRef<HTMLVideoElement>(null),
    laura: useRef<HTMLVideoElement>(null)
  };

  const handleSpeedChange = (id: string, speed: number) => {
    const videoElement = videoRefs[id as keyof typeof videoRefs]?.current;
    if (videoElement) {
      videoElement.playbackRate = speed;
      setSpeeds(prev => ({ ...prev, [id]: speed }));
    }
  };

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12" id="explanatory-videos-container">
      {/* Header Banner */}
      <div className="mb-10 relative" id="videos-header-block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#ffe5e1] flex items-center justify-center text-[#a80006]">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-[#a80006] tracking-widest bg-[#ffe5e1] px-2.5 py-1 rounded-full">
            Recurso Multimedia
          </span>
        </div>
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Videos Explicativos
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-3xl leading-relaxed">
          Explora los tutoriales interactivos creados por los participantes de ClaretLab. Aprende paso a paso cómo dominar las herramientas lógicas y matemáticas de la plataforma.
        </p>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8" id="videos-grid">
        {videosList.map((video) => {
          const currentSpeed = speeds[video.id] || 1;
          const ref = videoRefs[video.id as keyof typeof videoRefs];
          
          return (
            <div 
              key={video.id}
              className="premium-info-card flex flex-col h-full bg-white border border-[#e2e2e5] rounded-2xl overflow-hidden hover:premium-shadow-lg transition-all duration-300 relative"
              id={`video-card-${video.id}`}
            >
              {/* Top accent badge */}
              <div className="absolute top-3 right-3 z-10 bg-[#1e1e24]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{video.duration}</span>
              </div>

              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shadow-inner group">
                <video
                  ref={ref}
                  src={video.videoSrc}
                  poster={video.posterSrc}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>

              {/* Author Institutional Info */}
              <div className="p-5 border-b border-[#f0f0f3] bg-[#fafafc] flex items-center gap-3">
                <img
                  src={video.posterSrc}
                  alt={video.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#a80006]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80";
                  }}
                />
                <div>
                  <h3 className="font-bold text-sm text-[#1a1c1e]">{video.author}</h3>
                  <p className="text-[11px] font-semibold text-slate-500">{video.course}</p>
                </div>
              </div>

              {/* Video Content & Controls */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Custom Playback Speed Controller */}
                <div className="mb-5 flex items-center justify-between bg-white border border-[#e8e8eb] p-2 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 ml-2">
                    <Gauge className="w-3.5 h-3.5 text-[#a80006]" />
                    Velocidad:
                  </span>
                  <div className="flex gap-1">
                    {[1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(video.id, speed)}
                        className={`text-xs font-semibold px-2 py-1 rounded-md transition-all cursor-pointer ${
                          currentSpeed === speed
                            ? 'bg-[#a80006] text-white'
                            : 'text-slate-600 hover:bg-[#e8e8ea] active:scale-95'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2 font-headline-sm hover:text-[#a80006] transition-colors duration-200">
                  {video.title}
                </h2>
                
                <p className="text-xs text-slate-500 leading-relaxed mb-5 font-normal">
                  {video.description}
                </p>

                {/* Topics Covered (Bullet points) */}
                <div className="mt-auto">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Temas Explicados
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {video.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#a80006] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 font-medium leading-tight">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
