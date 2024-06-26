import { IMAGE_BASE_URL } from '@/constants'

export const pokemonImage = (id: number) => {
  return `${IMAGE_BASE_URL}/${id}.png`
}
