"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const zodiacGeometries = [
  { symbol: "⬢", color: "#0066FF" }, // Hexagon
  { symbol: "▲", color: "#00CCFF" }, // Triangle
  { symbol: "◆", color: "#0066FF" }, // Rhombus
  { symbol: "★", color: "#00CCFF" }, // Star
]

export default function OrbitalMotion() {
  const [showSlash, setShowSlash] = useState(false)

  useEffect(() => {
    const slashTimer = setInterval(() => {
      setShowSlash(true)
      const timeout = setTimeout(() => setShowSlash(false), 1200) // Durata slash 1.2s
      return () => clearTimeout(timeout)
    }, 4500) // Ogni 4.5 secondi

    return () => clearInterval(slashTimer)
  }, [])

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-radial from-[#001133] via-[#000011] to-[#000000] p-4 sm:p-8 md:p-12 lg:p-20">
      {/* Background Elements */}
      {/* Stars */}
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
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

      {/* Central ZODIA Logo (Text) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h2
          className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00CCFF] to-[#FFFFFF] animate-pulsate"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            textShadow: "0 0 10px #0066FF, 0 0 20px #00CCFF, 0 0 30px #0066FF",
            filter: "drop-shadow(0 0 15px #0066FF) drop-shadow(0 0 30px #00CCFF)",
          }}
        >
          ZODIA
        </h2>
      </div>

      {/* Orbital Rings and Particles */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className={`absolute inset-0 flex items-center justify-center animate-spin-slow-${ring}`}
          style={{ animationDuration: `${30 + ring * 15}s` }} // 30s, 45s, 60s
        >
          <div
            className="rounded-full border border-[#00CCFF]/30"
            style={{
              width: `${200 + ring * 150}px`,
              height: `${200 + ring * 150}px`,
            }}
          >
            {/* Orbital Particles */}
            {[...Array(ring * 4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-[#00CCFF] rounded-full shadow-[0_0_15px_#00CCFF] animate-flicker"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${(360 / (ring * 4)) * i}deg) translateX(${100 + ring * 75}px) translateY(-50%)`,
                  animationDelay: `${Math.random() * 7}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Zodiacal Geometries */}
      {zodiacGeometries.map((geo, i) => (
        <div
          key={i}
          className="absolute text-5xl font-space-mono animate-rotate-slow animate-scale-breathing"
          style={{
            color: geo.color,
            opacity: 0.4,
            animationDelay: `${i * 5}s`,
            animationDuration: `60s`,
            transform: `rotate(${i * 90}deg) translateX(${200 + i * 50}px) translateY(${
              i * 30
            }px) scale(var(--scale-breathing))`,
            zIndex: 1,
          }}
        >
          {geo.symbol}
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center z-20 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
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
            className="font-orbitron font-medium text-[#E6F3FF] tracking-[0.2em] animate-fade-in-stagger"
            style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", animationDelay: "0.2s" }}
          >
            ORBITAL DYNAMICS
          </p>
          {/* Light Slash Effect */}
          {showSlash && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-light-slash-center">
                <div
                  className="absolute w-[3px] h-full bg-white shadow-[0_0_8px_#00CCFF] transform -rotate-45 origin-top-left"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #FFFFFF, transparent)",
                    width: "3px",
                    height: "150%",
                    left: "50%", // Start from center
                    top: "-25%",
                    transform: "translateX(-50%) rotate(45deg)",
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
          Experience the gravitational pull of cosmic cryptocurrency where celestial mechanics drive digital value.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-stagger"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className="bg-[#0066FF] text-white font-serif px-16 py-6 text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_#0066FF,0_0_40px_#00CCFF,0_0_60px_#0066FF] hover:shadow-[0_0_30px_#0066FF,0_0_60px_#00CCFF,0_0_90px_#0066FF] animate-pulsate"
          >
            Enter Orbit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#00CCFF] text-[#00CCFF] font-serif px-16 py-6 text-xl rounded-full hover:bg-[#00CCFF]/10 transition-all duration-300 bg-transparent backdrop-blur-sm"
          >
            Gravitational Map
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulsate {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1.0; }
        }
        @keyframes light-slash-center {
          0% { transform: translateX(-50%) translateY(-50%) rotate(45deg); }
          100% { transform: translateX(50%) translateY(50%) rotate(45deg); }
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
        @keyframes spin-slow-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-2 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scale-breathing {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1.05); }
        }

        .animate-pulsate { animation: pulsate 2s ease-in-out infinite alternate; }
        .animate-light-slash-center { animation: light-slash-center 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
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
        .animate-spin-slow-1 { animation: spin-slow-1 30s linear infinite; }
        .animate-spin-slow-2 { animation: spin-slow-2 45s linear infinite; }
        .animate-spin-slow-3 { animation: spin-slow-3 60s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 60s linear infinite; }
        .animate-scale-breathing { animation: scale-breathing 5s ease-in-out infinite alternate; }
      `}</style>
    </div>
  )
}
