
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './ForgetPassword.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const onSubmitForm = event => {
    event.preventDefault()

    if (email.trim() === '') {
      setMessage('Please enter your email address.')
      return
    }

    setMessage(
      'This is a demo. Password reset emails are not available yet.',
    )
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h1 className="forgot-logo">Instagram</h1>

        <div className="forgot-icon">🔒</div>

        <h2>Trouble Logging In?</h2>

        <p className="forgot-description">
          Enter your email address to explore the password recovery flow.
        </p>

        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Email address"
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              setMessage('')
            }}
            required
          />

          <button type="submit" className="forgot-submit-button">
            Continue
          </button>
        </form>

        {message !== '' && (
          <p className="forgot-message">{message}</p>
        )}

        <div className="forgot-divider">
          <span />
          <p>OR</p>
          <span />
        </div>

        <button
          type="button"
          className="create-account-button"
          onClick={() => navigate('/login')}
        >
          Back to Log In
        </button>
      </div>
    </div>
  )
}

export default ForgetPassword
