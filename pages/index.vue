<template>

  <UCard class="bg-white dark:bg-black text-black dark:text-white">
    <template v-slot:header>
      header
      <p>Icons<br>
    <Icon name="material-symbols:calendar-today" class="w-8 md:w-10 h-8 md:h-10 dark:bg-white" />
    <Icon name="fa6-brands:github"  class="w-8 md:w-10 h-8 md:h-10 dark:bg-white" />
    <Icon name="fa6-brands:linkedin"  class="w-8 md:w-10 h-8 md:h-10"/>
    <Icon name="openmoji:bullseye"  class="w-8 md:w-10 h-8 md:h-10 dark:bg-white" />
  </p>

    </template>
    <div>
      sdknwelfnk card contetn
      <h1 v-if="doc">{{ doc.title }}</h1>
    <ContentRenderer v-if="doc" :value="doc" />
    <p v-else>Content not found.</p>
  </div>
    <template v-slot:footer>
      footer
      <UContainer class="bg-white dark:bg-black text-black dark:text-white">
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton icon="i-heroicons-calendar-days-20-solid"
        :label="locale == 'de' ? format(dateValue, 'dd.MM.yyyy HH:mm') : format(dateValue, 'yyyy-MM-dd HH:mm')" />
        <template #content>
          <DatePicker v-model="dateValue" is-required  @close="closeDate"/>
        </template>
    </UPopover>
  </UContainer>
    </template>
  </UCard>



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

const closeDate = () => {
  console.log("Close Date:",dateValue.value);
} 

</script>
