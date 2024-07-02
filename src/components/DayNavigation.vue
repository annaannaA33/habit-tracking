<template>
  <div class="day-navigation">
    <div class="nav-button">
      <button @click="prevDay">Prev</button>
      <div>{{ isToday(selectedDate) ? 'Today' : selectedDate }}</div>
      <button @click="nextDay">Next</button>
      <input
        type="date"
        placeholder="select date"
        v-model="selectedDateInput"
        @change="updateDateFromInput"
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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

const router = useRouter()
const currentDate = ref(new Date())
const selectedDate = ref(formatDate(currentDate.value))
const selectedDateInput = ref(formatDate(currentDate.value))

const days = computed(() => {
  const result = []
  for (let i = -3; i <= 3; i++) {
    const date = new Date()
    date.setDate(currentDate.value.getDate() + i)
    result.push({
      date: formatDate(date),
      label: i === 0 ? 'Today' : date.toDateString()
    })
  }
  return result
})

const formattedDate = computed(() => formatDate(currentDate.value))

const isToday = (date) => date === formattedDate.value

const selectDay = (date) => {
  selectedDate.value = date
  selectedDateInput.value = date
  router.push(`/day/${date}`)
  emit('update:selectedDate', date)
}

const prevDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 1)
  selectedDate.value = formatDate(currentDate.value)
  selectedDateInput.value = selectedDate.value
  router.push(`/day/${selectedDate.value}`)
  emit('update:selectedDate', selectedDate.value)
}

const nextDay = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 1)
  selectedDate.value = formatDate(currentDate.value)
  selectedDateInput.value = selectedDate.value
  router.push(`/day/${selectedDate.value}`)
  emit('update:selectedDate', selectedDate.value)
}

const updateDateFromInput = () => {
  selectedDate.value = selectedDateInput.value
  router.push(`/day/${selectedDate.value}`)
  emit('update:selectedDate', selectedDate.value)
}

const emit = defineEmits(['update:selectedDate'])

watch(selectedDate, (newDate) => {
  emit('update:selectedDate', newDate)
})
</script>

<style scoped>
.seven-day-nav {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}

.seven-day-nav button {
  display: flex;
  width: 12%;
  max-height: 30%;
  font-size: 10px;
  align-items: center;
  justify-content: center;
}

.nav-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10% 0;
}

.active {
  border: 2px solid green;
}
</style>
