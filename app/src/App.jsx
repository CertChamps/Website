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
import logo from './assets/logo.png'

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

// Blurred icons: reduced blur, bigger, closer to edges. scrollFactor: blurred = slower.
const ICONS = [
  { src: integralIcon, left: '1005px', top: '723px', size: 110, blur: 5, scrollFactor: 0.15 },
  { src: mathIcon, left: '18%', top: '22%', size: 88, blur: 0, scrollFactor: 0.45 },
  { src: multiplyIcon, left: '1%', top: '52%', size: 98, blur: 4, scrollFactor: 0.22 },
  { src: piIcon, left: '82%', top: '15%', size: 72, blur: 0, scrollFactor: 0.48 },
  { src: sigmaIcon, left: '94%', top: '32%', size: 100, blur: 3, scrollFactor: 0.28 },
  { src: trigIcon, left: '3%', top: '38%', size: 90, blur: 0, scrollFactor: 0.42 },
  { src: infinityIcon, left: '96%', top: '55%', size: 104, blur: 4, scrollFactor: 0.18 },
  { src: mathIcon, left: '4%', top: '3%', size: 92, blur: 2, scrollFactor: 0.32 },
  { src: piIcon, left: '55%', top: '72%', size: 74, blur: 0, scrollFactor: 0.44 },
  { src: integralIcon, left: '97%', top: '8%', size: 90, blur: 3, scrollFactor: 0.25 },
  { src: sigmaIcon, left: '92%', top: '42%', size: 82, blur: 0, scrollFactor: 0.46 },
  { src: trigIcon, left: '2%', top: '90%', size: 96, blur: 4, scrollFactor: 0.2 },
  { src: infinityIcon, left: '96%', top: '5%', size: 84, blur: 2, scrollFactor: 0.3 },
  { src: multiplyIcon, left: '35%', top: '65%', size: 92, blur: 0, scrollFactor: 0.5 },
  { src: mathIcon, left: '93%', top: '88%', size: 88, blur: 3, scrollFactor: 0.26 },
]

const GRID_TILE = 64

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1920, h: typeof window !== 'undefined' ? window.innerHeight : 1080 })
  const containerRef = useRef(null)
  const iconsRef = useRef([]) // refs for each icon wrapper so we can drive parallax in rAF

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Per-icon spread offset (from center) for position-in animation
  const iconSpread = useMemo(() => {
    const vw = viewport.w
    const vh = viewport.h
    const spreadAmount = 0.52
    return ICONS.map((icon) => {
      const leftPx = String(icon.left).endsWith('%')
        ? (parseFloat(icon.left) / 100) * vw
        : parseFloat(icon.left)
      const topPx = String(icon.top).endsWith('%')
        ? (parseFloat(icon.top) / 100) * vh
        : parseFloat(icon.top)
      const centerX = leftPx + icon.size / 2
      const centerY = topPx + icon.size / 2
      const spreadX = (centerX - vw / 2) * spreadAmount
      const spreadY = (centerY - vh / 2) * spreadAmount
      return { x: spreadX, y: spreadY }
    })
  }, [viewport.w, viewport.h])

  // Drive icon parallax in rAF so it works regardless of what element is scrolling
  useEffect(() => {
    const container = containerRef.current
    let rafId
    const tick = () => {
      const scrollY =
        container?.scrollTop ??
        window.scrollY ??
        document.documentElement?.scrollTop ??
        document.body?.scrollTop ??
        0
      iconsRef.current.forEach((el, i) => {
        if (!el || !ICONS[i]) return
        const factor = ICONS[i].scrollFactor
        el.style.transform = `translateY(${-scrollY * factor}px)`
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMouse({ x, y })
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const moveX = (e.clientX - rect.left - centerX) / centerX
    const moveY = (e.clientY - rect.top - centerY) / centerY
    setParallaxOffset({ x: moveX * 20, y: moveY * 20 })
  }, [])

  const champGradient = useMemo(() => {
    return `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #FFDA9F 0%, #FFAE2B 100%)`
  }, [mouse.x, mouse.y])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="h-screen overflow-y-auto overflow-x-hidden bg-white text-black relative"
    >
      {/* 3D perspective grid – train tracks style, vanishing point in center, hole for hero */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute opacity-35"
          style={{
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

      {/* Math icons – fixed layer, vertical parallax driven by rAF (reads container + window scroll) */}
      <div className="fixed inset-0 pointer-events-none z-40" style={{ perspective: '1400px' }}>
        {ICONS.map((icon, i) => {
          const spread = iconSpread[i] ?? { x: 0, y: 0 }
          const finalBlur = icon.blur ?? 0
          return (
            <div
              key={i}
              ref={(el) => { iconsRef.current[i] = el }}
              className="absolute"
              style={{
                left: icon.left,
                top: icon.top,
                width: icon.size,
                height: icon.size,
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                initial={{
                  x: spread.x,
                  y: spread.y,
                  scale: 2.4,
                  opacity: 0,
                  rotateX: 18,
                  rotateY: -12,
                  filter: 'blur(20px)',
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  filter: `blur(${finalBlur}px)`,
                }}
                transition={{
                  duration: 1.35,
                  delay: 0.15 + i * 0.045,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <img
                  src={icon.src}
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
        {/* Nav */}
        <motion.nav
          className="flex items-center justify-between px-6 md:px-12 py-5 shrink-0"
          initial={{ filter: 'blur(12px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold">
              <span className="text-black">Cert</span>
              <span className="text-gold">Champs</span>
            </span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#about" className="text-black text-sm md:text-base hover:text-gold transition-colors">about us</a>
            <a href="#pricing" className="text-black text-sm md:text-base hover:text-gold transition-colors">pricing</a>
            <a href="#contact" className="text-black text-sm md:text-base hover:text-gold transition-colors">contact</a>
            <button
              type="button"
              className="rounded-lg px-5 py-2.5 text-blue font-semibold text-sm md:text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'rgba(24, 81, 150, 0.1)' }}
            >
              Log In
            </button>
          </div>
        </motion.nav>

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
              className="mt-8 rounded-lg px-8 py-3.5 text-blue font-semibold text-base border border-black/10 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'rgba(24, 81, 150, 0.1)' }}
            >
              Get Started
            </button>
          </motion.div>
        </main>
      </div>

      {/* Exam papers – card stack with scan hover and gradient border */}
      <section id="exam-papers" className="relative z-10 bg-white py-24 px-6 md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-2 text-center text-3xl font-bold tracking-tight text-black md:text-4xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            Exam papers
          </motion.h2>
          <motion.p
            className="mx-auto mb-12 max-w-xl text-center text-black/70"
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

      {/* What's new – release timeline */}
      <section id="whats-new" className="relative z-10 bg-white">
        <TimeLine_01 />
      </section>

      {/* Placeholder section – below timeline */}
      <section id="placeholder" className="relative z-10 min-h-screen bg-white/90 backdrop-blur-sm py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-black mb-6"
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            More to come
          </motion.h2>
          <motion.div
            className="text-black/80 leading-relaxed space-y-4"
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus; nulla facilisi.
            </p>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est mauris placerat eleifend.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default App
