import { Users, Award, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import fotoAlejandro from '@/img/Foto_Alejandro.png';
import fotoAmelia from '@/img/Foto_Amelia.png';
import fotoLaura from '@/img/Foto_Laura.png';

export default function AuthorsConclusions() {
  const authors = [
    {
      name: 'Alejandro Reinoso',
      age: '15 años',
      role: 'Líder de Programación & Lógica Simbólica',
      course: '3º A de Secundaria',
      school: 'Colegio Claret',
      photo: fotoAlejandro,
      color: 'from-[#a80006] to-[#e31820]',
      desc: 'Encargado del desarrollo del motor lógico de la web y la explicación sobre enunciados simples y compuestos.'
    },
    {
      name: 'Amelia Vallejo',
      age: '14 años',
      role: 'Investigadora de Estructuras & Tablas lógicas',
      course: '3º A de Secundaria',
      school: 'Colegio Claret',
      photo: fotoAmelia,
      color: 'from-[#7c5800] to-[#fed700]',
      desc: 'Responsable del análisis de las tablas lógicas condicionales y de la estructuración teórica de los conectores.'
    },
    {
      name: 'Laura Soto',
      age: '14 años',
      role: 'Analista de Tautologías & Contingencia',
      course: '3º A de Secundaria',
      school: 'Colegio Claret',
      photo: fotoLaura,
      color: 'from-blue-600 to-cyan-500',
      desc: 'Encargada de la clasificación final de resultados combinatorios en tablas de verdad y estabilidad lógica.'
    }
  ];

  return (
    <div className="flex-grow overflow-y-auto bg-[#f6f6f9] p-6 md:p-12 font-sans" id="authors-conclusions-viewport">
      {/* Header Banner */}
      <div className="mb-10 max-w-5xl mx-auto" id="authors-header-block">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#ffe5e1] flex items-center justify-center text-[#a80006]">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase font-bold text-[#a80006] tracking-widest bg-[#ffe5e1] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#a80006]" />
            Equipo & Resultados
          </span>
        </div>
        <h1 className="text-4xl font-bold font-headline-lg bg-gradient-to-r from-[#a80006] to-[#e31820] bg-clip-text text-transparent mb-2 leading-tight">
          Autores y Conclusiones del Proyecto
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-3xl leading-relaxed">
          Conoce al equipo de estudiantes del Colegio Claret detrás de la plataforma ClaretLab y lee los aprendizajes matemáticos consolidados durante este proyecto.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 pb-12">
        {/* Section 1: Authors Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1a1c1e] flex items-center gap-2.5 font-headline-md">
            <GraduationCap className="text-[#a80006] w-6 h-6" />
            Integrantes del Grupo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authors.map((author, index) => (
              <div 
                key={index}
                className="bg-white border border-[#e2e2e5] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Display */}
                  <div className="relative w-28 h-28 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-50">
                    <img 
                      src={author.photo} 
                      alt={author.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-[#a80006] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {author.age}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-center text-slate-800 mb-1">{author.name}</h3>
                  <p className="text-xs font-bold text-center text-slate-400 uppercase tracking-wide mb-3">{author.course}</p>
                  
                  <div className="flex justify-center mb-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600 uppercase tracking-wider text-center">
                      {author.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 text-center leading-relaxed font-medium mb-4">
                    {author.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                  <span>{author.school}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Conclusions Block */}
        <section className="premium-card border border-slate-200/60 rounded-2xl p-8 premium-shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a80006] to-[#e31820]"></div>
          
          <h2 className="text-2xl font-bold text-[#1a1c1e] mb-4 flex items-center gap-2.5 font-headline-md">
            <BookOpen className="text-[#a80006] w-6 h-6" />
            Conclusiones del Proyecto
          </h2>
          
          <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              A través de la creación y desarrollo de <strong>ClaretLab</strong>, hemos dominado conceptos fundamentales de la lógica matemática que estructuran el pensamiento crítico. Comprendimos que los enunciados cotidianos pueden traducirse a un lenguaje formal simbólico para evaluar su validez científica sin ambigüedades.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Dominamos el uso de los conectivos lógicos (negación, conjunción, disyunción, condicional y bicondicional) y aprendimos a construir y analizar tablas de verdad complejas bajo los estados de tautología (verdad absoluta), contradicción (falsedad absoluta) y contingencia (estados mixtos). Este proyecto nos demostró que la lógica formal no es solo abstracta, sino el pilar de tecnologías cotidianas como las búsquedas estructuradas en la web y la toma de decisiones algorítmicas en programación.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
