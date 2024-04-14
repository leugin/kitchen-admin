<script setup lang="ts">
import {onMounted, ref} from "vue";
import RecipeStorage from "@/stores/RecipeStorage";
const expandedRows = ref([]);

const storage = RecipeStorage()

onMounted(() => {
  storage.find();
})

</script>

<template>
  <Panel id="warehouse"   class="main-table">
    <template #header>
      <div class="flex justify-between	 w-full">
         <span class="font-bold">Recetas</span>
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
        :expanded-rows="expandedRows"
        v-model:filters="storage.filters"
        @page="storage.onPage"
        @sort="storage.onSort"
        @filter="storage.onFilter"
    >
      <template #empty> Sin resultados</template>
      <Column expander style="width: 5rem" />
      <Column field="id" header="id" style="width: 10%" :sortable="true"/>
      <Column field="label" header="Recipe" :show-filter-menu="false">
        <template #filter="{filterModel,filterCallback}" >
          <InputText type="text" size="small" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
        </template>
      </Column>
      <Column field="ingredients" header="ingredients"  :sortable="true">
        <template #body="slotProps">
          <p>
            {{slotProps.data.ingredients.map((val:any) => val.label).join(', ')}}
          </p>
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-3">
          <h5>Orders for {{ slotProps.data.label }}</h5>
          <DataTable :value="slotProps.data.ingredients">
            <Column field="id" header="Id"></Column>
            <Column field="label" header="Nombre"></Column>
            <Column field="quantity" header="Cantidad"></Column>
          </DataTable>
        </div>
      </template>

    </DataTable>

  </Panel>
</template>

<style>
</style>
