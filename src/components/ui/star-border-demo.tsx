import { StarBorder } from "@/components/ui/star-border"

export function StarBorderDemo() {
  return (
    <div className="space-y-8 p-8 bg-black-space min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white-pure mb-8">Star Border Components</h1>
        
        <div className="space-y-6">
          {/* Default cosmic blue */}
          <div className="flex justify-center">
            <StarBorder>
              <span className="text-white-pure font-medium">Cosmic Border</span>
            </StarBorder>
          </div>

          {/* Primary blue variant */}
          <div className="flex justify-center">
            <StarBorder color="#0066FF">
              <span className="text-white-pure font-medium">Primary Blue Border</span>
            </StarBorder>
          </div>

          {/* Cyan electric variant */}
          <div className="flex justify-center">
            <StarBorder color="#00CCFF">
              <span className="text-white-pure font-medium">Cyan Electric Border</span>
            </StarBorder>
          </div>

          {/* Custom speed */}
          <div className="flex justify-center">
            <StarBorder speed="3s">
              <span className="text-white-pure font-medium">Fast Animation</span>
            </StarBorder>
          </div>

          {/* Slow animation */}
          <div className="flex justify-center">
            <StarBorder speed="10s">
              <span className="text-white-pure font-medium">Slow Animation</span>
            </StarBorder>
          </div>

          {/* As a link */}
          <div className="flex justify-center">
            <StarBorder as="a" href="#" className="no-underline">
              <span className="text-white-pure font-medium">Link Border</span>
            </StarBorder>
          </div>

          {/* Custom styling */}
          <div className="flex justify-center">
            <StarBorder className="text-lg font-bold">
              <span className="text-white-pure">Custom Styled</span>
            </StarBorder>
          </div>
        </div>
      </div>
    </div>
  )
} 