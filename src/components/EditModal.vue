<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="modal-edit-btn"
      data-bs-toggle="modal"
      :data-bs-target="'#editModal-' + habit.habitId"
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
      :id="'editModal-' + habit.habitId"
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
            <input v-model="editedHabitTitle" placeholder="Edit habit name" />
            <button type="button" class="btn btn-danger" @click="deleteHabit">Delete Habit</button>
            <button type="button" class="btn btn-secondary" @click="editHabitName">
              <input type="text" class="newHabitName" v-if="editHabitName" :newTitleOfHabit />
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
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ habit: Object })
//const emit = defineEmits(['delete', 'edit'])
const emit = defineEmits(['delete', 'editHabitName'])
let newTitleOfHabit
const editedHabitTitle = ref(props.habit.habitId, newTitleOfHabit)

//const habitId = ref(props.habit.habitId)
const modalInstance = ref(null)
const deleteHabit = () => {
  emit('delete', props.habit.habitId)
  //modalInstance.value.hide()
}

//const saveChanges = () => {
//  emit('edit', { habitId: props.habit.habitId, newTitle: editedHabitTitle.value })
//  modalInstance.value.hide()
//}
const editHabitName = () => {
  emit('editHabitName', props.habit.habitId)
}

onMounted(() => {
  const modalElement = document.getElementById('exampleModal')
  if (modalElement) {
    modalInstance.value = new Modal(modalElement)
  }
})
const openEditModal = () => {
  modalInstance.value.show()
}
defineExpose({ openEditModal })
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
.modal-edit-btn {
  border-radius: 5px;
}
</style>
