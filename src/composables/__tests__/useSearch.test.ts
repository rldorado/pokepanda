import { it, expect, describe } from 'vitest'
import { ref, computed } from 'vue'
import useSearch from '../useSearch'

describe('useSearch', () => {
  it('should filter data', () => {
    const originalData = ref([{ name: 'John' }, { name: 'Jane' }, { name: 'Doe' }])
    const data = computed(() => originalData.value)

    const { filter, filteredData } = useSearch(data, (item: { name: string }, filterValue) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    expect(filteredData.value).toEqual(originalData.value)

    filter.value = 'j'
    expect(filteredData.value).toEqual([{ name: 'John' }, { name: 'Jane' }])

    filter.value = 'do'
    expect(filteredData.value).toEqual([{ name: 'Doe' }])
  })

  it('should handle empty data', () => {
    const data = computed(() => [])
    const { filteredData } = useSearch(data, () => true)
    expect(filteredData.value).toEqual([])
  })

  it('should handle all data filtered out', () => {
    const data = computed(() => [{ name: 'John' }, { name: 'Jane' }])
    const { filter, filteredData } = useSearch(data, (item: { name: string }, filterValue) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    filter.value = 'xyz'
    expect(filteredData.value).toEqual([])
  })
})
