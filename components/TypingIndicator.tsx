'use client'

import Image from 'next/image'

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-4 animate-fade-in">
      <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1.5">
        <Image
          src="/logo-avatar.png"
          alt="Kenton Energy"
          width={20}
          height={20}
          className="object-contain opacity-60"
        />
      </div>
      <div className="bg-white border border-kenton-primary-light rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
        </div>
      </div>
    </div>
  )
}

