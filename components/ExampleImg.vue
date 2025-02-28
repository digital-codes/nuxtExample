<template>
    <div class="container">
            <NuxtImg class="pic" :src="src" :sizes="sizes" />
    </div>
</template>

<script setup>

defineProps({
    src: String,
    sizes: {
        type: String,
        default: () => ""
    }
});

</script>

<style scoped>
.container {
    width: 30vw;
    height: auto;
    margin: 0 auto;
    border: solid 1px #ccc;
}
</style>
