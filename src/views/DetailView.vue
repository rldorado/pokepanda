<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { usePokemonStore } from '@/stores/pokemonStore'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pokemonImage } from '@/helpers'

const route = useRoute()
const store = usePokemonStore()

onMounted(() => {
  const id = parseInt(route.params.id as string, 10)
  store.loadPokemonById(id)
})

const pokemon = computed(() => store.pokemonDetail)
</script>

<template>
  <section>
    <div v-if="store.loading" class="flex justify-center items-center">
      <ProgressSpinner aria-label="loading" />
    </div>
    <div v-else-if="pokemon" class="p-0 md:p-4">
      <Card style="width: 25rem; overflow: hidden">
        <template #header>
          <img :src="pokemonImage(pokemon.id)" :alt="pokemon.name" class="w-full" />
        </template>
        <template #title>
          <h1 class="text-3xl font-bold mb-4">
            {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
          </h1>
        </template>
        <template #subtitle>
          <Tag v-for="type in pokemon.types" :key="type.name" :value="type.name" class="mr-2" />
        </template>
        <template #content>
          <p><strong>Height:</strong> {{ pokemon.height }} m</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
          <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          <div>
            <h3>Stats</h3>
            <ul>
              <li v-for="stat in pokemon.stats" :key="stat.name">
                {{ stat.name }}: {{ stat.base_stat }}
              </li>
            </ul>
          </div>
          <div>
            <h3>Abilities</h3>
            <ul>
              <li v-for="ability in pokemon.abilities" :key="ability.name">
                {{ ability.name }}
              </li>
            </ul>
          </div>
        </template>
        <template #footer>
          <RouterLink to="/">
            <Button label="Back to list" class="w-full" />
          </RouterLink>
        </template>
      </Card>
    </div>
    <div v-else class="flex justify-center items-center">Pokemon not found</div>
  </section>
</template>
