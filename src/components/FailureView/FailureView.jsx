import './FailureView.css'

const FailureView = props => {
  const {onClickRetry} = props

  return (
    <div className="failure-view">
      <h1>Something went wrong</h1>

      <button type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView