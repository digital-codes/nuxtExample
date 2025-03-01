<template>
  <div>
    <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc"/>
    <p v-else>Content not found.</p>
  </div>

  <VaCard>
    <VaImage
      src="/images/x.webp"
      class="cardImg"
    />
    <VaCardTitle>Title</VaCardTitle>
    <VaCardContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </VaCardContent>
  </VaCard>


  <p>
    Material Design Icons<br>
    <VaIcon class="material-icons">
      calendar_today
    </VaIcon>
    <VaIcon name="book" color="#000" size="xl"/>
  </p>

  <p>
    Font Awesome 5<br>
    <VaIcon name="fab-github" size="64px" color="#ffffff"/>
    <VaIcon name="fab-linkedin" size="xl" color="#00ff00"/>
  </p>

  

  <VaDatePicker v-model="dateValue" color="#fff"/>



</template>

<script setup>
/*
definePageMeta({
  layout: "custom", // Matches "layouts/custom.vue"
});
*/

const dateValue = ref(new Date());

import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();

// ✅ Ensure correct file path based on locale
console.log("Current locale:", locale.value);
console.log("Current route:", route.path);
let langPath = locale.value == "de" ? "/de" : ""
const contentPath = `/docs${langPath}${route.path}`;

const name = ref("")
name.value = locale.value + route.path
const { data: doc, error } = await useAsyncData(name.value, async () => await queryCollection("docs").path(contentPath).first());

// ✅ Log fetched content or errors
if (doc.value == null) {
  console.error("SSR Content Load Error:", error.value);
}


</script>
