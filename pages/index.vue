<template>
  <div>
    <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc" />
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

  <p>Icons<br>
    <Icon name="material-symbols:calendar-today" style="color: black" />
    <Icon name="fa6-brands:github" style="color: red;width:64px;height:64px;" />
    <Icon name="fa6-brands:linkedin" style="color: black;width:64px;height:64px;" />
    <Icon name="openmoji:flag-germany" style="width:64px;height:64px;" />
    <Icon name="openmoji:bullseye" style="width:32px;height:32px" />
  </p>

  <UContainer>
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-calendar-days-20-solid"
        :label="locale == 'de' ? format(dateValue, 'dd.MM.yyyy HH:mm') : format(dateValue, 'yyyy-MM-dd HH:mm')" />
      <template #panel="{ close }">
        <DatePicker v-model="dateValue" is-required @close="close" />
      </template>
    </UPopover>
  </UContainer>

</template>

<script async setup>
/*
definePageMeta({
  layout: "custom", // Matches "layouts/custom.vue"
});
*/
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { format } from 'date-fns'

const { locale } = useI18n();
const route = useRoute();
const dateValue = ref(new Date())
console.log("Date Value", dateValue.value)

// Ensure correct file path based on locale
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

watch(dateValue, (newValue) => {
  console.log("Date Value changed:", newValue);
});

</script>
