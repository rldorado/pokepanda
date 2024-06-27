<script setup lang="ts">
// eslint-disable-next-line no-redeclare
import DataView from 'primevue/dataview'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Pokemon from '@/models/Pokemon'
import { SortOrder, pokemonImage } from '@/helpers'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  pokemons: Pokemon[]
  totalItems: number
  limit: number
  offset: number
  sort: {
    key: string
    field: string
    order: SortOrder
    options: { label: string; value: string }[]
  }
}>()

const emit = defineEmits(['page-change', 'sort-change'])

const onSortChange = (event: { value: string }) => {
  emit('sort-change', event.value)
}

const onPageChange = (event: { page: number }) => {
  emit('page-change', event.page * props.limit)
}
</script>

<template>
  <DataView
    data-key="id"
    paginator
    :value="pokemons"
    :first="offset"
    :rows="limit"
    :total-records="totalItems"
    layout="grid"
    :sort-order="sort?.order"
    :sort-field="sort?.field"
    @page="onPageChange"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <h2 class="m-0">Pokedex</h2>
        <Select
          v-if="sort"
          :value="sort.key"
          :options="sort.options"
          option-label="label"
          placeholder="Sort By"
          class="md:w-2"
          @change="onSortChange"
        />
      </div>
    </template>
    <template #grid="slotProps">
      <div class="grid">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-12 md:col-6 lg:col-4 p-4 gap-2"
        >
          <div class="flex flex-column align-items-center">
            <div class="w-6 relative">
              <img :src="pokemonImage(item.id)" :alt="item.name" class="w-full" />
              <Tag :value="item.id" class="absolute top-0 left-0" />
            </div>
            <div class="flex flex-column align-items-center mt-3">
              <RouterLink :to="`/pokemon/${item.id}`">
                <h3 class="m-0">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</h3>
              </RouterLink>
              <p>
                <Badge
                  v-for="type in item.types"
                  :key="type.name"
                  :value="type.name"
                  class="mb-2 ml-2"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
