import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    selectedJobTypes: [],
    activeSalaryId: '',
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {selectedJobTypes, activeSalaryId, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedJobTypes.join(
      ',',
    )}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchData = await response.json()
      console.log(fetchData)
      const updatedData = fetchData.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeEmployment = (isChecked, selectedJobType) => {
    const {selectedJobTypes} = this.state
    if (isChecked) {
      const updatedJobTypes = [...selectedJobTypes, selectedJobType]
      this.setState({selectedJobTypes: updatedJobTypes}, this.getJobData)
    } else {
      const updatedJobTypesList = selectedJobTypes.filter(
        eachJobType => eachJobType !== selectedJobType,
      )
      this.setState({selectedJobTypes: updatedJobTypesList}, this.getJobsData)
    }
  }

  changeSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobData)
  }

  enterSearchInput = () => {
    this.getJobData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {jobsList} = this.state
    const showLengthOfJobsList = jobsList.length === 0

    return showLengthOfJobsList ? (
      this.renderNoJobsView()
    ) : (
      <ul className="jobs-list-items">
        {jobsList.map(job => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-data-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-data-found-img"
      />
      <h1 className="no-data-found-heading">No Jobs Found</h1>
      <p className="no-data-found-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          placeholder="Search"
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          className="search-input"
        />
        <button
          onClick={this.enterSearchInput}
          className="search-btn"
          testid="searchButton"
          type="button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-responsive-container">
        <div className="mobile-search-input-container">
          {this.renderSearchInput()}
        </div>
        <div className="profile-and-filters-container">
          <ProfileCard />
          <hr className="horizontal-line" />
          <FilterGroup
            changeEmployment={this.changeEmployment}
            changeSalary={this.changeSalary}
          />
        </div>
        <div className="Jobs-list-container">
          <div className="desktop-search-input-container">
            {this.renderSearchInput()}
          </div>
          {this.renderJobsFinalView()}
        </div>
      </div>
    )
  }
}
export default AllJobsSection
