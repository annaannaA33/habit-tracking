<template>
  <div class="home">
    <DayNavigation />
    <HabitList :date="currentDate" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DayNavigation from '../components/DayNavigation.vue'
import HabitList from '../components/HabitList.vue'

const currentDate = ref(new Date().toISOString().split('T')[0])
</script>

<style>
.home {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 750px;
}
</style>
