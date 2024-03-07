import { useQuery } from '@tanstack/react-query'

type DataProps = [{ id: string; name: string }]

const RQSuperHeroesPage = () => {
  const { isLoading, data, error, isFetching, refetch } = useQuery({
    queryKey: ['super-heroes'],
    queryFn: async (): Promise<DataProps> => {
      const res = await fetch('http://localhost:4000/superheroes')
      const result = await res.json()
      return result
    },
    gcTime: 5000, // gcTime(v5)/cacheTime(oldv) data will 'garbage collected' after data is unused for 5s(input you want). (default is set to 5 min)
    // staleTime: 30000, // refetch on api every 30s (default is set to 0s)
    // refetchOnMount: true, // refetch api on mount (default is set to true);
    // refetchOnWindowFocus: false, // refetch api change when you focus on your browser (default is set to true);
    // refetchInterval: 2000, // automatically refetch api after how many seconds you input(default is set to false);
    // refetchIntervalInBackground: true, // automatically refetch api even if you are not focus in browser (default is set to false)
    enabled: false, // 1. prevent from fetching data on mount 2. to manually fetch data used 'refetch' argumnent, '() => refetch()' on onClick event;
    select: (data) => {
      // used for data transformation
      const superHeroNames = data.map((hero) => hero.name)
      return superHeroNames
    },
  })

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) return <h2>Loading...</h2>

  if (error instanceof Error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h1>RQ Supter Heroes Page</h1>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      {/* {data?.map((hero) => <div key={hero.id}>{hero.name}</div>)} */}
      {data?.map((heroName) => (
        <div key={heroName}>
          <div key={heroName}>{heroName}</div>
        </div>
      ))}
    </>
  )
}

export default RQSuperHeroesPage
