import { useRef, useState } from 'react';
import { Play, Video, User, Clock, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
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
      title: 'Lógica Proposicional y Operaciones Lógicas',
      description: 'Introducción didáctica sobre lógica proposicional y operaciones fundamentales, abordando la resolución de ejercicios prácticos empleando ejemplos escritos para facilitar el aprendizaje.',
      duration: '3:05 Minutos',
      author: 'Alejandro Reinoso',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoAlejandro,
      posterSrc: fotoAlejandro,
      topics: [
        'Definición de proposición y valor de verdad',
        'Construcción de proposiciones compuestas',
        'Operaciones lógicas (conjunción, disyunción, negación)',
        'Ejemplos escritos para facilitar la comprensión',
        'Resolución básica de ejercicios lógicos'
      ]
    },
    {
      id: 'amelia',
      title: 'Conceptos Básicos de Lógica Matemática',
      description: 'Exposición detallada sobre los fundamentos de lógica matemática y proposiciones, diferenciando enunciados lógicos y explicando la estructura de símbolos dentro de ejercicios prácticos.',
      duration: '1:53 Minutos',
      author: 'Amelia Vallejo',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoAmelia,
      posterSrc: fotoAmelia,
      topics: [
        'Identificación de proposiciones lógicas',
        'Diferenciación de oraciones con valor lógico',
        'Ejemplos de proposiciones verdaderas y falsas',
        'Conectores lógicos para proposiciones compuestas',
        'Símbolos lógicos y su significado práctico'
      ]
    },
    {
      id: 'laura',
      title: 'Lógica Proposicional y Conceptos Básicos',
      description: 'Explicación educativa sobre lógica proposicional y conceptos básicos de matemáticas discretas, utilizando carteles escritos a mano para ilustrar los temas de manera didáctica y académica.',
      duration: '4:06 Minutos',
      author: 'Laura Soto',
      course: 'Estudiante - 3º A de Secundaria',
      videoSrc: videoLaura,
      posterSrc: fotoLaura,
      topics: [
        'Definición de proposición (verdadero o falso)',
        'Ejercicios de identificación de enunciados',
        'Negación de proposiciones simples',
        'Proposiciones compuestas y conectores lógicos (conjunción, disyunción, implicación, equivalencia, negación)'
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
      <div className="mb-10 relative max-w-5xl mx-auto" id="videos-header-block">
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

      {/* List of Video Cards (Vertical stack for better screen layout with vertical video) */}
      <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-8" id="videos-list">
        {videosList.map((video) => {
          const currentSpeed = speeds[video.id] || 1;
          const ref = videoRefs[video.id as keyof typeof videoRefs];
          
          return (
            <div 
              key={video.id}
              className="premium-info-card flex flex-col md:flex-row bg-white border border-[#e2e2e5] rounded-2xl overflow-hidden hover:premium-shadow-lg transition-all duration-300 relative"
              id={`video-card-${video.id}`}
            >
              {/* Left Column: Video Player in natural 9:16 Aspect Ratio */}
              <div className="relative w-full md:w-[240px] xl:w-[260px] aspect-[9/16] bg-slate-950 overflow-hidden shadow-inner shrink-0 mx-auto md:mx-0 flex items-center justify-center">
                <video
                  ref={ref}
                  src={video.videoSrc}
                  poster={video.posterSrc}
                  className="w-full h-full object-contain bg-black"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>

              {/* Right Column: Information & Controls */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  {/* Participant Header */}
                  <div className="flex items-center gap-3 mb-4 border-b border-[#f0f0f3] pb-4">
                    <img
                      src={video.posterSrc}
                      alt={video.author}
                      className="w-12 h-12 rounded-full object-cover border border-[#a80006]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80";
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-base text-[#1a1c1e]">{video.author}</h3>
                      <p className="text-xs font-semibold text-slate-500">{video.course}</p>
                    </div>
                    {/* Duration Badge */}
                    <div className="ml-auto bg-[#ffe5e1] text-[#a80006] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-[#1a1c1e] mb-2 font-headline-md hover:text-[#a80006] transition-colors duration-200">
                    {video.title}
                  </h2>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                    {video.description}
                  </p>

                  {/* Topics Covered */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Temas Explicados
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {video.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#a80006] shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 font-medium leading-tight">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Row: Speed Control */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#f0f0f3]">
                  <div className="flex items-center gap-2 bg-[#fafafc] border border-[#e8e8eb] p-1.5 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 ml-2 mr-1">
                      <Gauge className="w-4 h-4 text-[#a80006]" />
                      Velocidad:
                    </span>
                    <div className="flex gap-1">
                      {[1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(video.id, speed)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                            currentSpeed === speed
                              ? 'bg-[#a80006] text-white shadow-sm'
                              : 'text-slate-600 hover:bg-[#e8e8ea] active:scale-95'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
