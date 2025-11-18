'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import MessageBubble from './MessageBubble'
import TariffCard, { TariffPlan } from './TariffCard'
import AddressDropdown from './AddressDropdown'
import TypingIndicator from './TypingIndicator'
import EVPromotionCard from './EVPromotionCard'
import { TARIFF_PLANS, ChatMessage } from '@/lib/chatData'
import { getAddressesByPostcode, Address } from '@/lib/addressData'

interface ChatWidgetProps {
  onClose: () => void
  initialPostcode?: string
  initialViewMode?: ViewMode
}

type ViewMode = 'modal' | 'panel' | 'fullscreen'

type DetailStep = 
  | 'address-selected'
  | 'home-setup'
  | 'confirm-meter-details'
  | 'edit-meter-details'
  | 'meter-type-electricity'
  | 'payment-method-electricity'
  | 'meter-type-gas'
  | 'payment-method-gas'
  | 'payment-method'
  | 'payment-frequency'
  | 'property-owner'
  | 'know-usage'
  | 'bedrooms'
  | 'electric-vehicle'
  | 'energy-usage-input'
  | 'enrollment-form'
  | 'complete'

interface CustomerDetails {
  address: Address | null
  electricityMeterType: 'Smart meter' | 'Standard meter' | null
  electricityPaymentMethod: 'Direct Debit' | 'Prepayment' | 'Pay on receipt' | null
  gasMeterType: 'Smart meter' | 'Standard meter' | null
  gasPaymentMethod: 'Direct Debit' | 'Prepayment' | 'Pay on receipt' | null
  paymentMethod: 'Direct Debit' | 'Prepayment' | 'Pay on receipt' | null
  paymentFrequency: 'Monthly' | 'Annually' | null
  isPropertyOwner: boolean | null
  knowsUsage: boolean | null
  bedrooms: '1-2 bedrooms' | '3 bedrooms' | '4+ bedrooms' | null
  electricityUsage: number | null // in kWh
  gasUsage: number | null // in kWh
  hasElectricVehicle: boolean | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  email: string | null
  dateOfBirth: string | null
}

const GREETING_MESSAGE =
  "Hi! I'm here to help you get a quote. What's your postcode?"

export default function ChatWidget({ onClose, initialPostcode, initialViewMode = 'modal' }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      text: GREETING_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState(initialPostcode ? initialPostcode.toUpperCase() : '')
  const [addressInputValue, setAddressInputValue] = useState('')
  const [showTariffs, setShowTariffs] = useState(false)
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showAddressDropdown, setShowAddressDropdown] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [postcode, setPostcode] = useState<string | null>(initialPostcode || null)
  const [postcodeProcessed, setPostcodeProcessed] = useState<string | null>(null)
  const postcodeProcessedRef = useRef<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode || 'modal')
  const [panelWidth, setPanelWidth] = useState(504)
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  
  // Details collection state
  const [currentStep, setCurrentStep] = useState<DetailStep | null>(null)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    address: null,
    electricityMeterType: null,
    electricityPaymentMethod: null,
    gasMeterType: null,
    gasPaymentMethod: null,
    paymentMethod: null,
    paymentFrequency: null,
    isPropertyOwner: null,
    knowsUsage: null,
    bedrooms: null,
    electricityUsage: null,
    gasUsage: null,
    hasElectricVehicle: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    dateOfBirth: null,
  })
  
  const [enrollmentFormData, setEnrollmentFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
  })
  const [energyUsageFormData, setEnergyUsageFormData] = useState({
    electricityUsage: '',
    gasUsage: '',
  })
  
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null)

  // Sync viewMode with initialViewMode prop changes
  useEffect(() => {
    setViewMode(initialViewMode || 'modal')
  }, [initialViewMode])

  // If initial postcode is provided, look up addresses and show dropdown
  useEffect(() => {
    if (initialPostcode && initialPostcode.trim() && !selectedAddress) {
      const normalizedPostcode = initialPostcode.trim().toUpperCase()
      
      // Check if already processed
      if (postcodeProcessedRef.current === normalizedPostcode) {
        return
      }
      
      // Check if messages already exist for this postcode
      setMessages((prev) => {
        const hasMessagesForPostcode = prev.some(
          msg => msg.isUser && msg.text === normalizedPostcode
        )
        
        if (hasMessagesForPostcode) {
          postcodeProcessedRef.current = normalizedPostcode
          setPostcodeProcessed(normalizedPostcode)
          return prev
        }
        
        // Process the postcode
        const foundAddresses = getAddressesByPostcode(normalizedPostcode)
        setAddresses(foundAddresses)
        setPostcode(normalizedPostcode)
        setShowAddressDropdown(true)
        postcodeProcessedRef.current = normalizedPostcode
        setPostcodeProcessed(normalizedPostcode)
        // Don't set inputValue here - it's already set from initialPostcode, and will be cleared when address is selected
        
        // Add user message immediately and return updated messages
        const updatedMessages = [
          ...prev,
          {
            id: `user-init-${Date.now()}`,
            text: normalizedPostcode,
            isUser: true,
            timestamp: new Date(),
          },
        ]
        
        // Show typing indicator, then add assistant response after delay
        setIsTyping(true)
        const assistantMessageText = `Great! I found ${foundAddresses.length} address${foundAddresses.length > 1 ? 'es' : ''} for ${normalizedPostcode}. Please select your address from the dropdown below.`
        setTimeout(() => {
          setIsTyping(false)
          setMessages((current) => {
            // Check if this message already exists
            const messageExists = current.some(
              msg => !msg.isUser && msg.text === assistantMessageText
            )
            if (messageExists) {
              return current
            }
            return [
              ...current,
              {
                id: `assistant-init-${Date.now()}`,
                text: assistantMessageText,
                isUser: false,
                timestamp: new Date(),
              },
            ]
          })
        }, 1200 + Math.random() * 800) // 1.2-2 seconds delay
        
        return updatedMessages
      })
    }
  }, [initialPostcode, selectedAddress])
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setShowAddressDropdown(false)
      }
    }

    if (showAddressDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAddressDropdown])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, showTariffs])

  // Handle panel resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = e.clientX
      const minWidth = 300
      const maxWidth = window.innerWidth * 0.8
      setPanelWidth(Math.min(Math.max(newWidth, minWidth), maxWidth))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])


  const handlePostcodeInput = (value: string) => {
    const upperValue = value.toUpperCase()
    setInputValue(upperValue)
    
    // Check if input looks like a postcode
    const postcodeMatch = upperValue.match(/\b\d{4,6}\b|\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b/i)
    if (postcodeMatch && upperValue.trim().length >= 4) {
      const normalizedPostcode = postcodeMatch[0].trim()
      
      // Only process if this is a new postcode
      if (postcodeProcessedRef.current === normalizedPostcode) {
        return
      }
      
      // Check if messages already exist for this postcode
      const hasMessagesForPostcode = messages.some(
        msg => msg.isUser && msg.text === normalizedPostcode
      )
      
      if (hasMessagesForPostcode) {
        postcodeProcessedRef.current = normalizedPostcode
        setPostcodeProcessed(normalizedPostcode)
        return
      }
      
      const foundAddresses = getAddressesByPostcode(normalizedPostcode)
      setAddresses(foundAddresses)
      setPostcode(normalizedPostcode)
      setShowAddressDropdown(true)
      postcodeProcessedRef.current = normalizedPostcode
      setPostcodeProcessed(normalizedPostcode)
      
      // If addresses found, show message to user
      if (foundAddresses.length > 0 && !selectedAddress) {
        // Add user message immediately
        setMessages((prev) => {
          const alreadyExists = prev.some(
            msg => msg.isUser && msg.text === normalizedPostcode
          )
          if (alreadyExists) {
            return prev
          }
          
          return [
            ...prev,
            {
              id: `user-${Date.now()}`,
              text: normalizedPostcode,
              isUser: true,
              timestamp: new Date(),
            },
          ]
        })
        
        // Show typing indicator, then add assistant response after delay
        setIsTyping(true)
        const assistantMessageText = `Great! I found ${foundAddresses.length} address${foundAddresses.length > 1 ? 'es' : ''} for ${normalizedPostcode}. Please select your address from the dropdown below.`
        setTimeout(() => {
          setIsTyping(false)
          setMessages((prev) => {
            // Check if this message already exists
            const messageExists = prev.some(
              msg => !msg.isUser && msg.text === assistantMessageText
            )
            if (messageExists) {
              return prev
            }
            return [
              ...prev,
              {
                id: `assistant-${Date.now()}`,
                text: assistantMessageText,
                isUser: false,
                timestamp: new Date(),
              },
            ]
          })
        }, 1200 + Math.random() * 800) // 1.2-2 seconds delay
      }
    } else {
      setShowAddressDropdown(false)
    }
  }

  // Function to get the next step in the details collection flow
  const getNextStep = (current: DetailStep | null, details: CustomerDetails): DetailStep | null => {
    if (!current || current === 'address-selected') {
      // Auto-detect meter details and show for confirmation
      return 'confirm-meter-details'
    }
    if (current === 'confirm-meter-details') {
      // This step is handled in handleDetailSelection, so we shouldn't reach here
      // But if we do, check if meters are set (confirmed) or not (needs edit)
      if (details.electricityMeterType && details.gasMeterType) {
        return 'payment-method'
      }
      return 'edit-meter-details'
    }
    if (current === 'edit-meter-details') {
      // Start editing from electricity meter
      if (!details.electricityMeterType) {
        return 'meter-type-electricity'
      }
      if (!details.gasMeterType) {
        return 'meter-type-gas'
      }
      // Both edited, go to payment method
      return 'payment-method'
    }
    if (current === 'meter-type-electricity' && !details.electricityMeterType) {
      return 'meter-type-electricity'
    }
    if (current === 'meter-type-electricity' && details.electricityMeterType) {
      return 'meter-type-gas'
    }
    if (current === 'meter-type-gas' && !details.gasMeterType) {
      return 'meter-type-gas'
    }
    if (current === 'meter-type-gas' && details.gasMeterType) {
      // After editing both meters, go to payment method
      return 'payment-method'
    }
    if (current === 'payment-method' && !details.paymentMethod) {
      return 'payment-method'
    }
    if (current === 'payment-method' && details.paymentMethod) {
      return 'payment-frequency'
    }
    if (current === 'payment-frequency' && !details.paymentFrequency) {
      return 'payment-frequency'
    }
    if (current === 'payment-frequency' && details.paymentFrequency) {
      return 'property-owner'
    }
    if (current === 'property-owner' && details.isPropertyOwner === null) {
      return 'property-owner'
    }
    if (current === 'property-owner' && details.isPropertyOwner !== null) {
      return 'know-usage'
    }
    if (current === 'know-usage' && details.knowsUsage === null) {
      return 'know-usage'
    }
    if (current === 'know-usage' && details.knowsUsage === false) {
      return 'bedrooms'
    }
    if (current === 'know-usage' && details.knowsUsage === true) {
      return 'energy-usage-input'
    }
    if (current === 'energy-usage-input' && (!details.electricityUsage || !details.gasUsage)) {
      return 'energy-usage-input'
    }
    if (current === 'energy-usage-input' && details.electricityUsage && details.gasUsage) {
      return 'electric-vehicle'
    }
    if (current === 'bedrooms' && !details.bedrooms) {
      return 'bedrooms'
    }
    if (current === 'bedrooms' && details.bedrooms) {
      return 'electric-vehicle'
    }
    if (current === 'electric-vehicle' && details.hasElectricVehicle === null) {
      return 'electric-vehicle'
    }
    if (current === 'electric-vehicle' && details.hasElectricVehicle !== null) {
      return 'complete'
    }
    return null
  }

  // Function to ask for the next detail
  const askForNextDetail = (step: DetailStep) => {
    // Set current step immediately so options appear when message is shown
    setCurrentStep(step)
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      let message = ''
      
      switch (step) {
        case 'confirm-meter-details':
          // This will be handled separately with auto-detection
          return
        case 'meter-type-electricity':
          message = "What type of electricity meter do you have?"
          break
        case 'meter-type-gas':
          message = "What type of gas meter do you have?"
          break
        case 'payment-method':
          message = "How would you like to pay?"
          break
        case 'payment-frequency':
          message = "How often would you like to pay?"
          break
        case 'property-owner':
          message = "Are you the owner of this property?"
          break
        case 'know-usage':
          message = "Do you know how much energy you use? (You can find this on a recent bill from your current supplier)"
          break
        case 'bedrooms':
          message = "No problem! How many bedrooms does your home have? We can use this to estimate your usage."
          break
        case 'electric-vehicle':
          message = "Do you have an electric vehicle?"
          break
        case 'energy-usage-input':
          message = "Please enter your annual energy usage in kWh. You can find this on a recent bill from your current supplier."
          break
        case 'complete':
          message = "Perfect! I have all the information I need. Let me find the best energy plans for you..."
          break
        default:
          return
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          text: message,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }, 1000 + Math.random() * 500)
  }

  // Function to handle detail selection
  const handleDetailSelection = (step: DetailStep, value: any) => {
    const updatedDetails = { ...customerDetails }
    
    switch (step) {
      case 'confirm-meter-details':
        // value is true for "Yes", false for "Edit"
        if (value === true) {
          // User confirmed, proceed to payment method
          setMessages((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              text: 'Yes',
              isUser: true,
              timestamp: new Date(),
            },
          ])
          const nextStep = getNextStep('confirm-meter-details', updatedDetails)
          setCurrentStep(nextStep)
          if (nextStep) {
            setTimeout(() => askForNextDetail(nextStep), 800)
          }
          return
        } else {
          // User wants to edit, clear meter details and go to edit flow
          updatedDetails.electricityMeterType = null
          updatedDetails.gasMeterType = null
          setCustomerDetails(updatedDetails)
          setMessages((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              text: 'Edit',
              isUser: true,
              timestamp: new Date(),
            },
          ])
          const nextStep = getNextStep('edit-meter-details', updatedDetails)
          setCurrentStep(nextStep)
          if (nextStep) {
            setTimeout(() => askForNextDetail(nextStep), 800)
          }
          return
        }
      case 'meter-type-electricity':
        updatedDetails.electricityMeterType = value
        break
      case 'meter-type-gas':
        updatedDetails.gasMeterType = value
        break
      case 'payment-method':
        updatedDetails.paymentMethod = value
        // Also set for both electricity and gas
        updatedDetails.electricityPaymentMethod = value
        updatedDetails.gasPaymentMethod = value
        break
      case 'payment-frequency':
        updatedDetails.paymentFrequency = value
        break
      case 'property-owner':
        updatedDetails.isPropertyOwner = value
        break
      case 'know-usage':
        updatedDetails.knowsUsage = value
        break
      case 'bedrooms':
        updatedDetails.bedrooms = value
        break
      case 'electric-vehicle':
        updatedDetails.hasElectricVehicle = value
        break
    }
    
    setCustomerDetails(updatedDetails)
    
    // Add user message
    let userMessage = ''
    if (step === 'property-owner' || step === 'know-usage' || step === 'electric-vehicle') {
      userMessage = value ? 'Yes' : 'No'
    } else {
      userMessage = value
    }
    
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
      },
    ])
    
    // Handle special cases with additional information
    if (step === 'bedrooms' && updatedDetails.bedrooms) {
      // Clear current step so options don't appear during the usage message
      setCurrentStep(null)
      // Add usage estimate information after bedrooms selection
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const usageLevel = updatedDetails.bedrooms === '1-2 bedrooms' ? 'low' : 
                          updatedDetails.bedrooms === '3 bedrooms' ? 'medium' : 'high'
        const electricityUsage = updatedDetails.bedrooms === '1-2 bedrooms' ? '1,800 kWh' :
                                 updatedDetails.bedrooms === '3 bedrooms' ? '2,900 kWh' : '4,300 kWh'
        const gasUsage = updatedDetails.bedrooms === '1-2 bedrooms' ? '7,500 kWh' :
                        updatedDetails.bedrooms === '3 bedrooms' ? '12,000 kWh' : '17,000 kWh'
        
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-usage-${Date.now()}`,
            text: `Based on your selection (${updatedDetails.bedrooms}), we estimate your energy usage to be ${usageLevel}.\n\nAccording to industry data, the average annual usage for a ${usageLevel} use household is:\n• ${electricityUsage} of electricity\n• ${gasUsage} of gas\n\nYou can find your annual usage on a recent bill from your current energy supplier. This will help us give you a more accurate quote.`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        
        // Move to next step after showing usage info - wait longer to ensure message is displayed
        const nextStep = getNextStep(step, updatedDetails)
        if (nextStep && nextStep !== 'complete') {
          setTimeout(() => askForNextDetail(nextStep), 2000)
        } else if (nextStep === 'complete') {
          setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
              setIsTyping(false)
              setMessages((prev) => [
                ...prev,
                {
                  id: `assistant-complete-${Date.now()}`,
                  text: `Perfect! I have all the information I need. Let me find the best energy plans for you...`,
                  isUser: false,
                  timestamp: new Date(),
                },
              ])
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `assistant-summary-${Date.now()}`,
                    text: `Here are the best energy plans available for your area:`,
                    isUser: false,
                    timestamp: new Date(),
                  },
                ])
                setShowTariffs(true)
                setCurrentStep(null) // Clear current step when showing tariffs
              }, 1000)
            }, 1500 + Math.random() * 1000)
          }, 2000)
        }
      }, 1200 + Math.random() * 800)
      return
    }
    
    if (step === 'electric-vehicle' && updatedDetails.hasElectricVehicle) {
      // Clear current step so options don't appear during the EV message
      setCurrentStep(null)
      // Add EV promotion message
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-ev-${Date.now()}`,
            text: '',
            isUser: false,
            timestamp: new Date(),
            isEVPromotion: true,
          },
        ])
        
        // Move to complete step
        const nextStep = getNextStep(step, updatedDetails)
        if (nextStep === 'complete') {
          setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
              setIsTyping(false)
              setMessages((prev) => [
                ...prev,
                {
                  id: `assistant-complete-${Date.now()}`,
                  text: `Perfect! I have all the information I need. Let me find the best energy plans for you...`,
                  isUser: false,
                  timestamp: new Date(),
                },
              ])
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `assistant-summary-${Date.now()}`,
                    text: `Here are the best energy plans available for your area:`,
                    isUser: false,
                    timestamp: new Date(),
                  },
                ])
                setShowTariffs(true)
                setCurrentStep(null) // Clear current step when showing tariffs
              }, 1000)
            }, 1500 + Math.random() * 1000)
          }, 2000)
        }
      }, 1200 + Math.random() * 800)
      return
    }
    
    // Move to next step
    const nextStep = getNextStep(step, updatedDetails)
    
    if (nextStep === 'complete') {
      // Clear current step before showing completion message
      setCurrentStep(null)
      // Show tariffs after a delay
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-complete-${Date.now()}`,
            text: `Perfect! I have all the information I need. Let me find the best energy plans for you...`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `assistant-summary-${Date.now()}`,
              text: `Here are the best energy plans available for your area:`,
              isUser: false,
              timestamp: new Date(),
            },
          ])
          setShowTariffs(true)
          setCurrentStep(null) // Clear current step when showing tariffs
        }, 1000)
      }, 1500 + Math.random() * 1000)
    } else if (nextStep) {
      askForNextDetail(nextStep)
    }
  }

  const handleAddressSelect = (address: Address | null) => {
    if (address) {
      setSelectedAddress(address)
      setAddressInputValue(`${address.address}, ${address.city}, ${address.state} ${address.postalCode}`)
      setShowAddressDropdown(false)
      setInputValue('') // Clear the input field after address selection
      
      // Ensure tariffs are hidden - we need to collect all details first
      setShowTariffs(false)
      
      // Update customer details
      const updatedDetails = { ...customerDetails, address }
      setCustomerDetails(updatedDetails)
      
      // Don't add user message - address is shown in fixed section above input

      // Auto-detect meter details (mock - in real app, this would come from industry databases)
      const detectedElectricityMeter: 'Smart meter' | 'Standard meter' = 'Smart meter'
      const detectedGasMeter: 'Smart meter' | 'Standard meter' = 'Smart meter'
      
      // Update details with detected meters
      updatedDetails.electricityMeterType = detectedElectricityMeter
      updatedDetails.gasMeterType = detectedGasMeter
      setCustomerDetails(updatedDetails)
      
      // Show typing indicator, then show address confirmation and disclaimer
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            text: `We've found your meter details:\n\n• Electricity: ${detectedElectricityMeter}\n• Gas: ${detectedGasMeter}\n\nIs this correct?`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        // Don't add address/disclaimer as messages - they'll appear as fixed sections above input
        // Start details collection flow with meter confirmation
        setCurrentStep('confirm-meter-details')
      }, 1500 + Math.random() * 1000) // 1.5-2.5 seconds delay
    } else {
      // "My address is not listed" selected
      setAddressInputValue('My address is not listed')
      setShowAddressDropdown(false)
      
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          text: 'My address is not listed',
          isUser: true,
          timestamp: new Date(),
        },
      ])
      
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            text: "I understand. Please provide your full address manually, and I'll help you find the best energy plans for your area.",
            isUser: false,
            timestamp: new Date(),
          },
        ])
      }, 1000 + Math.random() * 500) // 1-1.5 seconds delay
    }
  }

  const handleTariffSelect = (planId: string) => {
    const plan = TARIFF_PLANS.find((p) => p.id === planId)
    if (plan) {
      setSelectedTariff(planId)
      setShowTariffs(false) // Hide all tariff cards after selection
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            text: `Excellent choice! You've selected ${plan.name}. 🎉\n\nTo complete your enrollment, I'll need a few details from you.`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        // Show enrollment form
        setTimeout(() => {
          setCurrentStep('enrollment-form')
        }, 500)
      }, 1000 + Math.random() * 500) // 1-1.5 seconds delay
    }
  }
  
  const generateReferenceNumber = (): string => {
    const prefix = 'KEN'
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}-${timestamp}-${random}`
  }
  
  const handleEnergyUsageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const electricityUsage = parseFloat(energyUsageFormData.electricityUsage)
    const gasUsage = parseFloat(energyUsageFormData.gasUsage)
    
    if (isNaN(electricityUsage) || isNaN(gasUsage) || electricityUsage <= 0 || gasUsage <= 0) {
      return
    }
    
    // Update customer details
    const updatedDetails = { ...customerDetails, electricityUsage, gasUsage }
    setCustomerDetails(updatedDetails)
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-energy-${Date.now()}`,
        text: `Electricity: ${electricityUsage} kWh\nGas: ${gasUsage} kWh`,
        isUser: true,
        timestamp: new Date(),
      },
    ])
    
    // Clear form
    setEnergyUsageFormData({ electricityUsage: '', gasUsage: '' })
    
    // Move to next step
    const nextStep = getNextStep('energy-usage-input', updatedDetails)
    setCurrentStep(nextStep)
    if (nextStep) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        askForNextDetail(nextStep)
      }, 800)
    }
  }
  
  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!enrollmentFormData.firstName.trim() || 
        !enrollmentFormData.lastName.trim() || 
        !enrollmentFormData.phone.trim() || 
        !enrollmentFormData.email.trim() || 
        !enrollmentFormData.dateOfBirth.trim()) {
      return
    }
    
    // Update customer details
    setCustomerDetails((prev) => ({
      ...prev,
      firstName: enrollmentFormData.firstName,
      lastName: enrollmentFormData.lastName,
      phone: enrollmentFormData.phone,
      email: enrollmentFormData.email,
      dateOfBirth: enrollmentFormData.dateOfBirth,
    }))
    
    // Generate reference number
    const refNumber = generateReferenceNumber()
    setReferenceNumber(refNumber)
    
    // Clear form step
    setCurrentStep(null)
    
    // Show typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-thankyou-${Date.now()}`,
          text: `Thank you for your enrollment! 🎉\n\nYour request reference number is: **${refNumber}**\n\nOur team will reach out to you via email and SMS within 24-48 hours to set up your service date and complete the enrollment process.\n\nWe're excited to have you as part of the Kenton Energy family!`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }, 1500 + Math.random() * 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputValue.trim() && !showAddressDropdown) {
        // If there's a postcode in the input, trigger address lookup
        const postcodeMatch = inputValue.match(/\b\d{4,6}\b|\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b/i)
        if (postcodeMatch) {
          handlePostcodeInput(inputValue)
        }
      }
    }
  }

  const toggleViewMode = () => {
    if (viewMode === 'modal') {
      setViewMode('panel')
    } else if (viewMode === 'panel') {
      setViewMode('fullscreen')
    } else {
      setViewMode('modal')
    }
  }

  const getViewModeIcon = () => {
    if (viewMode === 'modal') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      )
    } else if (viewMode === 'panel') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      )
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    }
  }

  // Fullscreen view
  if (viewMode === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="text-white p-4 flex items-center justify-between" style={{ backgroundColor: '#014486' }}>
          <div className="flex items-center gap-3">
            <Image
              src="/kenton-logo-in-white.png"
              alt="Kenton Energy"
              width={120}
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-medium">Get a Quote</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleViewMode}
              className="text-white hover:text-gray-200 transition-colors p-2"
              aria-label="Change view mode"
            >
              {getViewModeIcon()}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors text-xl p-2"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1
              const showAddressSelect = !message.isUser && addresses.length > 0 && !selectedAddress && isLastMessage
              const showDetailOptions = !message.isUser && currentStep && isLastMessage && !showAddressSelect && !showTariffs
              
              return (
                <div key={message.id}>
                  {message.isEVPromotion ? (
                    <div className="flex justify-start mb-4 animate-fade-in">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1.5 mr-2">
                        <Image
                          src="/logo-avatar.png"
                          alt="Kenton Energy"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <EVPromotionCard />
                    </div>
                  ) : (
                    <MessageBubble
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  )}
                  {showDetailOptions && (
                    <div className="ml-10 mt-2 mb-3 flex flex-wrap gap-2">
                      {currentStep === 'confirm-meter-details' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-electricity' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-method' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Direct Debit')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Direct Debit
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Prepayment')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Prepayment
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Pay on receipt')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Pay on receipt
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-frequency' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Monthly')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Annually')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Annually
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-gas' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {(currentStep === 'property-owner' || currentStep === 'know-usage' || currentStep === 'electric-vehicle') && (
                        <>
                          <button
                            onClick={() => handleDetailSelection(currentStep, true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection(currentStep, false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            No
                          </button>
                        </>
                      )}
                      {currentStep === 'bedrooms' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '1-2 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            1-2 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '3 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            3 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '4+ bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            4+ bedrooms
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {currentStep === 'energy-usage-input' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnergyUsageSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Electricity Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.electricityUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 1800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Gas Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.gasUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, gasUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 7500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Usage
                        </button>
                      </form>
                    </div>
                  )}
                  {currentStep === 'enrollment-form' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnrollmentSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.firstName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="First name"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.lastName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="Last name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            required
                            value={enrollmentFormData.dateOfBirth}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={enrollmentFormData.phone}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={enrollmentFormData.email}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Email address"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Enrollment
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )
            })}
            
            {isTyping && <TypingIndicator />}
            
            {showTariffs && !currentStep && (
              <div className="ml-10 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TARIFF_PLANS.map((plan) => (
                    <TariffCard
                      key={plan.id}
                      plan={{
                        ...plan,
                        isSelected: selectedTariff === plan.id,
                        onSelect: () => handleTariffSelect(plan.id),
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {selectedTariff && !referenceNumber ? (
                <div className="bg-kenton-primary-light p-4 border border-kenton-primary-light">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-1">Selected plan:</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {TARIFF_PLANS.find(p => p.id === selectedTariff)?.name || 'Selected Tariff'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTariff(null)
                        setShowTariffs(true)
                        setCurrentStep(null)
                        // Remove the enrollment form step if it was set
                        if (currentStep === 'enrollment-form') {
                          setCurrentStep(null)
                        }
                      }}
                      className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : selectedAddress && !referenceNumber && (
                <div className="bg-kenton-primary-light p-4 border border-kenton-primary-light">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-1">Selected address:</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAddress(null)
                        setAddressInputValue('')
                        setShowAddressDropdown(true)
                        setAddresses(getAddressesByPostcode(selectedAddress.postalCode))
                        setCurrentStep(null)
                      }}
                      className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
              
              {selectedAddress && !selectedTariff && !referenceNumber && (
                <p className="text-xs text-gray-600 leading-relaxed">
                  By proceeding, you agree we can use your address to find your meter details and current supplier via industry databases.
                </p>
              )}
              
              <div className="relative" ref={inputContainerRef}>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handlePostcodeInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={showAddressDropdown && addresses.length > 0 ? "Select address from dropdown..." : "Enter your postal code"}
                    className="flex-1 px-4 py-3 border border-kenton-primary-light rounded-3xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent postcode-input"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim() && !showAddressDropdown) {
                        const postcodeMatch = inputValue.match(/\b\d{4,6}\b|\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b/i)
                        if (postcodeMatch) {
                          handlePostcodeInput(inputValue)
                        }
                      }
                    }}
                    disabled={!inputValue.trim() || showAddressDropdown}
                    className="bg-kenton-primary hover:bg-kenton-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-3xl transition-colors font-medium"
                    aria-label="Send"
                  >
                    Send
                  </button>
                </div>
                {showAddressDropdown && addresses.length > 0 && (
                  <AddressDropdown
                    addresses={addresses}
                    onSelect={handleAddressSelect}
                    onClose={() => setShowAddressDropdown(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Panel view
  console.log('ChatWidget render - viewMode:', viewMode, 'initialViewMode:', initialViewMode)
  if (viewMode === 'panel') {
    console.log('Rendering PANEL view')
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={onClose} />
        
        <div
          className="fixed top-0 left-0 bottom-0 z-50 bg-white flex flex-col shadow-2xl border-r-2 border-kenton-primary-light"
          style={{ width: `${panelWidth}px` }}
        >
          <div
            ref={resizeRef}
            onMouseDown={() => setIsResizing(true)}
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-kenton-primary transition-colors group"
          >
            <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-kenton-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="text-white p-4 flex items-center justify-between" style={{ backgroundColor: '#014486' }}>
            <div className="flex items-center gap-3">
              <Image
                src="/kenton-logo-in-white.png"
                alt="Kenton Energy"
                width={120}
                height={32}
                className="object-contain"
              />
              <span className="text-2xl font-medium">Get a Quote</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleViewMode}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Change view mode"
              >
                {getViewModeIcon()}
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors text-xl p-2"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-2">
              {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1
                const showAddressSelect = !message.isUser && addresses.length > 0 && !selectedAddress && isLastMessage
                const showDetailOptions = !message.isUser && currentStep && isLastMessage && !showAddressSelect && !showTariffs
                
                return (
                  <div key={message.id}>
                  <MessageBubble
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                  {showDetailOptions && (
                    <div className="ml-10 mt-2 mb-3 flex flex-wrap gap-2">
                      {currentStep === 'confirm-meter-details' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-electricity' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-method' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Direct Debit')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Direct Debit
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Prepayment')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Prepayment
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Pay on receipt')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Pay on receipt
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-frequency' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Monthly')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Annually')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Annually
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-gas' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {(currentStep === 'property-owner' || currentStep === 'know-usage' || currentStep === 'electric-vehicle') && (
                        <>
                          <button
                            onClick={() => handleDetailSelection(currentStep, true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection(currentStep, false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            No
                          </button>
                        </>
                      )}
                      {currentStep === 'bedrooms' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '1-2 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            1-2 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '3 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            3 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '4+ bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            4+ bedrooms
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {currentStep === 'energy-usage-input' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnergyUsageSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Electricity Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.electricityUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 1800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Gas Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.gasUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, gasUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 7500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Usage
                        </button>
                      </form>
                    </div>
                  )}
                  {currentStep === 'enrollment-form' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnrollmentSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.firstName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="First name"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.lastName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="Last name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            required
                            value={enrollmentFormData.dateOfBirth}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={enrollmentFormData.phone}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={enrollmentFormData.email}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Email address"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Enrollment
                        </button>
                      </form>
                    </div>
                  )}
                  {showAddressSelect && (
                    <div className="ml-10 mt-2 mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select address</label>
                      <select
                        value={addressInputValue || ''}
                        onChange={(e) => {
                          if (e.target.value === 'not-listed') {
                            handleAddressSelect(null)
                          } else {
                            const selectedAddr = addresses.find(addr => 
                              `${addr.address}, ${addr.city}, ${addr.state} ${addr.postalCode}` === e.target.value
                            )
                            if (selectedAddr) {
                              handleAddressSelect(selectedAddr)
                            }
                          }
                        }}
                        className="w-full text-sm cursor-pointer px-4 py-3"
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                          WebkitAppearance: 'menulist',
                          MozAppearance: 'menulist',
                          appearance: 'menulist'
                        }}
                      >
                        <option value="">{addresses.length} Address{addresses.length > 1 ? 'es' : ''} found</option>
                        {addresses.map((address) => (
                          <option
                            key={address.id}
                            value={`${address.address}, ${address.city}, ${address.state} ${address.postalCode}`}
                          >
                            {address.address}, {address.city}, {address.state} {address.postalCode}
                          </option>
                        ))}
                        <option value="not-listed">My address is not listed</option>
                      </select>
                    </div>
                  )}
                  </div>
                )
              })}
              
              {isTyping && <TypingIndicator />}
              
              {showTariffs && (
                <div className="ml-10 mt-4 max-w-2xl">
                  <div className="space-y-2">
                    {TARIFF_PLANS.map((plan) => (
                      <TariffCard
                        key={plan.id}
                        plan={{
                          ...plan,
                          isSelected: selectedTariff === plan.id,
                          onSelect: () => handleTariffSelect(plan.id),
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="space-y-3">
              {selectedTariff && !referenceNumber ? (
                <div className="bg-kenton-primary-light p-4 border border-kenton-primary-light">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-1">Selected plan:</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {TARIFF_PLANS.find(p => p.id === selectedTariff)?.name || 'Selected Tariff'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTariff(null)
                        setShowTariffs(true)
                        setCurrentStep(null)
                        // Remove the enrollment form step if it was set
                        if (currentStep === 'enrollment-form') {
                          setCurrentStep(null)
                        }
                      }}
                      className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : selectedAddress && !referenceNumber && (
                <div className="bg-kenton-primary-light p-4 border border-kenton-primary-light">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-1">Selected address:</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAddress(null)
                        setAddressInputValue('')
                        setShowAddressDropdown(true)
                        setAddresses(getAddressesByPostcode(selectedAddress.postalCode))
                        setCurrentStep(null)
                      }}
                      className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
              
              {selectedAddress && !selectedTariff && !referenceNumber && (
                <p className="text-xs text-gray-600 leading-relaxed">
                  By proceeding, you agree we can use your address to find your meter details and current supplier via industry databases.
                </p>
              )}
              
              <div className="relative" ref={inputContainerRef}>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handlePostcodeInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your postal code"
                    className="flex-1 px-4 py-2.5 border border-kenton-primary-light rounded-3xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent text-sm postcode-input"
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim() && !showAddressDropdown) {
                        const postcodeMatch = inputValue.match(/\b\d{4,6}\b|\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b/i)
                        if (postcodeMatch) {
                          handlePostcodeInput(inputValue)
                        }
                      }
                    }}
                    disabled={!inputValue.trim() || showAddressDropdown}
                    className="bg-kenton-primary hover:bg-kenton-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-3xl transition-colors font-medium text-sm"
                    aria-label="Send"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Modal view (default)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[85vh] flex flex-col overflow-hidden border-2 border-kenton-primary-light">
        <div className="text-white p-4 flex items-center justify-between rounded-t-3xl" style={{ backgroundColor: '#014486' }}>
          <div className="flex items-center gap-3">
            <Image
              src="/kenton-logo-in-white.png"
              alt="Kenton Energy"
              width={120}
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-medium">Get a Quote</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleViewMode}
              className="text-white hover:text-gray-200 transition-colors p-2"
              aria-label="Change view mode"
            >
              {getViewModeIcon()}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors text-xl p-2"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-2">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1
              const showAddressSelect = !message.isUser && addresses.length > 0 && !selectedAddress && isLastMessage
              const showDetailOptions = !message.isUser && currentStep && isLastMessage && !showAddressSelect && !showTariffs
              
              return (
                <div key={message.id}>
                  {message.isEVPromotion ? (
                    <div className="flex justify-start mb-4 animate-fade-in">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1.5 mr-2">
                        <Image
                          src="/logo-avatar.png"
                          alt="Kenton Energy"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <EVPromotionCard />
                    </div>
                  ) : (
                    <MessageBubble
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  )}
                  {showDetailOptions && (
                    <div className="ml-10 mt-2 mb-3 flex flex-wrap gap-2">
                      {currentStep === 'confirm-meter-details' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection('confirm-meter-details', false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-electricity' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-electricity', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-method' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Direct Debit')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Direct Debit
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Prepayment')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Prepayment
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-method', 'Pay on receipt')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Pay on receipt
                          </button>
                        </>
                      )}
                      {currentStep === 'payment-frequency' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Monthly')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => handleDetailSelection('payment-frequency', 'Annually')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Annually
                          </button>
                        </>
                      )}
                      {currentStep === 'meter-type-gas' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Smart meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Smart meter
                          </button>
                          <button
                            onClick={() => handleDetailSelection('meter-type-gas', 'Standard meter')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Standard meter
                          </button>
                        </>
                      )}
                      {(currentStep === 'property-owner' || currentStep === 'know-usage' || currentStep === 'electric-vehicle') && (
                        <>
                          <button
                            onClick={() => handleDetailSelection(currentStep, true)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleDetailSelection(currentStep, false)}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            No
                          </button>
                        </>
                      )}
                      {currentStep === 'bedrooms' && (
                        <>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '1-2 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            1-2 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '3 bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            3 bedrooms
                          </button>
                          <button
                            onClick={() => handleDetailSelection('bedrooms', '4+ bedrooms')}
                            className="px-3 py-1.5 text-sm bg-white border border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light rounded-2xl transition-colors font-medium"
                          >
                            4+ bedrooms
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  {currentStep === 'energy-usage-input' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnergyUsageSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Electricity Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.electricityUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, electricityUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 1800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Annual Gas Usage (kWh)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={energyUsageFormData.gasUsage}
                            onChange={(e) => setEnergyUsageFormData(prev => ({ ...prev, gasUsage: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="e.g., 7500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Usage
                        </button>
                      </form>
                    </div>
                  )}
                  {currentStep === 'enrollment-form' && isLastMessage && (
                    <div className="ml-10 mt-2 mb-4">
                      <form onSubmit={handleEnrollmentSubmit} className="bg-white border border-kenton-primary-light rounded-2xl p-4 space-y-3 max-w-md">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.firstName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="First name"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              required
                              value={enrollmentFormData.lastName}
                              onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                              placeholder="Last name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            required
                            value={enrollmentFormData.dateOfBirth}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={enrollmentFormData.phone}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={enrollmentFormData.email}
                            onChange={(e) => setEnrollmentFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-kenton-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                            placeholder="Email address"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-2.5 px-4 rounded-3xl font-medium text-sm transition-colors"
                        >
                          Submit Enrollment
                        </button>
                      </form>
                    </div>
                  )}
                  {showAddressSelect && (
                    <div className="ml-10 mt-2 mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select address</label>
                      <select
                        value={addressInputValue || ''}
                        onChange={(e) => {
                          if (e.target.value === 'not-listed') {
                            handleAddressSelect(null)
                          } else {
                            const selected = addresses.find(addr => `${addr.address}, ${addr.city}, ${addr.state} ${addr.postalCode}` === e.target.value)
                            if (selected) {
                              handleAddressSelect(selected)
                            }
                          }
                        }}
                        className="w-full px-4 py-2.5 border border-kenton-primary-light rounded-3xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent text-sm"
                      >
                        <option value="">Select an address...</option>
                        {addresses.map((address) => (
                          <option key={address.id} value={`${address.address}, ${address.city}, ${address.state} ${address.postalCode}`}>
                            {address.address}, {address.city}, {address.state} {address.postalCode}
                          </option>
                        ))}
                        <option value="not-listed">My address is not listed</option>
                      </select>
                    </div>
                  )}
                </div>
              )
            })}
            
            {isTyping && <TypingIndicator />}
            
            {showTariffs && !currentStep && (
              <div className="ml-10 mt-4">
                <div className="space-y-2">
                  {TARIFF_PLANS.map((plan) => (
                    <TariffCard
                      key={plan.id}
                      plan={{
                        ...plan,
                        isSelected: selectedTariff === plan.id,
                        onSelect: () => handleTariffSelect(plan.id),
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <div className="space-y-3">
            {selectedTariff && !referenceNumber ? (
              <div className="bg-kenton-primary-light rounded-2xl p-4 border border-kenton-primary-light">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-600 mb-1">Selected plan:</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {TARIFF_PLANS.find(p => p.id === selectedTariff)?.name || 'Selected Tariff'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTariff(null)
                      setShowTariffs(true)
                      setCurrentStep(null)
                      // Remove the enrollment form step if it was set
                      if (currentStep === 'enrollment-form') {
                        setCurrentStep(null)
                      }
                    }}
                    className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : selectedAddress && !referenceNumber && (
              <div className="bg-kenton-primary-light rounded-2xl p-4 border border-kenton-primary-light">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-600 mb-1">Selected address:</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAddress(null)
                      setAddressInputValue('')
                      setShowAddressDropdown(true)
                      setAddresses(getAddressesByPostcode(selectedAddress.postalCode))
                      setCurrentStep(null)
                    }}
                    className="text-kenton-primary hover:text-kenton-secondary text-sm font-medium underline whitespace-nowrap"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
            
            {selectedAddress && !selectedTariff && !referenceNumber && (
              <p className="text-xs text-gray-600 leading-relaxed">
                By proceeding, you agree we can use your address to find your meter details and current supplier via industry databases.
              </p>
            )}
            
            <div className="relative" ref={inputContainerRef}>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handlePostcodeInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your postal code"
                  className="flex-1 px-4 py-2.5 border border-kenton-primary-light rounded-3xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent text-sm"
                />
                <button
                  onClick={() => {
                    if (inputValue.trim() && !showAddressDropdown) {
                      const postcodeMatch = inputValue.match(/\b\d{4,6}\b|\b[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}\b/i)
                      if (postcodeMatch) {
                        handlePostcodeInput(inputValue)
                      }
                    }
                  }}
                  disabled={!inputValue.trim() || showAddressDropdown}
                  className="bg-kenton-primary hover:bg-kenton-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-3xl transition-colors font-medium text-sm"
                  aria-label="Send"
                >
                  Send
                </button>
              </div>
              {showAddressDropdown && addresses.length > 0 && (
                <AddressDropdown
                  addresses={addresses}
                  onSelect={handleAddressSelect}
                  onClose={() => setShowAddressDropdown(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
