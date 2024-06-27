import { describe, expect, it } from 'vitest'
import useSort from '../useSort'
import { SORT_OPTIONS } from '@/constants'

describe('useSort', () => {
  const { sortKey, sortField, sortOrder, sortOptions, setSort } = useSort()

  it('should sort data', () => {
    expect(sortKey.value).toBe('')
    expect(sortField.value).toBe('')
    expect(sortOrder.value).toBe(0)
    expect(sortOptions).toEqual(SORT_OPTIONS)
  })

  it('should set sort', () => {
    setSort({ value: 'id' })
    expect(sortKey.value).toBe('id')
    expect(sortField.value).toBe('id')
    expect(sortOrder.value).toBe(1)

    setSort({ value: '!id' })
    expect(sortKey.value).toBe('!id')
    expect(sortField.value).toBe('id')
    expect(sortOrder.value).toBe(-1)
  })
})
