import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import UserStory from '../UserStory/UserStory'
import UserStoriesModal from '../UserStoriesModal/UserStoriesModal'

import './UserStories.css'

const UserStories = () => {
  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)

  const getStories = async () => {
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
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )

    if (response.ok) {
      const data = await response.json()
      setStories(data.users_stories)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  const onClickRetry = () => {
    getStories()
  }

  const onClickStory = story => {
    setSelectedStory(story)
  }

  const onCloseModal = () => {
    setSelectedStory(null)
  }

  if (isLoading) {
    return (
      <div className="stories-loader">
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="stories-failure">
        <p>Something went wrong</p>

        <button type="button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="stories-section">
        <h2 className="section-title">Stories</h2>

        <div className="stories-container">
          <Slider
            slidesToShow={6}
            slidesToScroll={1}
            infinite={false}
            arrows={true}
          >
            {stories.map(eachStory => (
              <div
                key={eachStory.user_id}
                onClick={() => onClickStory(eachStory)}
              >
                <UserStory storyDetails={eachStory} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {selectedStory !== null && (
        <UserStoriesModal
          storyDetails={selectedStory}
          onClose={onCloseModal}
        />
      )}
    </>
  )
}

export default UserStories