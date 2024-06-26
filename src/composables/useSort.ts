import { ref } from 'vue'

type SortOrder = 1 | -1 | 0 // 1 for ascending, -1 for descending, 0 for none

export const useSort = () => {
  const sortKey = ref<string>('')
  const sortField = ref<string>('')
  const sortOrder = ref<SortOrder>(0)
  const sortOptions: string[] = ['name', 'height', 'weight', 'base_experience']

  const onSortChange = (event: { value: string }) => {
    const sortValue = event.value

    if (sortValue.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = sortValue.substring(1, sortValue.length)
    } else {
      sortOrder.value = 1
      sortField.value = sortValue
    }
  }

  return { onSortChange, sortKey, sortField, sortOrder, sortOptions }
}

export default useSort
