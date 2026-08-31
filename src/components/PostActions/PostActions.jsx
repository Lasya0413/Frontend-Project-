import {useState} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import ShareModal from '../ShareModal/ShareModal'

import './PostActions.css'

const PostActions = props => {
  const {
    postId,
    initialLikeStatus,
    initialLikesCount,
    onClickComment,
  } = props

  const [isLiked, setIsLiked] = useState(initialLikeStatus)
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [showShareModal, setShowShareModal] = useState(false)

  const onClickLike = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const newLikeStatus = !isLiked

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        like_status: newLikeStatus,
      }),
    }

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
      options,
    )

    if (response.ok) {
      setIsLiked(newLikeStatus)

      if (newLikeStatus) {
        setLikesCount(likesCount + 1)
      } else {
        setLikesCount(likesCount - 1)
      }
    }
  }

  const onClickShare = () => {
    setShowShareModal(true)
  }

  const onCloseShareModal = () => {
    setShowShareModal(false)
  }

  return (
    <div className="post-actions">
      <button
        type="button"
        className="action-button"
        onClick={onClickLike}
      >
        {isLiked ? (
          <FcLike className="action-icon" />
        ) : (
          <BsHeart className="action-icon" />
        )}
      </button>

      <button
        type="button"
        className="action-button"
        onClick={onClickComment}
      >
        <FaRegComment className="action-icon" />
      </button>

      <button
        type="button"
        className="action-button"
        onClick={onClickShare}
      >
        <BiShareAlt className="action-icon" />
      </button>

      <p className="likes-count">
        {likesCount} likes
      </p>

      {showShareModal && (
        <ShareModal onClose={onCloseShareModal} />
      )}
    </div>
  )
}

export default PostActions