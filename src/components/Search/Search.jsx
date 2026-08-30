import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import Post from '../Post/Post'
import FailureView from '../FailureView/FailureView'

import './Search.css'

const Search = () => {
  const {searchInput} = useParams()

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getSearchPosts = async () => {
    setIsLoading(true)
    setIsError(false)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      options,
    )

    if (response.ok) {
      const data = await response.json()
      setPosts(data.posts)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    getSearchPosts()
  }, [searchInput])

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return <FailureView onClickRetry={getSearchPosts} />
  }

  if (posts.length === 0) {
    return (
      <div className="search-not-found">
        <h1>Search Not Found</h1>
      </div>
    )
  }

  return (
    <div className="search-results">
      {posts.map(eachPost => (
        <Post
          key={eachPost.post_id}
          postDetails={eachPost}
        />
      ))}
    </div>
  )
}

export default Search