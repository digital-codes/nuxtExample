<script setup lang="ts">
const option = ref<ECOption>({
  dataset: {
    dimensions: ['Product', '2015', '2016', '2017'],
    source: [
      {
        Product: 'Matcha Latte',
        2015: 54,
        2016: 42,
        2017: 23,
      },
    ],
  },
  xAxis: { type: 'category', data: ['2015', '2016', '2017'] },
  yAxis: {type: 'value'},
  series: [{ type: 'bar', data: [54,42,23] }],
})
</script>

<template>
  <VChart :option="option" class="chart1"/>
</template>

<style scoped>

.chart1 {
  height: 400px;
}
</style>