// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  site: { url: 'site.com' },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@pinia/nuxt',
    'nuxt-echarts',
    'nuxt-easy-lightbox',
    '@nuxtjs/mdc',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxt/icon'
  ],
  //css: ['~/assets/scss/main.scss'],
  generate: {
    fallback: "404.html", // Ensures correct 404 handling in SSG mode
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  i18n: {
    strategy: 'prefix_except_default', // ✅ Uses route-based detection
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' }
    ],
    defaultLocale: 'de',
    lazy: true,
    detectBrowserLanguage: false, // ❌ Disable cookie-based detection
    langDir: 'locales/'
  },
  content: {
    build: {
      markdown: {
        mdc: true, // Enables Vue components inside markdown files
        toc: {
          depth: 3, // include h3 headings
        }
      }
    }
  },
  image: {
    inject: false,
    // For example you might want the source images in assets/images directory 
    // rather than the default public directory so the source images 
    // don't get copied into dist and deployed:
    // dir: 'public/images',
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50
        }
      }
    }
  },
  echarts: {
    renderer: ["canvas", 'svg'],
    charts: ['BarChart', 'LineChart', 'PieChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent'],
    features: ['LabelLayout', 'UniversalTransition']
  }
});