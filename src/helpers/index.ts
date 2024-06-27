import { IMAGE_BASE_URL } from '@/constants'

export const pokemonImage = (id: number) => {
  return `${IMAGE_BASE_URL}/${id}.png`
}

// Types
export type SortOrder = -1 | 0 | 1 // 1 for ascending, -1 for descending, 0 for none
