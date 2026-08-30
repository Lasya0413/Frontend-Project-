import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({})

  const getUserDetails = async () => {
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
      setUserDetails(data.profile)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const onClickLogo = () => {
    navigate('/')
  }

  const onClickHome = () => {
    navigate('/')
  }

  const onClickProfile = () => {
    navigate('/profile')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <aside className="sidebar">

      <button
        type="button"
        className="sidebar-logo-button"
        onClick={onClickLogo}
      >
        <h1 className="sidebar-logo">Instagram</h1>
      </button>

      <button
        type="button"
        className="sidebar-profile"
        onClick={onClickProfile}
      >
        <img
          src={userDetails.profile_pic}
          alt="profile"
          className="profile-circle"
        />

        <div className="profile-details">
          <p className="profile-name">
            {userDetails.user_name}
          </p>

          <p className="profile-username">
            @{userDetails.user_id}
          </p>
        </div>
      </button>

      <div className="sidebar-menu">

        <button
          type="button"
          className="sidebar-item"
          onClick={onClickHome}
        >
          <span>⌂</span>
          <p>Home</p>
        </button>

        <div className="sidebar-item">
          <span>⌕</span>
          <p>Explore</p>
        </div>

        <div className="sidebar-item">
          <span>♡</span>
          <p>Notifications</p>
        </div>

        <div className="sidebar-item">
          <span>✉</span>
          <p>Messages</p>
        </div>

        <div className="sidebar-item">
          <span>➤</span>
          <p>Direct</p>
        </div>

        <div className="sidebar-item">
          <span>▣</span>
          <p>Stats</p>
        </div>

      </div>

      <div className="sidebar-bottom">

        <div className="sidebar-item">
          <span>⚙</span>
          <p>Settings</p>
        </div>

        <button
          type="button"
          className="sidebar-item"
          onClick={onClickLogout}
        >
          <span>⇥</span>
          <p>Logout</p>
        </button>

      </div>

    </aside>
  )
}

export default Sidebar