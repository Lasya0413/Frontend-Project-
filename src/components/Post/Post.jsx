import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import PostActions from '../PostActions/PostActions'
import CommentSection from '../CommentSection/CommentSection'

import './Post.css'

const Post = props => {
  const {postDetails} = props

  const {
    post_id,
    user_id,
    user_name,
    profile_pic,
    post_details,
    likes_count,
    comments,
    liked,
  } = postDetails

  const [showCommentInput, setShowCommentInput] = useState(false)

  const navigate = useNavigate()

  const onClickUsername = () => {
    navigate(`/users/${user_id}`)
  }

  const onClickComment = () => {
    setShowCommentInput(!showCommentInput)
  }

  return (
    <div className="post-container">
      <div className="post-user-details">
        <button
          type="button"
          className="post-profile-button"
          onClick={onClickUsername}
        >
          <img
            src={profile_pic}
            alt={user_name}
            className="post-profile-image"
          />
        </button>

        <button
          type="button"
          className="post-username"
          onClick={onClickUsername}
        >
          {user_name}
        </button>
      </div>

      <img
        src={post_details.image_url}
        alt="post"
        className="post-image"
      />

      <PostActions
        postId={post_id}
        initialLikeStatus={liked}
        initialLikesCount={likes_count}
        onClickComment={onClickComment}
      />

      <div className="post-content">
        <p className="post-caption">
          <span>{user_name}</span> {post_details.caption}
        </p>

        <CommentSection
          comments={comments}
          showCommentInput={showCommentInput}
        />
      </div>
    </div>
  )
}

export default Post