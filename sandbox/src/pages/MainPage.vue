<template>
  <div class="wrapper">
    <MainLayout />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { MainLayout } from '@wapster/crm-ui-library/main';
const value = ref({ firstName: '', lastName: '' });
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
}

.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
