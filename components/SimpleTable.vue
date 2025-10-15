<template>
  <CardComp>
    <template #header>
        Simple Table
    </template>

    <template #default>
        <div v-if="dataLoaded" class="ctable">
        <table>
        <thead v-if="stickyHeader">
            <tr>
              <td v-for="(item, index) in hdrs" scope="col" :class="getHdrClass(index)">{{ item }}</td>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(row) in rows" >
            <template v-for="(item, index) in row"> 
              <template v-if="isIdxPos(index)">
                <td v-if="stickyIndex" scope="row" :class="getIdxClass()"> {{ item }} </td>
                <td v-else > {{ item }}</td>
              </template>
              <template v-else>
                <td> {{ item }}</td>
              </template>
            </template>
            </tr>
        </tbody>
        </table>
        </div>

    </template>


    <template #footer v-if="dataLoaded">
        <!-- make sure to have this disabled until data loaded else "Blob" will fail during SSR -->
        <p>Download Options</p>
        <DownLoad :download-data="rows"
            file-type="csv"
            file-name="Down"
            button-text="Download As CSV"/>
        <DownLoad :download-data="rows"
            file-type="json"
            file-name="Down"
            button-text="Download As JSON"/>
    </template>

    </CardComp>
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

import CardComp from './CardComp.vue'
import DownLoad from './DownLoad.vue'

const props = withDefaults(defineProps<{
  stickyIndex?: boolean
  stickyHeader?: boolean
}>(), {
  stickyIndex: true,
  stickyHeader: true,
})

const rows = ref<any[]>([])
const hdrs = ref<string[]>([])
const dataLoaded = ref(false)

function getHdrClass(i: number) {
  if (i === 0) {
    if (props.stickyIndex && props.stickyHeader) return 'sticky-index'
    if (!props.stickyIndex && props.stickyHeader) return 'sticky-hdr'
    if (props.stickyIndex && !props.stickyHeader) return 'sticky-col'
    return ''
  } else {
    return props.stickyHeader ? 'sticky-hdr' : ''
  }
}

function getIdxClass() {
  return props.stickyIndex ? 'sticky-col' : ''
}

function isIdxPos(i: number | string) {
  // index may be non numerical (object key when iterating a row)
  return props.stickyIndex && (i == hdrs.value[0])
}

onBeforeMount(async () => {
  const url = '/data/table.json'
  const r = await axios.get(url)
  rows.value = r.data
  hdrs.value = Object.keys(rows.value[0] || {})
  dataLoaded.value = true
})
</script>

<style scoped>


.ctable {
  max-height:200px; 
  overflow-y:auto;
  position: relative;
}

table {
  border-collapse: separate;
  border-spacing: 2px;
  margin-top: 0;
  display: table;
  min-width: 100%;
}

tr:nth-child(2n) {
  background-color: var(--c-bg); 
}

tr:nth-child(2n+1) {
  background-color: var(--c-bg2);  
}

td, th {
  vertical-align: bottom;
  text-align: left;
  border: solid 1px var(--c-border);
}

.sticky-hdr {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: var(--c-white);
  color: var(--c-black);
  z-index:3;
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  background: var(--c-white);
  color: var(--c-black);
  left:0;
  z-index: 4;
}

.sticky-index {
  z-index: 5;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left:0;
  background: var(--c-white);
  color: var(--c-brand-fix);
}

</style>
