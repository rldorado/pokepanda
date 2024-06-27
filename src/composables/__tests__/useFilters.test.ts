import { it, expect, describe } from 'vitest'
import useFilters from '../useFilters'

describe('useFilters', () => {
  it('should filter data', () => {
    const data = [{ name: 'John' }, { name: 'Jane' }, { name: 'Doe' }]
    const { setFilter, filteredData } = useFilters(data, (item, filter) =>
      item.name.includes(filter)
    )

    expect(filteredData.value).toEqual(data)
    setFilter('J')
    expect(filteredData.value).toEqual([{ name: 'John' }, { name: 'Jane' }])
    setFilter('Do')
    expect(filteredData.value).toEqual([{ name: 'Doe' }])
  })
})
