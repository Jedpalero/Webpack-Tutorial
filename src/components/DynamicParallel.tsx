import { useQueries } from '@tanstack/react-query'

const fetchSuperHero = async (heroId: number) => {
  const res = await fetch(`http://localhost:4000/superheroes/${heroId}`)
  const result = await res.json()
  return result
}

const DynamicParallel = ({ heroIds }: { heroIds: number[] }) => {
  const queryResults = useQueries({
    queries: heroIds?.map((id: number) => {
      return {
        queryKey: ['super-heroes', id],
        queryFn: () => fetchSuperHero(id),
        gcTime: 5000,
      }
    }),
  })

  console.log({ queryResults })

  return <div>DynamicParallel</div>
}

export default DynamicParallel
