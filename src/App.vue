<template>
  <div :data-theme="theme">
    <header>
      <button @click="toggleTheme">{{ isLightTheme }}</button>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

const isLightTheme = computed(() => {
  return theme.value === 'light' ? 'DARK' : 'LIGHT'
})
</script>

<style>
button {
  background-color: var(--primary-color);
  color: var(--text-color);
}
</style>
