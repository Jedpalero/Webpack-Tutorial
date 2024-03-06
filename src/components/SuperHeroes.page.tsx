import { useEffect, useState } from 'react'
// import axios from "axios";

type DataProps = [{ id: string; name: string }]

const SuperHeroesPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataProps | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:4000/superheroes')
        const result = await res.json()
        setData(result)
        setLoading(false)
      } catch (err) {
        setError('Error fetching Data')
      }
    }
    // axios.get("http://localhost:4000/superheroes").then((res) => {
    //   setData(res.data);
    //   setLoading(false);
    // });
    fetchData()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>

      {data?.map((hero) => <div key={hero.id}>{hero.name}</div>)}
    </>
  )
}

export default SuperHeroesPage
