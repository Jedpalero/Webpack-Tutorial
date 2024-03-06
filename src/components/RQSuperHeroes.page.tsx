import { useQuery } from 'react-query'

type DataProps = [{ id: string; name: string }]

const RQSuperHeroesPage = () => {
  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: ['super-heroes'],
    queryFn: async (): Promise<DataProps> => {
      const res = await fetch('http://localhost:4000/superheroes')
      const result = await res.json()
      return result
    },
    staleTime: 30000,
  })

  console.log({ isLoading, isFetching })

  if (isLoading) return <h2>Loading...</h2>

  if (error instanceof Error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h1>RQ Supter Heroes Page</h1>
      {data?.map((hero) => <div key={hero.id}>{hero.name}</div>)}
    </>
  )
}

export default RQSuperHeroesPage
