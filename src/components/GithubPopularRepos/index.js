import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoriesList: [],
    currentTrack: languageFiltersData[0].id,
    isLoading: true,
    showFailureView: false,
  }

  componentDidMount() {
    this.getRepositories()
  }

  onChangeLanguage = id => {
    this.setState({currentTrack: id}, this.getRepositories)
  }

  onFetchSuccess = data => {
    this.setState({repositoriesList: data, isLoading: false})
  }

  onFetchFailure = () => {
    this.setState({isLoading: false, showFailureView: true})
  }

  getRepositories = async () => {
    this.setState({isLoading: true})
    const {currentTrack} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${currentTrack}`

    const response = await fetch(url)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedData = popularRepos.map(eachObj => ({
        avatarUrl: eachObj.avatar_url,
        name: eachObj.name,
        id: eachObj.id,
        issuesCount: eachObj.issues_count,
        forksCount: eachObj.forks_count,
        starsCount: eachObj.stars_count,
      }))
      this.onFetchSuccess(updatedData)
    } else {
      this.onFetchFailure()
    }
  }

  renderRepositoryItems = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repositories-container">
        {repositoriesList.map(eachObj => {
          const {id} = eachObj
          return <RepositoryItem key={id} repositoryDetails={eachObj} />
        })}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  render() {
    const {isLoading, currentTrack, showFailureView} = this.state
    return (
      <div className="github-popular-repos-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filter-container">
          {languageFiltersData.map(eachLanguage => {
            const {id} = eachLanguage
            return (
              <LanguageFilterItem
                key={id}
                languageDetails={eachLanguage}
                onChangeLanguage={this.onChangeLanguage}
                currentTrack={currentTrack}
              />
            )
          })}
        </ul>
        {isLoading ? this.renderLoader() : this.renderRepositoryItems()}
        {showFailureView && this.renderFailureView()}
      </div>
    )
  }
}

export default GithubPopularRepos
