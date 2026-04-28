"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("Esperando mensaje...");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const bentoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:8000/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error cargando turnos:", error);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const askAI = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    const newHistory = [...chatHistory, { role: "user", content: message }];
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "Matias_Caseros", messages: newHistory }),
      });
      if (!res.ok) throw new Error("Error en el servidor");
      const data = await res.json();
      setResponse(data.response);
      setChatHistory([...newHistory, { role: "assistant", content: data.response }]);
      fetchAppointments();
    } catch (error) {
      console.error(error);
      setResponse("Error: El motor de Caseros está fuera de servicio.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const scrollToBento = () => bentoRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="w-full">

      {/* ══════════ HERO ══════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
        aria-labelledby="hero-heading"
      >
        {/* Gradiente radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,195,0.12) 0%, transparent 70%)" }}
        />
        {/* Barras cinemáticas */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-mint/50 to-transparent" aria-hidden />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
            ClipperOps v1.0 · Sistema Operativo
          </span>
        </div>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="relative z-10 text-center font-extrabold tracking-tighter mb-6"
          style={{ fontSize: "clamp(3rem,10vw,7rem)", lineHeight: 0.92 }}
        >
          <span
            className="block bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.3) 100%)" }}
          >
            El Estándar Absoluto
          </span>
          <span className="block text-accent-mint mt-2">Para Barberías.</span>
        </h1>

        {/* Subtítulo */}
        <p className="relative z-10 text-center text-lg md:text-xl text-white/40 max-w-xl mb-12 leading-relaxed font-medium">
          Automatización radical de turnos con IA Agéntica. Cero inasistencias mediante cobro de señas.{" "}
          <span className="text-white/60">Si seguís usando WhatsApp manual, estás perdiendo dinero.</span>
        </p>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={scrollToBento}
            className="group px-8 py-4 rounded-xl bg-accent-mint text-black font-extrabold text-base
                       transition-all duration-300 hover:-translate-y-1
                       hover:shadow-[0_0_40px_rgba(0,255,195,0.35)]"
          >
            Reclamar Acceso
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <button
            type="button"
            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
          >
            Ver Arquitectura
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
                     text-white/20 transition-all duration-500 cursor-pointer select-none"
          style={{ opacity: scrolled ? 0 : 1 }}
          onClick={scrollToBento}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
          <div
            className="w-px h-12 rounded-full overflow-hidden"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }}
          >
            <div
              className="w-full rounded-full"
              style={{
                height: "50%",
                background: "rgba(0,255,195,0.6)",
                animation: "co-scroll-line 1.6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════ BENTO GRID ══════════ */}
      <section
        ref={bentoRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6"
        aria-label="Características del producto"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-mint/5 blur-[100px] rounded-full pointer-events-none"
          aria-hidden
        />

        {/* Motor de IA */}
        <article className="lg:col-span-5 bg-glass-bg border border-glass-border rounded-3xl p-8 relative overflow-hidden group hover:border-accent-mint/40 transition-colors duration-500 flex flex-col justify-between min-h-[480px]">
          <div className="absolute top-4 right-4 p-4 opacity-10 group-hover:opacity-100 transition-all duration-700 group-hover:rotate-12" aria-hidden>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00ffc3" strokeWidth="1.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <span className="inline-block bg-accent-mint/10 text-accent-mint px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-accent-mint/20">
              Cerebro Agéntico
            </span>
            <h3 className="text-3xl font-bold mb-4 text-white leading-tight">Negociación en<br />Tiempo Real</h3>
            <p className="text-white/40 text-base leading-relaxed">
              No es un bot de botones. Es una IA que entiende el lenguaje natural, busca espacios vacíos y cierra el turno por vos.
            </p>
          </div>
          <div className="mt-8 space-y-3.5">
            {["Turnos automáticos 24/7", "Memoria de clientes", "Cobro de señas integrado"].map((feat) => (
              <div key={feat} className="flex items-center gap-3 group/feat">
                <div className="w-5 h-5 rounded-full bg-accent-mint/10 border border-accent-mint/30 flex items-center justify-center shrink-0 group-hover/feat:bg-accent-mint/20 transition-colors">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#00ffc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm text-white/50 font-medium group-hover/feat:text-white/70 transition-colors">{feat}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden />
        </article>

        {/* Chat de IA */}
        <article className="lg:col-span-7 bg-surface border border-glass-border rounded-3xl p-8 flex flex-col backdrop-blur-sm relative overflow-hidden min-h-[480px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-mint/5 blur-[120px] pointer-events-none rounded-full" aria-hidden />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent-mint" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10H12V2zM21.18 8.02c-1-2.3-2.85-4.17-5.16-5.18" />
              </svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-mint" />
              </span>
              ClipperOps AI
            </h3>
          </div>
          <div className="flex-1 bg-black/60 border border-white/5 p-6 rounded-2xl mb-6 min-h-[200px] flex flex-col justify-center" aria-live="polite">
            {loading ? (
              <div className="flex flex-col gap-3 animate-pulse">
                <div className="h-3 bg-white/10 rounded-full w-3/4" />
                <div className="h-3 bg-white/10 rounded-full w-1/2" />
                <div className="h-3 bg-white/10 rounded-full w-2/3" />
              </div>
            ) : (
              <p className="text-base text-white/80 leading-relaxed font-light">
                <span className="text-accent-mint mr-2 font-bold text-sm">❯</span>
                {response}
              </p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="chat-input" className="sr-only">Escribí tu pregunta para ClipperOps AI</label>
            <input
              id="chat-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void askAI()}
              placeholder="Ej: Anotame a Matías hoy a las 18 para un degradé..."
              className="w-full bg-black/80 border border-glass-border rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent-mint/60 transition-all"
            />
            <button
              type="button"
              onClick={() => void askAI()}
              disabled={loading || !message.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-mint text-black font-black text-xs px-5 py-2.5 rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,195,0.3)] transition-all disabled:opacity-30 disabled:hover:scale-100"
            >
              ENVIAR
            </button>
          </div>
        </article>

        {/* Agenda */}
        <article className="lg:col-span-7 bg-glass-bg border border-glass-border rounded-3xl p-8 flex flex-col min-h-[440px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/30" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Agenda Activa</h3>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-0.5 font-medium">Sincronización en tiempo real</p>
              </div>
            </div>
            <button
              onClick={fetchAppointments}
              className="group p-2.5 bg-white/5 hover:bg-accent-mint/10 rounded-xl border border-white/5 hover:border-accent-mint/30 transition-all duration-300"
              aria-label="Refrescar agenda"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/30 group-hover:text-accent-mint group-hover:rotate-180 transition-all duration-700" strokeWidth="2">
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
            </button>
          </div>
          <div className="flex-1 space-y-2.5 overflow-y-auto custom-scrollbar">
            {appointments.length === 0 ? (
              <div className="h-full flex items-center justify-center py-16 border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-white/20 text-sm italic">No hay registros de actividad para hoy.</p>
              </div>
            ) : (
              appointments.map((apt: any) => (
                <div key={apt.id} className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-accent-mint/15 transition-all duration-300">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-accent-mint/10 border border-accent-mint/20 flex items-center justify-center text-xs font-black text-accent-mint shrink-0">
                      {apt.customer_name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{apt.customer_name}</p>
                      <p className="text-[11px] text-white/30 font-medium mt-0.5">{apt.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-1 ${apt.status === "Confirmado" ? "bg-accent-mint/10 text-accent-mint border border-accent-mint/20" : "bg-white/5 text-white/30 border border-white/10"}`}>
                      {apt.status}
                    </span>
                    <p className="text-[11px] font-mono text-white/20">{apt.appointment_time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        {/* Cero Inasistencias */}
        <article className="lg:col-span-5 bg-glass-bg border border-glass-border rounded-3xl p-8 relative overflow-hidden group hover:border-accent-mint/40 transition-colors flex flex-col justify-center min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
          <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Cero Inasistencias</h3>
          <p className="text-white/40 leading-relaxed relative z-10">
            Integración nativa con pasarelas de pago. Cobrá señas automáticas antes de confirmar el turno.
          </p>
        </article>

        {/* Métricas */}
        {[
          { value: "99.9%", label: "Uptime de Servidor",    color: "text-white" },
          { value: "0%",    label: "Tasa de Inasistencias", color: "text-accent-mint" },
          { value: "<50ms", label: "Latencia de Red",       color: "text-white" },
        ].map(({ value, label, color }) => (
          <article key={label} className="lg:col-span-4 bg-glass-bg border border-glass-border rounded-3xl p-8 flex flex-col justify-end group hover:border-accent-mint/40 transition-colors min-h-[180px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            <p className={`text-5xl font-extrabold mb-1.5 relative z-10 ${color}`}>{value}</p>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest relative z-10">{label}</p>
          </article>
        ))}
      </section>
    </div>
  );
}