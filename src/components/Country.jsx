import PropTypes from 'prop-types'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
      </div>
      <div>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          style={{ maxWidth: '200px', marginTop: '20px' }}
        />
      </div>
    </div>
  )
}

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.number,
    languages: PropTypes.object,
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Country 