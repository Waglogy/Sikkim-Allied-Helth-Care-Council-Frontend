'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      {/* Marquee Strip */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm overflow-hidden">
        <div className="flex items-center">
          <marquee className="flex-1" behavior="scroll" direction="left" scrollamount="5">
            <span className="font-semibold">
              Official Website of Sikkim State Allied & Healthcare Council | 
              📞 Contact: +91-3592-XXXXXX | 
              ✉️ Email: info@sahealthcouncil.gov.in | 
              📍 Office: Gangtok, Sikkim&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Official Website of Sikkim State Allied & Healthcare Council | 
              📞 Contact: +91-3592-XXXXXX | 
              ✉️ Email: info@sahealthcouncil.gov.in | 
              📍 Office: Gangtok, Sikkim&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Official Website of Sikkim State Allied & Healthcare Council | 
              📞 Contact: +91-3592-XXXXXX | 
              ✉️ Email: info@sahealthcouncil.gov.in | 
              📍 Office: Gangtok, Sikkim
            </span>
          </marquee>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border relative bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-start gap-4">
          {/* Logo */}
          <div className="w-16 h-16 flex-shrink-0">
            <Image 
              src="/LOGO.png" 
              alt="Sikkim State Allied & Healthcare Council Logo" 
              width={64} 
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary">
              Sikkim State Allied & Healthcare Council
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Statutory Body under Government of Sikkim
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-6 py-3 text-sm">
            <Link href="/" className="text-primary-foreground hover:underline font-semibold">
              Home
            </Link>
            <div className="group relative">
              <button className="text-primary-foreground hover:underline font-semibold flex items-center gap-1">
                About Us
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-background border border-border shadow-lg z-50 min-w-max">
                <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Overview
                </Link>
                <Link href="/about?tab=vision" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Vision & Mission
                </Link>
                <Link href="/about?tab=structure" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Council Structure
                </Link>
              </div>
            </div>
            <div className="group relative">
              <button className="text-primary-foreground hover:underline font-semibold flex items-center gap-1">
                Acts & Rules
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-background border border-border shadow-lg z-50 min-w-max">
                <Link href="/acts-rules" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Act & Regulations
                </Link>
                <Link href="/acts-rules?tab=notifications" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Notifications
                </Link>
              </div>
            </div>
            <div className="group relative">
              <button className="text-primary-foreground hover:underline font-semibold flex items-center gap-1">
                Registers
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-background border border-border shadow-lg z-50 min-w-max">
                <Link href="/registers?type=professional" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Professional Register
                </Link>
                <Link href="/registers?type=institution" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Institution Register
                </Link>
              </div>
            </div>
            <div className="group relative">
              <button className="text-primary-foreground hover:underline font-semibold flex items-center gap-1">
                Information
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-background border border-border shadow-lg z-50 min-w-max">
                <Link href="/information?tab=recognition" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Recognition
                </Link>
                <Link href="/information?tab=ethics" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Code of Ethics
                </Link>
                <Link href="/information?tab=circulars" className="block px-4 py-2 text-foreground hover:bg-muted">
                  Circulars & Notices
                </Link>
              </div>
            </div>
            <Link href="/contact" className="text-primary-foreground hover:underline font-semibold">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
