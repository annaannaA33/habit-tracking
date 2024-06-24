<template>
  <div class="day-view">
    <DayNavigation @dateSelected="updateDate" />
    <HabitList :date="date" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DayNavigation from '../components/DayNavigation.vue'
import HabitList from '../components/HabitList.vue'

const route = useRoute()
const date = ref(route.params.date)

const updateDate = (newDate) => {
  date.value = newDate
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
