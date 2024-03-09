import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type PaginatedQueriesProps = [
  {
    id: number
    label: string
  },
]

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['colors', pageNumber],
    queryFn: async (): Promise<PaginatedQueriesProps> => {
      const res = await fetch(
        `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
      )
      const result = await res.json()
      return result
    },
    // refetchOnWindowFocus: false,
    placeholderData: keepPreviousData, // the data from previous fetch will still show, after new data arrives it will swapped the previous
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching ? <span>Loading...</span> : null}
    </>
  )
}

export default PaginatedQueries
