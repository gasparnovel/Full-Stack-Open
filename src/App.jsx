import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    
    // Check if person already exists
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error updating person:', error)
            alert(
              `The person '${existingPerson.name}' was already deleted from server`
            )
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
      return
    }

    // If person doesn't exist, create new
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        alert('Error adding new person')
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Deseas eliminar a ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error al eliminar la persona:', error)
          alert(`La información de ${name} ya ha sido eliminada del servidor`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      
      <Persons 
        persons={personsToShow} 
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App