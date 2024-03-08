import { useQuery } from '@tanstack/react-query'

const fetchSuperHero = async (heroId: string | undefined) => {
  const res = await fetch(`http://localhost:4000/superheroes/${heroId}`)
  const result = await res.json()
  return result
}

export const useSuperHeroData = (heroId: string | undefined) => {
  return useQuery({
    queryKey: ['super-hero', heroId],
    queryFn: () => fetchSuperHero(heroId),
    gcTime: 5000,
  })
}
