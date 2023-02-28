import {Component} from 'react'
import Loader from 'react-loader-spinner'

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

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repositoriesData: [],
    isLoading: true,
    isStatus: false,
  }

  componentDidMount() {
    this.getRepositoriesData()
  }

  getRepositoriesData = async () => {
    const {activeId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const fetchedData = await response.json()
    const updatedData = fetchedData.popular_repos.map(each => ({
      id: each.id,
      imageUrl: each.avatar_url,
      name: each.name,
      starsCount: each.stars_count,
      forksCount: each.forks_count,
      issuesCount: each.issues_count,
    }))
    console.log(response)
    if (response.ok === true) {
      this.setState({repositoriesData: updatedData, isLoading: false})
    } else {
      this.setState({isStatus: true})
    }
  }

  selectedLanguage = id => {
    this.setState({activeId: id}, this.getRepositoriesData)
  }

  renderLanguageFiltersList = () => {
    const {activeId} = this.state

    return (
      <ul className="tabs-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            isSelected={eachLanguage.id === activeId}
            key={eachLanguage.id}
            languageFiltersData={eachLanguage}
            selectedLanguage={this.selectedLanguage}
          />
        ))}
      </ul>
    )
  }

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="card-items-list-container">
        {repositoriesData.map(data => (
          <RepositoryItem key={data.id} repositoryData={data} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {isLoading, isStatus} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFiltersList()}
        {isStatus && this.renderFailureView()}

        {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
      </div>
    )
  }
}

export default GithubPopularRepos
