import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import weatherService from '../services/weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (country.capital && country.capital[0]) {
      console.log('Fetching weather for:', country.capital[0]) // Para debugging
      weatherService
        .getWeather(country.capital[0])
        .then(weatherData => {
          console.log('Weather data received:', weatherData) // Para debugging
          setWeather(weatherData)
          setError(null)
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
          setError('Failed to load weather data')
          setWeather(null)
        })
    }
  }, [country.capital])

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

      <div>
        <h3>Weather in {country.capital}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather && (
          <div>
            <p>Temperature: {weather.main.temp} °C</p>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
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