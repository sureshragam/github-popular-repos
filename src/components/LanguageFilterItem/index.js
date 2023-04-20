// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onChangeLanguage, currentTrack} = props
  const {id, language} = languageDetails
  const onLanguageClick = () => {
    onChangeLanguage(id)
  }
  const className = currentTrack === id ? 'active-tab' : null

  return (
    <li className="language-filter-item">
      <button type="button" onClick={onLanguageClick} className={className}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
