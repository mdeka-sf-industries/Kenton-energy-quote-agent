'use client'

export default function EVPromotionCard() {
  return (
    <div className="bg-[#E3F3FF] border border-[#B3D9FF] rounded-2xl p-5 max-w-md">
      <div className="flex items-start gap-3">
        {/* EV Charger Illustration */}
        <div className="flex-shrink-0 mt-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Charging station base */}
            <rect
              x="6"
              y="20"
              width="20"
              height="8"
              rx="1"
              fill="#014486"
            />
            {/* Charging station pole */}
            <rect
              x="13"
              y="8"
              width="6"
              height="12"
              rx="1"
              fill="#014486"
            />
            {/* Charging connector */}
            <rect
              x="10"
              y="4"
              width="12"
              height="6"
              rx="1"
              fill="#0176D3"
            />
            {/* Charging indicator light */}
            <circle
              cx="16"
              cy="7"
              r="1.5"
              fill="#4CAF50"
            />
            {/* Charging cable */}
            <path
              d="M16 10L16 20"
              stroke="#014486"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Lightning bolt inside connector */}
            <path
              d="M14 5L16 7L15 7L18 11L16 9L17 9L14 5Z"
              fill="#FCD34D"
            />
          </svg>
        </div>
        
        <div className="flex-1">
          {/* Heading */}
          <div className="mb-2">
            <div className="text-sm font-bold text-[#014486] mb-1">
              Because you have an EV
            </div>
            <div className="text-base font-bold text-[#014486]">
              Save up to £38 a month on your bill
            </div>
          </div>
          
          {/* Body Text */}
          <p className="text-sm text-[#014486] mb-3 leading-relaxed">
            With Charge Anytime you can charge your car at home, or on the go, for one fixed monthly payment. Or choose to pay as you go for a discounted home charging rate. Simply add a Charge Anytime plan to any Kenton tariff.
          </p>
          
          {/* Link */}
          <a
            href="#"
            className="text-sm text-[#014486] underline hover:text-[#012D5C] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              // Handle click - could open a modal or navigate
            }}
          >
            See how it works
          </a>
        </div>
      </div>
    </div>
  )
}

