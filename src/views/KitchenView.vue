<script setup lang="ts">
import {onMounted} from "vue";
import kitchenStorage from "@/stores/kitchenStorage";
import DateTransform from "../utils/DateTransform";
import { inject } from 'vue'
import Pusher from "pusher-js";
import {useToast} from "primevue/usetoast";

const storage = kitchenStorage()
const pusher = inject<Pusher>('pusher')
const toast = useToast();


onMounted(async () => {
  await storage.find()
  pusher?.subscribe('orders')
      .bind('order-finished', (data:{order:{id:number, status:'finished'}} )=> {
        toast.add({
          severity: 'success',
          summary: `Order terminada `,
          detail:  `Numero: ${data.order.id}` ,
          life: 3000
        });
         const index = storage.data.findIndex(value => value.id === data.order.id)
        if (index !== -1) {
          storage.data[index].status = data.order.status
        }
      })

})

</script>

<template>
  <Panel id="kitchen"   class="main-table">
    <template #header>
      <div class="flex justify-between	 w-full">
         <span class="font-bold">Cocina</span>
        <div>
          <InputText type="text" size="small"
                     v-model="storage.filters.search.value"
                     @keydown.enter="storage.find()"
                     class="p-column-filter" placeholder="Search"
          />
          <Button icon="pi pi-search"
                  severity="success"
                  text
                  aria-label="Search"
                  class="my-auto"
                  @click="storage.find()"
          />

        </div>
      </div>
    </template>
    <DataTable
        :lazy="true"
        :value="storage.data"
        tableStyle="min-width: 50rem"
        scrollHeight="calc(100vh - 194px)"
        filterDisplay="row"
        :loading="storage.isLoading"
        :paginator="storage.data.length > 0"
        :rows="storage.paginate.per_page"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :totalRecords="storage.paginate.total"
        v-model:filters="storage.filters"
        @page="storage.onPage"
        @sort="storage.onSort"
        @filter="storage.onFilter"


    >
      <template #empty> Sin resultados</template>
      <Column field="id" header="id" style="width: 10%" :sortable="true"/>
      <Column field="label" header="Recipe" :show-filter-menu="false">
        <template #filter="{filterModel,filterCallback}" >
          <InputText type="text" size="small" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
        </template>
      </Column>
      <Column field="status" header="Estado" style="width: 10%" :sortable="true"/>

      <Column field="created" header="created" :showFilterMenu="false" :sortable="true">
        <template #body="slotProps">
          {{ DateTransform.formatInputDate(slotProps.data.created)   }}
        </template>
        <template #filter="{filterModel,filterCallback}" >
          <Calendar v-model="filterModel.value"
                    selectionMode="range" :manualInput="false"
                    size="small"
                    @hide="filterCallback"
          />

        </template>
      </Column>
    </DataTable>

  </Panel>
</template>

<style>
</style>
