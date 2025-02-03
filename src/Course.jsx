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

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
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

Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    parts: PropTypes.array
  })
}

export default Course