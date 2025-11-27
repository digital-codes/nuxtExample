<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref , watch, onMounted } from 'vue';

const { locale } = useI18n();
const route = useRoute();

// vue-cal v4. not working well with Vite
// import VueCal, { addDatePrototypes, stringToDate, countDays } from 'vue-cal'
// import 'vue-cal/dist/vuecal.css'

// vue-cal v5
// see https://antoniandre.github.io/vue-cal/examples/calendar-events--interactions
//import { VueCal, formatDate, addDays,stringToDate, countDays, addDatePrototypes } from 'vue-cal'
import { VueCal, stringToDate, countDays, addDatePrototypes } from 'vue-cal'
import 'vue-cal/style'
addDatePrototypes() 


const calConfig = ref({ 
  timeFrom: '00:00',
  timeTo: '24:00',
  hideWeekends: false,
  hideWeekNumbers: false,
  disableViews: ['year', 'agenda'],
  defaultView: 'month',
  locale: 'de',
  //locale: locale.value,
})


type CalEvent = { title: string; start: Date; end: Date }
const events = ref<CalEvent[]>([])

watch(locale, (newLocale) => {
  calConfig.value.locale = newLocale;
});


const onReady = ({ view }) => {
  events.value.push({
    title: 'NAVIGATE WEEKS TO LOAD EVENTS!',
    start: new Date(view.start.addDays(3).setHours(10, 0, 0, 0)),
    end: new Date(view.start.addDays(3).setHours(14, 0, 0, 0))
  })
  // view.scrollToCurrentTime()
}

const onViewChange = view => {
  fetchEvents(view.start.format(), view.end.format())
}


/*
 * Fetch events from a backend.
 *
 * @param {string} start - The start date.
 * @param {string} end - The end date.
 * @returns {Promise<void>}
 */
const fetchEvents = async (start:Date, end:Date) => {
  console.log('fetchEvents', start, end)
  await new Promise(resolve => setTimeout(resolve, 500))
  const startDate = stringToDate(start)
  const endDate = stringToDate(end)
  events.value = generateRandomEvents(startDate, endDate)
}

/*
 * Generate random events for a given date range as if they were returned from a backend.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Array} The events.
 */
const generateRandomEvents = (startDate: Date, endDate:Date) => {
  const daysRange = countDays(startDate, endDate)
  const events = []
  for (let i = 0; i < daysRange; i++) {
    for (let j = 0; j < 10; j++) {
      // Set random start and end time in the day, events last 1 hour.
      // The random start and end time is between 9am and 5pm.
      const start = new Date(startDate.getTime())
      start.setDate(start.getDate() + i)
      start.setHours(Math.floor(Math.random() * 8) + 9, Math.floor(Math.random() * 60), 0, 0)
      const end = new Date(start.getTime())
      end.setHours(end.getHours() + 1)
      events.push({ title: `Event ${j}`, start, end })
    }
  }
  console.log('events', events)
  return events
}



</script>
<template>

  <h2>Schedule before xyz</h2>
  <!-- 
  <vue-cal locale="de" timeFrom="00:00" timeTo="24:00" hideWeekends=false hideWeekNumbers=false defaultView="month" />
  -->
  <vue-cal :locale="locale" weeknumbers="true" 
  :titleBar="true"
  :views="['month', 'week', 'day']" 
  view="month"
   :events="events" 
    editable-events 
    :time-from="6 * 60"
    :time-to="22 * 60"
    :views-bar="true"
    @ready="onReady"
    @view-change="onViewChange"
  />

  <h2>Schedule after</h2>


</template>
<style scoped>
</style>    