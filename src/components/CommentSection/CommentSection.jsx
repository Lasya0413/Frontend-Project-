const CommentSection = props => {
  const {comments} = props

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
    </div>
  )
}

export default CommentSection