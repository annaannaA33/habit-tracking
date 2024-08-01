<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="modal-body">
        <main>
          <p><strong>Habit Name:</strong></p>
          <p>Here you can edit the selected habit</p>

          <div class="editHabitName">
            <input type="text" class="newHabitName" v-model="newHabitName" />
            <button type="button" class="btn btn-secondary" @click="editHabitName">
              Edit Habit Title
            </button>
            <button type="button" class="btn btn-danger" @click="deleteHabit">Delete Habit</button>
          </div>
        </main>

        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import habitsStore from '../stores/habits.js'

const props = defineProps({ modelValue: Boolean, title: String, habitId: Number, date: String })

const emit = defineEmits(['', 'update:modelValue', 'refreshHabits'])

const isVisible = ref(props.modelValue)

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
  width: 300px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
