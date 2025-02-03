import PropTypes from 'prop-types'

const Persons = ({ persons }) => {  
  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      number: PropTypes.string
    })
  )
}

export default Persons 