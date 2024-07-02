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
    <HabitHandler />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import habitsStore from '../stores/habits.js'
import HabitHandler from './HabitHandler.vue'

const props = defineProps({
  date: String
})

const habits = computed(() => habitsStore.getHabitsByDate(props.date))

const isFutureDate = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return props.date > today
})

const toggleHabit = (id) => {
  habitsStore.toggleHabitCompletion(id, props.date)
}

const deleteHabit = (id) => {
  habitsStore.deleteHabit(id)
}
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
  color: red;
  margin-bottom: 10px;
}
</style>
