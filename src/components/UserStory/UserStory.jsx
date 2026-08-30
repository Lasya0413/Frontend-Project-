import './UserStory.css'
const UserStory = props => {
  const {storyDetails} = props
  const {user_name, story_url} = storyDetails

  return (
    <div className="story-item">
      <img
        src={story_url}
        alt={user_name}
        className="story-image"
      />
      <p className="story-user-name">{user_name}</p>
    </div>
  )
}

export default UserStory