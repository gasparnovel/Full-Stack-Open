import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        
        axios.put(`http://localhost:3001/persons/${existingPerson.id}`, changedPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : response.data
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error updating person:', error)
            alert(`Error updating ${newName}'s information`)
          })
      }
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        alert(`Error adding ${newName} to phonebook`)
      })
  }

  const personsToShow = searchTerm
    ? persons.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
      />

      <h3>Add a new</h3>
      
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App