'use client'

import { Address } from '@/lib/addressData'

interface AddressDropdownProps {
  addresses: Address[]
  onSelect: (address: Address | null) => void
  onClose: () => void
}

export default function AddressDropdown({
  addresses,
  onSelect,
  onClose,
}: AddressDropdownProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-[100] max-h-64 overflow-y-auto">
      {addresses.map((address) => (
        <button
          key={address.id}
          onClick={() => {
            onSelect(address)
            onClose()
          }}
          className="w-full text-left px-3 py-2 hover:bg-blue-50 active:bg-blue-100 transition-colors border-b border-gray-100 last:border-0"
        >
          <div className="font-normal text-gray-900 text-sm">{address.address}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {address.city}, {address.state} {address.postalCode}
          </div>
        </button>
      ))}
      <button
        onClick={() => {
          onSelect(null)
          onClose()
        }}
        className="w-full text-left px-3 py-2 hover:bg-blue-50 active:bg-blue-100 transition-colors border-t border-gray-200"
      >
        <div className="font-normal text-gray-900 text-sm">My address is not listed</div>
      </button>
    </div>
  )
}

