<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Edit
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="deleteHabit"
            >
              Delete
            </button>
            <button type="button" class="btn btn-secondary" @click="editHabitName">
              Edit habit title
            </button>
            <p>here you can edit the selected habit</p>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'bootstrap'
import { onMounted } from 'vue'

onMounted(() => {
  const modalElement = document.getElementById('exampleModal')
  if (modalElement) {
    new Modal(modalElement)
  }
})

const props = defineProps({
  habit: Object
})
const emit = defineEmits(['delete', 'editHabitName'])

const deleteHabit = () => {
  emit('delete', props.habit.id)
}
const editHabitName = () => {
  emit('editHabitName', props.habit.id)
}
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
