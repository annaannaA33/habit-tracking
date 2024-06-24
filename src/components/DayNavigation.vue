<template>
  <div class="day-navigation">
    <div class="nav-button">
      <button @click="prevDay">Prev</button>

      <div></div>

      <div>{{ selectedDate }}</div>

      <button @click="nextDay">Next</button>

      <button @click="showCalendar = true">Calendar</button>
      <CalendarModal
        v-if="showCalendar"
        @select-date="selectDateFromCalendar"
        @close="showCalendar = false"
      />
    </div>

    <div class="seven-day-nav">
      <button
        v-for="day in days"
        :key="day.date"
        @click="selectDay(day.date)"
        :class="{ active: day.date === selectedDate }"
      >
        {{ day.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'
import CalendarModal from './CalendarModal.vue'

const showCalendar = ref(false)
const router = useRouter()
const currentDate = ref(new Date())
const selectedDate = ref(null)
const emit = defineEmits(['dateSelected'])

const days = computed(() => {
  const result = []
  for (let i = -3; i <= 3; i++) {
    const date = new Date()
    date.setDate(currentDate.value.getDate() + i)
    result.push({
      date: date.toISOString().split('T')[0],
      label: date.toDateString()
    })
  }
  return result
})

const formattedDate = computed(() => formatDate(currentDate.value))

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const selectDay = (date) => {
  selectedDate.value = date
  emit('dateSelected', date)
  router.push(`/day/${date}`)
}

const prevDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 1)
}

const nextDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 1)
}

const selectDateFromCalendar = (date) => {
  selectedDate.value = date
  emit('dateSelected', date)
  router.push(`/day/${date}`)
}

if (selectedDate.value == formattedDate.value) {
  selectedDate.value = 'Today'
} else {
  console.log(selectedDate.value)
  console.log(formattedDate.value)
}
</script>

<style>
.seven-day-nav {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}

.seven-day-nav button {
  width: 10%;
  font-size: 10px;
  align-items: center;
}

.nav-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5% 0 5% 0;
}

.active {
  border: 2px solid green;
}
</style>
