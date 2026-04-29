import { useEffect, useState } from 'react';
import SearchView from './SearchView'
import AddMatchupView from './AddMatchupView';
import './App.css'

function App() {
  const [middlePanel, setMiddlePanel] = useState<'search' | 'addMatchup'>('search');
  const [searchedChampion, setSearchedChampion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [championNames, setChampionNames] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      const versions = await versionResponse.json();
      const version = versions[0];
      setLatestVersion(version);

      const champResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      const champData = await champResponse.json();
      setChampionNames(champData.data);
    }

    fetchData();
  }, []);

  const isValidChampion = (userInput: string) => {
    if (!championNames) return false;
    return userInput in championNames;
  }

  const handleSearch = (userInput: string) => {
    console.log('user typed: ', userInput);
    let capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
    console.log('capitalized: ', capitalizedChampionName);
    if (capitalizedChampionName === 'Wukong') {
    capitalizedChampionName = 'MonkeyKing';
    }

    console.log('champion names loaded? ', championNames);
    console.log('is valid? ', isValidChampion(capitalizedChampionName))

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
        {middlePanel == 'search' && <SearchView champion={searchedChampion} version={latestVersion} />}
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
