import PropTypes from 'prop-types'

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.map(country => 
        <div key={country.name.common}>
          {country.name.common}
          <button 
            onClick={() => handleShowCountry(country)}
            style={{ marginLeft: '10px' }}
          >
            show
          </button>
        </div>
      )}
    </div>
  )
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  handleShowCountry: PropTypes.func.isRequired
}

export default CountryList 