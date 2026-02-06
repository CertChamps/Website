import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import TimeLine_01 from '@/components/ui/release-time-line'
import ExamPaperCardStack from './components/ExamPaperCardStack'
import integralIcon from './assets/math-icons/icons8-integral-100 1.png'
import mathIcon from './assets/math-icons/icons8-math-100 1.png'
import multiplyIcon from './assets/math-icons/icons8-multiply-96.png'
import piIcon from './assets/math-icons/icons8-pi-52.png'
import sigmaIcon from './assets/math-icons/icons8-sigma-52.png'
import trigIcon from './assets/math-icons/icons8-trigonometry-96-1.png'
import infinityIcon from './assets/math-icons/icons8-infinity-96-1.png'
import calculatorIcon from './assets/math-icons/icons8-calculator-96 1.png'
import lengthIcon from './assets/math-icons/icons8-length-96 1.png'
import moreOrEqualIcon from './assets/math-icons/icons8-more-or-equal-90 1.png'
import percentageIcon from './assets/math-icons/icons8-percentage-96-1.png'
import logo from './assets/logo.png'
import promo_vid from './assets/promo_vid.mp4'

const CROWN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gold shrink-0">
    <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" />
  </svg>
)

const SMALL_CROWN = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gold inline-block align-middle -ml-0.5">
    <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" />
  </svg>
)

// Sparse particle list. Each spawns off-screen and drifts ~75% toward the center before fading out.
const PARTICLES = [
  { src: infinityIcon, size: 110, blur: 4, rotation: 25, start: { x: -0.7, y: -0.6 }, duration: 4, delay: 0.2, repeatDelay: 0.8 },
  { src: mathIcon, size: 96, blur: 2, rotation: -10, start: { x: 0.0, y: -0.85 }, duration: 3, delay: 1.1, repeatDelay: 0.7 },
  { src: trigIcon, size: 98, blur: 2, rotation: 18, start: { x: 0.7, y: -0.6 }, duration:   5, delay: 0.6, repeatDelay: 0.9 },
  { src: percentageIcon, size: 90, blur: 2, rotation: 12, start: { x: -0.85, y: -0.1 }, duration: 2, delay: 1.9, repeatDelay: 0.7 },
  { src: sigmaIcon, size: 92, blur: 3, rotation: -14, start: { x: -0.7, y: 0.55 }, duration: 4, delay: 2.9, repeatDelay: 0.9 },
  { src: calculatorIcon, size: 94, blur: 2, rotation: 0, start: { x: 0.85, y: 0.1 }, duration: 2, delay: 2.5, repeatDelay: 0.7 },
  { src: lengthIcon, size: 92, blur: 3, rotation: -8, start: { x: 0.7, y: 0.75 }, duration: 5, delay: 3.8, repeatDelay: 1.0 },
  { src: moreOrEqualIcon, size: 100, blur: 3, rotation: -20, start: { x: 0.9, y: -0.2 }, duration: 3, delay: 1.6, repeatDelay: 0.8 },
  { src: multiplyIcon, size: 104, blur: 2, rotation: 35, start: { x: -0.6, y: 0.9 }, duration: 4, delay: 3.2, repeatDelay: 0.9 },
  { src: piIcon, size: 88, blur: 2, rotation: 6, start: { x: 0.0, y: 0.95 }, duration: 12, delay: 4.2, repeatDelay: 1.0 },
  { src: integralIcon, size: 108, blur: 4, rotation: -18, start: { x: 0.6, y: 0.85 }, duration: 16, delay: 4.8, repeatDelay: 1.1 },
  { src: infinityIcon, size: 96, blur: 3, rotation: -10, start: { x: -0.9, y: 0.2 }, duration: 13, delay: 5.3, repeatDelay: 0.9 },
]

const GRID_TILE = 64

// ============================================================
// CUSTOMISE SECTION – App theme presets
// Edit or add entries here. Each object controls the themed
// (right) half of the diagonal preview.
// ============================================================
const APP_THEMES = [
  {
    id: 'dark',
    name: 'Dark',
    bg: '#2B3544',
    cardBg: '#364152',
    cardBorder: '#445064',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    accent: '#f9a216',
    buttonBg: '#f9a216',
    buttonText: '#1E2530',
    shimmer: 'rgba(255,255,255,0.07)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    bg: '#0C1929',
    cardBg: '#132B43',
    cardBorder: '#1C3D5A',
    text: '#E0F2FE',
    textMuted: '#7DD3FC',
    accent: '#38BDF8',
    buttonBg: '#0EA5E9',
    buttonText: '#0C1929',
    shimmer: 'rgba(255,255,255,0.06)',
  },
  {
    id: 'berry',
    name: 'Berry',
    bg: '#1C1028',
    cardBg: '#291740',
    cardBorder: '#3B2358',
    text: '#F5F0FF',
    textMuted: '#C4B5FD',
    accent: '#A855F7',
    buttonBg: '#A855F7',
    buttonText: '#1C1028',
    shimmer: 'rgba(255,255,255,0.06)',
  },
]

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1920, h: typeof window !== 'undefined' ? window.innerHeight : 1080 })
  const [scrollY, setScrollY] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const containerRef = useRef(null)
  const particleLayerRef = useRef(null)
  const videoSectionRef = useRef(null)
  const customiseSectionRef = useRef(null)
  const themeOverlayRef = useRef(null)
  const whatsNewRef = useRef(null)
  const sectionDarkRefs = useRef([])
  const themeActiveRef = useRef(false)
  const [selectedTheme, setSelectedTheme] = useState(APP_THEMES[0])
  const [themeActive, setThemeActive] = useState(false)

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const particles = useMemo(() => {
    const vw = viewport.w
    const vh = viewport.h
    return PARTICLES.map((particle) => ({
      ...particle,
      startX: particle.start.x * vw,
      startY: particle.start.y * vh,
      endX: particle.start.x * vw * 0.25,
      endY: particle.start.y * vh * 0.25,
    }))
  }, [viewport.w, viewport.h])

  // Parallax: shift entire particle layer based on scroll of the inner container.
  useEffect(() => {
    const container = containerRef.current
    const layer = particleLayerRef.current
    if (!container || !layer) return
    const onScroll = () => {
      const sy = container.scrollTop
      setScrollY(sy)
      layer.style.top = `${-sy * 0.18}px`
      const section = videoSectionRef.current
      if (section) {
        const vh = window.innerHeight
        const rect = section.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / rect.height))
        setVideoProgress(progress)
      }
      // Scroll-driven diagonal sweep
      const customise = customiseSectionRef.current
      if (customise) {
        const cRect = customise.getBoundingClientRect()
        const vh = window.innerHeight
        // Fast sweep — completes within 40% of one viewport-height of scroll
        const p = Math.min(1, Math.max(0, (vh - cRect.top) / (vh * 0.4)))
        // Steep diagonal — ~22% horizontal gap at mid-sweep
        const topX = 120 - 155 * p
        const bottomX = 165 - 200 * p

        // Fixed overlay (background + navbar) — viewport-relative clip
        const vClip = `polygon(${topX}% 0%, 100% 0%, 100% 100%, ${bottomX}% 100%)`
        if (themeOverlayRef.current) themeOverlayRef.current.style.clipPath = vClip

        // Per-section dark content overlays — section-relative clip
        const sectionEls = [whatsNewRef.current, customise]
        sectionEls.forEach((sec, i) => {
          const dark = sectionDarkRefs.current[i]
          if (!sec || !dark) return
          const r = sec.getBoundingClientRect()
          const sT = (-r.top / r.height) * 100
          const sB = ((vh - r.top) / r.height) * 100
          dark.style.clipPath = `polygon(${topX}% ${sT}%, 100% ${sT}%, 100% ${sB}%, ${bottomX}% ${sB}%)`
        })

        // Flip global theme once sweep covers the screen
        const shouldBeActive = p > 0.85
        if (shouldBeActive !== themeActiveRef.current) {
          themeActiveRef.current = shouldBeActive
          setThemeActive(shouldBeActive)
        }
      }
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMouse({ x, y })
  }, [])

  const champGradient = useMemo(() => {
    return `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #FFDA9F 0%, #FFAE2B 100%)`
  }, [mouse.x, mouse.y])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="h-screen overflow-y-auto overflow-x-hidden relative transition-colors duration-700"
      style={{ backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}
    >

              {/* Nav – fixed to top of viewport for entire scroll */}
        <motion.nav
          className="flex items-center justify-between px-6 md:px-12 py-2.5 shrink-0 fixed top-0 left-0 right-0 z-50 transition-colors duration-700"
          style={{ backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}
          initial={{ filter: 'blur(12px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <a href="/" className="flex items-center gap-2 flex-1 min-w-0">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain transition-all duration-700" style={{ filter: themeActive ? 'brightness(10)' : 'none' }} />
            <span className="text-xl font-bold">
              <span className="transition-colors duration-700" style={{ color: themeActive ? selectedTheme.text : '#000' }}>Cert</span>
              <span className="transition-colors duration-700" style={{ color: themeActive ? selectedTheme.accent : '#f9a216' }}>Champs</span>
            </span>
          </a>
          <div className="flex items-center justify-center gap-8 flex-1 min-w-0">
            <a href="#about" className="text-sm md:text-base transition-colors duration-700" style={{ color: themeActive ? selectedTheme.textMuted : '#000' }}>about us</a>
            <a href="#pricing" className="text-sm md:text-base transition-colors duration-700" style={{ color: themeActive ? selectedTheme.textMuted : '#000' }}>pricing</a>
            <a href="#contact" className="text-sm md:text-base transition-colors duration-700" style={{ color: themeActive ? selectedTheme.textMuted : '#000' }}>contact</a>
          </div>
          <div className="flex justify-end flex-1 min-w-0">
            <button
              type="button"
              className="rounded-lg px-5 py-2.5 font-semibold text-sm md:text-base transition-all duration-700 hover:opacity-90"
              style={{
                backgroundColor: themeActive ? `${selectedTheme.accent}1A` : 'rgba(24, 81, 150, 0.1)',
                color: themeActive ? selectedTheme.accent : undefined,
              }}
            >
              Log In
            </button>
          </div>
        </motion.nav>
      {/* 3D perspective grid – train tracks style, vanishing point in center, hole for hero */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute transition-opacity duration-700"
          style={{
            opacity: themeActive ? 0.08 : 0.35,
            width: '280vmin',
            height: '280vmin',
            left: '50%',
            top: '50%',
            marginLeft: '-140vmin',
            marginTop: '-140vmin',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(58deg) rotateZ(0deg)',
            backgroundImage: `
              linear-gradient(to right, #d4d4d4 1px, transparent 1px),
              linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
            WebkitMaskImage: 'radial-gradient(ellipse 45% 40% at 50% 50%, transparent 0%, transparent 30%, black 45%)',
            maskImage: 'radial-gradient(ellipse 45% 40% at 50% 50%, transparent 0%, transparent 30%, black 45%)',
          }}
        />
      </div>

      {/* Particle icons – spawn off-screen, drift to center, fade out. */}
      <div ref={particleLayerRef} className="fixed inset-0 z-10 pointer-events-none overflow-hidden transition-opacity duration-700" style={{ opacity: themeActive ? 0.15 : 1 }}>
        {particles.map((particle, i) => {
          const rotation = particle.rotation ?? 0
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: particle.size, height: particle.size }}
            >
              <motion.div
                className="w-full h-full will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  filter: `blur(${particle.blur ?? 0}px)`,
                }}
                initial={{
                  x: particle.startX,
                  y: particle.startY,
                  scale: 0.85,
                  opacity: 0,
                  rotateZ: rotation,
                }}
                animate={{
                  x: particle.endX,
                  y: particle.endY,
                  scale: [0.85, 1, 0.95],
                  opacity: [0, 1, 0],
                  rotateZ: rotation,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.6, 1],
                  repeat: Infinity,
                  repeatDelay: particle.repeatDelay,
                }}
              >
                <img
                  src={particle.src}
                  alt=""
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Hero – exactly one viewport height so it fills the first screen */}
      <div className="relative z-10 flex flex-col h-screen">
{/* 
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-radial from-white/0 via-white/70 to-white">  
        </div> */}


        {/* Hero content – flex-1 fills remaining space */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center min-h-0">
          <motion.h1
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight max-w-4xl"
            initial={{ filter: 'blur(14px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="text-black block">Practice Maths</span>
            <span className="relative inline-block -mt-2">
              <span
                className="bg-clip-text text-transparent select-none sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ backgroundImage: champGradient, backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
              >
                Like a Champ
              </span>
              <svg
                viewBox="0 0 220 30"
                className="absolute -bottom-[0.2em] right-0 w-[55%] h-[0.5em] text-black/50 pointer-events-none"
                style={{ transform: 'translateY(10%) scaleY(-0.5)' }}
              >
                <motion.path
                  d="M 10 10 Q 110 25 210 10 Q 160 30 20 20 Q 120 35 200 25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </span>
          </motion.h1>
          <motion.p
            className="text-black/80 mt-4 max-w-xl text-base md:text-lg leading-relaxed"
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            Join thousands of Leaving Cert students in the new maths experience designed to make your life as easy as possible.
          </motion.p>
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
          >
            <button
              type="button"
              className="mt-8 rounded-lg px-10 py-2 text-blue font-semibold text-base transition-opacity hover:opacity-75 cursor-pointer"
              style={{ backgroundColor: 'rgba(24, 81, 150, 0.1)' }}
            >
              Get Started
            </button>
          </motion.div>
        </main>
      </div>

      {/* Video section – "See..." + video zoom together */}
      <section
        ref={videoSectionRef}
        id="video"
        className="relative z-11 mt-12 transition-colors duration-700"
        style={{ height: '200vh', backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}
      >
        {/* top = navbar height + space so content stays visible below the fixed nav */}
        <div
          className="sticky w-full flex items-center justify-center  px-4"
          style={{ top: 'calc(15vh)', height: 'calc(78vh - 4rem)' }}
        >
          {(() => {
            const easeProgress = 1 - (1 - videoProgress) ** 1.5
            const scale = 2.4 - 1.4 * easeProgress
            const translateY = (1 - easeProgress) * 22
            return (
              <div
                className="absolute flex flex-col items-center justify-center will-change-transform"
                style={{
                  transform: `scale(${scale}) translateY(${translateY}%)`,
                  transformOrigin: 'center center',
                }}
              >
                <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight shrink-0 pb-4 md:pb-6 transition-colors duration-700" style={{ color: themeActive ? selectedTheme.text : '#000' }}>
                  See what CertChamps is all about
                </h2>
                <div
                  className="w-[90vw] max-w-5xl rounded-2xl overflow-hidden border-12 border-[#626c790c] shadow-2xl shadow-black/5"
                  style={{ aspectRatio: '16/9' }}
                >
                  <video src={promo_vid} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                </div>
              </div>
            )
          })()}
        </div>
      </section>


      {/* What's new – release timeline */}
      <section ref={whatsNewRef} id="whats-new" className="relative z-10 transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}>
        <TimeLine_01 themeActive={themeActive} theme={selectedTheme} />

        {/* Dark overlay — clip-path reveals themed content behind the diagonal */}
        <div
          ref={el => { sectionDarkRefs.current[0] = el; if (el && !el.style.clipPath) el.style.clipPath = 'polygon(120% 0%, 100% 0%, 100% 100%, 165% 100%)' }}
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
          style={{ backgroundColor: selectedTheme.bg }}
        >
          <TimeLine_01 themeActive={true} theme={selectedTheme} />
        </div>
      </section>

      {/* ===== Customise CertChamps ===== */}
      <section
        ref={customiseSectionRef}
        id="customise"
        className="relative z-10 transition-colors duration-700"
        style={{ backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}
      >
        <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl tracking-tight transition-colors duration-700" style={{ color: themeActive ? selectedTheme.text : '#000' }}>
            Customise{' '}
            <span className="transition-colors duration-700" style={{ color: themeActive ? selectedTheme.accent : '#f9a216' }}>CertChamps</span>
            {' '}how you like
          </h2>
          <p className="mt-4 max-w-md text-center text-base md:text-lg transition-colors duration-700" style={{ color: themeActive ? selectedTheme.textMuted : 'rgba(0,0,0,0.55)' }}>
            Pick a theme that suits your style. Study your way with a look that feels right.
          </p>

          {/* App preview card */}
          <div
            className="mt-10 md:mt-14 w-[300px] sm:w-[360px] rounded-2xl overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: themeActive ? selectedTheme.cardBg : '#ffffff',
              border: `1px solid ${themeActive ? selectedTheme.cardBorder : '#e4e4e7'}`,
              boxShadow: themeActive ? '0 25px 50px -12px rgba(0,0,0,0.25)' : '0 20px 25px -5px rgba(0,0,0,0.06)',
            }}
          >
            <div className="px-4 py-3 flex items-center transition-colors duration-700" style={{ borderBottom: `1px solid ${themeActive ? selectedTheme.cardBorder : '#e4e4e7'}` }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1.5">
                <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" fill={themeActive ? selectedTheme.accent : '#f9a216'} />
              </svg>
              <span className="text-xs font-bold tracking-tight transition-colors duration-700" style={{ color: themeActive ? selectedTheme.text : '#000' }}>
                Cert<span className="transition-colors duration-700" style={{ color: themeActive ? selectedTheme.accent : '#f9a216' }}>Champs</span>
              </span>
              <span className="ml-auto text-[10px] transition-colors duration-700" style={{ color: themeActive ? selectedTheme.textMuted : 'rgba(0,0,0,0.4)' }}>Practice</span>
            </div>
            <div className="p-5 space-y-2.5">
              <div className="h-2.5 rounded-full transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.shimmer : '#f0f0f2', width: '55%' }} />
              <div className="h-2.5 rounded-full transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.shimmer : '#f0f0f2', width: '80%' }} />
              <div className="h-2.5 rounded-full transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.shimmer : '#f0f0f2', width: '40%' }} />
              <div className="pt-3 space-y-2">
                <div className="h-9 rounded-lg transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.shimmer : '#f0f0f2' }} />
                <div className="h-9 rounded-lg transition-all duration-700" style={{ backgroundColor: themeActive ? selectedTheme.shimmer : '#f0f0f2', border: `1.5px solid ${themeActive ? selectedTheme.accent : '#f9a216'}` }} />
              </div>
              <div className="pt-2">
                <div className="h-10 w-full rounded-lg flex items-center justify-center transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.buttonBg : 'rgba(24,81,150,0.1)' }}>
                  <span className="text-xs font-bold transition-colors duration-700" style={{ color: themeActive ? selectedTheme.buttonText : '#185196' }}>Continue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme selector */}
          <div className="mt-8 flex gap-3">
            {APP_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={themeActive ? {
                  backgroundColor: selectedTheme.id === theme.id ? selectedTheme.accent : 'rgba(255,255,255,0.08)',
                  color: selectedTheme.id === theme.id ? selectedTheme.buttonText : selectedTheme.textMuted,
                  border: `1.5px solid ${selectedTheme.id === theme.id ? selectedTheme.accent : 'rgba(255,255,255,0.1)'}`,
                } : {
                  backgroundColor: selectedTheme.id === theme.id ? '#185196' : '#f4f4f5',
                  color: selectedTheme.id === theme.id ? '#fff' : '#71717a',
                  border: `1.5px solid ${selectedTheme.id === theme.id ? '#185196' : '#e4e4e7'}`,
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent }} />
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dark overlay — clip-path reveals themed content behind the diagonal */}
        <div
          ref={el => { sectionDarkRefs.current[1] = el; if (el && !el.style.clipPath) el.style.clipPath = 'polygon(120% 0%, 100% 0%, 100% 100%, 165% 100%)' }}
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
          style={{ backgroundColor: selectedTheme.bg }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl tracking-tight" style={{ color: selectedTheme.text }}>
              Customise{' '}
              <span style={{ color: selectedTheme.accent }}>CertChamps</span>
              {' '}how you like
            </h2>
            <p className="mt-4 max-w-md text-center text-base md:text-lg" style={{ color: selectedTheme.textMuted }}>
              Pick a theme that suits your style. Study your way with a look that feels right.
            </p>

            {/* App preview card – dark */}
            <div
              className="mt-10 md:mt-14 w-[300px] sm:w-[360px] rounded-2xl overflow-hidden"
              style={{ backgroundColor: selectedTheme.cardBg, border: `1px solid ${selectedTheme.cardBorder}`, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
            >
              <div className="px-4 py-3 flex items-center" style={{ borderBottom: `1px solid ${selectedTheme.cardBorder}` }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1.5">
                  <path d="M12 2L15 8L22 9L17 14L18 22L12 18L6 22L7 14L2 9L9 8L12 2Z" fill={selectedTheme.accent} />
                </svg>
                <span className="text-xs font-bold tracking-tight" style={{ color: selectedTheme.text }}>
                  Cert<span style={{ color: selectedTheme.accent }}>Champs</span>
                </span>
                <span className="ml-auto text-[10px]" style={{ color: selectedTheme.textMuted }}>Practice</span>
              </div>
              <div className="p-5 space-y-2.5">
                <div className="h-2.5 rounded-full" style={{ backgroundColor: selectedTheme.shimmer, width: '55%' }} />
                <div className="h-2.5 rounded-full" style={{ backgroundColor: selectedTheme.shimmer, width: '80%' }} />
                <div className="h-2.5 rounded-full" style={{ backgroundColor: selectedTheme.shimmer, width: '40%' }} />
                <div className="pt-3 space-y-2">
                  <div className="h-9 rounded-lg" style={{ backgroundColor: selectedTheme.shimmer }} />
                  <div className="h-9 rounded-lg" style={{ backgroundColor: selectedTheme.shimmer, border: `1.5px solid ${selectedTheme.accent}` }} />
                </div>
                <div className="pt-2">
                  <div className="h-10 w-full rounded-lg flex items-center justify-center" style={{ backgroundColor: selectedTheme.buttonBg }}>
                    <span className="text-xs font-bold" style={{ color: selectedTheme.buttonText }}>Continue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme selector – dark (visual only) */}
            <div className="mt-8 flex gap-3">
              {APP_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    backgroundColor: selectedTheme.id === theme.id ? selectedTheme.accent : 'rgba(255,255,255,0.08)',
                    color: selectedTheme.id === theme.id ? selectedTheme.buttonText : selectedTheme.textMuted,
                    border: `1.5px solid ${selectedTheme.id === theme.id ? selectedTheme.accent : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent }} />
                  {theme.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Exam papers – card stack with scan hover and gradient border */}
      <section id="exam-papers" className="relative z-10 py-24 px-6 md:py-32 transition-colors duration-700" style={{ backgroundColor: themeActive ? selectedTheme.bg : '#ffffff' }}>
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-2 text-center text-3xl font-bold tracking-tight md:text-4xl transition-colors duration-700"
            style={{ color: themeActive ? selectedTheme.text : '#000' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            Exam papers
          </motion.h2>
          <motion.p
            className="mx-auto mb-12 max-w-xl text-center transition-colors duration-700"
            style={{ color: themeActive ? selectedTheme.textMuted : 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Hover over the stack and move up and down to scan through papers.
          </motion.p>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ExamPaperCardStack
              cards={[
                { id: 'p2-2025', title: '2025 Paper 2', subtitle: 'CertChamps', description: 'All questions in the 2025 state exam paper 2.', questionCount: 24 },
                { id: 'p1-2024', title: '2024 Paper 1', subtitle: 'CertChamps', description: 'All questions from the 2024 state exam paper 1.', questionCount: 18 },
                { id: 'p2-2024', title: '2024 Paper 2', subtitle: 'CertChamps', description: 'All questions from the 2024 state exam paper 2.', questionCount: 22 },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== FIXED DARK OVERLAY — dark navbar only, scroll-driven clip-path ===== */}
      {/* No solid dark background — section dark overlays provide themed bg + content */}
      <div
        ref={el => { themeOverlayRef.current = el; if (el && !el.style.clipPath) el.style.clipPath = 'polygon(120% 0%, 100% 0%, 100% 100%, 165% 100%)' }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 55 }}
      >
        {/* Dark navbar (visual mirror — non-interactive) */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-2.5" style={{ backgroundColor: selectedTheme.bg }}>
          <span className="flex items-center gap-2 flex-1 min-w-0">
            <img src={logo} alt="" className="w-10 h-10 object-contain" style={{ filter: 'brightness(10)' }} />
            <span className="text-xl font-bold">
              <span style={{ color: selectedTheme.text }}>Cert</span>
              <span style={{ color: selectedTheme.accent }}>Champs</span>
            </span>
          </span>
          <div className="flex items-center justify-center gap-8 flex-1 min-w-0">
            <span className="text-sm md:text-base" style={{ color: selectedTheme.textMuted }}>about us</span>
            <span className="text-sm md:text-base" style={{ color: selectedTheme.textMuted }}>pricing</span>
            <span className="text-sm md:text-base" style={{ color: selectedTheme.textMuted }}>contact</span>
          </div>
          <div className="flex justify-end flex-1 min-w-0">
            <span
              className="rounded-lg px-5 py-2.5 font-semibold text-sm md:text-base"
              style={{ backgroundColor: `${selectedTheme.accent}1A`, color: selectedTheme.accent }}
            >
              Log In
            </span>
          </div>
        </nav>
      </div>

    </div>
  )
}

export default App
