<template>
  <div class="day-view">
    <DayNavigation @dateSelected="updateDate" />
    <HabitList :date="selectedDate" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
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
const selectedDate = ref(route.params.date || formatDate(new Date()))

const updateDate = (newDate) => {
  selectedDate.value = newDate
  router.push(`/day/${newDate}`)
}

watch(
  () => route.params.date,
  (newDate) => {
    selectedDate.value = newDate || formatDate(new Date())
  }
)
</script>

<style>
.day-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
