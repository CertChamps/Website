import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import ExamPaperCard from './ExamPaperCard'

// Isometric angle
const STACK_TILT_Z = 10
const STACK_SKEW_X = -15

// Fixed offset between each card in the stack (creates the layered look)
const BASE_OFFSET_X = 24
const BASE_OFFSET_Y = 20

// Spread between cards
const DEFAULT_SPREAD = 28
const HOVER_SPREAD = 38

/**
 * Isometric stack of exam paper cards.
 * Two states: default spread, and slightly increased spread on hover.
 */
export default function ExamPaperCardStack({ cards }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMouse({ x: 0.5, y: 0.5 })
  }, [])

  const spreadAmount = isHovered ? HOVER_SPREAD : DEFAULT_SPREAD
  const centerIndex = (cards.length - 1) / 2

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[340px] w-full max-w-lg select-none"
      style={{ padding: '40px 60px 60px 40px' }}
    >
      {cards.map((card, index) => {
        // Direction from center: negative = toward top, positive = toward bottom
        const direction = index - centerIndex

        // Spread from center
        const spreadY = direction * spreadAmount
        const spreadX = direction * (spreadAmount * 0.15)

        // Base offset creates the stacked/layered look
        const baseX = index * BASE_OFFSET_X
        const baseY = index * BASE_OFFSET_Y

        // Z-index: lower index = front (top of stack visually)
        const zIndex = cards.length - index

        return (
          <motion.div
            key={card.id ?? index}
            className="absolute left-0 top-0 w-full"
            style={{
              zIndex,
              transformOrigin: 'center center',
            }}
            initial={false}
            animate={{
              x: baseX + spreadX,
              y: baseY + spreadY,
              rotateZ: STACK_TILT_Z,
              skewX: STACK_SKEW_X,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <ExamPaperCard
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              questionCount={card.questionCount}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
