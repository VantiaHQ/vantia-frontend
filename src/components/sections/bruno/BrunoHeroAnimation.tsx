'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const LEFT_NODES = [
  { icon: Phone, label: 'Llamada', color: '#22d3ee' }, // Cyan
  { icon: MessageSquare, label: 'WhatsApp', color: '#8b5cf6' }, // Violet
  { icon: Phone, label: 'Llamada', color: '#22d3ee' },
  { icon: MessageSquare, label: 'WhatsApp', color: '#8b5cf6' },
  { icon: Phone, label: 'Llamada', color: '#22d3ee' },
];

const TICKETS = [
  { unit: 'Portal 3B', issue: 'Fuga de agua', status: 'RESUELTO', color: '#22d3ee' },
  { unit: 'Portal 1A', issue: 'Acceso clave', status: 'ASIGNADO', color: '#8b5cf6' },
  { unit: 'Portal 2C', issue: 'Avería luz', status: 'ASIGNADO', color: '#22d3ee' },
  { unit: 'Portal 4B', issue: 'Ruido vecino', status: 'ASIGNADO', color: '#8b5cf6' },
];

interface Line { x1: number; y1: number; x2: number; y2: number }

function bezierPt(x1: number, y1: number, x2: number, y2: number, t: number) {
  const cx = x1 + (x2 - x1) * 0.5;
  const bx = (1 - t) ** 3 * x1 + 3 * (1 - t) ** 2 * t * cx + 3 * (1 - t) * t ** 2 * cx + t ** 3 * x2;
  const by = (1 - t) ** 3 * y1 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y2;
  return { x: bx, y: by };
}

export default function BrunoHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [leftLines, setLeftLines] = useState<Line[]>([]);
  const [rightLines, setRightLines] = useState<Line[]>([]);
  const [dots, setDots] = useState(() => LEFT_NODES.map((_, i) => i / LEFT_NODES.length));
  const [visibleTickets, setVisibleTickets] = useState<number[]>([]);

  /* ── measure DOM positions ─────────────────────────────────────── */
  const measure = useCallback(() => {
    if (!containerRef.current || !sphereRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const sRect = sphereRef.current.getBoundingClientRect();
    const cx = sRect.left + sRect.width / 2 - cRect.left;
    const cy = sRect.top + sRect.height / 2 - cRect.top;
    const r = sRect.width / 2;

    setSvgSize({ w: cRect.width, h: cRect.height });

    setLeftLines(
      nodeRefs.current.map((el) => {
        if (!el) return null;
        const nr = el.getBoundingClientRect();
        return {
          x1: nr.right - cRect.left,
          y1: nr.top + nr.height / 2 - cRect.top,
          x2: cx - r + 10,
          y2: cy,
        };
      }).filter(Boolean) as Line[]
    );

    setRightLines(
      ticketRefs.current.map((el) => {
        if (!el) return null;
        const tr = el.getBoundingClientRect();
        return {
          x1: cx + r - 10,
          y1: cy,
          x2: tr.left - cRect.left,
          y2: tr.top + tr.height / 2 - cRect.top,
        };
      }).filter(Boolean) as Line[]
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 120);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [measure]);

  /* ── dot animation ─────────────────────────────────────────────── */
  useEffect(() => {
    let frame: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setDots(prev => prev.map(d => (d + dt * 0.45) % 1));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ── ticket reveal ─────────────────────────────────────────────── */
  useEffect(() => {
    const show = () => {
      setVisibleTickets([]);
      TICKETS.forEach((_, i) =>
        setTimeout(() => {
          setVisibleTickets(prev => [...prev, i]);
        }, 600 + i * 450)
      );
    };
    show();
    const id = setInterval(show, 6000);
    return () => clearInterval(id);
  }, [measure]);

  /* ── render ────────────────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl border border-violet-400/20 bg-[#070916] py-16 px-6 md:px-12 shadow-[0_0_50px_-12px_rgba(167,139,250,0.2)]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />

      {/* center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="h-[200px] w-[200px] rounded-full bg-cyan-500/10 blur-[80px] -translate-x-32 opacity-60" />
        <div className="h-[200px] w-[200px] rounded-full bg-violet-600/10 blur-[80px] translate-x-32 opacity-60" />
      </div>

      {/* SVG lines — absolute, full size */}
      {svgSize.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0"
          width={svgSize.w}
          height={svgSize.h}
          style={{ zIndex: 1 }}
        >
          <defs>
            {LEFT_NODES.map((n, i) => (
              <linearGradient key={i} id={`lg-l${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={n.color} stopOpacity="0" />
                <stop offset="50%" stopColor={n.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.6" />
              </linearGradient>
            ))}
            <linearGradient id="lg-r" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* left lines + dots */}
          {leftLines.map((ln, i) => {
            const cx = ln.x1 + (ln.x2 - ln.x1) * 0.6;
            const d = `M${ln.x1},${ln.y1} C${cx},${ln.y1} ${cx},${ln.y2} ${ln.x2},${ln.y2}`;
            const t = (dots[i] + i * 0.2) % 1;
            const pt = bezierPt(ln.x1, ln.y1, ln.x2, ln.y2, t);
            const col = LEFT_NODES[i]?.color ?? '#a78bfa';
            return (
              <g key={i}>
                {/* Wires */}
                <path d={d} fill="none" stroke={`url(#lg-l${i})`} strokeWidth="1.5" strokeLinecap="round" />
                <path d={`M${ln.x1},${ln.y1 - 6} C${cx},${ln.y1 - 6} ${cx},${ln.y2 - 3} ${ln.x2},${ln.y2 - 3}`} fill="none" stroke={`url(#lg-l${i})`} strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
                <path d={`M${ln.x1},${ln.y1 + 6} C${cx},${ln.y1 + 6} ${cx},${ln.y2 + 3} ${ln.x2},${ln.y2 + 3}`} fill="none" stroke={`url(#lg-l${i})`} strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
                {/* glow dot */}
                <circle cx={pt.x} cy={pt.y} r="5" fill={col} opacity="0.2" filter="url(#glow)" />
                <circle cx={pt.x} cy={pt.y} r="2.5" fill="white" />
              </g>
            );
          })}

          {/* right lines + dots */}
          {rightLines.map((ln, i) => {
            const cx = ln.x1 + (ln.x2 - ln.x1) * 0.4;
            const d = `M${ln.x1},${ln.y1} C${cx},${ln.y1} ${cx},${ln.y2} ${ln.x2},${ln.y2}`;
            const t = (dots[i % dots.length] + 0.5 + i * 0.25) % 1;
            const pt = bezierPt(ln.x1, ln.y1, ln.x2, ln.y2, t);
            return (
              <g key={i}>
                {/* Wires */}
                <path d={d} fill="none" stroke="url(#lg-r)" strokeWidth="1.2" strokeLinecap="round" />
                <path d={`M${ln.x1},${ln.y1 - 4} C${cx},${ln.y1 - 4} ${cx},${ln.y2 - 8} ${ln.x2},${ln.y2 - 8}`} fill="none" stroke="url(#lg-r)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
                <path d={`M${ln.x1},${ln.y1 + 4} C${cx},${ln.y1 + 4} ${cx},${ln.y2 + 8} ${ln.x2},${ln.y2 + 8}`} fill="none" stroke="url(#lg-r)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
                {/* glow dot */}
                <circle cx={pt.x} cy={pt.y} r="4" fill={i % 2 === 0 ? "#22d3ee" : "#a78bfa"} opacity="0.5" filter="url(#glow)" />
                <circle cx={pt.x} cy={pt.y} r="2" fill="white" />
              </g>
            );
          })}
        </svg>
      )}

      {/* Content */}
      <div
        className="relative grid items-center gap-6 md:gap-12"
        style={{ gridTemplateColumns: 'auto 1fr auto', zIndex: 2 }}
      >
        {/* LEFT: nodes */}
        <div className="flex flex-col gap-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Vecinos</p>
          {LEFT_NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={i} ref={el => { nodeRefs.current[i] = el; }}>
                <div
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#101025]/80 backdrop-blur-md px-4 py-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#151535] shadow-lg"
                  style={{ width: 170 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="h-4 w-4" style={{ color: node.color }} />
                  </div>
                  <span className="text-xs font-medium text-white/80">{node.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER: Orbita y Esfera de Bruno */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Contenedor fijo para centrar todos los círculos */}
            <div className="relative h-[300px] w-[300px] flex items-center justify-center">

              {/* Anillos orbitales externos */}
              <div
                className="absolute rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite]"
                style={{ width: 280, height: 280 }}
              />
              <div
                className="absolute rounded-full border border-violet-500/30 animate-[spin_20s_linear_infinite]"
                style={{ width: 240, height: 240 }}
              />
              <div
                className="absolute rounded-full border border-violet-400/20 animate-[spin_15s_linear_infinite_reverse]"
                style={{ width: 200, height: 200 }}
              />

              {/* Destellos de luz detrás de la esfera */}
              <div className="absolute h-[160px] w-[160px] rounded-full bg-cyan-500/20 blur-[45px] -translate-x-8" />
              <div className="absolute h-[160px] w-[160px] rounded-full bg-violet-600/30 blur-[45px] translate-x-8" />

              {/* Anillo de pulso */}
              <span
                className="absolute rounded-full border border-cyan-400/40 animate-ping"
                style={{ width: 140, height: 140, animationDuration: '3s' }}
              />

              {/* Anillo circular de luz en los bordes de la esfera */}
              <div className="absolute h-[134px] w-[134px] rounded-full bg-gradient-to-r from-cyan-400 via-transparent to-violet-500 opacity-40 blur-[3px]" />

              {/* Círculo Bruno: estilo "Cyber Orb" etéreo e integrado */}
              <div
                ref={sphereRef}
                className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#070916] z-10"
                style={{ boxShadow: 'inset 0 0 50px 0 rgba(139,92,246,0.3), 0 0 30px 4px rgba(34,211,238,0.2)' }}
              >
                {/* Glow outlines on left and right for sphere depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_16px_0_24px_-8px_rgba(34,211,238,0.5)]" />
                <div className="absolute inset-0 rounded-full border border-white/5" />
                <div className="absolute inset-0 rounded-full shadow-[inset_-16px_0_24px_-8px_rgba(139,92,246,0.5)]" />

                <span className="relative text-xl font-black tracking-[0.3em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                  BRUNO
                </span>
              </div>

              {/* Removed Texto Procesando as requested */}
            </div>
          </div>
        </div>

        {/* RIGHT: tickets */}
        <div className="flex flex-col gap-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 px-2 text-right">Panel del administrador</p>
          {TICKETS.map((ticket, i) => (
            <div key={i} ref={el => { ticketRefs.current[i] = el; }}>
              <div
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#101025]/80 backdrop-blur-md px-5 py-3.5 transition-all duration-500 hover:border-violet-500/40 hover:bg-[#151535] shadow-lg"
                style={{
                  width: 230,
                  opacity: visibleTickets.includes(i) ? 1 : 0,
                  transform: visibleTickets.includes(i) ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white/90 transition-colors">{ticket.unit}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{ticket.issue}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-sm"
                    style={{
                      color: ticket.color,
                      background: `${ticket.color}15`,
                      border: `1px solid ${ticket.color}40`,
                    }}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer label removed */}
    </div>
  );
}
