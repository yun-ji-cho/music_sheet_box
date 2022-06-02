import { useQuery } from "react-query"
import axios from "axios"

const Example = () => {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios.get(
      "https://api.github.com/repos/tannerlinsley/react-query"
    ).then((res) => {
      console.log(res.data)
      return res.data
    })
  )

  return (
    <div>
      {isLoading && 'loading...'}
      {/* <h1>{data.description}</h1> */}
      {/* <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div> */}
    </div>
  )
}

export default Example