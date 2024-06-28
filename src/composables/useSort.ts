import { ref, computed } from 'vue'
import { type SortOrder } from '@/helpers'

export const useSort = <T>() => {
  const sortKey = ref<string>('')
  const sortField = ref<string>('')
  const sortOrder = ref<SortOrder>(0)

  /**
   * Sets the sorting criteria based on the selected option value.
   *
   * @param {Object} selectedOption - An object containing label and value properties.
   */
  const setSort = (selectedOption: { label: string; value: string }) => {
    if (selectedOption.value.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = selectedOption.value.substring(1, selectedOption.value.length)
      sortKey.value = selectedOption.label
    } else {
      sortOrder.value = 1
      sortField.value = selectedOption.value
      sortKey.value = selectedOption.label
    }
  }

  const sortFunction = computed(() => {
    return (a: T, b: T) => {
      if (!sortField.value) return 0
      const aValue = (a as never)[sortField.value]
      const bValue = (b as never)[sortField.value]

      if (aValue < bValue) return -1 * sortOrder.value
      if (aValue > bValue) return 1 * sortOrder.value
      return 0
    }
  })

  return { setSort, sortKey, sortField, sortOrder, sortFunction }
}

export default useSort
