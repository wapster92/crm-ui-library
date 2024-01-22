<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const showMobileMenu = ref(true);
const mobNavigationIsOpened = ref(true);
const mobNavigationClick = (): void => {
  mobNavigationIsOpened.value = !mobNavigationIsOpened.value;
};
</script>
<style lang="scss"></style>
