import useSuperHeroesData from '../hooks/useSuperHeroesData'

const NewSuperHeroes = () => {
  const { data, refetch, isLoading, error } = useSuperHeroesData()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h2>Error fetching Data, Try again...</h2>
  }

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Data</button>
      {data?.map((hero) => <div key={hero.id}>{hero.alterEgo}</div>)}
    </div>
  )
}

export default NewSuperHeroes
