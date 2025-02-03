import { useState } from 'react'
import PropTypes from 'prop-types'

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{typeof value === 'number' ? value.toFixed(1) : value}</td>
  </tr>
)

StatisticLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  
  if (total === 0) {
    return (
      <div>
        <h2>Estadísticas</h2>
        <p>No hay comentarios todavía</p>
      </div>
    )
  }
  
  const average = (good - bad) / total
  const positivePercentage = (good / total) * 100

  return (
    <div>
      <h2>Estadísticas</h2>
      <table>
        <tbody>
          <StatisticLine text="buenos" value={good} />
          <StatisticLine text="neutrales" value={neutral} />
          <StatisticLine text="malos" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="promedio" value={average} />
          <StatisticLine text="positivos" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Dar retroalimentación</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="bueno" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="malo" />
      </div>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App