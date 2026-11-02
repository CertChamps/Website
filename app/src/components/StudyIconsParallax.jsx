import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  FunctionSquare,
  Percent,
  Radical,
  Plus,
  Sigma,
  Triangle,
  Ruler,
  Divide,
} from 'lucide-react';

const CENTER_WIDTH_PX = 1280;
const PARALLAX_FACTOR = 0.14;

// Keep the symbols around the outer edges so the app preview stays clear.
const studyIcons = [
  { Icon: Sigma, size: 40, side: 'left', topVh: 14, edgePeek: 0.62, rotation: -8 },
  { Icon: Triangle, size: 38, side: 'right', topVh: 22, edgePeek: 0.62, rotation: 8 },
  { Icon: Percent, size: 32, side: 'left', topVh: 37, offset: 140, rotation: 5 },
  { Icon: Radical, size: 34, side: 'right', topVh: 48, offset: 28, rotation: -7 },
  { Icon: FunctionSquare, size: 36, side: 'left', topVh: 64, edgePeek: 0.58, rotation: 7 },
  { Icon: Divide, size: 34, side: 'right', topVh: 77, edgePeek: 0.6, rotation: -6 },
  { Icon: Plus, size: 32, side: 'left', topVh: 95, offset: 48, rotation: -8 },
  { Icon: Ruler, size: 36, side: 'right', topVh: 112, offset: 24, rotation: 6 },
];

export default function StudyIconsParallax() {
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY ?? document.documentElement.scrollTop);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0 h-[130vh]"
        style={{ transform: `translate3d(0, ${reducedMotion ? 0 : -scrollY * PARALLAX_FACTOR}px, 0)` }}
      >
        {studyIcons.map((item, index) => {
          const isLeft = item.side === 'left';
          const isEdge = item.edgePeek !== undefined;
          const left = isEdge
            ? isLeft ? '0' : '100%'
            : isLeft
              ? `max(0px, calc(50% - ${CENTER_WIDTH_PX / 2}px - ${item.size + item.offset}px))`
              : `calc(50% + ${CENTER_WIDTH_PX / 2}px + ${item.offset}px)`;
          const translateX = isEdge
            ? isLeft ? -(1 - item.edgePeek) * 100 : -item.edgePeek * 100
            : isLeft ? -50 : 0;

          return (
            <div
              key={`${item.side}-${item.topVh}`}
              className="absolute text-black/20"
              style={{
                top: `${item.topVh}vh`,
                left,
                width: item.size,
                height: item.size,
                transform: `translate(${translateX}%, -50%) rotate(${item.rotation}deg)`,
              }}
            >
              <div
                className="study-icon-drift h-full w-full"
                style={{ animationDelay: `${-index * 1.3}s`, animationDuration: `${9 + (index % 3) * 2}s` }}
              >
                <item.Icon className="h-full w-full" strokeWidth={1.7} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
