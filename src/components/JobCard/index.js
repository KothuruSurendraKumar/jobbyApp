import {Link} from 'react-router-dom'
import {BsBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card-container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="name-container">
            <h1 className="title-head">{title}</h1>
            <div className="logo-container">
              <BsFillStarFill className="star-icon" />
              <p className="desc">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locs-container">
          <div className="type-container">
            <div className="logo-container">
              <MdLocationOn className="icon" />
              <p className="desc">{location}</p>
            </div>
            <div className="logo-container">
              <BsBriefcaseFill className="icon" />
              <p className="desc">{employmentType}</p>
            </div>
          </div>
          <p className="desc-pack">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="desc-container">
          <h1 className="desc">Description</h1>
          <p className="desc-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
