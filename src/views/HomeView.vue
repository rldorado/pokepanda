<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { usePokemonStore } from '@/stores/pokemonStore'
import { computed, onMounted, ref, watch } from 'vue'
import { DATA_LIMIT as LIMIT, DATA_OFFSET as OFFSET } from '@/constants'
import ProgressSpinner from 'primevue/progressspinner'

const store = usePokemonStore()

const filter = ref<string>('')

onMounted(() => {
  store.loadPokemons(LIMIT, OFFSET, filter.value)
})

watch(filter, (newFilter) => {
  store.loadPokemons(LIMIT, OFFSET, newFilter)
})

const filteredPokemons = computed(() => {
  return store.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.value.toLowerCase())
  )
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
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="filter"
            type="text"
            class="w-full md:w-1/2"
            placeholder="Search Pokemon"
          />
        </IconField>
      </div>
      <div class="flex justify-center">
        <PokemonList :pokemons="filteredPokemons" />
      </div>
    </div>
  </section>
</template>
