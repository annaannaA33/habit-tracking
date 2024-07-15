<template>
  <div class="habit-item">
    <input type="checkbox" :checked="habit.completed" @change="toggleHabit" />
    {{ habit.habitTitle }}
    <button @click="openEditModal">Edit</button>
    <button @click="deleteHabit">Delete</button>
    <EditModal :habit="habit" @edit="handleEdit" @delete="handleDelete" ref="editModal" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import openEditModal from '.EditModal.vue'

const props = defineProps({
  habit: Object
})

const emit = defineEmits(['toggle', 'delete', 'edit'])

const toggleHabit = () => {
  emit('toggle', props.habit.habitId)
}

const editModal = () => {
  emit('edit', props.habit.habitId)
}

const deleteHabit = () => {
  emit('delete', props.habit.habitId)
}

defineExpose({ openEditModal })
</script>

<style scoped>
.habit-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
</style>
