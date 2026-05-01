import { useEffect, useState } from 'react';
import SearchView from './SearchView'
import AddMatchupView from './AddMatchupView';
import './App.css'

function App() {
  const [middlePanel, setMiddlePanel] = useState<'search' | 'addMatchup'>('search');
  const [searchedChampion, setSearchedChampion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [championNames, setChampionNames] = useState<any>(null);
  const [matchupNotes, setMatchupNotes] = useState('');

  useEffect(() => {
    async function fetchData() {
      const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      const versions = await versionResponse.json();
      const version = versions[0];
      setLatestVersion(version);

      const champResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      const champData = await champResponse.json();
      const champNames = Object.values(champData.data).map((champ: any) => champ.name);
      setChampionNames(champNames);
    }

    fetchData();
  }, []);

  const isValidChampion = (userInput: string) => {
    return championNames ? championNames.includes(userInput) : false;
  }

  const handleSearch = (userInput: string) => {
    const capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

    if (isValidChampion(capitalizedChampionName)) {
      setSearchedChampion(capitalizedChampionName);
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
        
        <div className="left-panel-interaction-container">
          <input 
            type="text" 
            className="champion-search" 
            placeholder="Search" 
            onClick={() => setMiddlePanel('search')}
            onChange={(e) => handleSearch(e.target.value)}
          />
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
        {middlePanel == 'search' && <SearchView champion={searchedChampion} version={latestVersion} />}
        {middlePanel == 'addMatchup' && <AddMatchupView championNames={championNames} version={latestVersion} />}
      </section>

      {/* Right Panel */}
      <section className="right-panel">
        <header className="panel-header">
          <label htmlFor="matchup-notes" className="notes-label">Notes</label>
        </header>

        <div className="notes-container">  
          <textarea
          id="matchup-notes"
          className="matchup-notes"
          value={matchupNotes}
          disabled={middlePanel != "addMatchup"}
          onChange={(e) => setMatchupNotes(e.target.value)}
          spellCheck="false"
        />
        </div>
      </section>
    </main>
  )
}

export default App