<template>
  <div class="day-view">
    <DayNavigation @dateSelected="updateDate" />
    <HabitList :date="date" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DayNavigation from '../components/DayNavigation.vue'
import HabitList from '../components/HabitList.vue'

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

const route = useRoute()
const router = useRouter()
const date = ref(route.params.date || formatDate(new Date()))

const updateDate = (newDate) => {
  date.value = newDate
}

if (!route.params.date) {
  router.push(`/day/${date.value}`)
}
</script>

<style>
.day-view {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 750px;
}
</style>
