<template>
  <div class="habit-item">
    <input type="checkbox" :checked="habit.completed" @change="toggleHabit" />
    {{ habit.name }}
    <button @click="deleteHabit">Delete</button>
  </div>
</template>

<script setup>
const props = defineProps({
  habit: Object
})

const emit = defineEmits(['toggle', 'delete'])

const toggleHabit = () => {
  emit('toggle', props.habit.id)
}

const deleteHabit = () => {
  emit('delete', props.habit.id)
}
</script>

<style scoped>
.habit-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
</style>
