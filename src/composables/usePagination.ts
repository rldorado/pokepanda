import { DATA_LIMIT as LIMIT, DATA_OFFSET as OFFSET } from '@/constants'
import { Ref, computed, ref } from 'vue'

interface PaginationConfig<T> {
  rowsPerPage?: Ref<number>
  data: Ref<T[]>
  currentPage: Ref<number>
}

export const usePagination = <T>(config: PaginationConfig<T>) => {
  const rowsPerPage = config.rowsPerPage || ref(LIMIT)
  const currentPage = config.currentPage || ref(OFFSET)

  const paginatedData = computed(() => {
    const data = config.data.value
    return data.slice(
      currentPage.value * rowsPerPage.value,
      currentPage.value * rowsPerPage.value + rowsPerPage.value
    )
  })

  const totalItems = computed(() => Math.ceil((config.data.value.length || 0) / rowsPerPage.value))

  const setPage = (offset: number) => {
    currentPage.value = offset
  }

  return { rowsPerPage, currentPage, paginatedData, totalItems, setPage }
}

export default usePagination
