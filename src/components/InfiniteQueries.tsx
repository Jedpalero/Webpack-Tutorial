import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment } from 'react/jsx-runtime'

type InfiniteQueriesProps = [
  {
    id: number
    label: string
  },
]

// "serve-json": "json-server --watch db.json --port 4000"

const fetchColor = async ({ pageParam = 1 }): Promise<InfiniteQueriesProps> => {
  const res = await fetch(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  )
  const result = await res.json()
  return result
}

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['colors'],
    queryFn: (pageParam) => fetchColor(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
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
        {data?.pages.map((group, index) => (
          <Fragment key={index}>
            <h2>
              {group.map((color) => (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              ))}
            </h2>
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

export default InfiniteQueries
