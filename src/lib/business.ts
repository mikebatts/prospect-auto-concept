/**
 * Verified business facts for Prospect Auto Repair & Service.
 * Current as of 2026-09-01. Nothing here is invented; do not add
 * certifications, guarantees, prices, staff names, or years in business.
 */
export const business = {
  name: 'Prospect Auto Repair & Service',
  shortName: 'Prospect Auto',
  address: {
    street: '628 4th Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11215',
    full: '628 4th Avenue, Brooklyn, NY 11215',
  },
  phone: {
    display: '(718) 788-7683',
    displayIntl: '+1 (718) 788-7683',
    href: 'tel:+17187887683',
  },
  email: {
    display: 'Prospectautorepair628@yahoo.com',
    href: 'mailto:Prospectautorepair628@yahoo.com',
  },
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '8:00 AM – 3:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  google: {
    rating: '4.7',
    reviewCount: '269',
    snapshotDate: 'September 1, 2026',
    mapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Prospect+Auto+Repair+%26+Service+628+4th+Avenue+Brooklyn+NY+11215',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=628+4th+Avenue%2C+Brooklyn%2C+NY+11215',
  },
  services: [
    'Automotive diagnostics',
    'Brakes',
    'Tires and wheel alignment',
    'Oil changes and preventive maintenance',
    'Air conditioning',
    'Automotive electrical service',
    'Factory-scheduled maintenance',
  ],
  languages: ['English', 'Spanish'],
} as const

export const assetUrl = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`
