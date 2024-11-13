import React from 'react'

const Persons = ({ searchData, deleteNumber }) => {
  return (
    <div>
        {searchData.map(person => 
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteNumber(person.id, person.name)}>Delete</button>
            <br/>
          </div>
        )}
    </div>
  )
}

export default Persons