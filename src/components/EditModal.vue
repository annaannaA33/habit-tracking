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
            <p><strong>Habit Name:</strong></p>
            <button type="button" class="btn btn-danger" @click="deleteHabit">Delete Habit</button>
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
import { ref, onMounted } from 'vue'

const props = defineProps({ habit: Object })

const emit = defineEmits(['delete', 'editHabitName'])
const habitId = ref(null)
const modalInstance = ref(null)
const deleteHabit = () => {
  emit('delete', props.habit)
}

const editHabitName = () => {
  emit('editHabitName', habitId.value)
}

const openModal = (id) => {
  habitId.value = id
  if (modalInstance.value) {
    modalInstance.value.show()
  }
}

onMounted(() => {
  const modalElement = document.getElementById('exampleModal')
  if (modalElement) {
    modalInstance.value = new Modal(modalElement)
  }
})

defineExpose({ openModal })
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
.modal-edit-btn {
  border-radius: 5px;
}
</style>
