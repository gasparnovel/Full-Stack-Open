import PropTypes from 'prop-types'
import { useState } from 'react'

const Persons = ({ persons, handleDelete }) => {
  const [hoveredButton, setHoveredButton] = useState(null)

  const buttonStyle = (personId) => ({
    marginLeft: '10px',
    backgroundColor: hoveredButton === personId ? '#4a90e2' : '#f9f9f9',
    color: 'black',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px 10px'
  })

  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button 
            style={buttonStyle(person.id)}
            onClick={() => handleDelete(person.id, person.name)}
            onMouseEnter={() => setHoveredButton(person.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            delete
          </button>
        </div>
      )}
    </div>
  )
}

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      name: PropTypes.string,
      number: PropTypes.string
    })
  ),
  handleDelete: PropTypes.func.isRequired
}

export default Persons 