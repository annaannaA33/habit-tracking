<template>
  <div class="habit-handler">
    <input v-model="newHabitName" placeholder="New habit name" />
    <select v-model="newHabitCategory">
      <option v-for="title in categories.titles" :key="title" :value="title">{{ title }}</option>
    </select>
    <button @click="addNewHabit">
      <img
        src="/home/anya/frontend/vue/treker2/habit-tracker/src/assets/icons/plus-lg.svg"
        alt="addNew"
        class="icon"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addHabit } from '../stores/habits.js'

const newHabitName = ref('')
const newHabitCategory = ref('sport')
const emit = defineEmits(['habit-added'])

const categories = {
  titles: ['sport', 'health', 'beauty', 'finance', 'socialization', 'education'],
  colors: {
    sport: 'violet',
    health: 'orange',
    beauty: 'pink',
    finance: 'blue',
    socialization: 'yellow',
    education: 'light blue'
  },
  logos: {
    sport: '🚴‍♂️',
    health: '🍎',
    beauty: '🌸',
    finance: '📊',
    socialization: '🤝',
    education: '📚'
  }
}

const addNewHabit = () => {
  if (newHabitName.value && newHabitCategory.value) {
    const newHabit = {
      id: Date.now(),
      name: newHabitName.value,
      category: newHabitCategory.value,
      dates: {}
    }
    addHabit(newHabit)
    emit('habit-added')
    newHabitName.value = ''
    newHabitCategory.value = 'sport'
  }
}
</script>

<style scoped>
.habit-handler {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
