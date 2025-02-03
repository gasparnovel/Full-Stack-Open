import PropTypes from 'prop-types'

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part 
          key={part.id}
          name={part.name} 
          exercises={part.exercises} 
        />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log('Current accumulator:', sum);
    console.log('Current element:', part);
    return sum + part.exercises;
  }, 0);
  return (
    <p><strong>Total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// Simplified PropTypes definition
Header.propTypes = {
  name: PropTypes.string
}

Part.propTypes = {
  name: PropTypes.string,
  exercises: PropTypes.number
}

Content.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      exercises: PropTypes.number
    })
  )
}

Total.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      exercises: PropTypes.number
    })
  )
}

Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    parts: PropTypes.array
  })
}

export default Course