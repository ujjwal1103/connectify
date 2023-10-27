import React from 'react'

const ErrorPopup = ({ message }) => {
    return (
        <div className='border-red-900 bg-red-300 text-red-900 absolute top-10 p-3 rounded-md'>
            {message}
        </div>
    )
}

export default ErrorPopup