<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();

const name = ref("")
name.value = locale.value + route.path
const { data: projects } = await useAsyncData(name.value, async () => {
  const p = await queryCollection("projects_" + locale.value).all()
  console.log("Articles:", p)
  /*
  .only(["title", "date", "description", "author", "_path"]) // Select metadata fields
  .sort({ date: -1 }) // Sort by newest first
  .find()
  */
  const sorted = p.map((item) => {
    const rawDate = item.stem?.match(/^\d{4}-\d{2}-\d{2}/)?.[0]; // Extract YYYY-MM-DD
    console.log("Date:", rawDate);
    return {
      ...item, // Keep original data
      formattedDate: rawDate ? new Date(rawDate) : null, // Convert to Date object
    };
  })
    .sort((a, b) => b.formattedDate - a.formattedDate) // Sort descending by date
  const sorted2 = sorted.map((item) => {
    if (!item.imgname) {
      item.imgname = "/images/projects/dummy.png"
    }
    const img = item.imgname.replace(/^karlsruhe\//, "/images/projects/")
    // const path = item.path.replace(/^\/projects\/de/, "/projects");
    const path = `${locale.value == "de" ? "": "/" + locale.value}/projects/${item.stem}`;
    console.log("Path:", path,locale.value)
    return {
      ...item,
      imgname: img,
      path: path
    };
  });
  return sorted2
}
);
</script>

<template>
  <div>
    <h1>{{ $t("project list") }}</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <NuxtLink :to="locale == 'de' ? '/projects/' + project.stem : '/' + locale + '/projects/' + project.stem">
          <h2>{{ project.title }}</h2>
        </NuxtLink>
        <p><strong>Date:</strong> {{ project.date }}</p>
        <p><strong>Description:</strong> {{ project.description }}</p>
        <p><strong>Lab:</strong> {{ project.lab }}</p>
        <img :src="project.imgname" :alt="project.imgname" class="pimg" />
      </li>
    </ul>
  </div>
</template>

<style>
.pimg {
  width: 100px;
  height: auto;
}
</style>