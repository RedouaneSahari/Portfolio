"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#hero", label: "Accueil" },
    { href: "#about", label: "À propos" },
    { href: "#skills", label: "Compétences" },
    { href: "#experience", label: "Expériences" },
    { href: "#education", label: "Formations" },
    { href: "#projects", label: "Projets" },
    { href: "#contact", label: "Contact" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a1628]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,217,255,0.15)]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-2xl font-bold text-[#00d9ff]" onClick={(e) => scrollToSection(e, "#hero")}>
            Redouane Sahari
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-[#ccd6f6] hover:text-[#00d9ff] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {!isMobileMenuOpen ? (
              <>
                <span className="w-6 h-0.5 bg-[#00d9ff] transition-all duration-300" />
                <span className="w-6 h-0.5 bg-[#00d9ff] transition-all duration-300" />
                <span className="w-6 h-0.5 bg-[#00d9ff] transition-all duration-300" />
              </>
            ) : (
              <X className="w-6 h-6 text-[#00d9ff]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <ul className="md:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-[#2a3544] pt-4 bg-[#0a1628]/98">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block py-2 text-[#ccd6f6] hover:text-[#00d9ff] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
