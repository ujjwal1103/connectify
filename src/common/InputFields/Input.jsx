import React from 'react'

const Input = (props) => {


    const { type, placeholder, prefix = "", sufix = "" } = props;
    return (
        <div className='flex  items-center relative'
        >
            <span className='absolute px-2  text-white  '>
                {prefix}
            </span>
            <input type={type} className={` border-2  bg-transparent text-white rounded-sm border-violet-500 focus:ring-1 focus:ring-violet-700 focus:shadow-md focus:outline-none focus:shadow-violet-900 px-8`} placeholder={placeholder} />
            <span className='absolute right-0 px-3 text-white'>
                {sufix}
            </span>


        </div>
    )

}

export default Input