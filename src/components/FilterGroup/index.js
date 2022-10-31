/* eslint-disable no-unused-vars */
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {changeEmployment, changeSalary} = props
  const selectedSalary = event => {
    changeSalary(event.target.id)
  }
  const onSelectEmploymentType = event => {
    changeEmployment(event.target.checked, event.target.id)
  }

  const renderEmploymentType = () => (
    <div className="type-of-employment-container">
      <h1 className="filter-type-heading">Type of Employment</h1>
      <ul className="list-items-container">
        {employmentTypesList.map(data => (
          <li className="list-item" key={data.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              id={data.employmentTypeId}
              onChange={onSelectEmploymentType}
            />
            <label className="label-text" htmlFor={data.employmentTypeId}>
              {data.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryType = () => (
    <div className="type-of-employment-container">
      <h1 className="filter-type-heading">Salary Range</h1>
      <ul className="list-items-container">
        {salaryRangesList.map(data => (
          <li className="list-item" key={data.salaryRangeId}>
            <input
              type="radio"
              className="checkbox-input"
              id={data.salaryRangeId}
              onChange={selectedSalary}
              name="salary"
            />
            <label className="label-text" htmlFor={data.salaryRangeId}>
              {data.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filter-container">
      {renderEmploymentType()}
      <hr className="horizontal-line" />
      {renderSalaryType()}
    </div>
  )
}
export default FilterGroup
