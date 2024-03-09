import { useQuery, useQueryClient } from '@tanstack/react-query'

const fetchSuperHero = async (heroId: string | undefined) => {
  const res = await fetch(`http://localhost:4000/superheroes/${heroId}`)
  const result = await res.json()
  return result
}

type Group = [
  {
    id: number
  },
]
export const useSuperHeroData = (heroId: string | undefined) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['super-hero', heroId],
    queryFn: () => fetchSuperHero(heroId),
    initialData: (heroId: string) => {
      const heroID = parseInt(heroId)
      const hero = queryClient
        .getQueryData<Group>(['super-heroes'])
        ?.find((hero) => hero.id === heroID)
      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
    // gcTime: 5000,
  })
}
