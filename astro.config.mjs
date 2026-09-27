import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://monir-group-private-review.dr-loren-mic-5808.chatgpt.site',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  redirects: {
    '/about-2/': '/about/',
    '/about-us/': '/about/',
    '/contact-2/': '/contact/',
    '/contact-us/': '/contact/',
    '/2024/01/27/high-quality-maize-any-time-delivery-of-our-godown-in-gazipur/':
      '/products/maize/',
    '/2024/01/27/high-quality-fishh-meal-any-time-delivery-of-our-godown-in-gazipur/':
      '/products/fish-meal/',
    '/2024/01/27/high-qualityhigh-protein-soya-mealcity-nabilany-time-delivery-of-our-godown-in-gazipur/':
      '/products/soybean-meal/',
  },
});
