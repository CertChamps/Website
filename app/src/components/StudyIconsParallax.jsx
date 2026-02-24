import { useState, useEffect } from 'react';
import {
  FunctionSquare,
  Percent,
  Radical,
  Plus,
  Sigma,
  Triangle,
  Ruler,
  Calculator,
  Divide,
  PencilRuler,
} from 'lucide-react';

const CENTER_WIDTH_PX = 1200;
const PARALLAX_FACTOR = 0.28;
const LAYER_HEIGHT_VH = 920;

// Math/symbol icons. xOffsetPx = horizontal shift from boundary (varied for random feel). position: 'edge' = partially clipped.
// edgePeek = how much visible (0–1); lower = more off-screen.
const studyIcons = [
  { Icon: FunctionSquare, size: 68, side: 'left', topVh: 3, position: 'edge', rotation: -12, edgePeek: 0.38 },
  { Icon: Percent, size: 38, side: 'left', topVh: 28, position: 'side', rotation: 6, xOffsetPx: 12 },
  { Icon: Radical, size: 42, side: 'left', topVh: 55, position: 'side', rotation: -4, xOffsetPx: 78 },
  { Icon: Sigma, size: 62, side: 'left', topVh: 18, position: 'edge', rotation: 8, edgePeek: 0.42 },
  { Icon: Triangle, size: 66, side: 'right', topVh: 6, position: 'edge', rotation: 14, edgePeek: 0.35 },
  { Icon: Divide, size: 46, side: 'right', topVh: 42, position: 'side', rotation: -8, xOffsetPx: 95 },
  { Icon: Ruler, size: 36, side: 'right', topVh: 72, position: 'side', rotation: 3, xOffsetPx: 8 },
  { Icon: Sigma, size: 64, side: 'left', topVh: 95, position: 'edge', rotation: -18, edgePeek: 0.4 },
  { Icon: Plus, size: 44, side: 'left', topVh: 128, position: 'side', rotation: 10, xOffsetPx: 52 },
  { Icon: FunctionSquare, size: 64, side: 'right', topVh: 88, position: 'edge', rotation: -10, edgePeek: 0.36 },
  { Icon: Percent, size: 36, side: 'right', topVh: 155, position: 'side', rotation: 5, xOffsetPx: 28 },
  { Icon: Calculator, size: 50, side: 'right', topVh: 118, position: 'side', rotation: -6, xOffsetPx: 62 },
  { Icon: Plus, size: 40, side: 'left', topVh: 168, position: 'side', rotation: -7, xOffsetPx: 0 },
  { Icon: Ruler, size: 40, side: 'right', topVh: 198, position: 'side', rotation: 12, xOffsetPx: 115 },
  { Icon: Radical, size: 46, side: 'right', topVh: 235, position: 'side', rotation: -9, xOffsetPx: 45 },
  { Icon: Calculator, size: 54, side: 'left', topVh: 205, position: 'edge', rotation: 8, edgePeek: 0.45 },
  { Icon: Triangle, size: 56, side: 'right', topVh: 268, position: 'side', rotation: -14, xOffsetPx: 18 },
  { Icon: Sigma, size: 58, side: 'left', topVh: 258, position: 'side', rotation: 6, xOffsetPx: 88 },
  { Icon: FunctionSquare, size: 54, side: 'right', topVh: 318, position: 'edge', rotation: -11, edgePeek: 0.33 },
  { Icon: Percent, size: 42, side: 'left', topVh: 305, position: 'side', rotation: 4, xOffsetPx: 35 },
  { Icon: PencilRuler, size: 50, side: 'right', topVh: 358, position: 'side', rotation: 7, xOffsetPx: 72 },
  { Icon: Plus, size: 46, side: 'left', topVh: 378, position: 'edge', rotation: -5, edgePeek: 0.4 },
  { Icon: Ruler, size: 44, side: 'right', topVh: 398, position: 'side', rotation: -8, xOffsetPx: 5 },
  { Icon: Radical, size: 48, side: 'left', topVh: 435, position: 'side', rotation: 9, xOffsetPx: 102 },
  { Icon: Triangle, size: 52, side: 'right', topVh: 428, position: 'edge', rotation: 12, edgePeek: 0.38 },
  { Icon: Sigma, size: 56, side: 'left', topVh: 478, position: 'side', rotation: -6, xOffsetPx: 58 },
  { Icon: Calculator, size: 44, side: 'right', topVh: 458, position: 'side', rotation: 3, xOffsetPx: 38 },
  { Icon: FunctionSquare, size: 58, side: 'right', topVh: 518, position: 'edge', rotation: -9, edgePeek: 0.35 },
  { Icon: Percent, size: 38, side: 'left', topVh: 528, position: 'side', rotation: 11, xOffsetPx: 22 },
  // ——— many more with varied x ———
  { Icon: Plus, size: 42, side: 'left', topVh: 8, position: 'side', rotation: -11, xOffsetPx: 65 },
  { Icon: Ruler, size: 34, side: 'right', topVh: 22, position: 'side', rotation: 7, xOffsetPx: 82 },
  { Icon: Calculator, size: 48, side: 'left', topVh: 38, position: 'side', rotation: 4, xOffsetPx: 18 },
  { Icon: Sigma, size: 52, side: 'right', topVh: 58, position: 'side', rotation: -13, xOffsetPx: 48 },
  { Icon: Triangle, size: 58, side: 'left', topVh: 72, position: 'side', rotation: 9, xOffsetPx: 92 },
  { Icon: Percent, size: 40, side: 'right', topVh: 98, position: 'side', rotation: -5, xOffsetPx: 12 },
  { Icon: Radical, size: 44, side: 'left', topVh: 112, position: 'side', rotation: 14, xOffsetPx: 42 },
  { Icon: Divide, size: 38, side: 'right', topVh: 138, position: 'side', rotation: 2, xOffsetPx: 68 },
  { Icon: FunctionSquare, size: 60, side: 'left', topVh: 148, position: 'edge', rotation: -8, edgePeek: 0.4 },
  { Icon: PencilRuler, size: 46, side: 'right', topVh: 178, position: 'side', rotation: -10, xOffsetPx: 25 },
  { Icon: Plus, size: 36, side: 'left', topVh: 192, position: 'side', rotation: 6, xOffsetPx: 108 },
  { Icon: Ruler, size: 48, side: 'right', topVh: 218, position: 'side', rotation: -7, xOffsetPx: 55 },
  { Icon: Sigma, size: 54, side: 'left', topVh: 242, position: 'side', rotation: 3, xOffsetPx: 8 },
  { Icon: Calculator, size: 42, side: 'right', topVh: 255, position: 'side', rotation: 11, xOffsetPx: 88 },
  { Icon: Triangle, size: 50, side: 'left', topVh: 278, position: 'edge', rotation: -15, edgePeek: 0.42 },
  { Icon: Percent, size: 44, side: 'right', topVh: 298, position: 'side', rotation: -4, xOffsetPx: 35 },
  { Icon: Radical, size: 40, side: 'left', topVh: 325, position: 'side', rotation: 8, xOffsetPx: 72 },
  { Icon: Plus, size: 50, side: 'right', topVh: 348, position: 'side', rotation: -9, xOffsetPx: 15 },
  { Icon: FunctionSquare, size: 56, side: 'left', topVh: 368, position: 'side', rotation: 5, xOffsetPx: 98 },
  { Icon: Ruler, size: 38, side: 'right', topVh: 388, position: 'side', rotation: -12, xOffsetPx: 42 },
  { Icon: Sigma, size: 50, side: 'left', topVh: 412, position: 'edge', rotation: 10, edgePeek: 0.36 },
  { Icon: Divide, size: 44, side: 'right', topVh: 438, position: 'side', rotation: -3, xOffsetPx: 75 },
  { Icon: Calculator, size: 52, side: 'left', topVh: 458, position: 'side', rotation: 7, xOffsetPx: 28 },
  { Icon: PencilRuler, size: 48, side: 'right', topVh: 478, position: 'side', rotation: -6, xOffsetPx: 58 },
  { Icon: Percent, size: 36, side: 'left', topVh: 498, position: 'side', rotation: 13, xOffsetPx: 85 },
  { Icon: Triangle, size: 54, side: 'right', topVh: 515, position: 'edge', rotation: -8, edgePeek: 0.38 },
  { Icon: Radical, size: 46, side: 'left', topVh: 545, position: 'side', rotation: 2, xOffsetPx: 52 },
  { Icon: Plus, size: 42, side: 'right', topVh: 562, position: 'side', rotation: -14, xOffsetPx: 22 },
  { Icon: Sigma, size: 58, side: 'left', topVh: 585, position: 'side', rotation: 9, xOffsetPx: 0 },
  { Icon: Ruler, size: 40, side: 'right', topVh: 608, position: 'side', rotation: 4, xOffsetPx: 95 },
  { Icon: FunctionSquare, size: 52, side: 'left', topVh: 632, position: 'side', rotation: -6, xOffsetPx: 38 },
  { Icon: Calculator, size: 46, side: 'right', topVh: 648, position: 'side', rotation: 11, xOffsetPx: 65 },
  { Icon: Percent, size: 38, side: 'left', topVh: 672, position: 'side', rotation: -7, xOffsetPx: 112 },
  { Icon: Triangle, size: 48, side: 'right', topVh: 688, position: 'side', rotation: 5, xOffsetPx: 18 },
  { Icon: PencilRuler, size: 44, side: 'left', topVh: 712, position: 'side', rotation: -10, xOffsetPx: 78 },
  { Icon: Divide, size: 40, side: 'right', topVh: 728, position: 'side', rotation: 8, xOffsetPx: 48 },
  { Icon: Radical, size: 42, side: 'left', topVh: 752, position: 'side', rotation: -3, xOffsetPx: 32 },
  { Icon: Plus, size: 48, side: 'right', topVh: 768, position: 'side', rotation: 6, xOffsetPx: 88 },
  { Icon: Sigma, size: 56, side: 'left', topVh: 792, position: 'edge', rotation: -12, edgePeek: 0.4 },
  { Icon: Ruler, size: 36, side: 'right', topVh: 808, position: 'side', rotation: -9, xOffsetPx: 8 },
  { Icon: FunctionSquare, size: 54, side: 'right', topVh: 828, position: 'side', rotation: 10, xOffsetPx: 62 },
  { Icon: Percent, size: 40, side: 'left', topVh: 848, position: 'side', rotation: -5, xOffsetPx: 45 },
  { Icon: Calculator, size: 50, side: 'right', topVh: 868, position: 'side', rotation: 3, xOffsetPx: 28 },
];

// Slight blur for depth; kept mild (lower cap, larger divisor)
function blurForSize(size) {
  return Math.min(4, Math.round(size / 23));
}

export default function StudyIconsParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY ?? document.documentElement.scrollTop);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const translateY = -scrollY * PARALLAX_FACTOR;
  const centerEdge = CENTER_WIDTH_PX / 2;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden
    >
      <div
        className="absolute left-0 w-full will-change-transform"
        style={{
          height: `${LAYER_HEIGHT_VH}vh`,
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
      >
        {studyIcons.map((item, i) => {
          const blur = blurForSize(item.size);
          const isLeft = item.side === 'left';
          const isEdge = item.position === 'edge';
          const xOff = item.xOffsetPx ?? 0;
          const peek = item.edgePeek ?? 0.35;
          let left;
          let transform;
          if (isLeft) {
            if (isEdge) {
              left = 0;
              transform = `translate(-${(1 - peek) * 100}%, -50%) rotate(${item.rotation}deg)`;
            } else {
              left = `max(0px, calc(50% - ${centerEdge}px - ${item.size}px - ${xOff}px))`;
              transform = `translate(-50%, -50%) rotate(${item.rotation}deg)`;
            }
          } else {
            if (isEdge) {
              left = '100%';
              transform = `translate(-${peek * 100}%, -50%) rotate(${item.rotation}deg)`;
            } else {
              left = `calc(50% + ${centerEdge}px + ${xOff}px)`;
              transform = `translate(0, -50%) rotate(${item.rotation}deg)`;
            }
          }
          return (
            <div
              key={i}
              className="absolute text-black/45"
              style={{
                left,
                transform,
                top: `${item.topVh}vh`,
                width: item.size,
                height: item.size,
                filter: `blur(${blur}px)`,
              }}
            >
              <item.Icon
                className="w-full h-full"
                size={item.size}
                strokeWidth={1.8}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
