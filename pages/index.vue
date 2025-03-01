<template>
  <div>
    <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc"/>
    <p v-else>Content not found.</p>
  </div>

  <UCard>
    <template v-slot:header>
    header
  </template>
    sdknwelfnk card contetn
    <template v-slot:footer>
    footer
  </template>
  </UCard>
  <!-- 
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
  -->

  <Icon name="material-symbols:calendar-today" style="color: black" />
  <Icon name="fa6-brands:github" style="color: red;width:64px;height:64px;" />
  <Icon name="fa6-brands:linkedin" style="color: black;width:64px;height:64px;" />
  <Icon name="openmoji:flag-germany" style="width:64px;height:64px;" />
  <Icon name="openmoji:bullseye" style="width:32px;height:32px" />
  

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
