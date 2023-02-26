import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, selectedLanguage, isSelected} = props

  const onClickLanguageFilter = () => {
    selectedLanguage(languageFiltersData.id)
  }

  const btnClassName = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'
  return (
    <li>
      <button
        type="button"
        className={`${btnClassName}`}
        onClick={onClickLanguageFilter}
      >
        {languageFiltersData.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
