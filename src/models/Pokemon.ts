export default interface Pokemon {
  id: number
  name: string
  height?: number
  weight?: number
  base_experience?: number
  types: { name: string }[]
  stats?: { base_stat: number; name: string }[]
  abilities?: { name: string }[]
  moves?: { name: string }[]
}
