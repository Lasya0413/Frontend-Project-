
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaEye, FaEyeSlash, FaFacebookF} from 'react-icons/fa'

import './Login.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [infoMsg, setInfoMsg] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const onChangeUsername = event => {
    setUsername(event.target.value)
    setErrorMsg('')
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setErrorMsg('')
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    setErrorMsg('')
    setInfoMsg('')

    if (username.trim() === '' || password.trim() === '') {
      setErrorMsg('Please enter both username and password.')
      return
    }

    setIsLoading(true)

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
        setErrorMsg(data.error_msg || 'Login failed. Please try again.')
      }
      } catch (error) {
        console.error('Login API error:', error)
        setErrorMsg('Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
  }

  const onClickFacebook = () => {
    setInfoMsg('Facebook Login is a UI demo and is not connected yet.')
  }

  const onClickForgotPassword = () => {
    navigate('/forgot-password')
  }

  const onClickSignup = () => {
  navigate('/signup')
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
              autoComplete="username"
            />

            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input password-input"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
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

          <button
            type="button"
            className="facebook-login"
            onClick={onClickFacebook}
          >
            <FaFacebookF className="facebook-icon" />
            Log in with Facebook
          </button>

          <button
            type="button"
            className="forgot-password"
            onClick={onClickForgotPassword}
          >
            Forgot password?
          </button>

          {infoMsg !== '' && (
            <p className="login-info-message">{infoMsg}</p>
          )}
        </div>

        <div className="signup-card">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="signup-link"
              onClick={onClickSignup}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
