<template>
    <div>
        <h1 v-if="doc">{{ doc.title }} {{  name  }}</h1>
        <ContentRenderer v-if="doc" :value="doc" :key="name" />
        <p v-else>Page not found.</p>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();

const count = ref(0);


// ✅ Ensure correct file path based on locale
console.log("Current locale:", locale.value);
console.log("Current route:", route.path);
const slug = route.params.slug;
console.log("Current slug:", slug);
//const contentPath = `/docs${langPath}${route.path}`; 
// const contentPath = locale.value == "de" ? `${route.path.replace('projects','projects/de')}` : `${route.path}`;
const contentPath = `/projects/${locale.value}/${slug}`
const coll = "projects"
//const coll = locale.value == "de" ? "projectsDe" : "projectsEn"
console.log("Content path:", contentPath, coll);
// const { data: doc, error } = await useAsyncData(async () => await queryCollection(coll).path(contentPath).first());

const name = ref("")
name.value = locale.value + route.path
const { data: doc, error } = await useAsyncData(name.value, async () => {
    try {
        const result = await queryCollection(coll).path(contentPath).first()
        console.log("Fetched project data for:", name.value);
        count.value++;
        return result;
    } catch (err) {
        console.error("Failed to fetch project data", err);
        return null;
    }
});


// ✅ Log fetched content or errors
if (doc.value == null) {
    console.error("SSR Content Load Error:", error.value);
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
    })
}



</script>
