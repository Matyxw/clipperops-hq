"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [message,  setMessage]  = useState("");
  const [response, setResponse] = useState("Esperando mensaje...");
  const [loading,  setLoading]  = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
// 2. Función para traer los turnos desde el backend
const fetchAppointments = async () => {
  try {
    const res = await fetch("http://localhost:8000/appointments");
    const data = await res.json();
    setAppointments(data);
  } catch (error) {
    console.error("Error cargando turnos:", error);
  }
};

useEffect(() => {
  fetchAppointments();
}, []);

// 4. MODIFICÁ tu función askAI para que llame a fetchAppointments() al final
const askAI = async () => {
  if (!message || loading) return;
  setLoading(true);

  const newHistory = [...chatHistory, { role: "assistant", content: message }];

  try {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        user_id: "Matias_Caseros", 
        messages: newHistory }),
    });

    if (!res.ok) throw new Error("Error en el servidor");

    const data = await res.json();
    setResponse(data.response);

    setChatHistory([...newHistory, { role: "assistant", content: data.response }]);

    // REFRESCAMOS LA LISTA AUTOMÁTICAMENTE
    fetchAppointments(); 
    
  } catch (error) {
    console.error(error);
    setResponse("Error: El motor de Caseros está fuera de servicio.");
  }finally {
  setLoading(false);
  setMessage("");
  }
};

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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00ffc3" strokeWidth="2" aria-hidden>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>

          <div>
            <span className="inline-block bg-accent-mint/10 text-accent-mint px-3 py-1
                             rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Cerebro Agéntico
            </span>
            <h3 className="text-3xl font-bold mb-4 text-white">Negociación en Tiempo Real</h3>
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
        {/* ── CHAT DE IA ── */}
        
        <article
          className="col-span-1 md:col-span-2 md:row-span-2 p-8 bg-surface border
                     border-glass-border rounded-3xl flex flex-col justify-between
                     shadow-glow-mint/5 backdrop-blur-sm relative overflow-hidden
                     min-h-[500px]"
        >
          <div
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2
                       w-64 h-64 bg-accent-mint/10 blur-[120px] pointer-events-none"
            aria-hidden
          />
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <span className="relative flex h-3 w-3" aria-hidden>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-mint" />
                </span>
                ClipperOps AI
              </h3>
            </div>

            <div
              className="bg-black/60 border border-white/5 p-6 rounded-2xl mb-6
                         min-h-[160px] flex flex-col justify-center"
              aria-live="polite"
              aria-label="Respuesta de la IA"
            >
              {loading ? (
                <div className="flex flex-col gap-2" aria-label="Cargando respuesta">
                  <div className="h-4 bg-white/5 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-white/5 animate-pulse rounded w-1/2" />
                </div>
              ) : (
                <p className="text-lg text-white/90 leading-relaxed font-medium italic">
                  "{response}"
                </p>
              )}
            </div>
          </div>
          <div className="relative">
            <label htmlFor="chat-input" className="sr-only">
              Escribí tu pregunta para ClipperOps AI
            </label>
            <input
              id="chat-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void askAI()}
              placeholder="Preguntá por un turno..."
              className="w-full bg-black/80 border border-glass-border rounded-2xl
                         px-6 py-4 text-white placeholder:text-muted/50
                         focus:outline-none focus:border-accent-mint transition-all"
            />
            <button
              type="button"
              onClick={() => void askAI()}
              disabled={loading || !message.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-mint
                         text-black font-black px-6 py-2 rounded-xl
                         hover:scale-105 transition-all
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              ENVIAR
            </button>
          </div>
          <div className="col-span-1 md:col-span-2 p-8 bg-black/20 border border-white/10 rounded-[2.5rem] backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden">
          
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
                  <span className="bg-accent-mint/20 p-2 rounded-xl text-accent-mint text-sm">📅</span>
                  AGENDA DEL DÍA
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 font-bold">ClipperOps Core v2.0</p>
              </div>
              <button 
              onClick={fetchAppointments}
              className="group p-3 bg-white/5 hover:bg-accent-mint/20 rounded-2xl transition-all duration-500 border border-white/5 hover:border-accent-mint/50"
              >
                <span className="text-xs group-hover:rotate-180 transition-transform duration-700 block">🔄</span>
              </button>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-4 custom-scrollbar">
              {appointments.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-white/20 text-sm italic font-medium">No hay registros de actividad para hoy.</p>
                </div>
                ) : (
                  appointments.map((apt: any) => (
                  <div 
                  key={apt.id} 
                  className="group bg-gradient-to-r from-white/5 to-transparent border border-white/5 p-5 rounded-3xl flex items-center justify-between hover:scale-[1.02] hover:from-white/10 transition-all duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-accent-teal/10 flex items-center justify-center border border-accent-teal/20 text-accent-teal font-black text-lg shadow-inner">
                      {apt.customer_name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white group-hover:text-accent-mint transition-colors duration-300">
                          {apt.customer_name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md text-white/60 font-bold uppercase tracking-widest">
                          {apt.service}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-tighter ${
                        apt.status === 'Confirmado' 
                        ? 'bg-accent-mint/10 text-accent-mint border border-accent-mint/20' 
                        : 'bg-white/5 text-white/40 border border-white/10'
                        }`}>
                          {apt.status}
                      </span>
                      <p className="text-[10px] font-mono text-white/20 mt-2">
                      {new Date(apt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  ))
                  )}
                </div>
              </div>
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