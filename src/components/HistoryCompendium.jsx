import React, { useState } from 'react';
import { REGIONS } from '../utils/regions';
import { BookOpen, ShieldAlert, Sparkles, Feather, Anchor, Cpu, ArrowRight } from 'lucide-react';

export default function HistoryCompendium() {
  const [activeChapter, setActiveChapter] = useState('general'); // 'general', 'rajira', 'arpenia', 'mareina'

  return (
    <div className="max-w-5xl mx-auto py-6 flex flex-col gap-8 animate-fadeIn text-[#F0F6FC]">
      
      {/* Cabecera del Compendio */}
      <div className="border-b border-[#30363D] pb-6">
        <div className="flex items-center gap-2 text-[#FF3366] text-xs font-mono uppercase tracking-widest mb-1">
          <BookOpen className="w-4 h-4" /> Archivos Clasificados del Continente
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#F0F6FC]">Compendio Histórico y Narrativo</h2>
        <p className="text-[#8B949E] text-sm mt-2 max-w-2xl">
          Registro oficial de los eventos geopolíticos, las crónicas de resistencia de Pedro y la verdadera naturaleza biológica de las regiones.
        </p>
      </div>

      {/* Selector de Capítulos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: 'general', label: 'Historia General', icon: BookOpen, color: '#F0F6FC' },
          { id: 'rajira', label: 'Rajira & Pedro', icon: Feather, color: '#FF3366' },
          { id: 'arpenia', label: 'Arpenia (Ocupación)', icon: Cpu, color: '#00E676' },
          { id: 'mareina', label: 'Mareina & Vacuna', icon: Anchor, color: '#FFB300' },
        ].map(chap => {
          const Icon = chap.icon;
          const isActive = activeChapter === chap.id;
          return (
            <button
              key={chap.id}
              onClick={() => setActiveChapter(chap.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                isActive 
                  ? "bg-[#161B22] border-[#FF3366] shadow-lg" 
                  : "bg-[#090D12] border-[#21262D] hover:border-[#30363D] text-[#8B949E]"
              }`}
            >
              <div className="p-2 rounded-lg bg-[#0D1117] border border-[#30363D]" style={{ color: chap.color }}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-mono text-[#8B949E] uppercase">Capítulo</span>
                <span className="font-serif font-bold text-sm text-white">{chap.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Contenido Dinámico de los Capítulos */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* CAPÍTULO: HISTORIA GENERAL */}
        {activeChapter === 'general' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-[#21262D] pb-4">
              <span className="w-3 h-3 rounded-full bg-[#F0F6FC]" />
              <h3 className="font-serif text-2xl font-bold text-white">Génesis y Caída del Mundo Unificado</h3>
            </div>
            
            <div className="text-sm text-[#C9D1D9] leading-relaxed space-y-4 font-sans">
              <p>
                <strong>Rajira</strong> empezó siendo una región muy próspera gracias a que tenía muchísimos recursos naturales para su desarrollo tecnológico, abundantes ríos y una vegetación exuberante. Sin embargo, durante su proceso de expansión, les invadió <strong>Arpenia</strong>, una región tecnológicamente muy avanzada en poderío armamentístico.
              </p>
              <p>
                Los arpenienses llegaron convencidos de que Rajira sufría problemas profundos y que ellos poseían las soluciones; a cambio, solo exigían acceso ilimitado a sus vastos recursos naturales. Tras años de explotación asimétrica, Rajira se cansó y se rebeló contra la dominación extranjera.
              </p>
              <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] my-4">
                <span className="text-xs font-mono uppercase text-[#FF3366] block mb-1">El Origen del Conflicto Perpetuo</span>
                <p className="text-xs text-[#8B949E]">
                  Al ser superados por las armas biológicas de Arpenia, Rajira fue completamente arrasada. Para evitar futuras revanchas, Arpenia diseñó una <strong>bomba química mutágena</strong> que alteró de forma generacional los recuerdos y la química cerebral de los rajirenos, volviéndolos iracibles, intolerantes y obligándoles a combatirse entre sí para mantenerlos divididos.
                </p>
              </div>
              <p>
                Por su parte, <strong>Mareina</strong> se mantuvo como un bastión neutral. Al rechazar el ingreso de Arpenia y descubrir la toxina liberada en Rajira, desarrollaron una vacuna inmunizante, buscando restaurar el orden continental mientras soportan el bloqueo militar permanente de Arpenia.
              </p>
            </div>
          </div>
        )}

        {/* CAPÍTULO: RAJIRA Y PEDRO */}
        {activeChapter === 'rajira' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-[#21262D] pb-4">
              <span className="w-3 h-3 rounded-full bg-[#FF3366]" />
              <h3 className="font-serif text-2xl font-bold text-white">Rajira, El Despertar de Pedro y la Biología Floral</h3>
            </div>

            <div className="text-sm text-[#C9D1D9] leading-relaxed space-y-4 font-sans">
              <p>
                Rajira es hoy un mundo árido donde escasean los árboles y las flores. Es un territorio donde la violencia rige cada interacción: las diferencias no se dialogan, se combaten. Las peleas callejeras son vistas como un ritual que “forma carácter”. En este entorno creció <strong>Pedro</strong>, hijo de un legendario luchador asesinado por cinco hombres en combate.
              </p>
              <p>
                Gigante y robusto, Pedro aprendió antes a derribar y estrangular que a hablar. Su primer asesinato ocurrió tras una disputa absurda sobre si llovería o no. Sin embargo, cazando en una cueva profunda, Pedro descubrió un campo secreto de <strong>flores de un radiante color celeste</strong>. Al tocarlas con sus manos manchadas de sangre, una avalancha de empatía e hiperconciencia lo invadió, haciéndole llorar y comprender el valor del sacrificio y la compasión.
              </p>

              {/* Ficha técnica de la Flor */}
              <div className="mt-6 p-6 rounded-xl bg-[#090D12] border border-[#FF3366]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#FF3366] font-mono text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" /> Registro Biológico: La Flor de Rajira
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Órgano Sensorial Subterráneo</h4>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  Es el órgano reproductor y sensorial de un organismo vegetal colosal que habita en el subsuelo. Posee una corola de seis pétalos celestes semitranslúcidos, un <strong>núcleo de memoria bioluminiscente</strong> y estambres neuroconductores que liberan polen para enlazarse con el sistema nervioso de los seres vivos. Actúa como un potente inhibidor psicodélico de la toxina arpeniana.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CAPÍTULO: ARPENIA */}
        {activeChapter === 'arpenia' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-[#21262D] pb-4">
              <span className="w-3 h-3 rounded-full bg-[#00E676]" />
              <h3 className="font-serif text-2xl font-bold text-white">Arpenia y el Control Tecnocrático</h3>
            </div>

            <div className="text-sm text-[#C9D1D9] leading-relaxed space-y-4 font-sans">
              <p>
                Arpenia representa la cúspide de la megalópolis tecnificada. Su desarrollo se cimentó sobre la extracción sistemática de los recursos naturales de Rajira bajo la falsa promesa de asistencia técnica.
              </p>
              <p>
                Tras la rebelión de Rajira, el alto mando arpeniano optó por la aniquilación selectiva y la implementación de la guerra psicológica a escala química. Su objetivo principal es evitar a toda costa que Rajira descubra el origen de su agresividad inducida. Por ello, al enterarse de las propiedades purificadoras de las <strong>Flores de Rajira</strong>, intentaron extinguirlas por completo, aunque un pequeño remanente logró sobrevivir en las profundidades subterráneas.
              </p>
            </div>
          </div>
        )}

        {/* CAPÍTULO: MAREINA */}
        {activeChapter === 'mareina' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-[#21262D] pb-4">
              <span className="w-3 h-3 rounded-full bg-[#FFB300]" />
              <h3 className="font-serif text-2xl font-bold text-white">Mareina: Neutralidad y la Vacuna Continental</h3>
            </div>

            <div className="text-sm text-[#C9D1D9] leading-relaxed space-y-4 font-sans">
              <p>
                Mareina es el territorio templado y marítimo más equilibrado del mundo. Gestionan sus recursos con estricta moderación, evitando el agotamiento y el abuso ecológico que caracterizó a Arpenia.
              </p>
              <p>
                Al percatarse de la toxina arpeniana que esclaviza a Rajira, científicos de Mareina sintetizaron una <strong>vacuna neutralizante</strong>. Actualmente intentan contrabandearla hacia Rajira para devolverle la lucidez a su pueblo, aunque cada expedición es implacablemente interceptada por las flotas de bloqueo arpenianas.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}