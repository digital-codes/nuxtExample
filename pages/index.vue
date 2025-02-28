<template>
  <div>
    <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc" />
    <p v-else>Content not found.</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();

// ✅ Ensure correct file path based on locale
console.log("Current locale:", locale.value);
console.log("Current route:", route.path);
let langPath = locale.value == "de" ? "/de" : ""
const contentPath = `/docs${langPath}${route.path}`;
const { data: doc, error } = await useAsyncData(async () => await queryCollection("docs").path(contentPath).first());

// ✅ Log fetched content or errors
if (doc.value == null) {
  console.error("SSR Content Load Error:", error.value);
}


</script>
