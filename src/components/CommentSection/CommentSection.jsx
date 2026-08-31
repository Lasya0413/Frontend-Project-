import {useState} from 'react'

import './CommentSection.css'

const CommentSection = props => {
  const {comments, showCommentInput} = props

  const [commentInput, setCommentInput] = useState('')
  const [newComments, setNewComments] = useState([])

  const onChangeComment = event => {
    setCommentInput(event.target.value)
  }

  const onClickPost = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        user_id: 'current_user',
        user_name: 'You',
        comment: commentInput,
      }

      setNewComments([...newComments, newComment])
      setCommentInput('')
    }
  }

  return (
    <div className="comment-section">
      {comments.map(eachComment => (
        <div key={eachComment.user_id} className="comment">
          <p className="comment-text">
            <span className="comment-username">
              {eachComment.user_name}
            </span>{' '}
            {eachComment.comment}
          </p>
        </div>
      ))}

      {newComments.map((eachComment, index) => (
        <div key={index} className="comment">
          <p className="comment-text">
            <span className="comment-username">
              {eachComment.user_name}
            </span>{' '}
            {eachComment.comment}
          </p>
        </div>
      ))}

      {showCommentInput && (
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={onChangeComment}
            className="comment-input"
          />

          <button
            type="button"
            onClick={onClickPost}
            className="comment-post-button"
          >
            Post
          </button>
        </div>
      )}
    </div>
  )
}

export default CommentSection