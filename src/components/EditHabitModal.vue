<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="habit-name">{{ selectedHabit }}</h2>

        <p class="habit-name">Welcome To Habit Options</p>
      </div>
      <div class="modal-body">
        <main>
          <div class="edit-modal-content">
            <div class="edit-habit-name-section">
              <input
                placeholder="type new habit name here"
                type="text"
                class="newHabitName"
                v-model="newHabitName"
              />

              <div v-if="!isNameLengthValid" class="error-message">
                Habit name must be between 1 and 10 characters.
              </div>

              <button type="button" @click="editHabitName" :disabled="!isValid">
                click to save new name
              </button>
            </div>
            <div class="delete-habit-section">
              <button type="button" @click="deleteHabit">Delete Habit</button>
            </div>
          </div>
        </main>
      </div>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import habitsStore from '../stores/habits.js'

const props = defineProps({
  selectedHabitName: String,
  modelValue: Boolean,
  title: String,
  habitId: Number,
  date: String
})

const emit = defineEmits(['', 'update:modelValue', 'refreshHabits'])

const isVisible = ref(props.modelValue)

const selectedHabit = props.selectedHabitName

const close = () => {
  isVisible.value = false
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal
  }
)
const newHabitName = ref('')
const isNameLengthValid = computed(
  () => newHabitName.value.length > 0 && newHabitName.value.length <= 10
)
const isValid = computed(() => isNameLengthValid.value)

const deleteHabit = () => {
  habitsStore.deleteHabit(props.habitId)
  emit('refreshHabits')
  close()
}

const editHabitName = () => {
  habitsStore.editHabitName(props.habitId, newHabitName.value)
  emit('refreshHabits')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-footer {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  justify-content: center;
}

.error-message {
  color: rgba(38, 28, 231, 0.247);
  font-size: 0.875rem;
  margin-top: 5px;
}

.edit-habit-name-section,
.delete-habit-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.142);
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
