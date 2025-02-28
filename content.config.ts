import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    "docs": defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
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
      }),
    }),
    "projects": defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
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
    })
  }
})

