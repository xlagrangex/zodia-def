"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function NebulaImmersion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSlash, setShowSlash] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
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

      particles.forEach((particle, index) => {
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
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)

        const alpha = Math.max(0, 0.8 - particle.z / 1000) // Reduced max opacity
        let particleColor = particle.color

        // Apply glitch colors to particles
        if (glitchActive && Math.random() > 0.6) {
          const glitchColors = ["#FF0066", "#00FF00", "#FFFF00", "#FF6600", "#FF00FF"]
          particleColor = glitchColors[Math.floor(Math.random() * glitchColors.length)]
        }

        ctx.fillStyle = particleColor.replace(")", `, ${alpha})`)
        ctx.shadowBlur = 10 * scale // Reduced shadow blur
        ctx.shadowColor = particleColor
        ctx.fill()
        ctx.shadowBlur = 0

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
      setGlitchActive(true)
      const timeout = setTimeout(() => setGlitchActive(false), 150) // Durata glitch 150ms
      return () => clearTimeout(timeout)
    }, 3000) // Ogni 3 secondi

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasSize)
      clearInterval(slashTimer)
      clearInterval(glitchTimer)
    }
  }, [])

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
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#000011] p-4 sm:p-8 md:p-12 lg:p-20"
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

      {/* Main Content */}
              <div className="text-center z-20 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">

              <div className="mb-12 relative">
            
            {/* Immagine ZODIA */}
            <div className="flex justify-center mt-8 relative">
              <div className="oblique-glow">
                <img 
                  src="/zodiap.png" 
                  alt="ZODIA Image" 
                  className="max-w-[300px] md:max-w-[400px] lg:max-w-[500px] animate-pulsate relative z-10"
                  style={{
                    filter: "drop-shadow(0 0 8px #0202A5) drop-shadow(0 0 16px #0202A5) drop-shadow(0 0 24px #0202A5) drop-shadow(0 0 32px #0202A5) drop-shadow(0 0 40px #0202A5)",
                  }}
                />
              </div>
              
              {/* Glitch overlay layers per l'immagine */}
              {glitchActive && (
                <>
                  <img 
                    src="/zodiap.png" 
                    alt="ZODIA Image Glitch Red" 
                    className="absolute max-w-[300px] md:max-w-[400px] lg:max-w-[500px] animate-glitch-red"
                    style={{
                      filter: "drop-shadow(0 0 15px #FF0066) drop-shadow(0 0 30px #FF0066)",
                      transform: "translateX(-2px)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                      zIndex: 9,
                    }}
                  />
                  <img 
                    src="/zodiap.png" 
                    alt="ZODIA Image Glitch Cyan" 
                    className="absolute max-w-[300px] md:max-w-[400px] lg:max-w-[500px] animate-glitch-cyan"
                    style={{
                      filter: "drop-shadow(0 0 15px #00FFFF) drop-shadow(0 0 30px #00FFFF)",
                      transform: "translateX(2px)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                      zIndex: 8,
                    }}
                  />
                </>
              )}
            </div>

          <p
            className="font-trajan font-medium text-[#E6F3FF] tracking-[0.4em] animate-fade-in-stagger mb-4"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", animationDelay: "0.2s", fontWeight: "500" }}
          >
            NEBULA IMMERSION
                      </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#00CCFF] to-transparent mx-auto animate-line-glow" />

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
          className="font-trajan font-medium text-[#E6F3FF] mb-16 opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-stagger"
          style={{ animationDelay: "0.4s", fontWeight: "500" }}
        >
          Dive deep into the cosmic nebula where stellar formations birth the future of decentralized astrology.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-stagger"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className={`bg-[#0066FF] text-white font-trajan font-semibold px-16 py-6 text-xl rounded-full hover:scale-105 transition-all duration-500 shadow-[0_0_20px_#0066FF,0_0_40px_#00CCFF,0_0_60px_#0066FF] hover:shadow-[0_0_30px_#0066FF,0_0_60px_#00CCFF,0_0_90px_#0066FF] animate-immersion-button ${
              glitchActive ? "animate-glitch-button" : ""
            }`}
            style={{ fontWeight: "600" }}
          >
            Immerse in Nebula
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`border-2 border-[#00CCFF] text-[#00CCFF] font-trajan font-semibold px-16 py-6 text-xl rounded-full hover:bg-[#00CCFF]/10 transition-all duration-500 backdrop-blur-sm bg-transparent ${
              glitchActive ? "animate-glitch-button" : ""
            }`}
            style={{ fontWeight: "600" }}
          >
            Stellar Genesis
          </Button>
        </div>

        {/* Depth Indicators */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-[#00CCFF] animate-depth-pulse"
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
