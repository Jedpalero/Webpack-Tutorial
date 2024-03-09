import { useQuery } from '@tanstack/react-query'

const fetchUserByEmail = async (email: string) => {
  const res = await fetch(`http://localhost:4000/users/${email}`)
  const result = await res.json()
  return result
}

const fetchCoursesByChannelId = async (channelId: string) => {
  const res = await fetch(`http://localhost:4000/channels/${channelId}`)
  const result = await res.json()
  return result
}

type DataProps = {
  courses: string[]
  id: string
}

const DependentQueries = ({ email }: { email: string }) => {
  const { data: user } = useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUserByEmail(email),
  })

  const channelId = user?.channelId

  const { data: course } = useQuery({
    queryKey: ['courses', channelId],
    queryFn: (): Promise<DataProps> => fetchCoursesByChannelId(channelId),
    enabled: !!channelId,
  })

  // const items: string[] = course?.courses
  // console.log(items)

  return (
    <div>
      {/* {items?.map((item) => <div key={item}>{item}</div>)} */}
      {course?.courses.map((item) => <div key={item}>{item}</div>)}
    </div>
  )
}

export default DependentQueries
