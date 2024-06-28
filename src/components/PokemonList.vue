<script setup lang="ts">
// eslint-disable-next-line no-redeclare
import DataView from 'primevue/dataview'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Pokemon from '@/models/Pokemon'
import { SortOrder, pokemonImage } from '@/helpers'
import { RouterLink } from 'vue-router'
import { PropType } from 'vue'
import { SORT_OPTIONS } from '@/constants'

defineProps({
  pokemons: {
    type: Array as PropType<Pokemon[]>,
    required: true,
    default: () => []
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0
  },
  rowsPerPage: {
    type: Number,
    required: true,
    default: 0
  },
  currentPage: {
    type: Number,
    required: true,
    default: 0
  },
  sort: {
    type: Object as PropType<{
      key: string
      field: string
      order: SortOrder
    }>,
    required: true,
    default: () => ({
      key: '',
      field: '',
      order: 0
    })
  }
})

const emit = defineEmits(['page-change', 'sort-change'])

const onSortChange = (event: { value: string }) => {
  emit('sort-change', event.value)
}

const onPageChange = (event: { page: number }) => {
  emit('page-change', event.page)
}
</script>

<template>
  <DataView
    data-key="id"
    paginator
    :value="pokemons"
    :first="currentPage"
    :rows="rowsPerPage"
    :total-records="totalItems"
    layout="grid"
    :sort-order="sort.order"
    :sort-field="sort.field"
    @page="onPageChange"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <h2 class="m-0">Pokedex</h2>
        <Select
          aria-label="Sort By"
          :options="SORT_OPTIONS"
          option-label="label"
          :placeholder="sort.key || 'Sort By'"
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
