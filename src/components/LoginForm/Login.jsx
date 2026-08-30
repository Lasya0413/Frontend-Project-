import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './Login.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    setErrorMsg('')

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        navigate('/', {replace: true})
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <h1 className="instagram-logo">Instagram</h1>

          <form className="login-form" onSubmit={onSubmitForm}>

            <input
              type="text"
              className="login-input"
              placeholder="Phone number, username, or email"
              value={username}
              onChange={onChangeUsername}
            />

            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />

            <button type="submit" className="login-button">
              Log In
            </button>

            {errorMsg !== '' && (
              <p className="error-message">{errorMsg}</p>
            )}

          </form>

          <div className="or-container">
            <span className="line"></span>
            <span className="or-text">OR</span>
            <span className="line"></span>
          </div>

          <button type="button" className="facebook-login">
            <span className="facebook-icon">f</span>
            Log in with Facebook
          </button>

          <button type="button" className="forgot-password">
            Forgot password?
          </button>

        </div>

        <div className="signup-card">
          <p>
            Don't have an account?{' '}
            <span className="signup-link">Sign up.</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginForm