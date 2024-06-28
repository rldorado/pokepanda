import { describe, expect, it } from 'vitest'
import useSort from '../useSort'

describe('useSort', () => {
  it('should initialize with default values', () => {
    const { sortKey, sortField, sortOrder } = useSort()
    expect(sortKey.value).toBe('')
    expect(sortField.value).toBe('')
    expect(sortOrder.value).toBe(0)
  })

  it('should set sort for ascending order', () => {
    const { setSort, sortKey, sortField, sortOrder } = useSort()
    setSort({ label: 'ID', value: 'id' })
    expect(sortKey.value).toBe('ID')
    expect(sortField.value).toBe('id')
    expect(sortOrder.value).toBe(1)
  })

  it('should set sort for descending order', () => {
    const { setSort, sortKey, sortField, sortOrder } = useSort()
    setSort({ label: 'ID Desc', value: '!id' })
    expect(sortKey.value).toBe('ID Desc')
    expect(sortField.value).toBe('id')
    expect(sortOrder.value).toBe(-1)
  })

  it('should provide a correct sort function', () => {
    const { setSort, sortFunction } = useSort<{ id: number }>()
    setSort({ label: 'ID', value: 'id' })

    const data = [{ id: 3 }, { id: 1 }, { id: 2 }]
    const sortedData = [...data].sort(sortFunction.value)
    expect(sortedData).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])

    setSort({ label: 'ID Desc', value: '!id' })
    const sortedDataDesc = [...data].sort(sortFunction.value)
    expect(sortedDataDesc).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }])
  })
})
