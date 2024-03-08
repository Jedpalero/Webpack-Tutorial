import { useQuery } from '@tanstack/react-query'

const fetchSuperHeroes = async (): Promise<HeroProps> => {
  const res = await fetch('http://localhost:4000/superheroes')
  const result = await res.json()
  return result
}
const fetchFriends = async (): Promise<FriendsProps> => {
  const res = await fetch('http://localhost:4000/friends')
  const result = await res.json()
  return result
}

type FriendsProps = [
  {
    name: string
    id: string
  },
]
type HeroProps = [
  {
    name: string
    id: string
  },
]

const ParallelQueries = () => {
  const { data: superheroes } = useQuery({
    queryKey: ['super-heroes'],
    queryFn: fetchSuperHeroes,
  })
  const { data: friends } = useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
  })

  return (
    <>
      <div>
        {superheroes?.map((hero) => <div key={hero.id}>{hero.name}</div>)}
      </div>
      <div>
        {friends?.map((friend) => <div key={friend.id}>{friend.name}</div>)}
      </div>
    </>
  )
}

export default ParallelQueries
