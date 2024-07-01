<template>
  <div class="habit-handler">
    <button @click="showForm = !showForm">Add a new Habit</button>
    <div v-if="showForm" class="form-container">
      <form @submit.prevent="addHabit">
        <div>
          <label for="habitName">Habit name:</label>
          <input type="text" id="habitName" v-model="habitName" required />
        </div>
        <div>
          <label for="category">Category:</label>
          <select id="category" v-model="selectedCategory" required>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import habitsStore from '../stores/habits.js'

const showForm = ref(false)
const habitName = ref('')
const selectedCategory = ref('')
const selectedLogo = ref('')

const categories = habitsStore.state.categories.titles

const addHabit = () => {
  habitsStore.addHabit(habitName.value, selectedCategory.value, selectedLogo.value)
  habitName.value = ''
  selectedCategory.value = ''
  selectedLogo.value = ''
  showForm.value = false
}
</script>

<style scoped>
.habit-handler {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.form-container {
  margin-top: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
