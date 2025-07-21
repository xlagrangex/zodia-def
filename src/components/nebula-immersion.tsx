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
          <h1 className="relative mb-6 animate-nebula-title">
            {/* Aurora Boreale Background Effect */}
            <div className="absolute inset-0 -z-10">
              {/* Multiple aurora layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00CCFF]/30 to-transparent blur-xl animate-aurora-wave-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/20 via-transparent to-[#00CCFF]/20 blur-2xl animate-aurora-wave-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent blur-lg animate-aurora-wave-3" />

              {/* Horizontal aurora streaks */}
              <div className="absolute top-1/2 left-0 w-full h-8 bg-gradient-to-r from-transparent via-[#00CCFF]/50 to-transparent blur-md animate-aurora-streak-1" />
              <div className="absolute top-1/3 left-0 w-full h-6 bg-gradient-to-r from-[#0066FF]/30 via-transparent to-[#00CCFF]/30 blur-lg animate-aurora-streak-2" />
              <div className="absolute bottom-1/3 left-0 w-full h-10 bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent blur-xl animate-aurora-streak-3" />
            </div>

            {/* ZODIA Text con effetto neon e alone obliquo */}
            <div className="relative font-trajan font-semibold" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: "600" }}>
              {/* Alone obliquo - fascio di luce diagonale */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
        conic-gradient(
          from 225deg at 50% 50%,
          transparent 0deg,
          rgba(0, 102, 255, 0.4) 30deg,
          rgba(0, 204, 255, 0.6) 45deg,
          rgba(0, 102, 255, 0.4) 60deg,
          transparent 90deg,
          transparent 360deg
        )
      `,
                  transform: "scale(3) translateX(-30%) translateY(-30%)",
                  filter: "blur(20px)",
                  opacity: 0.7,
                  zIndex: -1,
                }}
              />

              {/* Fascio di luce secondario più ampio */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
        conic-gradient(
          from 225deg at 50% 50%,
          transparent 0deg,
          rgba(0, 102, 255, 0.2) 20deg,
          rgba(0, 204, 255, 0.3) 45deg,
          rgba(0, 102, 255, 0.2) 70deg,
          transparent 90deg,
          transparent 360deg
        )
      `,
                  transform: "scale(5) translateX(-40%) translateY(-40%)",
                  filter: "blur(40px)",
                  opacity: 0.5,
                  zIndex: -2,
                }}
              />

              {/* Z - Azzurrina Corsiva con effetto neon potenziato */}
              <span
                className="inline-block animate-pulsate relative"
                style={{
                  color: "#00CCFF",
                  fontStyle: "italic",
                  textShadow: `
        0 0 5px #00CCFF,
        0 0 10px #00CCFF,
        0 0 15px #00CCFF,
        0 0 20px #00CCFF,
        0 0 35px #00CCFF,
        0 0 40px #00CCFF,
        -10px -10px 30px rgba(0, 204, 255, 0.5),
        -15px -15px 40px rgba(0, 204, 255, 0.3),
        -20px -20px 50px rgba(0, 204, 255, 0.2)
      `,
                  filter:
                    "drop-shadow(0 0 15px #00CCFF) drop-shadow(0 0 25px #00CCFF) drop-shadow(-10px -10px 20px rgba(0, 204, 255, 0.4))",
                  WebkitTextStroke: "3px #00CCFF",
                }}
              >
                Z
              </span>

              {/* ODIA - Blu Dritte con effetto neon potenziato */}
              <span
                className="inline-block animate-pulsate relative"
                style={{
                  color: "#0066FF",
                  fontStyle: "normal",
                  textShadow: `
        0 0 5px #0066FF,
        0 0 10px #0066FF,
        0 0 15px #0066FF,
        0 0 20px #0066FF,
        0 0 35px #0066FF,
        0 0 40px #0066FF,
        -10px -10px 30px rgba(0, 102, 255, 0.5),
        -15px -15px 40px rgba(0, 102, 255, 0.3),
        -20px -20px 50px rgba(0, 102, 255, 0.2)
      `,
                  filter:
                    "drop-shadow(0 0 15px #0066FF) drop-shadow(0 0 25px #0066FF) drop-shadow(-10px -10px 20px rgba(0, 102, 255, 0.4))",
                  WebkitTextStroke: "3px #0066FF",
                }}
              >
                ODIA
              </span>

              {/* Glitch overlay layers */}
              {glitchActive && (
                <>
                  <span
                    className="absolute inset-0 animate-glitch-red"
                    style={{
                      color: "#FF0066",
                      transform: "translateX(-2px)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>Z</span>ODIA
                  </span>
                  <span
                    className="absolute inset-0 animate-glitch-cyan"
                    style={{
                      color: "#00FFFF",
                      transform: "translateX(2px)",
                      opacity: 0.7,
                      mixBlendMode: "screen",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>Z</span>ODIA
                  </span>
                </>
              )}

              {/* Scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-[rgba(0,255,255,0.03)] to-transparent animate-scanlines" />
              </div>
            </div>

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
          </h1>

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

      <style jsx>{`
        @keyframes pulsate {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1.0; }
        }
        @keyframes light-slash-portal {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes fade-in-stagger {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes energy-wave {
          0% { 
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes nebula-title {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.02);
          }
        }
        @keyframes line-glow {
          0%, 100% { 
            box-shadow: 0 0 10px #00CCFF;
            transform: scaleX(1);
          }
          50% { 
            box-shadow: 0 0 30px #00CCFF, 0 0 50px #0066FF;
            transform: scaleX(1.2);
          }
        }
        @keyframes immersion-button {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            box-shadow: 0 0 40px #0066FF;
          }
          50% { 
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 0 60px #0066FF, 0 0 80px #00CCFF;
          }
        }
        @keyframes depth-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.5);
            opacity: 1;
          }
        }
        @keyframes glitch-flicker {
          0%, 100% { opacity: 0.8; transform: translateX(0); }
          25% { opacity: 0.4; transform: translateX(-2px); }
          50% { opacity: 0.9; transform: translateX(2px); }
          75% { opacity: 0.3; transform: translateX(-1px); }
        }
        @keyframes glitch-text {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        @keyframes glitch-red {
          0%, 100% { transform: translateX(-2px); opacity: 0.7; }
          50% { transform: translateX(-4px); opacity: 0.4; }
        }
        @keyframes glitch-cyan {
          0%, 100% { transform: translateX(2px); opacity: 0.7; }
          50% { transform: translateX(4px); opacity: 0.4; }
        }
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes aurora-wave-1 {
          0%, 100% { 
            transform: translateX(-20%) scaleY(0.8);
            opacity: 0.3;
          }
          50% { 
            transform: translateX(20%) scaleY(1.2);
            opacity: 0.6;
          }
        }
        @keyframes aurora-wave-2 {
          0%, 100% { 
            transform: translateX(15%) scaleY(1.1);
            opacity: 0.2;
          }
          50% { 
            transform: translateX(-15%) scaleY(0.9);
            opacity: 0.4;
          }
        }
        @keyframes aurora-wave-3 {
          0%, 100% { 
            transform: translateX(-10%) scaleY(0.9);
            opacity: 0.4;
          }
          50% { 
            transform: translateX(10%) scaleY(1.3);
            opacity: 0.7;
          }
        }
        @keyframes aurora-streak-1 {
          0%, 100% { 
            transform: translateX(-30%) scaleX(0.8);
            opacity: 0.5;
          }
          50% { 
            transform: translateX(30%) scaleX(1.2);
            opacity: 0.8;
          }
        }
        @keyframes aurora-streak-2 {
          0%, 100% { 
            transform: translateX(25%) scaleX(1.1);
            opacity: 0.3;
          }
          50% { 
            transform: translateX(-25%) scaleX(0.9);
            opacity: 0.6;
          }
        }
        @keyframes aurora-streak-3 {
          0%, 100% { 
            transform: translateX(-20%) scaleX(0.7);
            opacity: 0.4;
          }
          50% { 
            transform: translateX(20%) scaleX(1.4);
            opacity: 0.7;
          }
        }
        @keyframes glitch-button {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            filter: hue-rotate(0deg);
          }
          25% { 
            transform: translateY(-2px) scale(0.98);
            filter: hue-rotate(90deg);
          }
          50% { 
            transform: translateY(1px) scale(1.02);
            filter: hue-rotate(180deg);
          }
          75% { 
            transform: translateY(-1px) scale(0.99);
            filter: hue-rotate(270deg);
          }
        }

        .animate-pulsate { animation: pulsate 2s ease-in-out infinite alternate; }
        .animate-light-slash-portal { animation: light-slash-portal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-fade-in-stagger { animation: fade-in-stagger 1s ease-out forwards; opacity: 0; }
        .animate-energy-wave { animation: energy-wave 8s ease-out infinite; }
        .animate-nebula-title { animation: nebula-title 5s ease-in-out infinite; }
        .animate-line-glow { animation: line-glow 3s ease-in-out infinite; }
        .animate-immersion-button { animation: immersion-button 6s ease-in-out infinite; }
        .animate-depth-pulse { animation: depth-pulse 2s ease-in-out infinite; }
        .animate-glitch-flicker { animation: glitch-flicker 0.15s ease-in-out; }
        .animate-glitch-text { animation: glitch-text 0.15s ease-in-out; }
        .animate-glitch-red { animation: glitch-red 0.15s ease-in-out; }
        .animate-glitch-cyan { animation: glitch-cyan 0.15s ease-in-out; }
        .animate-scanlines { animation: scanlines 2s linear infinite; }
        .animate-aurora-wave-1 { animation: aurora-wave-1 8s ease-in-out infinite; }
        .animate-aurora-wave-2 { animation: aurora-wave-2 6s ease-in-out infinite; }
        .animate-aurora-wave-3 { animation: aurora-wave-3 10s ease-in-out infinite; }
        .animate-aurora-streak-1 { animation: aurora-streak-1 7s ease-in-out infinite; }
        .animate-aurora-streak-2 { animation: aurora-streak-2 9s ease-in-out infinite; }
        .animate-aurora-streak-3 { animation: aurora-streak-3 5s ease-in-out infinite; }
        .animate-glitch-button { animation: glitch-button 0.15s ease-in-out; }
      `}</style>
    </div>
  )
}
