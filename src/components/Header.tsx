"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Palmtree } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Packing List", href: "#packing" },
  { name: "Destinations", href: "#destinations" },
  { name: "Tools", href: "#tools" },
  { name: "Gallery", href: "#gallery" },
]

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Palmtree className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-800">TravelExplorer</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-800 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
            <button className="btn btn-primary">Plan Trip</button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="btn btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
                Plan Trip
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
