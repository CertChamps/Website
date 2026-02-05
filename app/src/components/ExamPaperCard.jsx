import { useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

const CROWN_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden>
    <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" />
  </svg>
)

const CROWN_SMALL = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
    <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" />
  </svg>
)

/**
 * Single exam paper card with golden border. Border uses a conic gradient
 * that follows mouse position (mx, my in 0–1) for a “glow” effect.
 */
export default function ExamPaperCard({
  title,
  subtitle = 'CertChamps',
  description,
  questionCount,
  mouseX = 0.5,
  mouseY = 0.5,
  style,
  className = '',
  ...props
}) {
  const cardRef = useRef(null)

  // Conic gradient centered at mouse: gold highlight follows cursor
  const borderGradient = useMemo(() => {
    const deg = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI) + 90
    return `conic-gradient(from ${deg}deg at ${mouseX * 100}% ${mouseY * 100}%, #f9a216 0deg, #ffda9f 90deg, #f9a216 180deg, #ffda9f 270deg, #f9a216 360deg)`
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full max-w-lg aspect-[3.6/2] rounded-2xl p-[2px] shadow-lg ${className}`}
      style={{
        background: borderGradient,
        ...style,
      }}
      {...props}
    >
      <div
        className="relative flex h-full items-center gap-4 rounded-[calc(1rem+2px)] px-6 py-5"
        style={{
          background: 'linear-gradient(to bottom, #fef9f0 0%, #fdf6eb 50%, #faf3e8 100%)',
        }}
      >
        {/* Top-right decorative crown */}
        <div className="absolute right-4 top-4 text-gold" aria-hidden>
          {CROWN_SMALL}
        </div>

        {/* Left: circular logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue text-gold">
          {CROWN_ICON}
        </div>

        {/* Middle: title, subtitle, description */}
        <div className="min-w-0 flex-1 pr-6">
          <h3 className="text-lg font-bold text-blue">{title}</h3>
          <p className="text-sm text-gold">{subtitle}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Right: question count */}
        <div className="shrink-0 text-sm text-muted-foreground">
          {questionCount} questions
        </div>
      </div>
    </motion.div>
  )
}
