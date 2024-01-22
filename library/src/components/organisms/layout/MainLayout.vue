<script setup lang="ts">
import { ref } from 'vue';
import {
  ElHeader,
  ElIcon,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElMenu,
  ElMain,
  ElContainer,
  ElButton,
} from 'element-plus';
import 'element-plus/dist/index.css'
import { Location, Document, Setting, Menu as IconMenu } from '@element-plus/icons-vue';
const isCollapse = ref(true);
const menuOpenHandler = () => {
  isCollapse.value = false;
};

const menuCloseHandler = () => {
  isCollapse.value = true;
};
</script>

<template>
  <div class="main-layout">
    <ElContainer>
      <ElMenu class="el-menu-vertical-demo" :collapse="isCollapse" @open="menuOpenHandler" @close="menuCloseHandler" mode="vertical">
        <ElSubMenu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <ElSubMenu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </ElSubMenu>
        </ElSubMenu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </ElMenu>
      <ElContainer>
        <ElHeader>
          <ElButton @click="menuCloseHandler">Закрыть</ElButton>
          <ElButton @click="menuOpenHandler">Открыть</ElButton>
        </ElHeader>
        <ElMain> Основная часть контента </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
