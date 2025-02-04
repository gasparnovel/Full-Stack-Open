import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showNotification('Error loading phonebook data', 'error')
        console.error('Error fetching data:', error)
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

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
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
            showNotification(
              `Successfully updated ${returnedPerson.name}'s number`,
              'success'
            )
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              showNotification(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              )
              setPersons(persons.filter(person => person.id !== existingPerson.id))
            } else {
              showNotification(
                `Failed to update ${existingPerson.name}'s information: ${error.response?.data?.error || 'Unknown error'}`,
                'error'
              )
            }
            console.error('Error updating person:', error)
          })
      }
      return
    }

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
        showNotification(
          `Successfully added ${returnedPerson.name}`,
          'success'
        )
      })
      .catch(error => {
        showNotification(
          `Failed to add ${newName}: ${error.response?.data?.error || 'Unknown error'}`,
          'error'
        )
        console.error('Error adding person:', error)
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(
            `Successfully deleted ${name}`,
            'success'
          )
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            showNotification(
              `Information of ${name} was already removed from server`,
              'error'
            )
          } else {
            showNotification(
              `Failed to delete ${name}: ${error.response?.data?.error || 'Unknown error'}`,
              'error'
            )
          }
          setPersons(persons.filter(person => person.id !== id))
          console.error('Error deleting person:', error)
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App