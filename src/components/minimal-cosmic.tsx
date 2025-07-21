"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function MinimalCosmic() {
  const [text, setText] = useState("")
  const fullText = "ZODIA CRYPTO"
  const [showSlash, setShowSlash] = useState(false)

  useEffect(() => {
    let index = 0
    const typewriterTimer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typewriterTimer)
      }
    }, 50) // Velocità 50ms per carattere

    const slashTimer = setInterval(() => {
      setShowSlash(true)
      const timeout = setTimeout(() => setShowSlash(false), 1200) // Durata slash 1.2s
      return () => clearTimeout(timeout)
    }, 6000) // Ogni 6 secondi

    return () => {
      clearInterval(typewriterTimer)
      clearInterval(slashTimer)
    }
  }, [fullText])

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
            animationDelay: `${Math.random() * 7}s`, // Flicker random 3-7s
            animationDuration: `${3 + Math.random() * 4}s`,
            zIndex: 0,
          }}
        />
      ))}
      {/* Nebula */}
      <div className="absolute inset-0 bg-[#0066FF] opacity-[0.12] blur-[80px] rounded-full w-[80vw] h-[80vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
      {/* Thin Grid (Hexagonal/Triangular - simplified with lines) */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border border-[#0066FF]/10" />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-[#00CCFF] rounded-full shadow-[0_0_10px_#00CCFF] animate-brownian-motion"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            animationDelay: `${Math.random() * 25}s`, // Random 15-25s
            animationDuration: `${15 + Math.random() * 10}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="text-center z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <h1
          className="font-serif font-bold mb-12 relative inline-block"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            color: "transparent",
            backgroundClip: "text",
            backgroundImage: "linear-gradient(to right, #0066FF, #00CCFF, #FFFFFF)",
            textShadow: "0 0 10px #0066FF, 0 0 20px #00CCFF, 0 0 30px #0066FF",
            filter: "drop-shadow(0 0 15px #0066FF) drop-shadow(0 0 30px #00CCFF)",
          }}
        >
          <span className="inline-block animate-pulsate">{text}</span>
          <span className="animate-blink">|</span>
          {/* Light Slash Effect */}
          {showSlash && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-light-slash">
                <div
                  className="absolute w-[3px] h-full bg-white shadow-[0_0_8px_#00CCFF] transform -rotate-45 origin-top-left"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #FFFFFF, transparent)",
                    width: "3px",
                    height: "150%", // Ensure it covers the whole text diagonally
                    left: "-50%", // Start off-screen
                    top: "-25%",
                  }}
                />
              </div>
            </div>
          )}
        </h1>

        <p
          className="font-sans font-medium text-[#E6F3FF] mb-16 opacity-90 animate-fade-in-stagger"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", animationDelay: "0.2s" }}
        >
          The Future of Zodiacal Cryptocurrency
        </p>

        <Button
          size="lg"
          className="bg-[#0066FF] text-white font-serif px-16 py-6 text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_#0066FF,0_0_40px_#00CCFF,0_0_60px_#0066FF] hover:shadow-[0_0_30px_#0066FF,0_0_60px_#00CCFF,0_0_90px_#0066FF] animate-pulsate"
          style={{ animationDelay: "0.4s" }}
        >
          Enter the Cosmos
        </Button>
      </div>

      <style jsx>{`
        @keyframes pulsate {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1.0; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
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

        .animate-pulsate { animation: pulsate 2s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1s infinite; }
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
      `}</style>
    </div>
  )
}
