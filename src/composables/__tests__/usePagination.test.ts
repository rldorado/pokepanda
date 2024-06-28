import { describe, expect, it } from 'vitest'
import { ref, computed, Ref, ComputedRef } from 'vue'
import usePagination, { PaginationConfig } from '../usePagination'
import { DATA_LIMIT as ITEMS_PER_PAGE, DATA_OFFSET as OFFSET } from '@/constants'

describe('usePagination', () => {
  const data = Array.from({ length: 100 }, (_, i) => i)
  const config: PaginationConfig<unknown> = {
    data: computed(() => data) as ComputedRef<unknown[]>,
    rowsPerPage: ref(10) as Ref<number>,
    currentPage: ref(0) as Ref<number>
  }

  it('should paginate data', () => {
    const { paginatedData, currentPage } = usePagination(config)

    expect(paginatedData.value).toEqual(data.slice(0, 10))

    currentPage.value = 1
    expect(paginatedData.value).toEqual(data.slice(10, 20))

    currentPage.value = 2
    expect(paginatedData.value).toEqual(data.slice(20, 30))
  })

  it('should set page within valid range', () => {
    const { setPage, currentPage } = usePagination(config)

    setPage(5)
    expect(currentPage.value).toEqual(5)

    setPage(-1)
    expect(currentPage.value).toEqual(0)

    setPage(100)
    expect(currentPage.value).toEqual(9) // Last valid page (100 items / 10 per page - 1)
  })

  it('should return total items', () => {
    const { totalItems } = usePagination(config)
    expect(totalItems.value).toEqual(100)
  })

  it('should use default values when not provided', () => {
    const { rowsPerPage, currentPage } = usePagination({
      data: computed(() => data),
      rowsPerPage: ref(ITEMS_PER_PAGE),
      currentPage: ref(OFFSET)
    })

    expect(rowsPerPage.value).toEqual(ITEMS_PER_PAGE)
    expect(currentPage.value).toEqual(OFFSET)
  })

  it('should handle empty data', () => {
    const { paginatedData, totalItems } = usePagination({
      data: computed(() => []),
      rowsPerPage: ref(ITEMS_PER_PAGE),
      currentPage: ref(OFFSET)
    })
    expect(paginatedData.value).toEqual([])
    expect(totalItems.value).toEqual(0)
  })

  it('should update paginated data when rowsPerPage changes', () => {
    const rowsPerPage = ref(10)
    const { paginatedData } = usePagination({
      data: computed(() => data),
      rowsPerPage,
      currentPage: ref(OFFSET)
    })

    expect(paginatedData.value).toEqual(data.slice(0, 10))

    rowsPerPage.value = 20
    expect(paginatedData.value).toEqual(data.slice(0, 20))
  })
})
