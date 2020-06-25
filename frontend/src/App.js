import React, { useEffect } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'

function App() {
  useEffect(() => {
    axios
      .get('http://docker-setup.com/api/test-auth')
      .then((res) => console.log(res))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
