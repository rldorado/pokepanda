import { computed, ref, ComputedRef } from 'vue'

// Use filters and pagination on generic objects
export const useSearch = <T>(
  data: ComputedRef<T[]>,
  filterFunction: (item: T, filter: string) => boolean
) => {
  const filter = ref<string>('')

  const filteredData = computed(() => {
    return data.value.filter((item: T) => filterFunction(item, filter.value))
  })

  return { filter, filteredData }
}

export default useSearch
