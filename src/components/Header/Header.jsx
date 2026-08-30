import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaSearch, FaBell, FaEnvelope, FaArrowLeft} from 'react-icons/fa'

import './Header.css'

const Header = ({showBackButton}) => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    if (searchInput.trim() !== '') {
      navigate(`/search/${searchInput}`)
    }
  }

  const onClickAddPhoto = () => {
    console.log('Add photo clicked')
  }

  return (
    <header className="header">
      <div className="header-container">
        {showBackButton && (
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="header-actions">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={onChangeSearchInput}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  onClickSearch()
                }
              }}
            />

            <button
              type="button"
              className="search-button"
              onClick={onClickSearch}
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>

          <button
            type="button"
            className="header-icon-button"
            aria-label="Notifications"
          >
            <FaBell />
          </button>

          <button
            type="button"
            className="header-icon-button"
            aria-label="Messages"
          >
            <FaEnvelope />
          </button>

          <button
            type="button"
            className="add-photo-button"
            onClick={onClickAddPhoto}
          >
            + Add photo
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header