export default function Home() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-20">

      {/* Luz ambiental */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                   bg-accent-mint/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden
      />

      {/* ── HERO ── */}
      <section
        className="relative z-10 flex flex-col items-center text-center mb-32 animate-fade-in-up"
        aria-labelledby="hero-heading"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                     bg-glass-bg border border-glass-border mb-8 backdrop-blur-md"
          aria-label="Estado del sistema: IA Activa"
        >
          <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" aria-hidden />
          <span className="text-sm font-semibold tracking-wide text-muted uppercase">
            ClipperOps v1.0 | IA Activa
          </span>
        </div>

        {/* FIX: h1 con id para aria-labelledby de la section */}
        <h1
          id="hero-heading"
          className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6
                     bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
        >
          El Estándar Absoluto <br />
          <span className="text-accent-mint">Para Barberías.</span>
        </h1>

        <p className="text-xl text-muted max-w-2xl mb-10 leading-relaxed font-medium">
          Automatización radical de turnos con IA Agéntica. Cero inasistencias mediante cobro
          de señas. Si seguís usando WhatsApp manual, estás perdiendo dinero.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="px-8 py-4 rounded-xl bg-accent-mint text-black font-extrabold text-lg
                       shadow-glow-mint hover:shadow-glow-mint-strong
                       transition-all duration-300 hover:-translate-y-1"
          >
            Reclamar Acceso
          </button>
          <button
            type="button"
            className="px-8 py-4 rounded-xl bg-glass-bg border border-glass-border text-white
                       font-medium hover:bg-white/10 transition-all duration-300"
          >
            Ver Arquitectura
          </button>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      {/*
        FIX: auto-rows-[250px] era un alto fijo que hacía overflow del contenido
        en pantallas pequeñas o con texto largo. Reemplazado por min-height via
        inline style en cada card — el grid crece con el contenido pero mantiene
        una altura mínima visual consistente.
      */}
      <section
        className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6"
        aria-label="Características del producto"
      >

        {/* Card grande: Motor de IA */}
        <article
          className="md:col-span-2 md:row-span-2 bg-glass-bg border border-glass-border
                     rounded-3xl p-8 relative overflow-hidden group
                     hover:border-accent-mint/50 transition-colors duration-500
                     flex flex-col justify-between min-h-[500px]"
        >
          <div
            className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100
                       transition-opacity duration-500"
            aria-hidden
          >
            {/* FIX: aria-hidden en el SVG decorativo — no aporta info a lectores */}
            <svg
              width="40" height="40" viewBox="0 0 24 24"
              fill="none" stroke="#00ffc3" strokeWidth="2"
              aria-hidden
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>

          <div>
            {/*
              FIX: clase "badge" no existe en Tailwind ni está definida en el config.
              Reemplazada por utilities directas equivalentes.
            */}
            <span
              className="inline-block bg-accent-mint/10 text-accent-mint
                         px-3 py-1 rounded-full text-xs font-bold uppercase
                         tracking-wider mb-6"
            >
              Cerebro Agéntico
            </span>
            {/* FIX: h3 correcto para jerarquía — la section tiene su propio h2 implícito */}
            <h3 className="text-3xl font-bold mb-4 text-white">
              Negociación en Tiempo Real
            </h3>
            <p className="text-muted text-lg">
              No es un bot de botones. Es una IA que entiende el lenguaje natural,
              busca espacios vacíos y cierra el turno por vos.
            </p>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-px
                       bg-gradient-to-r from-transparent via-accent-mint to-transparent
                       opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            aria-hidden
          />
        </article>

        {/* Card mediana: Pagos */}
        <article
          className="md:col-span-2 bg-glass-bg border border-glass-border rounded-3xl p-8
                     relative overflow-hidden group hover:border-accent-mint/50
                     transition-colors min-h-[250px] flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold mb-2 text-white">Cero Inasistencias</h3>
          <p className="text-muted">
            Integración nativa con pasarelas de pago. Cobrá señas automáticas
            antes de confirmar el turno.
          </p>
        </article>

        {/* Card stat: Uptime */}
        <article
          className="bg-glass-bg border border-glass-border rounded-3xl p-8
                     flex flex-col justify-end group hover:border-accent-mint/50
                     transition-colors min-h-[250px]"
        >
          <p className="text-4xl font-extrabold text-white mb-1" aria-label="99.9 por ciento de uptime">
            99.9%
          </p>
          <p className="text-muted text-sm font-medium uppercase tracking-wide">
            Uptime de Servidor
          </p>
        </article>

        {/* Card stat: Latencia */}
        <article
          className="bg-glass-bg border border-glass-border rounded-3xl p-8
                     flex flex-col justify-end group hover:border-accent-mint/50
                     transition-colors min-h-[250px]"
        >
          <p className="text-4xl font-extrabold text-white mb-1" aria-label="Menos de 50 milisegundos de latencia">
            &lt;50ms
          </p>
          <p className="text-muted text-sm font-medium uppercase tracking-wide">
            Latencia de Red
          </p>
        </article>

      </section>
    </div>
  );
}