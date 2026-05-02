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
  const [matchups, setMatchups] = useState<any>({});
  const [selectedMatchup, setSelectedMatchup] = useState<any>(null);
  const [isEditingMatchup, setIsEditingMatchup] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('matchups');
    if (saved) {
      setMatchups(JSON.parse(saved));
    }
  }, []);

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

  const selectMatchup = (enemyChamp: string, counter: any) => {
    setSelectedMatchup({
      enemyChamp,
      counterPick: counter.champion,
      severity: counter.severity,
      notes: counter.notes
    });
    setMatchupNotes(counter.notes);
  }

  const saveMatchup = (enemyChamp: string, counterPick: string, severity: string, notes: string) => {
    const newMatchups = { ...matchups };

    if (!newMatchups[enemyChamp]) {
      newMatchups[enemyChamp] = { counters: [] };
    }

    const existingMatchupIndex = newMatchups[enemyChamp].counters.findIndex(
      (c: any) => c.champion === counterPick
    );

    if (existingMatchupIndex >= 0) {
      newMatchups[enemyChamp].counters[existingMatchupIndex] = {
        champion: counterPick,
        severity: severity,
        notes: notes
      };
    } else {
      newMatchups[enemyChamp].counters.push({
        champion: counterPick,
        severity: severity,
        notes: notes
      });
    }

    setMatchups(newMatchups);
    localStorage.setItem('matchups', JSON.stringify(newMatchups));
    console.log("succesfully saved matchup");
  }

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

  const handleDelete = () => {
    const newMatchups = { ...matchups };

    if (newMatchups[selectedMatchup.enemyChamp]?.counters) {
      newMatchups[selectedMatchup.enemyChamp].counters = newMatchups[selectedMatchup.enemyChamp].counters.filter(
        (c: any) => c.champion !== selectedMatchup.counterPick
      );
      if (newMatchups[selectedMatchup.enemyChamp].length === 0) {
        delete newMatchups[selectedMatchup.enemyChamp];
      }
    }

    setMatchups(newMatchups);
    localStorage.setItem('matchups', JSON.stringify(newMatchups));

    setSelectedMatchup(null);
    setMatchupNotes('');
    setIsEditingMatchup(false);
  }

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
            placeholder="Search Enemy Pick" 
            onClick={() => {setMiddlePanel('search'); setIsEditingMatchup(false); setMatchupNotes('');}}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="btn" onClick={() => {setIsEditingMatchup(false); setMiddlePanel('addMatchup'); setMatchupNotes(''); setSelectedMatchup(null);}}>Add Matchup</button>
          <button className="btn" onClick={() => {setIsEditingMatchup(true); setMiddlePanel('addMatchup');}} disabled={!selectedMatchup}>Edit Matchup</button>
          <button className="btn" onClick={handleDelete} disabled={!selectedMatchup}>Delete Matchup</button>
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
        {middlePanel == 'search' && <SearchView searchedChampion={searchedChampion} version={latestVersion} matchups={matchups} selectMatchup={selectMatchup} />}
        {middlePanel == 'addMatchup' && <AddMatchupView championNames={championNames} version={latestVersion}
        matchupNotes={matchupNotes} saveFunction={saveMatchup} matchups={matchups} selectedMatchup={selectedMatchup} isEditingMatchup={isEditingMatchup} />}
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