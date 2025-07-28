"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

function NebulaImmersionContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSlash, setShowSlash] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#000011")

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Cambia il colore di sfondo durante l'effetto glitch
  useEffect(() => {
    console.log("Glitch state changed:", glitchActive) // Debug
    if (glitchActive) {
      setBackgroundColor("#211440")
    } else {
      setBackgroundColor("#000011")
    }
  }, [glitchActive])

  useEffect(() => {
    if (!isClient) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const particles: Array<{
      x: number
      y: number
      z: number
      size: number
      color: string
      speed: number
      angle: number
    }> = []

    // Create 3D nebula particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? "#00CCFF" : "#0066FF",
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 17, 1)" // Clear completely without fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Create nebula effect without persistent gradients
      if (glitchActive && Math.random() > 0.7) {
        const glitchGradient = ctx.createRadialGradient(
          canvas.width / 2 + (Math.random() - 0.5) * 50,
          canvas.height / 2 + (Math.random() - 0.5) * 50,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 3,
        )
        glitchGradient.addColorStop(0, "rgba(255, 6, 102, 0.1)")
        glitchGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = glitchGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach((particle) => {
        // 3D movement
        particle.z -= particle.speed * 2
        particle.x += Math.sin(particle.angle + time) * 0.5
        particle.y += Math.cos(particle.angle + time) * 0.3

        // Apply glitch movement to particles
        if (glitchActive) {
          particle.x += (Math.random() - 0.5) * 20
          particle.y += (Math.random() - 0.5) * 20
          particle.speed += (Math.random() - 0.5) * 2
        }

        if (particle.z <= 0) {
          particle.z = 1000
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
        }

        // 3D projection
        const scale = 1000 / (1000 + particle.z)
        let x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        let y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        let size = particle.size * scale

        // Apply additional glitch displacement to rendered position
        if (glitchActive) {
          x2d += (Math.random() - 0.5) * 15
          y2d += (Math.random() - 0.5) * 15
          size *= 0.5 + Math.random() * 1.5 // Random size variation
        }

        // Draw particle with reduced glow
        const alpha = Math.max(0, 0.8 - particle.z / 1000) // Reduced max opacity
        let particleColor = particle.color

        // Apply glitch colors to particles
        if (glitchActive && Math.random() > 0.6) {
          const glitchColors = ["#FF0066", "#00FF00", "#FFFF00", "#FF6600", "#FF00FF"]
          particleColor = glitchColors[Math.floor(Math.random() * glitchColors.length)]
        }

        // Instant transition: either ASCII or particles based on glitch state
        if (glitchActive) {
          // ASCII rain effect during glitch - instant transition
          const asciiChars = ["0", "1", "Z", "O", "D", "I", "A", "█", "▓", "▒", "░", "│", "─"]
          
          // Create rain effect - characters falling from top to bottom
          for (let i = 0; i < 5; i++) {
            const randomChar = asciiChars[Math.floor(Math.random() * asciiChars.length)]
            const rainX = x2d + (Math.random() - 0.5) * 30
            const rainY = y2d + (Math.random() * 100) - 50 // Spread vertically for rain effect
            
            // Dimensione variabile per ogni carattere - più piccoli
            const fontSize = Math.max(4, Math.random() * 12 + 3) // Tra 3px e 15px
            ctx.font = `${fontSize}px monospace`
            ctx.fillStyle = `rgba(0, 0, 217, ${alpha * 0.9})` // #0000D9 blu - meno opaco
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.shadowBlur = 2 * scale
            ctx.shadowColor = "rgba(0, 0, 217, 0.4)"
            ctx.fillText(randomChar, rainX, rainY)
          }
          ctx.shadowBlur = 0
        } else {
          // Normal particle drawing - instant transition
          ctx.beginPath()
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
          ctx.fillStyle = particleColor.replace(")", `, ${alpha})`)
          ctx.shadowBlur = 10 * scale
          ctx.shadowColor = particleColor
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Connect nearby particles (simplified for performance)
        if (Math.random() > 0.99) {
          const otherParticle = particles[Math.floor(Math.random() * particles.length)]
          const otherScale = 1000 / (1000 + otherParticle.z)
          let otherX2d = (otherParticle.x - canvas.width / 2) * otherScale + canvas.width / 2
          let otherY2d = (otherParticle.y - canvas.height / 2) * otherScale + canvas.height / 2

          // Apply glitch to connections
          if (glitchActive) {
            otherX2d += (Math.random() - 0.5) * 15
            otherY2d += (Math.random() - 0.5) * 15
          }

          ctx.beginPath()
          ctx.moveTo(x2d, y2d)
          ctx.lineTo(otherX2d, otherY2d)

          let connectionColor = `rgba(0, 204, 255, ${alpha * 0.15})` // Reduced opacity
          if (glitchActive && Math.random() > 0.7) {
            connectionColor = `rgba(255, 6, 102, ${alpha * 0.3})` // Reduced opacity
          }

          ctx.strokeStyle = connectionColor
          ctx.lineWidth = glitchActive ? Math.random() * 2 + 0.5 : 0.5
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const slashTimer = setInterval(() => {
      setShowSlash(true)
      const timeout = setTimeout(() => setShowSlash(false), 1200) // Durata slash 1.2s
      return () => clearTimeout(timeout)
    }, 4500) // Ogni 4.5 secondi

    // Glitch effect timer
    const glitchTimer = setInterval(() => {
      console.log("Activating glitch effect") // Debug
      setGlitchActive(true)
      const timeout = setTimeout(() => {
        console.log("Deactivating glitch effect") // Debug
        setGlitchActive(false)
      }, 800) // Durata glitch 800ms
      return () => clearTimeout(timeout)
    }, 4000) // Ogni 4 secondi - più frequente

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasSize)
      clearInterval(slashTimer)
      clearInterval(glitchTimer)
    }
  }, [isClient, glitchActive])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY
        const layers = containerRef.current.querySelectorAll(".parallax-layer")
        layers.forEach((layer, index) => {
          const speed = (index + 1) * 0.05 // Different speeds for layers
          ;(layer as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 pb-20 transition-all duration-150"
              style={{
          backgroundColor: glitchActive ? "#211440" : backgroundColor,
          backgroundImage: glitchActive ? "url('/glitchbg.png')" : "none",
          backgroundSize: glitchActive ? "cover" : "auto",
          backgroundPosition: glitchActive ? "center" : "auto",
          backgroundRepeat: glitchActive ? "no-repeat" : "repeat"
        }}
    >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Nebula Overlay Gradients (Parallax Layers) */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-[rgba(0,17,51,0.3)] to-[rgba(0,0,17,0.8)] parallax-layer"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(0,102,255,0.1)] via-transparent to-[rgba(0,204,255,0.1)] parallax-layer"
        style={{ zIndex: 2 }}
      />
      <div className="absolute inset-0 bg-[rgba(0,102,255,0.05)] blur-3xl parallax-layer" style={{ zIndex: 3 }} />

      {/* Glitch Elements */}
      {glitchActive && (
        <>
          {/* Geometric glitch elements */}
          <div className="absolute top-20 left-10 w-16 h-24 bg-gradient-to-b from-[#00FF00] via-[#00CCFF] to-[#FF0066] opacity-80 animate-glitch-flicker z-10" />
          <div className="absolute bottom-32 right-16 w-12 h-32 bg-gradient-to-t from-[#FFFF00] via-[#FF6600] to-[#FF0066] opacity-70 animate-glitch-flicker z-10" />
          <div className="absolute top-1/3 right-20 w-8 h-16 bg-gradient-to-b from-[#00CCFF] to-[#0066FF] opacity-60 animate-glitch-flicker z-10" />
        </>
              )}

      {/* Energy Waves */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-[#00CCFF]/20 animate-energy-wave"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animationDelay: `${i * 2}s`,
            animationDuration: "8s",
            zIndex: 5,
          }}
        />
      ))}

      {/* Docs Button - Top Right Corner */}
      <a
        href="https://docs.zodia.world"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 opacity-30 hover:opacity-100 transition-opacity duration-300 group"
      >
        <div className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-black/20 backdrop-blur-sm border border-[#00CCFF]/20 rounded-lg hover:bg-black/40 hover:border-[#00CCFF]/40 transition-all duration-300">
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4 text-[#00CCFF] group-hover:text-[#00CCFF]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[#00CCFF] text-xs sm:text-sm font-medium">Docs</span>
        </div>
      </a>

      {/* Main Content */}
              <div className="text-center z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">

              <div className="mb-8 sm:mb-12 relative">
            
            {/* Immagine ZODIA */}
            <div className="flex justify-center mt-4 sm:mt-8 relative" style={{ zIndex: 50, position: "relative" }}>
              <div className="oblique-glow" style={{ zIndex: 50 }}>
                <img 
                  src="/zodiap.png" 
                  alt="ZODIA Image" 
                  className="w-[280px] sm:w-[200px] md:w-[150px] lg:w-[120px] xl:w-[100px] animate-pulsate relative"
                  style={{
                    filter: glitchActive ? "none" : "drop-shadow(0 0 4px #0202A5) drop-shadow(0 0 8px #0202A5) drop-shadow(0 0 12px #0202A5)",
                    zIndex: 50,
                    position: "relative",
                    transform: glitchActive ? "skew(5deg, 0deg)" : "skew(0deg, 0deg)",
                  }}
                />
              </div>
              
              {/* Glitch overlay layers per l'immagine */}
              {glitchActive && (
                <>
                  <img 
                    src="/zodiap.png" 
                    alt="ZODIA Image Glitch Red" 
                    className="absolute w-[280px] sm:w-[200px] md:w-[150px] lg:w-[120px] xl:w-[100px] animate-glitch-red"
                    style={{
                      filter: "none",
                      transform: "translateX(-2px) skew(5deg, 0deg)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                      zIndex: 51,
                      position: "absolute",
                    }}
                  />
                  <img 
                    src="/zodiap.png" 
                    alt="ZODIA Image Glitch Cyan" 
                    className="absolute w-[280px] sm:w-[200px] md:w-[150px] lg:w-[120px] xl:w-[100px] animate-glitch-cyan"
                    style={{
                      filter: "none",
                      transform: "translateX(2px) skew(5deg, 0deg)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                      zIndex: 50,
                      position: "absolute",
                    }}
                  />
                </>
              )}
            </div>

          <p
            className={`font-medium text-[#E6F3FF] tracking-[0.2em] sm:tracking-[0.4em] animate-fade-in-stagger mb-4 font-trajan`}
            style={{ 
              fontSize: "clamp(1.5rem, 2vw, 1rem)", 
              animationDelay: "0.2s", 
              fontWeight: "500",
              zIndex: 100,
              position: "relative",
              fontFamily: "var(--font-trajan)"
            }}
          >
            NEBULA IMMERSION
                      </p>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#00CCFF] to-transparent mx-auto animate-line-glow" />

            {/* Light Slash Effect (creating portals) */}
          {showSlash && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-light-slash-portal">
                <div
                  className="absolute w-[3px] h-full bg-white shadow-[0_0_8px_#00CCFF] transform -rotate-45 origin-top-left"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #FFFFFF, transparent)",
                    width: "3px",
                    height: "150%",
                    left: "-50%",
                    top: "-25%",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <p
          className={`font-medium text-[#E6F3FF] mb-8 sm:mb-16 opacity-90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-fade-in-stagger px-2 sm:px-0 font-trajan`}
          style={{ 
            animationDelay: "0.4s", 
            fontWeight: "500",
            fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
            fontFamily: "var(--font-trajan)"
          }}
        >
          Dive deep into the cosmic nebula where stellar formations birth the future of decentralized astrology.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-stagger px-2 sm:px-0"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className={`bg-gradient-to-r from-[#0066FF] to-[#00CCFF] text-white font-semibold px-8 sm:px-12 md:px-16 py-4 sm:py-6 text-base sm:text-lg md:text-xl rounded-none hover:scale-105 hover:from-[#0055CC] hover:to-[#0099CC] transition-all duration-500 font-audiowide w-full sm:w-auto ${
              glitchActive ? "animate-glitch-button" : ""
            }`}
            style={{ 
              fontWeight: "400",
              fontFamily: "var(--font-audiowide)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textShadow: "0 0 15px rgba(0, 204, 255, 0.7)"
            }}
          >
            <div className="flex flex-col items-center">
              <span>Talk to Zodia</span>
              <span className="text-xs sm:text-sm opacity-80 tracking-wider mt-1">
                COMING SOON
              </span>
            </div>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`border-2 border-[#00CCFF] text-[#00CCFF] font-semibold px-8 sm:px-12 md:px-16 py-4 sm:py-6 text-base sm:text-lg md:text-xl rounded-none hover:bg-[#00CCFF]/10 transition-all duration-500 backdrop-blur-sm bg-transparent font-audiowide w-full sm:w-auto ${
              glitchActive ? "animate-glitch-button" : ""
            }`}
            style={{ 
              fontWeight: "400",
              fontFamily: "var(--font-audiowide)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textShadow: "0 0 15px rgba(0, 204, 255, 0.7)"
            }}
          >
            Buy on Uniswap
          </Button>
        </div>

        {/* Depth Indicators */}
        <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4 z-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#00CCFF] animate-depth-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                opacity: 1 - i * 0.15,
              }}
            />
          ))}
        </div>
      </div>


    </div>
  )
}

export default function NebulaImmersion() {
  return <NebulaImmersionContent />
}
