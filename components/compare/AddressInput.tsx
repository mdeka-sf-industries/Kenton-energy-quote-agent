'use client'

import { useState, useEffect, useRef } from 'react'
import { searchAddresses, SearchableAddress } from '@/lib/addressSearchData'

interface AddressInputProps {
  value: string
  onChange?: (value: string) => void
}

export default function AddressInput({ value, onChange }: AddressInputProps) {
  const [searchQuery, setSearchQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<SearchableAddress[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update search query when value prop changes externally
  useEffect(() => {
    setSearchQuery(value)
  }, [value])

  // Search for addresses as user types
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchAddresses(searchQuery)
      setSuggestions(results)
      setShowDropdown(results.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
  }, [searchQuery])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchQuery(newValue)
    onChange?.(newValue)
    setShowDropdown(true)
  }

  // Handle address selection
  const handleSelectAddress = (address: SearchableAddress) => {
    setSearchQuery(address.fullAddress)
    onChange?.(address.fullAddress)
    setShowDropdown(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectAddress(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 font-semibold">{part}</mark>
      ) : (
        part
      )
    )
  }

  const hasValidAddress = value && suggestions.some(s => s.fullAddress === value)

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowDropdown(true)
          }
        }}
        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent text-gray-900 placeholder-gray-400"
        placeholder="Start typing your address..."
        autoComplete="off"
      />
      {hasValidAddress && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 z-10">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {/* Dropdown Suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto"
        >
          {suggestions.map((address, index) => (
            <button
              key={address.id}
              type="button"
              onClick={() => handleSelectAddress(address)}
              className={`w-full text-left px-4 py-3 hover:bg-kenton-primary-light transition-colors rounded-xl ${
                index === selectedIndex ? 'bg-kenton-primary-light' : ''
              } ${index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {highlightMatch(address.fullAddress, searchQuery)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {address.suburb}, {address.state} {address.postcode}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showDropdown && searchQuery.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            No addresses found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  )
}

