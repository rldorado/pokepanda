<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import usePokemonStore from '@/stores/pokemonStore'
import { onMounted, ref, computed } from 'vue'
import { DATA_LIMIT as LIMIT, DATA_OFFSET as OFFSET } from '@/constants'
import ProgressSpinner from 'primevue/progressspinner'
import useSearch from '@/composables/useSearch'
import usePagination from '@/composables/usePagination'
import useSort from '@/composables/useSort'
import Pokemon from '@/models/Pokemon'

const store = usePokemonStore()

// Sorting
const { sortKey, sortOrder, sortField, setSort, sortFunction } = useSort<Pokemon>()

// Search filter
const { filter, filteredData } = useSearch<Pokemon>(
  computed(() => store.pokemons),
  (pokemon: Pokemon, filter) => pokemon.name.toLowerCase().includes(filter.toLowerCase())
)

const sortedAndFilteredData = computed<Pokemon[]>(() =>
  [...filteredData.value].sort(sortFunction.value)
)

// Pagination
const { rowsPerPage, currentPage, setPage, totalItems, paginatedData } = usePagination<Pokemon>({
  data: sortedAndFilteredData,
  rowsPerPage: ref(LIMIT),
  currentPage: ref(OFFSET)
})

onMounted(() => {
  store.loadAllPokemons()
})
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
          />
        </IconField>
      </div>
      <div>
        <PokemonList
          :pokemons="paginatedData"
          :total-items="totalItems"
          :rows-per-page="rowsPerPage"
          :current-page="currentPage"
          :sort="{ key: sortKey, field: sortField, order: sortOrder }"
          @sort-change="setSort"
          @page-change="setPage"
        />
      </div>
    </div>
  </section>
</template>
