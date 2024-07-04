<template>
  <div class="habit-list">
    <div v-if="isFutureDate" class="future-date-message">
      You can view your habits, but you can only mark them as completed after the selected date.
    </div>
    <div v-for="habit in habits" :key="habit.id" class="habit-item">
      <input
        type="checkbox"
        :checked="habit.completed"
        @change="toggleHabit(habit.id)"
        :disabled="isFutureDate"
      />
      <span>{{ habit.name }}</span>
      <span>{{ habitsStore.state.categories.logos[habit.category] }}</span>
      <button @click="deleteHabit(habit.id)" :disabled="isFutureDate">Delete</button>
    </div>
    <HabitHandler @habit-added="refreshHabits" />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import habitsStore from '../stores/habits.js'
import HabitHandler from './HabitHandler.vue'

const props = defineProps({
  date: String
})

const habits = ref([])

const refreshHabits = () => {
  habits.value = habitsStore.getHabitsByDate(props.date)
}

const isFutureDate = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return props.date > today
})

const toggleHabit = (id) => {
  habitsStore.toggleHabitCompletion(id, props.date)
  refreshHabits()
}

const deleteHabit = (id) => {
  habitsStore.deleteHabit(id)
  refreshHabits()
}

watchEffect(refreshHabits)
</script>

<style scoped>
.habit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.future-date-message {
  display: flex;
  justify-content: center;
  justify-items: center;
  color: rgb(250, 127, 19);
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 200%;
  background-color: rgb(197, 189, 179);
  border-radius: 5px;
}
</style>
