<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="modal-edit-btn"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <img
        src="/home/anya/frontend/vue/treker2/habit-tracker/src/assets/icons/three-dots-vertical.svg"
        alt="edit"
        class="icon"
      />
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Habit</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <button type="button" class="btn btn-danger" @click="deleteHabit">Delete</button>
            <button type="button" class="btn btn-secondary" @click="editHabitName">
              Edit Habit Title
            </button>
            <p>Here you can edit the selected habit</p>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from 'bootstrap'
import { onMounted } from 'vue'
import habits from '../stores/habits'

const props = defineProps({
  habit: Object
})

const emit = defineEmits(['delete', 'editHabitName'])

const deleteHabit = () => {
  emit('delete', props.habitId)
}

const editHabitName = () => {
  emit('editHabitName', props.habitId)
}

onMounted(() => {
  const modalElement = document.getElementById('exampleModal')
  if (modalElement) {
    new Modal(modalElement)
  }
})
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
.modal-edit-btn {
  border-radius: 5px;
}
</style>
