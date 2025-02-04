import PropTypes from 'prop-types'
import { useState } from 'react'

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  const [isHovered, setIsHovered] = useState(false)

  const buttonStyle = {
    backgroundColor: isHovered ? '#4a90e2' : '#f9f9f9',
    color: 'black',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px 10px'
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button 
          type="submit"
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          add
        </button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired
}

export default PersonForm 