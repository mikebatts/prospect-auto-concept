/**
 * Verified business facts for Prospect Auto Repair & Service.
 * Research snapshot taken 2026-09-01. Nothing here is invented; do not add
 * certifications, guarantees, prices, staff names, or years in business.
 */
export const business = {
  name: 'Prospect Auto Repair & Service',
  shortName: 'Prospect Auto',
  neighborhood: 'South Park Slope, Brooklyn',
  address: {
    street: '628 4th Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11215',
    full: '628 4th Avenue, Brooklyn, NY 11215',
  },
  phone: {
    display: '(718) 788-7683',
    href: 'tel:+17187887683',
  },
  email: {
    display: 'Prospectautorepair628@yahoo.com',
    href: 'mailto:Prospectautorepair628@yahoo.com',
  },
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM', short: 'Mon–Fri 8–6' },
    { days: 'Saturday', time: '8:00 AM – 3:00 PM', short: 'Sat 8–3' },
    { days: 'Sunday', time: 'Closed', short: 'Sun closed' },
  ],
  /* The shop's own site states its mechanics have 30+ years of experience.
     This is a business-published claim, not the age of the company. */
  publishedExperience: 'Mechanics with 30+ years of experience',
  google: {
    rating: '4.7',
    reviewCount: '269',
    snapshotDate: 'September 1, 2026',
    mapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Prospect+Auto+Repair+%26+Service+628+4th+Avenue+Brooklyn+NY+11215',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=628+4th+Avenue%2C+Brooklyn%2C+NY+11215',
  },
  languages: ['English', 'Spanish'],
} as const

/**
 * Service index. Every category the shop lists publicly is covered here:
 * wheel alignment, brakes, tires, oil changes, air conditioning, electrical,
 * computer diagnostics, factory-recommended maintenance, domestic and import.
 */
export const services = [
  {
    key: 'brakes',
    title: 'Brakes',
    detail: 'Pads, rotors, calipers, brake fluid.',
    symptoms: 'Squeal, grinding, pulsing pedal, longer stops.',
  },
  {
    key: 'tires',
    title: 'Tires & wheel alignment',
    detail: 'Alignment, mounting, balancing, rotation.',
    symptoms: 'Steering pull, vibration, uneven wear.',
  },
  {
    key: 'diagnostics',
    title: 'Computer diagnostics',
    detail: 'Check-engine and warning lights, drivability faults.',
    symptoms: 'A light on the dash, rough idle, stalling, a noise you cannot place.',
  },
  {
    key: 'maintenance',
    title: 'Oil & factory maintenance',
    detail: 'Oil changes, fluids, filters, belts, factory-recommended intervals.',
    symptoms: 'Mileage service due, or simply overdue.',
  },
  {
    key: 'ac',
    title: 'Air conditioning',
    detail: 'Inspection, leak check, recharge, component repair.',
    symptoms: 'Warm air, weak airflow, musty smell.',
  },
  {
    key: 'electrical',
    title: 'Electrical',
    detail: 'Batteries, alternators, starters, wiring, lighting.',
    symptoms: 'Slow cranking, dead battery, flickering lights, intermittent faults.',
  },
] as const

export type ServiceKey = (typeof services)[number]['key']

export const assetUrl = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`
