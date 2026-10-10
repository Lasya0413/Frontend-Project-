
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import './Signup.css'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const navigate = useNavigate()

  const onSubmitForm = event => {
    event.preventDefault()
    setMessage('')
    setIsSubmitted(false)

    if (
      fullName.trim() === '' ||
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      setMessage('Please fill in all fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setMessage('Password must contain at least 6 characters.')
      return
    }

    setIsSubmitted(true)
    setMessage(
      'Demo only! Account registration is not connected to a backend.',
    )
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-card">
          <h1 className="signup-logo">Instagram</h1>

          <h2 className="signup-heading">
            Sign up to see photos and videos from your friends.
          </h2>

          <form onSubmit={onSubmitForm} noValidate>
            <input
              type="text"
              className="signup-input"
              placeholder="Full Name"
              value={fullName}
              onChange={event => setFullName(event.target.value)}
            />

            <input
              type="text"
              className="signup-input"
              placeholder="Username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />

            <input
              type="email"
              className="signup-input"
              placeholder="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <div className="signup-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="signup-input signup-password-input"
                placeholder="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="signup-disclaimer">
              By signing up, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </p>

            <button type="submit" className="signup-submit-button">
              Sign up
            </button>
          </form>

          {message !== '' && (
            <p
              className={
                isSubmitted ? 'signup-message' : 'signup-error-message'
              }
            >
              {message}
            </p>
          )}

          {isSubmitted && (
            <button
              type="button"
              className="signup-login-link"
              onClick={() => navigate('/login')}
            >
              Go to Log In
            </button>
          )}
        </div>

        <div className="signup-login-card">
          <p>
            Have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
