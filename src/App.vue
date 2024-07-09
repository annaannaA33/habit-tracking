<template>
  <div :data-theme="theme">
    <header>
      <div class="toggle-theme-container">
        <button class="toggle-theme-button" @click="toggleTheme">{{ isLightTheme }}</button>
      </div>
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

.toggle-theme-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.toggle-theme-button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
</style>
