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
      {/* Desktop Layout */}
      <div className="hidden sm:block max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Contract Address Section */}
          <div className="flex items-center space-x-3">
            <span className="text-[#E6F3FF] text-sm font-trajan opacity-80">
              Contract:
            </span>
            <span className="text-[#00CCFF] text-sm font-trajan">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyContract}
              className="text-[#00CCFF]/70 hover:text-[#00CCFF] hover:bg-[#00CCFF]/5 transition-all duration-300 font-trajan px-2 py-1 text-xs"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          {/* Email Section - Center */}
          <div className="flex items-center">
            <a
              href="mailto:hello@zodia.world"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 text-sm"
            >
              <span className="font-trajan">hello</span>
              <span className="font-sans">@</span>
              <span className="font-trajan">zodia.world</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {/* X/Twitter */}
            <a
              href="https://x.com/Zodia_agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1.5 rounded-md hover:bg-[#00CCFF]/10"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* DeXtools */}
            <a
              href="https://www.dextools.io/app/ethereum/pair-explorer/0xE1270268Fa6FcEF965958Bf2F24e09d70Deed06f"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1.5 rounded-md hover:bg-[#00CCFF]/10"
            >
              <img src="/dext.svg" alt="DeXtools" className="w-7 h-7" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/zodiatg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1.5 rounded-md hover:bg-[#00CCFF]/10"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden px-3 py-1">
        {/* Top Row - Social Icons Centered */}
        <div className="flex items-center justify-center space-x-6 mb-1">
          {/* X/Twitter */}
          <a
            href="https://x.com/Zodia_agent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1 rounded-md hover:bg-[#00CCFF]/10"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* DeXtools */}
          <a
            href="https://www.dextools.io/app/ethereum/pair-explorer/0xE1270268Fa6FcEF965958Bf2F24e09d70Deed06f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1 rounded-md hover:bg-[#00CCFF]/10"
          >
            <img src="/dext.svg" alt="DeXtools" className="w-6 h-6" />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/zodiatg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 p-1 rounded-md hover:bg-[#00CCFF]/10"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Row - Contract and Email */}
        <div className="flex items-center justify-between">
          {/* Contract Address - Bottom Left */}
          <div className="flex items-center space-x-1">
            <span className="text-[#E6F3FF] text-xs font-trajan opacity-80">
              Contract:
            </span>
            <span className="text-[#00CCFF] text-xs font-trajan">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyContract}
              className="text-[#00CCFF]/70 hover:text-[#00CCFF] hover:bg-[#00CCFF]/5 transition-all duration-300 font-trajan px-1 py-1 text-xs"
            >
              {copied ? "✓" : "Copy"}
            </Button>
          </div>

          {/* Email - Bottom Right */}
          <a
            href="mailto:hello@zodia.world"
            className="text-[#E6F3FF] hover:text-[#00CCFF] transition-colors duration-300 text-xs"
          >
            <span className="font-trajan">hello</span>
            <span className="font-sans">@</span>
            <span className="font-trajan">zodia.world</span>
          </a>
        </div>
      </div>
    </div>
  )
} 