<template>
  <label class="relative inline-flex items-center mb-5 cursor-pointer">
    <input type="checkbox" v-model="isChecked" @change="toggleTheme" class="sr-only peer">
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Tema</span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/stores/teme';

const themeStore = useThemeStore();
const iconSrc = ref(getIconSrc());
const ColorSrc = ref(getIconColor());
const isChecked = ref(themeStore.colorTheme === 'dark');

function getIconSrc() {
  return themeStore.colorTheme === 'light'
    ? 'https://cdn.lordicon.com/awjihmup.json'
    : 'https://cdn.lordicon.com/cehbqtgh.json';
}

function getIconColor() {
  return themeStore.colorTheme === 'light'
    ? 'primary:#000,secondary:#000'
    : 'primary:#fff,secondary:#fff';
}

const toggleTheme = () => {
  themeStore.toggleTheme();
  iconSrc.value = getIconSrc();
  ColorSrc.value = getIconColor();
  isChecked.value = themeStore.colorTheme === 'dark';
}
</script>
