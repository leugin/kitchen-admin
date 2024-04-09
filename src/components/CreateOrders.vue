<script setup lang="ts">
import kitchenStorage from "@/stores/kitchenStorage";
import {ref} from "vue";
const storage = kitchenStorage();
const quantiti = ref(1);
</script>

<template>
  <InputGroup>
    <InputNumber placeholder="Cantidad" v-model="quantiti"/>
    <Button icon="pi pi-plus" severity="sucess" @click="storage.create(quantiti)"
    :disabled="storage.isLoading" :loading="storage.isLoading"
    />
  </InputGroup>
</template>

<style scoped>

</style>