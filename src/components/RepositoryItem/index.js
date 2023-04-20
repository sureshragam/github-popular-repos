// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    id,
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="repository-item-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="repository-item-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="repository-item-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
