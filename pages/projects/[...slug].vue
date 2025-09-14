<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => withLeadingSlash(String(route.params.slug)).replace(/,+$/, ''))

const pg = "page-" + locale.value + slug.value
const pj = "projects_" + locale.value
console.log("PG:", pg, "Projects:", pj,"Slug:", slug.value, "Locale:", locale.value)


/*
const { data: page } = await useAsyncData('page-' + slug.value, async () => {
    // Build collection name based on current locale
    const collection = ('projects_' + locale.value) as keyof Collections
*/

const { data: page } = await useAsyncData(pg, async () => {
    // Build collection name based on current locale
    const collection = (pj) as keyof Collections

    const content = await queryCollection(collection).path(slug.value).first()

    // Optional: fallback to default locale if content is missing
    if (!content && locale.value !== 'de') {
        return await queryCollection('projects_de').path(slug.value).first()
    }

    return content
}, {
    watch: [locale], // Refetch when locale changes
})
</script>

<template>
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>
        <h1>Page not found</h1>
        <p>This page {{ pg }}, {{ pj }} doesn't exist in {{ locale }} language.</p>
    </div>
</template>

/*
const pg = "page-" + slug.value
const pj = "projects_" + locale.value
console.log("PG:", pg, "Projects:", pj,"Slug:", slug.value, "Locale:", locale.value)


const { data: page } = await useAsyncData(pg, async () => {
    // Build collection name based on current locale
    const collection = (pj) as keyof Collections
    const content = await queryCollection(collection).path(slug.value).first()

    // Optional: fallback to default locale if content is missing
    if (!content && locale.value !== 'de') {
        return await queryCollection('projects_de').path(slug.value).first()
    }

    return content
}, {
    watch: [locale], // Refetch when locale changes
})

*/