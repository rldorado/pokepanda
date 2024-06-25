import { computed, ref } from 'vue'

// Use filters and pagination on generic objects
export const useFilters = <T>(data: T[], filterFunction: (item: T, filter: string) => boolean) => {
  const filter = ref('')

  const filteredData = computed(() => {
    return data.filter((item) => filterFunction(item, filter.value))
  })

  const setFilter = (newFilter: string) => {
    filter.value = newFilter
  }

  return { filter, filteredData, setFilter }
}

export default useFilters
