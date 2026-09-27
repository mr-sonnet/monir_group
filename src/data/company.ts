// All current-site statements stay provisional until the owner confirms them.
export const company = {
  name: 'Monir Group',
  status: 'owner-review',
  source: 'https://monirgroupbd.com/',
  reviewedAt: '2026-09-27',
  established: { value: 2005, status: 'owner-review', visibleAsBadge: false },
  phone: {
    display: '+880 1711-966411',
    href: 'tel:+8801711966411',
    status: 'owner-review',
  },
  email: { value: 'monirenterprise999@gmail.com', status: 'owner-review' },
  logo: '/media/monir-group/cropped-Monir-Group-logo.png',
  leaders: [
    {
      name: 'Md. Robiul Hasan Monir',
      title: 'Managing Director',
      image: '/media/monir-group/robiul-hasan-monir.webp',
      status: 'owner-review',
    },
    {
      name: 'Md. Monsur Ahmed',
      title: 'Chairman',
      image: '/media/monir-group/monsur-ahmed.webp',
      status: 'owner-review',
    },
  ],
  locations: [
    {
      name: 'Head office',
      city: 'Gazipur',
      address:
        'Kader Complex, 2nd Floor, Ward 19, Holding 207, Block E, South Salna (Shimultoli Road), Gazipur City Corporation 1703',
      status: 'owner-review',
    },
    {
      name: 'Branch office',
      city: 'Dinajpur',
      address: 'PTC Complex, 3rd Floor, Bangla Hili, Hakimpur, Dinajpur',
      status: 'owner-review',
    },
    {
      name: 'Corporate office',
      city: 'Jamalpur',
      address:
        'Monir Plaza, 1st & 2nd Floors, Sanandabari Bazar, Dewanganj, Jamalpur',
      status: 'owner-review',
    },
    {
      name: 'Warehouse',
      city: 'Gazipur',
      address:
        'Mollapara Jolarpar Road, Salna Bazar, Ward 19, Gazipur City, Gazipur 1703',
      status: 'owner-review',
    },
  ],
  form: { mode: 'demo', endpoint: '', recipient: null },
  claims: {
    employees: { value: 100, status: 'unverified', visible: false },
    suppliers: { value: 300, status: 'unverified', visible: false },
    clients: { value: 150, status: 'unverified', visible: false },
  },
  privacy: {
    status: 'review-only',
    hosting: 'OpenAI Sites / Cloudflare',
    deliveryProvider: null,
    retention: null,
  },
} as const;
