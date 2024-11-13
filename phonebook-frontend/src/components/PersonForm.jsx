import React from 'react'

const PersonForm = (props) => {
  return (
    <form>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/><br/>
          number: <input value= {props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.addData}>ADD</button>
        </div>
    </form>
  )
}

export default PersonForm