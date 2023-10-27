// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  googleFonts: {
    display: 'swap',
    families: {
      "Plus+Jakarta+Sans": [600],
      Inter: [400],
      "Source+Code+Pro": true
    }
  }
})
