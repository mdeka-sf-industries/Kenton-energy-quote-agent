// Mock address data by postal code
export interface Address {
  id: string
  address: string
  city: string
  state: string
  postalCode: string
}

export const ADDRESSES_BY_POSTCODE: Record<string, Address[]> = {
  'SW109AS': [
    { id: 'sw10-1', address: '1 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-2', address: '2 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-3', address: '3 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-4', address: '5 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-5', address: '7 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-6', address: '9 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-7', address: '11 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-8', address: '13 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-9', address: '15 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-10', address: '17 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-11', address: '19 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-12', address: '21 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-13', address: '23 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-14', address: '25 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-15', address: '27 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-16', address: '29 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-17', address: '31 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-18', address: '33 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-19', address: '35 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-20', address: '37 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-21', address: '39 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-22', address: '41 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-23', address: '43 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
    { id: 'sw10-24', address: '45 Chelsea Manor Street', city: 'London', state: 'England', postalCode: 'SW10 9AS' },
  ],
  '90210': [
    { id: 'bh-1', address: '1234 Beverly Hills Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-2', address: '1236 Beverly Hills Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-3', address: '1238 Beverly Hills Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-4', address: '1240 Beverly Hills Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-5', address: '5678 Sunset Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-6', address: '5680 Sunset Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-7', address: '5682 Sunset Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-8', address: '9012 Rodeo Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-9', address: '9014 Rodeo Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-10', address: '9016 Rodeo Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-11', address: '2456 North Canon Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-12', address: '2458 North Canon Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-13', address: '2460 North Canon Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-14', address: '3456 South Beverly Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-15', address: '3458 South Beverly Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-16', address: '3460 South Beverly Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-17', address: '4567 Wilshire Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-18', address: '4569 Wilshire Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-19', address: '4571 Wilshire Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-20', address: '5679 Santa Monica Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-21', address: '5681 Santa Monica Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-22', address: '5683 Santa Monica Boulevard', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-23', address: '6789 North Crescent Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
    { id: 'bh-24', address: '6791 North Crescent Drive', city: 'Beverly Hills', state: 'CA', postalCode: '90210' },
  ],
  '10001': [
    { id: 'ny-1', address: '123 West 28th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-2', address: '125 West 28th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-3', address: '127 West 28th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-4', address: '129 West 28th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-5', address: '131 West 28th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-6', address: '456 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-7', address: '458 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-8', address: '460 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-9', address: '462 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-10', address: '464 Broadway', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-11', address: '789 6th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-12', address: '791 6th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-13', address: '793 6th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-14', address: '234 7th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-15', address: '236 7th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-16', address: '238 7th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-17', address: '345 West 29th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-18', address: '347 West 29th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-19', address: '349 West 29th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-20', address: '567 West 30th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-21', address: '569 West 30th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-22', address: '571 West 30th Street', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-23', address: '890 8th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
    { id: 'ny-24', address: '892 8th Avenue', city: 'New York', state: 'NY', postalCode: '10001' },
  ],
  'SW1A': [
    { id: 'sw1a-1', address: '10 Downing Street', city: 'London', state: 'England', postalCode: 'SW1A 2AA' },
    { id: 'sw1a-2', address: '11 Downing Street', city: 'London', state: 'England', postalCode: 'SW1A 2AA' },
    { id: 'sw1a-3', address: '12 Downing Street', city: 'London', state: 'England', postalCode: 'SW1A 2AA' },
    { id: 'sw1a-4', address: '1 Parliament Square', city: 'London', state: 'England', postalCode: 'SW1A 0AA' },
    { id: 'sw1a-5', address: '2 Parliament Square', city: 'London', state: 'England', postalCode: 'SW1A 0AA' },
    { id: 'sw1a-6', address: '3 Parliament Square', city: 'London', state: 'England', postalCode: 'SW1A 0AA' },
    { id: 'sw1a-7', address: '15 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-8', address: '17 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-9', address: '19 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-10', address: '21 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-11', address: '23 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-12', address: '25 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-13', address: '27 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-14', address: '29 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-15', address: '31 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-16', address: '33 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-17', address: '35 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-18', address: '37 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-19', address: '39 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-20', address: '41 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-21', address: '43 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-22', address: '45 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-23', address: '47 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
    { id: 'sw1a-24', address: '49 Whitehall', city: 'London', state: 'England', postalCode: 'SW1A 2DD' },
  ],
}

// Generate addresses for any postal code (fallback)
export const getAddressesByPostcode = (postcode: string): Address[] => {
  // Normalize postcode - remove spaces for matching
  const normalized = postcode.trim().toUpperCase().replace(/\s/g, '')
  
  // Check exact match (without spaces)
  if (ADDRESSES_BY_POSTCODE[normalized]) {
    return ADDRESSES_BY_POSTCODE[normalized]
  }
  
  // Check partial match (for UK postcodes like SW1A, SW109AS)
  for (const [key, addresses] of Object.entries(ADDRESSES_BY_POSTCODE)) {
    if (normalized.startsWith(key) || key.startsWith(normalized)) {
      return addresses
    }
  }
  
  // For UK postcodes starting with SW10, generate Chelsea area addresses
  if (normalized.startsWith('SW10')) {
    const addresses: Address[] = []
    const streetNames = ['Ifield Road', 'Chelsea Manor Street', 'Cale Street', 'Markham Square', 'Radnor Walk', 'Oakley Street', 'Royal Avenue', 'Sydney Street', 'King\'s Road', 'Fulham Road', 'Draycott Avenue', 'Sloane Avenue', 'Cadogan Gardens', 'Pont Street', 'Beaufort Street', 'Glebe Place', 'Tite Street', 'Cheyne Walk', 'Danvers Street', 'Milman\'s Street', 'Redcliffe Square', 'Redcliffe Gardens', 'Bramerton Street', 'Gunter Grove']
    for (let i = 0; i < 24; i++) {
      const streetName = streetNames[i % streetNames.length]
      const houseNumber = (i % 10) * 2 + 1 + Math.floor(i / 10) * 20
      addresses.push({
        id: `sw10-gen-${i + 1}`,
        address: `${houseNumber} ${streetName}`,
        city: 'London',
        state: 'England',
        postalCode: postcode.trim().toUpperCase(),
      })
    }
    return addresses
  }
  
  // Generate mock addresses for any other postcode (at least 20)
  const addresses: Address[] = []
  const streetNames = ['Main Street', 'Oak Avenue', 'Elm Road', 'Park Lane', 'High Street', 'Church Road', 'Victoria Street', 'King Street', 'Queen Street', 'Market Street', 'Station Road', 'Mill Lane', 'Bridge Street', 'Green Lane', 'Hill Road', 'Church Street', 'New Road', 'Old Street', 'West Street', 'East Street', 'North Road', 'South Avenue', 'Central Way', 'Garden Close']
  
  for (let i = 0; i < 24; i++) {
    addresses.push({
      id: `mock-${i + 1}-${normalized}`,
      address: `${(i + 1) * 10 + (i % 3)} ${streetNames[i % streetNames.length]}`,
      city: 'City',
      state: 'State',
      postalCode: postcode.trim().toUpperCase(),
    })
  }
  
  return addresses
}

