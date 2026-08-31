import './ShareModal.css'

const ShareModal = props => {
  const {onClose} = props

  const onClickCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied!')
  }

  return (
    <div className="share-modal-container">
      <div className="share-modal-content">
        <button
          type="button"
          className="share-close-button"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Share Post</h2>

        <button
          type="button"
          className="share-option"
          onClick={onClickCopy}
        >
          📋 Copy Link
        </button>

        <button
          type="button"
          className="share-option"
        >
          💬 Share to Messages
        </button>

        <button
          type="button"
          className="share-option"
        >
          📱 Share to WhatsApp
        </button>
      </div>
    </div>
  )
}

export default ShareModal