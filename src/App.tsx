import { useState } from 'react';
import SearchView from './SearchView'
import AddMatchupView from './AddMatchupView';
import './App.css'

function App() {
  const [middlePanel, setMiddlePanel] = useState<'search' | 'addMatchup'>('search');
  const [searchedChampion, setSearchedChampion] = useState('');

  const handleSearch = (value: string) => {
    if (value) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setSearchedChampion(capitalized);
    } else {
      setSearchedChampion('');
    }
  };

  return (
    <main className="container">
      {/* Left Panel */}
      <section className="left-panel">
        <header className="panel-header">
          <h1 className="header-text">Matchup</h1>
        </header>
        
        <div className="interaction-container">
          <input 
            type="text" 
            className="champion-search" 
            placeholder="Search" 
            onClick={() => setMiddlePanel('search')}
            onChange={(e) => handleSearch(e.target.value)}>
          </input>
          <button className="btn" onClick={() => setMiddlePanel('addMatchup')}>Add Matchup</button>
          <button className="btn">Edit Matchup</button>
          <button className="btn">Delete Matchup</button>
        </div>

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

      {/* Middle Panel */}
      <section className="middle-panel">
        {middlePanel == 'search' && <SearchView champion={searchedChampion} />}
        {middlePanel == 'addMatchup' && <AddMatchupView />}
      </section>

      {/* Right Panel */}
      <section className="right-panel">
        <header className="panel-header">
          <h1 className="header-text">Notes</h1>
        </header>
      </section>
    </main>
  )
}

export default App
