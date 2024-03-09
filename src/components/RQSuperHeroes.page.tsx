import { Link } from 'react-router-dom'
import useSuperHeroesData from '../hooks/useSuperHeroesData'

const RQSuperHeroesPage = () => {
  const { isLoading, data, error } = useSuperHeroesData()

  // console.log({ isLoading, isFetching })

  // if (isLoading || isFetching) return <h2>Loading...</h2>
  if (isLoading) return <h2>Loading...</h2>

  if (error instanceof Error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h1>RQ Supter Heroes Page</h1>
      {/* <button onClick={() => refetch()}>Fetch Heroes</button> */}
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
      {/* {data?.map((heroName: number) => (
        <div key={heroName}>
          <div key={heroName}>{heroName}</div>
        </div>
      ))} */}
    </>
  )
}

export default RQSuperHeroesPage
