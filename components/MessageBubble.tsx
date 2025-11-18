'use client'

import Image from 'next/image'

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp?: Date
}

export default function MessageBubble({
  message,
  isUser,
  timestamp,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in gap-2`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1.5">
          <Image
            src="/logo-avatar.png"
            alt="Kenton Energy"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-kenton-primary text-white rounded-br-sm'
            : 'bg-white text-gray-800 border border-kenton-primary-light rounded-bl-sm shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser ? 'text-blue-50' : 'text-gray-500'
            }`}
          >
            {timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  )
}

