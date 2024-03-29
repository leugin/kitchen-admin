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
  <div class="flex">
    <Panel header="Menu" id="sideMenu">
      <Button label="Cocina" icon="pi pi-home" class="border-0 w-full" outlined/>
      <Button label="Historico" icon="pi pi-database" class="border-0 w-full" outlined/>
      <Button label="Almacen" icon="pi pi-car" class="border-0 w-full" outlined/>
      <Button label="Salir" icon="pi pi-power-off" class="border-0 w-full" outlined/>
    </Panel>
    <main>
    </main>
  </div>

</template>
<style>
#sideMenu {
  width: 250px;
  height: calc(100vh - 100px);
}
#sideMenu .p-panel-header {
  border-radius:0;
}
#sideMenu .p-panel-content {
  padding:0;
}
</style>