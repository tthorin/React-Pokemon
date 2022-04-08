import { useState, useEffect } from 'react'
import { BrowserRouter, NavLink, Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Search from './components/Search'

const URL = "https://pokeapi.co/api/v2/"
const FULL_LIST= "pokemon?limit=1200&offset=0"

function App() {
  const [pokeList, setPokeList] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
	setIsLoading(true)
	fetch(URL+FULL_LIST)
	.then(res => res.json())
	.then(data => {
	  setPokeList(data.results)
	  setIsLoading(false)
	})
	console.log(pokeList)
  },[])
 
  return (
	  <main>
		<section>hello world</section>
		<div className="loading">
			<img className="ball" src="./src/favicon.png" alt="" />
			<img className="pika" src="./src/images/Spr_5b2_025_m.png" alt="" />
		</div>
		<Search pokeList = {pokeList}/>

	  </main>

  )
}

export default App
