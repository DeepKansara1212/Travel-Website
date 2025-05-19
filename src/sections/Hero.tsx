import type React from "react"
import { ArrowRight, Compass } from "lucide-react"

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/30" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Explore The World, <span className="text-primary-400">One Adventure</span> At A Time
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 mr-12">
            Plan, organize, and optimize your travels with our comprehensive suite of tools designed for modern
            adventurers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#packing" className="btn btn-primary flex items-center justify-center">
              Start Planning <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#destinations"
              className="btn bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center"
            >
              Discover Destinations <Compass className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a href="#packing" className="animate-bounce bg-white p-2 rounded-full text-gray-900" aria-label="Scroll down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero
