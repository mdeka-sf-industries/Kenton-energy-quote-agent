'use client'

import Image from 'next/image'

interface Testimonial {
  name: string
  location: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Richa Misra',
    location: 'San Francisco East, California',
    quote: 'Unmatched coverage and stellar customer service!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&auto=format',
  },
  {
    name: 'Tom Hardy',
    location: 'Greater Los Angeles, CA',
    quote: 'Monitor Energy usage and pay for just what you use.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
  },
  {
    name: 'Rick Schezche',
    location: 'Atlanta Metropolitan Area, GA',
    quote: 'Clean energy options that make me feel sustainable and proud.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format',
  },
]

export default function Testimonials() {
  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-6 border border-kenton-primary-light">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 bg-gray-50 rounded-3xl border border-gray-200"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                {testimonial.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{testimonial.location}</p>
              <p className="text-sm text-gray-700">{testimonial.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

