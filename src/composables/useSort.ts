import { ref } from 'vue'
import { type SortOrder } from '@/helpers'
import { SORT_OPTIONS } from '@/constants'

export const useSort = () => {
  const sortKey = ref<string>('')
  const sortField = ref<string>('')
  const sortOrder = ref<SortOrder>(0)
  const sortOptions: { label: string; value: string }[] = SORT_OPTIONS

  const setSort = (event: { value: string }) => {
    const sortValue = event.value

    if (sortValue.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = sortValue.substring(1, sortValue.length)
      sortKey.value = sortValue
    } else {
      sortOrder.value = 1
      sortField.value = sortValue
      sortKey.value = sortValue
    }
  }

  return { setSort, sortKey, sortField, sortOrder, sortOptions }
}

export default useSort
