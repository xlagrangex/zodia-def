"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const zodiacSymbols = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" },
]

export default function ConstellationGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showSlash, setShowSlash] = useState(false)

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

    const stars: Array<{ x: number; y: number; size: number; opacity: number; pulse: number }> = []
    const connections: Array<{ from: number; to: number; opacity: number }> = []

    // Create constellation points
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Create connections between nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const distance = Math.sqrt(Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2))
        if (distance < 150 && Math.random() > 0.7) {
          connections.push({ from: i, to: j, opacity: Math.random() * 0.5 + 0.1 })
        }
      }
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Draw connections
      connections.forEach((connection) => {
        const fromStar = stars[connection.from]
        const toStar = stars[connection.to]

        ctx.beginPath()
        ctx.moveTo(fromStar.x, fromStar.y)
        ctx.lineTo(toStar.x, toStar.y)
        ctx.strokeStyle = `rgba(0, 102, 255, ${connection.opacity * (0.5 + 0.5 * Math.sin(time))})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw stars
      stars.forEach((star, index) => {
        const pulseIntensity = 0.5 + 0.5 * Math.sin(time + star.pulse)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulseIntensity, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 204, 255, ${star.opacity * pulseIntensity})`
        ctx.fill()

        // Glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = "#00CCFF"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const slashTimer = setInterval(() => {
      setShowSlash(true)
      const timeout = setTimeout(() => setShowSlash(false), 1200) // Durata slash 1.2s
      return () => clearTimeout(timeout)
    }, 4500) // Ogni 4.5 secondi

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasSize)
      clearInterval(slashTimer)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#001133] via-[#000011] to-[#000000] p-4 sm:p-8 md:p-12 lg:p-20"
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Background Elements */}
      {/* Stars (additional for density) */}
      {[...Array(100)].map((_, i) => (
        <div
          key={`star-bg-${i}`}
          className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-50 animate-flicker"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: `${0.2 + Math.random() * 0.6}`,
            animationDelay: `${Math.random() * 7}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            zIndex: 0,
          }}
        />
      ))}
      {/* Nebula */}
      <div className="absolute inset-0 bg-[#0066FF] opacity-[0.12] blur-[80px] rounded-full w-[80vw] h-[80vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
      {/* Thin Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border border-[#0066FF]/10" />
          ))}
        </div>
      </div>

      {/* Floating Particles (following mouse) */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-[2px] h-[2px] bg-[#00CCFF] rounded-full shadow-[0_0_10px_#00CCFF] animate-flicker"
          style={{
            left: `${mousePos.x + (Math.random() - 0.5) * 100}px`,
            top: `${mousePos.y + (Math.random() - 0.5) * 100}px`,
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            transition: "all 0.5s ease-out",
            zIndex: 1,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="text-center z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="mb-12 relative">
          <h1
            className="font-serif font-bold mb-4 animate-fade-in-stagger"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              color: "transparent",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(to right, #0066FF, #00CCFF, #FFFFFF)",
              textShadow: "0 0 10px #0066FF, 0 0 20px #00CCFF, 0 0 30px #0066FF",
              filter: "drop-shadow(0 0 15px #0066FF) drop-shadow(0 0 30px #00CCFF)",
            }}
          >
            <span className="inline-block animate-pulsate">ZODIA</span>
          </h1>
          <p
            className="font-sans font-medium text-[#E6F3FF] tracking-[0.3em] animate-fade-in-stagger"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", animationDelay: "0.2s" }}
          >
            CONSTELLATION NETWORK
          </p>
          {/* Light Slash Effect */}
          {showSlash && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-light-slash">
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
          className="font-inter text-[#E6F3FF] mb-16 opacity-90 max-w-3xl mx-auto leading-relaxed animate-fade-in-stagger"
          style={{ animationDelay: "0.4s" }}
        >
          Navigate the cosmic blockchain where astrology meets cryptocurrency in perfect harmony.
        </p>

        {/* Micro-Constellations Grid */}
        <div className="grid grid-cols-3 gap-8 mb-16 animate-fade-in-stagger" style={{ animationDelay: "0.6s" }}>
          {zodiacSymbols.slice(0, 9).map((zodiac, i) => (
            <div
              key={i}
              className="relative w-full aspect-square border border-[#0066FF]/40 rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer
                         shadow-[0_0_10px_rgba(0,102,255,0.3)] hover:shadow-[0_0_20px_rgba(0,204,255,0.6)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[rgba(0,17,51,0.6)] group-hover:bg-[rgba(0,102,255,0.2)] transition-colors duration-300" />
              <div
                className="absolute text-6xl text-[#00CCFF] opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-flicker"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                {zodiac.symbol}
              </div>
              <div className="absolute bottom-4 text-white font-orbitron font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                {zodiac.name}
              </div>
              {/* Constellation lines (simplified) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-[#0066FF]/40 rounded-full animate-rotate-slow" />
                <div className="w-12 h-12 border border-[#00CCFF]/40 rounded-full animate-rotate-slow-reverse" />
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-stagger"
          style={{ animationDelay: "0.8s" }}
        >
          <Button
            size="lg"
            className="bg-[#0066FF] text-white font-serif px-16 py-6 text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_#0066FF,0_0_40px_#00CCFF,0_0_60px_#0066FF] hover:shadow-[0_0_30px_#0066FF,0_0_60px_#00CCFF,0_0_90px_#0066FF] animate-pulsate"
          >
            Explore Constellations
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#00CCFF] text-[#00CCFF] font-serif px-16 py-6 text-xl rounded-full hover:bg-[#00CCFF]/10 transition-all duration-300 bg-transparent backdrop-blur-sm"
          >
            View Roadmap
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulsate {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1.0; }
        }
        @keyframes light-slash {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes fade-in-stagger {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes brownian-motion {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(calc(var(--random-x) * 10px), calc(var(--random-y) * 10px)); }
          50% { transform: translate(calc(var(--random-x) * -10px), calc(var(--random-y) * 10px)); }
          75% { transform: translate(calc(var(--random-x) * 10px), calc(var(--random-y) * -10px)); }
        }
        @keyframes flicker {
          0%, 100% { opacity: var(--initial-opacity); }
          50% { opacity: calc(var(--initial-opacity) * 1.5); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-slow-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-pulsate { animation: pulsate 2s ease-in-out infinite alternate; }
        .animate-light-slash { animation: light-slash 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-fade-in-stagger { animation: fade-in-stagger 1s ease-out forwards; opacity: 0; }
        .animate-brownian-motion {
          animation: brownian-motion var(--animation-duration) ease-in-out infinite alternate;
          --random-x: ${Math.random() * 2 - 1};
          --random-y: ${Math.random() * 2 - 1};
          --animation-duration: ${15 + Math.random() * 10}s;
        }
        .animate-flicker {
          animation: flicker var(--animation-duration) ease-in-out infinite alternate;
          --initial-opacity: ${0.2 + Math.random() * 0.6};
          --animation-duration: ${3 + Math.random() * 4}s;
        }
        .animate-rotate-slow { animation: rotate-slow 60s linear infinite; }
        .animate-rotate-slow-reverse { animation: rotate-slow-reverse 60s linear infinite; }
      `}</style>
    </div>
  )
}
