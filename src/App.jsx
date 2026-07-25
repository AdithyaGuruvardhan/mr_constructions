import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-900">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Hello, Tailwind CSS v4!</h1>
      <p className="text-lg mb-8">This repository has been initialized with React and Tailwind.</p>
      
      <button 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer"
        onClick={() => setCount((c) => c + 1)}
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
