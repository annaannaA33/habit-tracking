<!-- src/components/HabitList.vue -->
<template>
  <div class="habit-list">
    <div v-for="habit in habits" :key="habit.id" class="habit-item">
      <input type="checkbox" :checked="habit.completed" @change="toggleHabit(habit.id)" />
      {{ habit.name }}
      <button @click="openModal(habit)">Manage</button>
    </div>
    <button @click="showAddHabit = true">Add Habit</button>
    <div v-if="showAddHabit">
      <input v-model="newHabit" placeholder="New habit name" />
      <button id="addHabit" @click="addHabit">Add</button>
      <button @click="showAddHabit = false">Cancel</button>
    </div>
    <HabitModal
      v-if="showModal"
      :show="showModal"
      :habit="selectedHabit"
      @close="closeModal"
      @toggle="toggleHabit"
      @edit="editHabit"
      @delete="deleteHabit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import habitsStore from '../stores/habits'
import HabitModal from './HabitItem.vue'

const newHabit = ref('')
const showAddHabit = ref(false)
const showModal = ref(false)
const selectedHabit = ref(null)
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

const editHabit = ({ id, newName }) => {
  habitsStore.editHabitName(id, newName)
}

const deleteHabit = (id) => {
  habitsStore.removeHabit(id)
}

const openModal = (habit) => {
  selectedHabit.value = habit
  showModal.value = true
}

const closeModal = () => {
  selectedHabit.value = null
  showModal.value = false
}
</script>

<style>
.habit-list {
  display: flex;
  flex-direction: column;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

#addHabit {
  margin: 10px 0;
}
</style>
