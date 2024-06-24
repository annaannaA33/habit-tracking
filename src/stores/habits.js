// src/stores/habits.js
import { reactive } from 'vue'

const habits = reactive({
  '2024-06-24': [
    { id: 1, name: 'Exercise', completed: true },
    { id: 2, name: 'Read', completed: false }
  ],
  '2024-06-25': [{ id: 3, name: 'Meditate', completed: false }]
})

const getHabitsByDate = (date) => {
  return habits[date] || []
}

const addHabit = (name, date) => {
  if (!habits[date]) {
    habits[date] = []
  }
  habits[date].push({ id: Date.now(), name, completed: false })
}

const toggleHabitCompletion = (id, date) => {
  const habit = habits[date]?.find((h) => h.id === id)
  if (habit) {
    habit.completed = !habit.completed
  }
}

const editHabitName = (id, newName, date) => {
  const habit = habits[date]?.find((h) => h.id === id)
  if (habit) {
    habit.name = newName
  }
}

const removeHabit = (id, date) => {
  const index = habits[date]?.findIndex((h) => h.id === id)
  if (index !== -1) {
    habits[date].splice(index, 1)
  }
}

export default {
  getHabitsByDate,
  addHabit,
  toggleHabitCompletion,
  editHabitName,
  removeHabit
}
