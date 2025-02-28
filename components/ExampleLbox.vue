<template>
    <div class="container">
      <h1>Vue Easy Lightbox</h1>
      <p>Click on the image to open the lightbox</p>
      <p>Click on the background to close the lightbox</p>
      <p>Click on the arrows to navigate through the images</p>
      <p>Click on the title to open the image in a new tab</p>
      <p>Click on the close button to close the lightbox</p>
      <div
        v-for="(src, index) in imgs"
        :key="index"
        class="pic"
        @click="() => showImg(index)"
      >
        <img :src="src" />
      </div>
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="imgs"
        :index="indexRef"
        @hide="onHide"
      />
    </div>
  </template>
  
  <script setup>
  const visibleRef = ref(false);
  const indexRef = ref(0);
  
  const imgs = [
    "https://ok-lab-karlsruhe.de/projects/karlsruhe/odd2025/odd25.png",
    "https://ok-lab-karlsruhe.de/projects/karlsruhe/effekte25-okl.jpg",
    "https://ok-lab-karlsruhe.de/projects/karlsruhe/okl-fest24.jpg"
  ];
  
  const showImg = (index) => {
    indexRef.value = index;
    visibleRef.value = true;
  };
  const onHide = () => (visibleRef.value = false);
  </script>
  
  <style scoped>
  img {
    width: 96px;
    height: auto;
    object-fit: cover;
  }
  .container {
    margin: 0 auto;
    border: solid 1px #ccc;
    }
    .pic {
        display: inline-block;
        margin: 10px;
    }

</style>
