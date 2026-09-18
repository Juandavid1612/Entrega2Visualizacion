import { useEffect, useRef, useState } from "react";
import { formatNumber } from "../utils/format";

/**
 * Folio de region: nombre, capital, superficie y poblacion.
 * La poblacion cuenta hacia arriba una sola vez al aparecer en pantalla,
 * como un unico momento de animacion orquestado (no hay mas movimiento en la pagina).
 */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function StatCard({ region, color, capital, area, population, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion() ? population ?? 0 : 0
  );
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || !population) {
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 900;
          const start = performance.now() + delay;

          function tick(now) {
            const elapsed = now - start;
            if (elapsed < 0) {
              requestAnimationFrame(tick);
              return;
            }
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(population * eased));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [population, delay]);

  return (
    <div
      ref={ref}
      className="bg-[var(--color-paper-deep)]/60 border border-[var(--color-line)] p-6 flex flex-col gap-4"
      style={{ borderTopWidth: "3px", borderTopColor: color }}
    >
      <div>
        <h3 className="font-display font-semibold text-2xl text-[var(--color-ink)]">
          {region}
        </h3>
        <p className="font-body text-sm text-[var(--color-ink-muted)] mt-1">
          Capital: {capital}
        </p>
      </div>

      <div>
        <p className="font-display text-4xl font-medium text-[var(--color-ink)] tabular-nums">
          {formatNumber(displayValue)}
        </p>
        <p className="font-body text-sm text-[var(--color-ink-muted)] mt-1">
          habitantes registrados
        </p>
      </div>

      <p className="font-body text-sm text-[var(--color-ink-muted)] mt-auto pt-2 border-t border-[var(--color-line)]">
        {formatNumber(area)} km² de superficie
      </p>
    </div>
  );
}