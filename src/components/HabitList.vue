<template>
  <div class="habit-list">
    <div v-for="habit in habits" :key="habit.id" class="habit-item">
      <input type="checkbox" :checked="habit.completed" @change="toggleHabit(habit.id)" />
      {{ habit.name }}
      <button @click="editHabit(habit.id)">Edit</button>
      <button @click="deleteHabit(habit.id)">Delete</button>
    </div>
    <button @click="showAddHabit = true">Add Habit</button>
    <div v-if="showAddHabit">
      <input v-model="newHabit" placeholder="New habit name" />
      <button id="addHabit" @click="addHabit">Add</button>
      <button @click="showAddHabit = false">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import habitsStore from '../stores/habits'
import { useRoute } from 'vue-router'

const newHabit = ref('')
const showAddHabit = ref(false)
const route = useRoute()

const habits = computed(() => habitsStore.getHabitsByDate(route.params.date))

const addHabit = () => {
  habitsStore.addHabit(newHabit.value)
  newHabit.value = ''
  showAddHabit.value = false
}

const toggleHabit = (id) => {
  habitsStore.toggleHabitCompletion(id, route.params.date)
}

const editHabit = (id) => {
  // Ваша логика редактирования привычки
}

const deleteHabit = (id) => {
  habitsStore.removeHabit(id)
}
</script>

<style>
.habit-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

#addHabit {
  margin: 0 10%;
}
</style>
