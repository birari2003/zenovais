export const footerData = {
  company: {
    name: 'Zenovais Technologies',
    description:
      'An AI-first technology company building intelligent products, AI agents, automation systems, and next-generation digital solutions.',
    website: 'zenovais.com',
  },
  quickLinks: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'AI Solutions', to: '/ai-solutions' },
    { label: 'Products', to: '/products' },
    { label: 'Services', to: '/services' },
  ],
  exploreLinks: [
    { label: 'Research & Innovation', to: '/research' },
    { label: 'Industries', to: '/industries' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact Us', to: '/contact' },
  ],
  resourceLinks: [
    { label: 'Insights & Research', to: '/research' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
  ],
  newsletter: {
    title: 'Stay Informed',
    description: 'Receive engineering perspectives, product milestones, and research updates.',
    placeholder: 'Enter your business email',
    buttonLabel: 'Subscribe',
  },
  // Populate verified URLs here when official corporate channels are published
  socialLinks: [] as { label: string; url: string }[],
};
