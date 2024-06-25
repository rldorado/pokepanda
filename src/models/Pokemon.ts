export default interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  types: { name: string }[]
}
