export default function Header() {
  return (
    <header className="w-full border-b border-[#2d2438] py-8 sm:py-10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Subtítulo */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#9ca3af]">
          <span>Entrega 2</span>
          
          
        </div>

        {/* Título Principal */}
        <h1 className="mt-4 w-full text-center font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
          Rajira
        </h1>

        {/* Descripción */}
        <p className="mt-4 max-w-2xl mx-auto w-full text-center font-body text-sm sm:text-base text-[#9ca3af] leading-relaxed">
          Gráficos de las 3 grandes naciones dentro de este mundo.
        </p>
      </div>
    </header>
  );
}