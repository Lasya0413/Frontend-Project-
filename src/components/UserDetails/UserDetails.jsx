import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header/Header'

import './UserDetails.css'

const UserDetails = () => {
  const {userId} = useParams()

  const [userDetails, setUserDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getUserDetails = async () => {
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
      `https://apis.ccbp.in/insta-share/users/${userId}`,
      options,
    )

    if (response.ok) {
      const data = await response.json()

      setUserDetails(data.user_details)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [userId])

  const onClickRetry = () => {
    getUserDetails()
  }

  if (isLoading) {
    return (
      <div>
        <Header />

        <div className="user-details-loader">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <Header />

        <div className="user-details-failure">
          <p>Something went wrong</p>

          <button type="button" onClick={onClickRetry}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="user-details-container">
      <Header showBackButton />

      <div className="user-details-content">
        <div className="user-profile-top">
          <img
            src={userDetails.profile_pic}
            alt={userDetails.user_name}
            className="user-profile-image"
          />

          <div className="user-profile-info">
            <h1>{userDetails.user_name}</h1>

            <div className="user-profile-counts">
              <p>
                <span>{userDetails.posts_count}</span> Posts
              </p>

              <p>
                <span>{userDetails.followers_count}</span> Followers
              </p>

              <p>
                <span>{userDetails.following_count}</span> Following
              </p>
            </div>

            <p className="user-profile-bio">
              {userDetails.user_bio}
            </p>
          </div>
        </div>

        <div className="user-posts-heading">
          <BsGrid3X3 />
          <h2>Posts</h2>
        </div>

        {userDetails.posts.length === 0 ? (
          <div className="no-posts-container">
            <BiCamera className="camera-icon" />
            <h2>No Posts</h2>
          </div>
        ) : (
          <div className="user-posts-grid">
              {userDetails.posts.map(eachPost => (
                <img
                  key={eachPost.id}
                  src={eachPost.image}
                  alt="post"
                  className="user-post-image"
                />
              ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default UserDetails