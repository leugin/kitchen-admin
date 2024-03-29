<script setup lang="ts">
import appStorage from '@/stores/app'
import BurgerMenu from "@/components/BurgerMenu.vue";

const appStore = appStorage()

</script>

<template>
  <Toolbar>
    <template #start>
       <BurgerMenu v-model="appStore.menuOpen"></BurgerMenu>
    </template>



    <template #end>
      <Button icon="pi pi-plus" class="mr-2" severity="success" rounded raised />
    </template>
  </Toolbar>
</template>
<style>


</style>