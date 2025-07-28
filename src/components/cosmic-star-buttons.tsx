"use client"

import { StarBorder } from "@/components/ui/star-border"
import { Button } from "@/components/ui/button"
import { RainbowButton } from "@/components/ui/rainbow-button"

export default function CosmicStarButtons() {
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
          <span className="inline-block animate-pulsate">RAINBOW BUTTONS</span>
        </h1>

        <p
          className="font-sans font-medium text-[#E6F3FF] mb-16 opacity-90 animate-fade-in-stagger"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", animationDelay: "0.2s" }}
        >
          Cosmic Rainbow Collection
        </p>

        {/* Rainbow Buttons */}
        <div className="space-y-8 flex flex-col items-center">
          {/* Main Rainbow Button */}
          <div className="flex justify-center">
            <RainbowButton className="text-lg font-medium px-12 py-4">
              Cosmic Rainbow
            </RainbowButton>
          </div>

          {/* Large Rainbow Button */}
          <div className="flex justify-center">
            <RainbowButton className="text-xl font-bold px-16 py-6">
              Stellar Rainbow
            </RainbowButton>
          </div>

          {/* Small Rainbow Button */}
          <div className="flex justify-center">
            <RainbowButton className="text-sm font-medium px-8 py-3">
              Mini Rainbow
            </RainbowButton>
          </div>

          {/* Rainbow Button as Link */}
          <div className="flex justify-center">
            <a href="#" className="inline-block">
              <RainbowButton className="text-lg font-medium px-12 py-4">
                Rainbow Link
              </RainbowButton>
            </a>
          </div>

          {/* Custom Styled Rainbow Button */}
          <div className="flex justify-center">
            <RainbowButton className="text-xl font-serif font-bold px-16 py-6 rounded-2xl">
              Custom Rainbow
            </RainbowButton>
          </div>

          {/* Star Border Buttons for Comparison */}
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#E6F3FF] mb-8">Star Border Collection</h2>
            
            {/* Default Star Border */}
            <div className="flex justify-center">
              <StarBorder>
                <span className="text-white-pure font-medium">Cosmic Border</span>
              </StarBorder>
            </div>

            {/* Primary Blue Star Border */}
            <div className="flex justify-center">
              <StarBorder color="#0066FF">
                <span className="text-white-pure font-medium">Primary Blue</span>
              </StarBorder>
            </div>

            {/* Cyan Electric Star Border */}
            <div className="flex justify-center">
              <StarBorder color="#00CCFF">
                <span className="text-white-pure font-medium">Cyan Electric</span>
              </StarBorder>
            </div>

            {/* Fast Animation */}
            <div className="flex justify-center">
              <StarBorder speed="3s" color="#00CCFF">
                <span className="text-white-pure font-medium">Fast Animation</span>
              </StarBorder>
            </div>

            {/* Slow Animation */}
            <div className="flex justify-center">
              <StarBorder speed="10s" color="#0066FF">
                <span className="text-white-pure font-medium">Slow Animation</span>
              </StarBorder>
            </div>

            {/* As Link */}
            <div className="flex justify-center">
              <StarBorder as="a" href="#" color="#00CCFF">
                <span className="text-white-pure font-medium">Link Border</span>
              </StarBorder>
            </div>

            {/* Custom Styled */}
            <div className="flex justify-center">
              <StarBorder className="text-lg font-bold" color="#0066FF">
                <span className="text-white-pure">Custom Styled</span>
              </StarBorder>
            </div>

            {/* Original Button for Comparison */}
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                className="bg-[#0066FF] text-white font-serif px-16 py-6 text-xl rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_#0066FF,0_0_40px_#00CCFF,0_0_60px_#0066FF] hover:shadow-[0_0_30px_#0066FF,0_0_60px_#00CCFF,0_0_90px_#0066FF] animate-pulsate"
              >
                Original Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulsate {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1.0; }
        }
        @keyframes fade-in-stagger {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: var(--initial-opacity); }
          50% { opacity: calc(var(--initial-opacity) * 1.5); }
        }

        .animate-pulsate { animation: pulsate 2s ease-in-out infinite alternate; }
        .animate-fade-in-stagger { animation: fade-in-stagger 1s ease-out forwards; opacity: 0; }
        .animate-flicker {
          animation: flicker var(--animation-duration) ease-in-out infinite alternate;
          --initial-opacity: ${0.2 + Math.random() * 0.6};
          --animation-duration: ${3 + Math.random() * 4}s;
        }
      `}</style>
    </div>
  )
} 