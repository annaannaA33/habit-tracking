import { reactive } from 'vue'

const state = reactive({
  habits: [
    { id: 1, name: 'Exercise', category: 'sport', dates: {} },
    { id: 2, name: 'Read', category: 'education', dates: {} },
    { id: 3, name: 'Drink water', category: 'health', dates: {} }
  ],
  categories: {
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
})

const getHabitsByDate = (date) => {
  return state.habits.map((habit) => ({
    ...habit,
    completed: habit.dates[date] || false
  }))
}

const toggleHabitCompletion = (id, date) => {
  const habit = state.habits.find((habit) => habit.id === id)
  if (habit) {
    habit.dates[date] = !habit.dates[date]
  }
}

const addHabit = (name, category, logo) => {
  const newHabit = {
    id: state.habits.length + 1,
    name,
    category,
    logo,
    dates: {}
  }
  state.habits.push(newHabit)
}

const deleteHabit = (id) => {
  const index = state.habits.findIndex((habit) => habit.id === id)
  if (index !== -1) {
    state.habits.splice(index, 1)
  }
}

export default {
  state,
  getHabitsByDate,
  toggleHabitCompletion,
  addHabit,
  deleteHabit
}
