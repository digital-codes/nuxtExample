<template>
  <div>
    <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc" />
    <p v-else>Content not found.</p>
  </div>
  <Schedule />
</template>

<script setup>
definePageMeta({
  layout: "custom", // Matches "layouts/custom.vue"
});
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import Schedule from "../components/Schedule.vue";

const { locale } = useI18n();
const route = useRoute();

// ✅ Ensure correct file path based on locale
console.log("Current locale:", locale.value);
console.log("Current route:", route.path);
let contentPath = route.path;
if (route.path.startsWith('/' + locale.value + '/')) {
  contentPath = route.path.slice(locale.value.length + 1);
}
//console.log("Fetching content from path:", contentPath, locale.value);
const name = ref("")
name.value = locale.value + route.path
//console.log("AsyncData key:", name.value);
const collectionName = "docs_" + locale.value;
//console.log("Using collection:", collectionName);
//const { data: result, err } = await useAsyncData(name.value, async () => await queryCollection(collectionName).first());
//console.log("Querying collection:", result, err)
const { data: doc, error } = await useAsyncData(name.value, async () => await queryCollection(collectionName).path(contentPath).first());
//console.log("DOC: ",doc.value, error.value);
// ✅ Log fetched content or errors
if (doc.value == null) {
  console.error("SSR Content Load Error in Contact Page:", error.value);
}


</script>
