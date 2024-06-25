<script setup lang="ts">
import DataView from 'primevue/dataview'
import Tag from 'primevue/tag'
import { DATA_LIMIT as LIMIT, IMAGE_BASE_URL } from '@/constants'
import Pokemon from '@/models/Pokemon'

defineProps<{
  pokemons: Pokemon[]
}>()

const pokemonImage = (id: number) => {
  return `${IMAGE_BASE_URL}/${id}.png`
}
</script>

<template>
  <DataView data-key="id" paginator :value="pokemons" :rows="LIMIT" :always-show-paginator="false">
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <h5 class="m-0">Pokemon List</h5>
      </div>
    </template>
    <template #list="slotProps">
      <div v-for="(item, index) in slotProps.items" :key="index">
        <div
          class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
          :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
        >
          <div class="w-4 relative">
            <img
              :src="pokemonImage(item.id)"
              :alt="item.name"
              class="block mx-auto rounded w-full"
            />
            <Tag :value="item.id" class="absolute top-0 left-0 dark:!bg-surface-900" />
          </div>
          <div class="flex-1">
            <div class="flex justify-content-between align-items-center">
              <h5 class="m-0">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</h5>
            </div>
            <p class="m-0">Height: {{ item.height }}</p>
            <p class="m-0">Weight: {{ item.weight }}</p>
            <p class="m-0">Base Experience: {{ item.base_experience }}</p>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
