<template>
    <p v-if="isMobile">This is a mobile device</p>
  <p v-else>This is a desktop device</p>
  <UApp>
  <NuxtRouteAnnouncer />
    <NuxtLayout>
    <NuxtPage/>    
  </NuxtLayout>
</UApp>

</template>
<script setup>
const { isMobile } = useDevice()

</script>