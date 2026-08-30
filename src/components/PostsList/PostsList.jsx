import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Post from '../Post/Post'

import './PostsList.css'

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getPosts = async () => {
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
      'https://apis.ccbp.in/insta-share/posts',
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
    getPosts()
  }, [])

  const onClickRetry = () => {
    getPosts()
  }

  if (isLoading) {
    return (
      <div className="posts-loader">
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="posts-failure">
        <p>Something went wrong</p>

        <button type="button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="posts-container">
      {posts.map(eachPost => (
        <Post
          key={eachPost.post_id}
          postDetails={eachPost}
        />
      ))}
    </div>
  )
}

export default PostsList