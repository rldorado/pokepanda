<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { usePokemonStore } from '@/stores/pokemonStore'
import { onMounted, ref, watch } from 'vue'
import { DATA_LIMIT as LIMIT, DATA_OFFSET as OFFSET } from '@/constants'
import ProgressSpinner from 'primevue/progressspinner'
import useFilters from '@/composables/useFilters'
import usePagination from '@/composables/usePagination'
import useSort from '@/composables/useSort'
import Pokemon from '@/models/Pokemon'

const store = usePokemonStore()

// Search filter
const { filter, setFilter, filteredData } = useFilters(store.pokemons, (pokemon, filter) => {
  return pokemon.name.toLowerCase().includes(filter.toLowerCase())
})

// Pagination
const { rowsPerPage, currentPage, setPage, totalItems } = usePagination<Pokemon>({
  data: filteredData,
  rowsPerPage: ref(LIMIT),
  currentPage: ref(OFFSET)
})

// Sorting
const { sortKey, sortOrder, sortField, sortOptions, setSort } = useSort()

onMounted(() => {
  store.loadAllPokemons('')
  setPage(OFFSET)
})

watch(
  () => filter.value,
  (newFilter) => {
    store.loadAllPokemons(newFilter)
  }
)

const onFilterChange = () => {
  setFilter(filter.value)
  setPage(OFFSET)
}
</script>

<template>
  <section>
    <h1 class="text-center text-3xl font-bold mb-5">Welcome to PokePanda!</h1>
    <div v-if="store.loading" class="flex justify-center items-center">
      <ProgressSpinner aria-label="loading" />
    </div>
    <div v-else>
      <div class="flex justify-center mb-4">
        <IconField class="w-full md:w-3">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="filter"
            type="text"
            class="w-full"
            placeholder="Search for a Pokemon"
            @input="onFilterChange"
          />
        </IconField>
      </div>
      <div>
        <PokemonList
          :pokemons="store.pokemons"
          :total-items="totalItems"
          :limit="rowsPerPage"
          :offset="currentPage"
          :sort="{ key: sortKey, field: sortField, order: sortOrder, options: sortOptions }"
          @sort-change="setSort"
          @page-change="setPage"
        />
      </div>
    </div>
  </section>
</template>
