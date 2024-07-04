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
import { ref } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

const themeValue = theme.value
console.log(themeValue)
function isLight(themeValue) {
  //themeValue === 'light' ? 'DARK' : 'LIGHT'
  if (themeValue === 'light') {
    return 'DARK'
  } else {
    return 'LIGHT'
  }
}
const isLightTheme = isLight(themeValue)
console.log(isLightTheme)
</script>

<style>
@import 'src/assets/themes.css';

body {
  margin: 20px 10px 15px 10px;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 0;
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
}
</style>
