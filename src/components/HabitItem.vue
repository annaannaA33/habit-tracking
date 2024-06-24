<!-- src/components/HabitModal.vue -->
<template>
  <div class="habit-modal" v-if="show">
    <div class="modal-content">
      <h3>Manage Habit</h3>
      <button @click="toggleHabit">{{ habit.completed ? 'Deactivate' : 'Activate' }}</button>
      <button @click="editHabit">Edit Name</button>
      <button @click="deleteHabit">Delete</button>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['show', 'habit'])
const emit = defineEmits(['close', 'toggle', 'edit', 'delete'])

const closeModal = () => {
  emit('close')
}

const toggleHabit = () => {
  emit('toggle', props.habit.id)
}

const editHabit = () => {
  const newName = prompt('Enter new name for the habit:', props.habit.name)
  if (newName) {
    emit('edit', { id: props.habit.id, newName })
  }
}

const deleteHabit = () => {
  emit('delete', props.habit.id)
}
</script>

<style>
.habit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content button {
  display: block;
  margin: 10px 0;
}
</style>
