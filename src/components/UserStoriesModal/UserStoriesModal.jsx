import './UserStoriesModal.css'
const UserStoriesModal = props => {
  const {storyDetails, onClose} = props

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={storyDetails.story_url}
          alt={storyDetails.user_name}
          className="modal-story-image"
        />

        <p className="modal-user-name">
          {storyDetails.user_name}
        </p>
      </div>
    </div>
  )
}

export default UserStoriesModal