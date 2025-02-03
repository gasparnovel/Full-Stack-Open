import { useState } from 'react'
import PropTypes from 'prop-types'

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
  
  const average = total === 0 ? 0 : (good * 1 + bad * -1) / total
  const positivePercentage = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h2>statistics</h2>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>total {total}</p>
        <p>average {average.toFixed(1)}</p>
        <p>positive {positivePercentage.toFixed(1)} %</p>
      </div>
    </div>
  )
}

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App