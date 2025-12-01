// Australian address data for type-ahead search
export interface SearchableAddress {
  id: string
  fullAddress: string
  streetNumber?: string
  streetName: string
  unit?: string
  suburb: string
  state: string
  postcode: string
}

// Comprehensive Australian addresses for search
export const AUSTRALIAN_ADDRESSES: SearchableAddress[] = [
  // NSW addresses
  { id: 'nsw-1', fullAddress: 'Unit 10, 25-35a Park Road, Hurstville NSW 2220', unit: 'Unit 10', streetNumber: '25-35a', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-2', fullAddress: '12 Park Road, Hurstville NSW 2220', streetNumber: '12', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-3', fullAddress: '15 Park Road, Hurstville NSW 2220', streetNumber: '15', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-4', fullAddress: '18 Park Road, Hurstville NSW 2220', streetNumber: '18', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-5', fullAddress: 'Unit 5, 20 Park Road, Hurstville NSW 2220', unit: 'Unit 5', streetNumber: '20', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-6', fullAddress: '25 Park Road, Hurstville NSW 2220', streetNumber: '25', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-7', fullAddress: '30 Park Road, Hurstville NSW 2220', streetNumber: '30', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-8', fullAddress: '35 Park Road, Hurstville NSW 2220', streetNumber: '35', streetName: 'Park Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-9', fullAddress: '42 Forest Road, Hurstville NSW 2220', streetNumber: '42', streetName: 'Forest Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-10', fullAddress: '8 Forest Road, Hurstville NSW 2220', streetNumber: '8', streetName: 'Forest Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-11', fullAddress: 'Unit 3, 15 Forest Road, Hurstville NSW 2220', unit: 'Unit 3', streetNumber: '15', streetName: 'Forest Road', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-12', fullAddress: '22 Macmahon Street, Hurstville NSW 2220', streetNumber: '22', streetName: 'Macmahon Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-13', fullAddress: '45 Macmahon Street, Hurstville NSW 2220', streetNumber: '45', streetName: 'Macmahon Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-14', fullAddress: 'Unit 12, 50 Macmahon Street, Hurstville NSW 2220', unit: 'Unit 12', streetNumber: '50', streetName: 'Macmahon Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-15', fullAddress: '10 Ormonde Parade, Hurstville NSW 2220', streetNumber: '10', streetName: 'Ormonde Parade', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  
  // Sydney CBD
  { id: 'syd-1', fullAddress: '100 George Street, Sydney NSW 2000', streetNumber: '100', streetName: 'George Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { id: 'syd-2', fullAddress: '150 George Street, Sydney NSW 2000', streetNumber: '150', streetName: 'George Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { id: 'syd-3', fullAddress: 'Unit 5, 200 George Street, Sydney NSW 2000', unit: 'Unit 5', streetNumber: '200', streetName: 'George Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { id: 'syd-4', fullAddress: '50 Pitt Street, Sydney NSW 2000', streetNumber: '50', streetName: 'Pitt Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { id: 'syd-5', fullAddress: '75 Pitt Street, Sydney NSW 2000', streetNumber: '75', streetName: 'Pitt Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { id: 'syd-6', fullAddress: '120 Castlereagh Street, Sydney NSW 2000', streetNumber: '120', streetName: 'Castlereagh Street', suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  
  // Melbourne
  { id: 'mel-1', fullAddress: '100 Collins Street, Melbourne VIC 3000', streetNumber: '100', streetName: 'Collins Street', suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { id: 'mel-2', fullAddress: '150 Collins Street, Melbourne VIC 3000', streetNumber: '150', streetName: 'Collins Street', suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { id: 'mel-3', fullAddress: 'Unit 8, 200 Collins Street, Melbourne VIC 3000', unit: 'Unit 8', streetNumber: '200', streetName: 'Collins Street', suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { id: 'mel-4', fullAddress: '50 Bourke Street, Melbourne VIC 3000', streetNumber: '50', streetName: 'Bourke Street', suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { id: 'mel-5', fullAddress: '75 Swanston Street, Melbourne VIC 3000', streetNumber: '75', streetName: 'Swanston Street', suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  
  // Brisbane
  { id: 'bne-1', fullAddress: '100 Queen Street, Brisbane QLD 4000', streetNumber: '100', streetName: 'Queen Street', suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
  { id: 'bne-2', fullAddress: '150 Queen Street, Brisbane QLD 4000', streetNumber: '150', streetName: 'Queen Street', suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
  { id: 'bne-3', fullAddress: '50 Adelaide Street, Brisbane QLD 4000', streetNumber: '50', streetName: 'Adelaide Street', suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
  { id: 'bne-4', fullAddress: 'Unit 4, 75 Adelaide Street, Brisbane QLD 4000', unit: 'Unit 4', streetNumber: '75', streetName: 'Adelaide Street', suburb: 'Brisbane', state: 'QLD', postcode: '4000' },
  
  // Perth
  { id: 'per-1', fullAddress: '100 St Georges Terrace, Perth WA 6000', streetNumber: '100', streetName: 'St Georges Terrace', suburb: 'Perth', state: 'WA', postcode: '6000' },
  { id: 'per-2', fullAddress: '150 St Georges Terrace, Perth WA 6000', streetNumber: '150', streetName: 'St Georges Terrace', suburb: 'Perth', state: 'WA', postcode: '6000' },
  { id: 'per-3', fullAddress: '50 Hay Street, Perth WA 6000', streetNumber: '50', streetName: 'Hay Street', suburb: 'Perth', state: 'WA', postcode: '6000' },
  
  // Adelaide
  { id: 'ade-1', fullAddress: '100 King William Street, Adelaide SA 5000', streetNumber: '100', streetName: 'King William Street', suburb: 'Adelaide', state: 'SA', postcode: '5000' },
  { id: 'ade-2', fullAddress: '150 King William Street, Adelaide SA 5000', streetNumber: '150', streetName: 'King William Street', suburb: 'Adelaide', state: 'SA', postcode: '5000' },
  { id: 'ade-3', fullAddress: 'Unit 6, 200 King William Street, Adelaide SA 5000', unit: 'Unit 6', streetNumber: '200', streetName: 'King William Street', suburb: 'Adelaide', state: 'SA', postcode: '5000' },
  
  // More Hurstville addresses
  { id: 'nsw-16', fullAddress: '5 The Avenue, Hurstville NSW 2220', streetNumber: '5', streetName: 'The Avenue', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-17', fullAddress: '12 The Avenue, Hurstville NSW 2220', streetNumber: '12', streetName: 'The Avenue', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-18', fullAddress: 'Unit 2, 20 The Avenue, Hurstville NSW 2220', unit: 'Unit 2', streetNumber: '20', streetName: 'The Avenue', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-19', fullAddress: '30 Dora Street, Hurstville NSW 2220', streetNumber: '30', streetName: 'Dora Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-20', fullAddress: '45 Dora Street, Hurstville NSW 2220', streetNumber: '45', streetName: 'Dora Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-21', fullAddress: 'Unit 7, 60 Dora Street, Hurstville NSW 2220', unit: 'Unit 7', streetNumber: '60', streetName: 'Dora Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-22', fullAddress: '8 Cross Street, Hurstville NSW 2220', streetNumber: '8', streetName: 'Cross Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-23', fullAddress: '15 Cross Street, Hurstville NSW 2220', streetNumber: '15', streetName: 'Cross Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
  { id: 'nsw-24', fullAddress: '22 Cross Street, Hurstville NSW 2220', streetNumber: '22', streetName: 'Cross Street', suburb: 'Hurstville', state: 'NSW', postcode: '2220' },
]

// Search function to find matching addresses
export function searchAddresses(query: string): SearchableAddress[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  
  return AUSTRALIAN_ADDRESSES.filter(address => {
    const searchableText = [
      address.fullAddress,
      address.streetName,
      address.suburb,
      address.postcode,
      address.unit,
      address.streetNumber,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedQuery)
  }).slice(0, 8) // Limit to 8 results
}

