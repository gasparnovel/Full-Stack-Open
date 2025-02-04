import axios from 'axios'

const api_key = 'e99ba81d4e3a5368eb42d43298b4eeb0'  // API key activa
const baseUrl = 'https://api.openweathermap.org/data/2.5'

const getWeather = async (city) => {
  try {
    console.log('Fetching weather for city:', city) // Para debugging
    const response = await axios.get(
      `${baseUrl}/weather?q=${city}&appid=${api_key}&units=metric&lang=es`
    )
    console.log('Weather data received:', response.data) // Para debugging
    return response.data
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${baseUrl}/weather?q=${city}&appid=${api_key}&units=metric&lang=es`
    })
    throw error
  }
}

export default { getWeather } 