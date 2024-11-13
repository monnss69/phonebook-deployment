import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberServices from './services/numberServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchData, setSearchData] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numberServices.getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
        setSearchData(initialPerson)
      })
  }, [])

  const handleSearch = (event) => {
    if (event.target.value === '') {
      setSearchData(persons)
      return
    }
    const searchFilter = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchData(searchFilter)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addData = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    
    if (nameExists) {

      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirmed) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        numberServices.replaceNumber(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson)
            setPersons(updatedPersons)
            setSearchData(updatedPersons)
            setMessage(`Updated ${newName}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }

      setNewName('')
      setNewNumber('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString()
      }

      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)

      numberServices.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSearchData(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteNumber = (id, name) => {
    numberServices.deleteNumber(id, name)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
        setSearchData(updatedPersons)
      })
      .catch(error => {
        if (error === 'Deletion cancelled') {
            return;
        }
        console.error('Error deleting contact:', error);
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} err={false}/>
      <Notification message={errorMessage} err={true}/>
      <Filter handleSearch={handleSearch}/>
      <h3>Add new contact</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addData={addData} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons searchData={searchData} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App