<script setup lang="ts">
import type { NuxtError } from '#app'

const { locale } = useI18n();


const props = defineProps({
  error: Object as () => NuxtError
})

onMounted(() => props.error, (error) => {
  console.log("Error:", error.statusCode)
})

const target = locale.value === 'de' ? '/' : `/${locale.value}`

const handleError = () => clearError({ redirect: target })
</script>

<template>
  <NuxtLayout>

<div>
    <h2>Error {{ error.statusCode }}, {{ $t(error.statusMessage?.split(":")[0]) }} : {{ error.statusMessage?.split(":")[1] }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
  </NuxtLayout>
</template>
