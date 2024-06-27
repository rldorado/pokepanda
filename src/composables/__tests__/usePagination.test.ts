import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import usePagination from '../usePagination'

describe('usePagination', () => {
  const data = Array.from({ length: 100 }, (_, i) => i)
  const config = {
    data: ref(data),
    rowsPerPage: ref(10),
    currentPage: ref(0)
  }

  it('should paginate data', () => {
    const { paginatedData } = usePagination(config)

    expect(paginatedData.value).toEqual(data.slice(0, 10))

    config.currentPage.value = 1
    expect(paginatedData.value).toEqual(data.slice(10, 20))

    config.currentPage.value = 2
    expect(paginatedData.value).toEqual(data.slice(20, 30))
  })

  it('should set page', () => {
    const { setPage } = usePagination(config)
    setPage(1)
    expect(config.currentPage.value).toEqual(1)
  })

  it('should return total items', () => {
    const { totalItems } = usePagination(config)
    expect(totalItems.value).toEqual(10)
  })

  it('should return rows per page', () => {
    const { rowsPerPage } = usePagination(config)
    expect(rowsPerPage.value).toEqual(10)
  })
})
