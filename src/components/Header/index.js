import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-content nav-bar-large-container">
          <Link to="/" className="nav-link">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="mobile-nav-menu">
            <li className="list-item">
              <Link to="/" className="link">
                <AiFillHome className="icon" />
              </Link>
            </li>
            <li className="list-item">
              <Link className="link" to="/jobs">
                <BsFillBriefcaseFill className="icon" />
              </Link>
            </li>
            <li className="list-item">
              <button
                onClick={onClickLogout}
                type="button"
                className="mobile-logout-btn"
              >
                <FiLogOut className="icon" />
              </button>
            </li>
          </ul>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
