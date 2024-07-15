<template>
  <div class="habit-handler">
    <input v-model="newHabitName" placeholder="New habit name" />
    <select v-model="newHabitCategory">
      <option v-for="title in habit.habitCategories.titles" :key="title" :value="title">
        {{ title }}
      </option>
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
import { habit } from '../stores/habits.js'

const newHabitName = ref('')
const newHabitCategory = ref('')
const emit = defineEmits(['habit-added'])

const addNewHabit = () => {
  if (newHabitName.value && newHabitCategory.value) {
    // Создаем новый объект привычки на основе шаблона
    const newHabit = {
      habitId: Date.now(),
      habitTitle: newHabitName.value,
      habitCategory: newHabitCategory.value,
      dates: []
    }
    addHabit(newHabit)
    emit('habit-added')
    newHabitName.value = ''
    newHabitCategory.value = habit.habitCategories.titles[0] // Сброс категории к первому элементу
  }
}
</script>

<style scoped>
.habit-handler {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 600px) {
  .habit-handler {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
