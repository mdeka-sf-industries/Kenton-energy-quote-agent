'use client'

import { Address } from '@/lib/addressData'

interface AddressSelectorProps {
  addresses: Address[]
  onSelect: (address: Address) => void
  postcode: string
}

export default function AddressSelector({
  addresses,
  onSelect,
  postcode,
}: AddressSelectorProps) {
  return (
    <div className="mt-3 bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] border border-kenton-primary-light overflow-hidden">
      <div className="px-4 py-3 border-b border-kenton-primary-light">
        <h3 className="font-medium text-gray-900 text-sm">Select address</h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {addresses.map((address) => (
          <button
            key={address.id}
            onClick={() => onSelect(address)}
            className="w-full text-left px-4 py-3 hover:bg-kenton-primary-light transition-colors border-b border-kenton-primary-light last:border-b-0"
          >
            <div className="font-medium text-gray-900 text-sm">{address.address}</div>
            <div className="text-xs text-gray-500 mt-1">
              {address.city}, {address.state} {address.postalCode}
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-kenton-primary-light">
        <button className="text-sm text-kenton-primary hover:text-kenton-secondary underline">
          I can&apos;t find my address
        </button>
      </div>
    </div>
  )
}

