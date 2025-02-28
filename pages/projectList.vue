<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();

const { data: projects } = await useAsyncData("projects", async () => {
  //const p = await queryCollection("docs").path(contentPath).order('date', 'DESC').all() // Fetch all articles
  // const p = locale.value == "de" ? await queryCollection("projectsDe").all() : await queryCollection("projectsEn").all()
  const p = await queryCollection("projects").all()
  console.log("Articles:", p)
  /*
  .only(["title", "date", "description", "author", "_path"]) // Select metadata fields
  .sort({ date: -1 }) // Sort by newest first
  .find()
  */
  const sorted = p.map((item) => {
    const parts = item.stem.split("/"); // Split path by "/"
    const rawDate = parts[2]?.match(/^\d{4}-\d{2}-\d{2}/)?.[0]; // Extract YYYY-MM-DD
    return {
      ...item, // Keep original data
      formattedDate: rawDate ? new Date(rawDate) : null, // Convert to Date object
    };
  })
    .filter((item) => {
      item.language = item.stem.split("/")[1]; // Second item is language
      item.name = item.stem.split("/")[2]; // Second item is language
      console.log("Item lang:", item.language)
      return item.formattedDate && item.language === locale.value;
    })
    .sort((a, b) => b.formattedDate - a.formattedDate) // Sort descending by date
  const sorted2 = sorted.map((item) => {
    if (!item.imgname) {
      item.imgname = "/images/projects/dummy.png"
    }
    const img = item.imgname.replace(/^karlsruhe\//, "/images/projects/")
    // const path = item.path.replace(/^\/projects\/de/, "/projects");
    const path = `${item.language == "de" ? "": "/" + item.language}/projects/${item.name}`;
    console.log("Path:", path,item.language)
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
      <li v-for="project in projects" :key="project.path">
        <NuxtLink :to="project.path">
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