<script setup lang="ts">
import appStorage from '@/stores/app'
import userStorage from '@/stores/userStorage'
import BurgerMenu from "@/components/BurgerMenu.vue";
import { useConfirm } from "primevue/useconfirm";
import CreateOrders from "@/components/CreateOrders.vue";

const appStore = appStorage()
const userStore = userStorage()
const confirm = useConfirm();

const logout = () => {
  confirm.require({
    message: 'Esta seguro de salir',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Salir',
    accept: async () => {
      await userStore.logout()
      location.reload()
    }
  });
};
</script>

<template>
  <Toolbar>
    <template #start>
      <BurgerMenu v-model="appStore.menuOpen"></BurgerMenu>
    </template>

    <template #end>
      <CreateOrders />
    </template>
  </Toolbar>
  <div class="flex">
    <Panel header="Menu" id="sideMenu" :class="appStore.menuOpen ? 'is-open': '' ">
      <router-link to="/" >
        <Button label="Cocina" icon="pi pi-home" class="border-0 w-full" outlined link  active-class="p-button-link-active"/>
      </router-link>
      <router-link to="/historical" >
        <Button label="Historico" icon="pi pi-database" class="border-0 w-full" outlined link active-class="p-button-link-active"/>
      </router-link>
      <router-link to="/warehouse" >
        <Button label="Almacen" icon="pi pi-car" class="border-0 w-full" outlined link active-class="p-button-link-active"/>
      </router-link>
      <Button label="Salir" icon="pi pi-power-off" class="border-0 w-full" outlined link  @click="logout"/>
    </Panel>
    <router-view class="w-full "></router-view>
  </div>
  <ConfirmDialog></ConfirmDialog>

</template>
<style>

#sideMenu:not(.is-open) .p-button-label{
  display:none;
}
#sideMenu:not(.is-open) {
  height: calc(100vh - 100px);
}

#sideMenu.is-open {
  width:160px;
}
#sideMenu .p-panel-header {
  padding: 1.5rem .5rem;
}
#sideMenu {
  width:56px;
  transition: 100ms;

}

#sideMenu .p-panel-header {
  border-radius:0;
  border-top: none;
  border-left:none;
}
#sideMenu .p-panel-header  span{
  margin:auto;
}
#sideMenu .p-panel-content {
  padding:0;
  border-left:none;
  border-radius:0;
  height: calc(100vh - 132px);
  overflow: hidden;
}
#sideMenu .p-panel-content .p-button{
  border-radius:0;
}
#sideMenu .p-panel-content .p-button:first-child{
  margin-top:5px;
}


</style>