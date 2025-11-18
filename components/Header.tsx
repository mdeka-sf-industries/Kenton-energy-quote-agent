'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Kenton Energy Logo"
                width={200}
                height={80}
                className="h-12 w-auto"
                priority
                style={{ height: 'auto', width: 'auto' }}
              />
            </div>
            <nav className="ml-8">
              <a
                href="#"
                className="text-kenton-primary font-medium border-b-2 border-kenton-primary pb-1"
              >
                Home
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-kenton-secondary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm">Hello, Sign in?</span>
          </div>
        </div>
      </div>
    </header>
  )
}

