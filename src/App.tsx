import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container">
      <section className="left-panel">
        <header className="panel-header">
          <h1 className="header-text">Matchup</h1>
        </header>

        <input type= "text" className="champion-search" placeholder="Search"></input>
        <button className="btn">Add Matchup</button>
        <button className="btn">Edit Matchup</button>
        <button className="btn">Delete Matchup</button>

        <footer className="panel-footer">
          <p className="footer-text">
            Matchup is not endorsed by Riot Games and does not reflect the 
            views or opinions of Riot Games or anyone officially involved in 
            producing or managing Riot Games properties. Riot Games and all 
            associated properties are trademarks or registered trademarks of 
            Riot Games, Inc
          </p>
        </footer>
      </section>

      <section className="middle-panel">

      </section>

      <section className="right-panel">

      </section>
    </main>
  )
}

export default App
