// Company details approved by the owner on 2026-09-29.
export const company = {
  name: 'Monir Group',
  status: 'approved',
  source: 'https://monirgroupbd.com/',
  reviewedAt: '2026-09-27',
  established: { value: 2005, status: 'approved', visibleAsBadge: false },
  phone: {
    display: '+880 1711-966411',
    href: 'tel:+8801711966411',
    status: 'approved',
  },
  email: { value: 'mdmonirgroupbd@gmail.com', status: 'approved' },
  secondaryEmail: 'monirenterprise999@gmail.com',
  whatsapp: { number: '8801711966411', href: 'https://wa.me/8801711966411' },
  logo: '/media/monir-group/cropped-Monir-Group-logo.png',
  leaders: [
    {
      name: 'Md. Robiul Hasan Monir',
      title: 'Managing Director',
      image: '/media/monir-group/robiul-hasan-monir.webp',
      status: 'approved',
    },
    {
      name: 'Md. Monsur Ahmed',
      title: 'Chairman',
      image: '/media/monir-group/monsur-ahmed.webp',
      status: 'approved',
    },
  ],
  locations: [
    {
      name: 'Head office',
      city: 'Gazipur',
      address:
        'Kader Complex, 2nd Floor, Ward 19, Holding 207, Block E, South Salna (Shimultoli Road), Gazipur City Corporation 1703',
      status: 'approved',
    },
    {
      name: 'Branch office',
      city: 'Dinajpur',
      address: 'PTC Complex, 3rd Floor, Bangla Hili, Hakimpur, Dinajpur',
      status: 'approved',
    },
    {
      name: 'Corporate office',
      city: 'Jamalpur',
      address:
        'Monir Plaza, 1st & 2nd Floors, Sanandabari Bazar, Dewanganj, Jamalpur',
      status: 'approved',
    },
    {
      name: 'Warehouse',
      city: 'Gazipur',
      address:
        'Mollapara Jolarpar Road, Salna Bazar, Ward 19, Gazipur City, Gazipur 1703',
      status: 'approved',
    },
  ],
  form: { mode: 'direct', endpoint: '', recipient: 'mdmonirgroupbd@gmail.com' },
  claims: {
    employees: { value: 100, status: 'unverified', visible: false },
    suppliers: { value: 300, status: 'unverified', visible: false },
    clients: { value: 150, status: 'unverified', visible: false },
  },
  privacy: {
    status: 'direct-contact',
    hosting: 'OpenAI Sites / Cloudflare',
    deliveryProvider: null,
    retention: null,
  },
} as const;
