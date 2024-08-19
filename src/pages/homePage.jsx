import React from 'react'

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("userLogin"))

  return (
    <div>
        <div className='flex items-center justify-center h-screen'>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center py-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`http://localhost:3001${user?.avatar}`} alt="Quy Phạm"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                    <h4 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">{user.phone}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage