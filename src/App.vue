<template>
  <div :data-theme="theme">
    <header>
      <button @click="toggleTheme">Toggle Theme</button>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>

<style>
@import 'src/assets/themes.css';

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
}
</style>
