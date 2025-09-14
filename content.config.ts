import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
   // -----------------------------------------------------------------
  // Global i18n switch – tells @nuxt/content to automatically
  // prepend the active locale to every collection path.
  // -----------------------------------------------------------------
  i18n: true,          // <‑‑ important! enables locale‑aware loading
  defaultLocale: 'de', // <‑‑ important! set your default locale

  collections: {
    "docs_de": defineCollection(
        {
      type: 'page',
      source: 
        {
          include:'de/docs/*.md',
          prefix: '/'
        },
      schema: z.object({
        date: z.string(),
        imgname: z.string(),
      }),
    }
),
    "docs_en": defineCollection({
      type: 'page',
      source: 
        {
          include:'en/docs/*.md',
          prefix: '/'
        },
      schema: z.object({
        date: z.string(),
        imgname: z.string(),
      }),
    }),
    "projects_de": defineCollection({
      type: 'page',
      source: 
        {
          include:'de/projects/*.md',
          prefix: '/'
        },
      schema: z.object({
        date: z.string(),
        lab: z.string(),
        imgname: z.string(),
        status: z.string(),
        links: z.array(z.object({
          url: z.string(),
          name: z.string(),
        })),
        collaborators: z.array(z.string()),
        tags: z.array(z.string()),
      })
    }),
    "projects_en": defineCollection(
      asSeoCollection(
      {
      type: 'page',
      source: 
        {
          include:'en/projects/*.md',
          prefix: '/'
        },
      schema: z.object({
        date: z.string(),
        lab: z.string(),
        imgname: z.string(),
        status: z.string(),
        links: z.array(z.object({
          url: z.string(),
          name: z.string(),
        })),
        collaborators: z.array(z.string()),
        tags: z.array(z.string()),
      })
    }
  )
  )
  }
})

