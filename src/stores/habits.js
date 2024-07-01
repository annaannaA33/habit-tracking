import { reactive } from 'vue'

const state = reactive({
  habits: [],
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

const loadHabitsFromLocalStorage = () => {
  const storedHabits = localStorage.getItem('habits')
  if (storedHabits) {
    state.habits = JSON.parse(storedHabits)
  }
}

const saveHabitsToLocalStorage = () => {
  localStorage.setItem('habits', JSON.stringify(state.habits))
}

const getHabitsByDate = (date) => {
  return state.habits.map((habit) => ({
    ...habit,
    completed: habit.dates && habit.dates[date] ? habit.dates[date] : false
  }))
}

const toggleHabitCompletion = (id, date) => {
  const habit = state.habits.find((habit) => habit.id === id)
  if (habit) {
    if (!habit.dates) {
      habit.dates = {}
    }
    habit.dates[date] = !habit.dates[date]
    saveHabitsToLocalStorage()
  }
}

const addHabit = (name, category, logo) => {
  const newHabit = {
    id: state.habits.length + 1,
    name,
    category,
    logo,
    dates: {} // Инициализируем объект dates
  }
  state.habits.push(newHabit)
  saveHabitsToLocalStorage()
}

const deleteHabit = (id) => {
  const index = state.habits.findIndex((habit) => habit.id === id)
  if (index !== -1) {
    state.habits.splice(index, 1)
    saveHabitsToLocalStorage()
  }
}

const editHabitName = (id, newName) => {
  const habit = state.habits.find((habit) => habit.id === id)
  if (habit) {
    habit.name = newName
    saveHabitsToLocalStorage()
  }
}

loadHabitsFromLocalStorage()

export default {
  state,
  getHabitsByDate,
  toggleHabitCompletion,
  addHabit,
  deleteHabit,
  editHabitName
}
