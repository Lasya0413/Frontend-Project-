import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header/Header'

import './Profile.css'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getProfile = async () => {
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
      'https://apis.ccbp.in/insta-share/my-profile',
      options,
    )

    if (response.ok) {
      const data = await response.json()
      setProfile(data.profile)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const onClickRetry = () => {
    getProfile()
  }

  if (isLoading) {
    return (
      <div className="profile-container">
        <Header />
        <div className="profile-loader">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="profile-container">
        <Header />
        <div className="profile-failure">
          <p>Something went wrong</p>
          <button type="button" onClick={onClickRetry}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <Header />

      <div className="profile-content">

        <div className="profile-top-section">
          <img
            src={profile.profile_pic}
            alt={profile.user_name}
            className="profile-image"
          />

          <div className="profile-details">
            <h1>{profile.user_name}</h1>

            <div className="profile-counts">
              <p>
                <span>{profile.posts_count}</span> Posts
              </p>

              <p>
                <span>{profile.followers_count}</span> Followers
              </p>

              <p>
                <span>{profile.following_count}</span> Following
              </p>
            </div>

            <p className="profile-bio">
              {profile.user_bio}
            </p>
          </div>
        </div>

        <div className="posts-heading">
          <BsGrid3X3 />
          <h2>Posts</h2>
        </div>

        <div className="profile-posts">
            {profile.posts.map(eachPost => (
            <img
                key={eachPost.id}
                src={eachPost.image}
                alt="post"
                className="profile-post-image"
            />
  ))}
</div>

      </div>
    </div>
  )
}

export default Profile