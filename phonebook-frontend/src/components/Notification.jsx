import React from 'react'
import '../index.css'

const Notification = ({ message, err }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={err ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification