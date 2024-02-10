import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaHeart} from 'react-icons/fa'

import './index.css'

function Header({onSearch, favorites, history}) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
    onSearch(event.target.value)
    console.log(favorites)
  }

  const onLogoutSuccess = () => {
    history.replace('/')
  }

  return (
    <div className="header">
      <div className="logo-container">
        <h1 className="page-logo">Food Munch</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button
          onClick={() => setSearchTerm('')}
          className="clear-btn"
          type="button"
        >
          Clear
        </button>
      </div>
      <nav>
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-link">
              Favorites <FaHeart />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
        </ul>
      </nav>
      <button onClick={onLogoutSuccess} type="button" className="log-out-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
