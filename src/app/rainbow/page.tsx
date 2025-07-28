"use client"

export default function RainbowPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <button 
          className="relative inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium text-white bg-black border-0 shadow-lg"
          style={{
            position: 'relative',
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)',
            backgroundSize: '200% 100%',
            animation: 'rainbow 2s linear infinite',
            padding: '2px'
          }}
        >
          <span 
            className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium bg-black text-white"
            style={{
              background: 'black',
              borderRadius: '8px'
            }}
          >
            Get Unlimited Access
          </span>
        </button>
        <p className="text-gray-600 mt-4">Pulsante con bordo arcobaleno</p>
      </div>
    </div>
  );
} 