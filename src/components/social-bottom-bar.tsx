"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SocialBottomBar() {
  const [copied, setCopied] = useState(false)
  
  // Placeholder contract address sostituire con l'indirizzo reale
  const contractAddress = "0xE1270268Fa6FcEF965958Bf2F24e09d70Deed06f"
  
  const handleCopyContract = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy contract address:", err)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-[#00CCFF]/20 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Contract Address Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-[#E6F3FF] text-xs sm:text-sm font-trajan opacity-80">
              Contract:
            </span>
            <span className="text-[#00CCFF] text-xs sm:text-sm font-trajan">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyContract}
              className="text-[#00CCFF]/70 hover:text-[#00CCFF] hover:bg-[#00CCFF]/5 transition-all duration-300 font-trajan px-1 sm:px-2 py-1 text-xs"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          {/* Email Section - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <a
              href="mailto:hello@zodia.world"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 text-xs sm:text-sm"
            >
              <span className="font-trajan">hello</span>
              <span className="font-sans">@</span>
              <span className="font-trajan">zodia.world</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center -space-x-2 sm:space-x-3">
            {/* X/Twitter */}
            <a
              href="https://x.com/Zodia_agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1 sm:p-1.5 rounded-md hover:bg-[#00CCFF]/10"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* DeXtools */}
            <a
              href="https://www.dextools.io/app/ethereum/pair-explorer/0xE1270268Fa6FcEF965958Bf2F24e09d70Deed06f"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1 sm:p-1.5 rounded-md hover:bg-[#00CCFF]/10"
            >
              <img src="/dext.svg" alt="DeXtools" className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>


          </div>
        </div>
      </div>
    </div>
  )
} 