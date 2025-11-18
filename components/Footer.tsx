'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-kenton-secondary text-white mt-16 relative pb-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Kenton Energy Logo"
                width={200}
                height={80}
                className="h-12 w-auto brightness-0 invert"
                style={{ height: 'auto', width: 'auto' }}
              />
            </div>
            <p className="text-sm text-blue-100 mb-4">
              Kenton provides progressive, and affordable energy. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="bg-kenton-primary hover:bg-kenton-primary/90 text-white px-6 py-2 rounded-3xl font-medium text-sm transition-colors">
              Get Personalised Quote
            </button>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Find a service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Apps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Region</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Indonesia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Singapore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hongkong
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Canada
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instructions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  How it works
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-4 pb-3 relative z-10">
          <p className="text-sm text-blue-200">
            ©KENTON PVT LTD 2022. All rights reserved
          </p>
        </div>
      </div>
      
      {/* Cityscape Illustration - Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <Image
          src="/cityscape-footer.png"
          alt="Sustainable cityscape with renewable energy"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </footer>
  )
}

