<script setup lang="ts">
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import { IMAGE_BASE_URL } from '@/constants'
import Pokemon from '@/models/Pokemon'
import { ref } from 'vue'

const props = defineProps<{
  pokemons: Pokemon[]
  totalItems: number
  limit: number
  offset: number
}>()

const emit = defineEmits(['page-change'])

const layout = ref<'list' | 'grid'>('list')

const pokemonImage = (id: number) => {
  return `${IMAGE_BASE_URL}/${id}.png`
}

const onPageChange = (event: { page: number }) => {
  emit('page-change', event.page * props.limit)
}

const sortKey = ref<string>('')
const sortField = ref<string>('')
const sortOrder = ref<number>(0) // 1 for ascending, -1 for descending, 0 for none
const sortOptions: string[] = ['name', 'height', 'weight', 'base_experience']

const onSortChange = (event: { value: string }) => {
  const sortValue = event.value

  if (sortValue.indexOf('!') === 0) {
    sortOrder.value = -1
    sortField.value = sortValue.substring(1, sortValue.length)
  } else {
    sortOrder.value = 1
    sortField.value = sortValue
  }
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
    :layout="layout"
    :sort-order="sortOrder"
    :sort-field="sortField"
    @page="onPageChange"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <h2 class="m-0">Pokemon List</h2>
        <Dropdown
          v-model="sortKey"
          :value="sortKey"
          :options="sortOptions"
          placeholder="Sort By"
          @change="onSortChange"
        />
        <DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
      </div>
    </template>
    <template #list="slotProps">
      <div v-for="(item, index) in slotProps.items" :key="index">
        <div class="flex flex-column sm:flex-row sm:items-center p-6 gap-4">
          <div class="w-full md:w-2 relative">
            <img :src="pokemonImage(item.id)" :alt="item.name" class="w-full" />
            <Tag :value="item.id" class="absolute top-0 left-0" />
          </div>
          <div class="flex-1">
            <div class="flex justify-content-start align-items-center">
              <h3 class="m-0">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</h3>
            </div>
            <p class="m-0">Height: {{ item.height }}</p>
            <p class="m-0">Weight: {{ item.weight }}</p>
            <p class="m-0">Base Experience: {{ item.base_experience }}</p>
          </div>
        </div>
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
            <div class="flex flex-column align-items-start mt-3">
              <h3 class="m-0">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</h3>
              <p class="m-0">Height: {{ item.height }}</p>
              <p class="m-0">Weight: {{ item.weight }}</p>
              <p class="m-0">Base Experience: {{ item.base_experience }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
