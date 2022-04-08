import { useState } from 'react'
import { BrowserRouter, NavLink, Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
	  <main>
	  <section>hello world</section>
	  <div className="loading">
	  	<img className="ball" src="./src/favicon.png" alt="" />

	  </div>
	  </main>

  )
}

export default App
