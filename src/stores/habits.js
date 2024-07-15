import { reactive } from 'vue'

const habits = reactive([])

const habitCategories = reactive({
  titles: ['sport', 'health', 'beauty', 'finance', 'socialization', 'education'],
  colors: {
    sport: 'violet',
    health: 'orange',
    beauty: 'pink',
    finance: 'rose',
    socialization: 'yellow',
    education: 'green'
  },
  logos: {
    sport: '🚴‍♂️',
    health: '🍎',
    beauty: '🌸',
    finance: '📊',
    socialization: '🤝',
    education: '📚'
  }
})

const habit = reactive({
  habitId: Date.now(),
  habitTitle: '',
  habitCategories: habitCategories,
  dates: []
})

const loadHabitsFromLocalStorage = () => {
  const storedHabits = localStorage.getItem('habits')
  if (storedHabits) {
    habits.splice(0, habits.length, ...JSON.parse(storedHabits))
  }
}

const saveHabitsToLocalStorage = () => {
  localStorage.setItem('habits', JSON.stringify(habits))
}

const getHabitsByDate = (date) => {
  return habits.map((habit) => ({
    ...habit,
    completed: habit.dates && habit.dates[date] ? habit.dates[date] : false
  }))
}

const toggleHabitCompletion = (id, date) => {
  const habit = habits.find((habit) => habit.habitId === id)
  if (habit) {
    if (!habit.dates) {
      habit.dates = []
    }
    habit.dates[date] = !habit.dates[date]
    saveHabitsToLocalStorage()
  }
}

const addHabit = (habit) => {
  habits.push(habit)
  saveHabitsToLocalStorage()
}

const deleteHabit = (id) => {
  const index = habits.findIndex((habit) => habit.habitId === id)
  if (index !== -1) {
    habits.habit.splice(index, 1)
    saveHabitsToLocalStorage()
  }
}

const editHabitName = (id, newName) => {
  const habit = habits.habit.find((habit) => habit.habitId === id)
  if (habit) {
    habit.habitTitle = newName
    saveHabitsToLocalStorage()
  }
}

loadHabitsFromLocalStorage()

export default {
  habit,
  getHabitsByDate,
  toggleHabitCompletion,
  addHabit,
  deleteHabit,
  editHabitName
}

export { habit, getHabitsByDate, toggleHabitCompletion, addHabit, deleteHabit, editHabitName }
