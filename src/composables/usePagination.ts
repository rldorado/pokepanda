import { DATA_LIMIT as ITEMS_PER_PAGE, DATA_OFFSET as OFFSET } from '@/constants'
import { Ref, computed, ref, ComputedRef } from 'vue'

export interface PaginationConfig<T> {
  rowsPerPage: Ref<number>
  data: ComputedRef<T[]>
  currentPage: Ref<number>
}

export const usePagination = <T>(config: PaginationConfig<T>) => {
  const rowsPerPage = config.rowsPerPage || ref(ITEMS_PER_PAGE)
  const currentPage = config.currentPage || ref(OFFSET)

  const paginatedData = computed(() => {
    const startIndex = currentPage.value * rowsPerPage.value
    return config.data.value.slice(startIndex, startIndex + rowsPerPage.value)
  })

  const totalItems = computed(() => config.data.value.length)

  /**
   * Sets the current page number within the valid range of pages based on the given page number.
   *
   * @param {number} page - The page number to set as the current page.
   * @return {void} This function does not return a value.
   */
  const setPage = (page: number) => {
    const maxPage = Math.ceil(totalItems.value / rowsPerPage.value) - 1
    currentPage.value = Math.max(0, Math.min(page, maxPage))
  }

  return { rowsPerPage, currentPage, paginatedData, totalItems, setPage }
}

export default usePagination
