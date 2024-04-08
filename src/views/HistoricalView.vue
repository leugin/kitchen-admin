<script setup lang="ts">
import {onMounted} from "vue";
import kitchenStorage from "@/stores/kitchenStorage";
import DateTransform from "../utils/DateTransform";

const storage = kitchenStorage()


onMounted(() => {
  storage.find({
    status:'finished'
  });
})

</script>

<template>
  <Panel id="historical"   class="main-table">
    <template #header>
      <div class="flex justify-between	 w-full">
         <span class="font-bold">Historial</span>
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

      <Column field="created" header="created" :showFilterMenu="false">
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

