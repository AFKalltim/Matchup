import { useState, useEffect } from 'react';

function AddMatchupView({ championNames, version, matchupNotes, matchups, selectedMatchup, isEditingMatchup, saveFunction}: 
                        { championNames: string[], version: string, matchupNotes: string, matchups: any, selectedMatchup: any, isEditingMatchup: boolean,
                          saveFunction: (enemyChamp: string, counterPick: string, severity: string, notes: string) => void }) {
    const [inputEnemyChamp, setInputEnemyChamp] = useState('');
    const [inputCounterPick, setInputCounterPick] = useState('');
    const [enemyChamp, setEnemyChamp] = useState('');
    const [counterPick, setCounterPick] = useState('');
    const [matchupSeverity, setMatchupSeverity] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isEditingMatchup && selectedMatchup) {
            setInputEnemyChamp(selectedMatchup.enemyChamp || '');
            setInputCounterPick(selectedMatchup.counterPick || '');
            setEnemyChamp(selectedMatchup.enemyChamp || '');
            setCounterPick(selectedMatchup.counterPick || '');
            setMatchupSeverity(selectedMatchup.severity || '');
        } else {
            setInputEnemyChamp('');
            setInputCounterPick('');
            setEnemyChamp('');
            setCounterPick('');
            setMatchupSeverity('');
        }
        setErrorMsg('');
    }, [isEditingMatchup, selectedMatchup]);                        
    
    const handleSave = () => {
        if (!enemyChamp || !counterPick) {
            setErrorMsg('Error: Select two champions.');
            return;
        }
        else if (enemyChamp == counterPick) {
            setErrorMsg('Error: The same champion was selected twice.')
            return;
        }
        else if (!isEditingMatchup) {
            const exists = matchups[enemyChamp]?.counters.some(
                (c: any) => c.champion === counterPick
            );
            if (exists) {
                setErrorMsg('Error: Matchup already exists. Use edit matchup button to change severity or notes.');
                return;
            }
        }
        else if (!matchupSeverity) {
            setErrorMsg('Error: Select a matchup severity.');
            return;
        }

        setErrorMsg('');
        saveFunction(enemyChamp, counterPick, matchupSeverity, matchupNotes);
    };

    const isValidChampion = (userInput: string) => {
        return championNames ? championNames.includes(userInput) : false;
    }

    const handleSearchEnemyChamp = (userInput: string) => {
        const capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

        if (isValidChampion(capitalizedChampionName)) {
            setEnemyChamp(capitalizedChampionName);
        }
        else {
            setEnemyChamp('');
        }
    };
    const handleSearchCounterPick = (userInput: string) => {
        const capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

        if (isValidChampion(capitalizedChampionName)) {
            setCounterPick(capitalizedChampionName);
        }
        else {
            setCounterPick('');
        }
    };

    let urlEnemyChamp = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${enemyChamp}.png`;
    let urlcounterPick = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${counterPick}.png`;

    if (enemyChamp == "Wukong") {
        urlEnemyChamp = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/MonkeyKing.png`;
    }
    if (counterPick == "Wukong") {
        urlcounterPick = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/MonkeyKing.png`;
    }

    return (
        <>
            <header className="panel-header">
                <h1 className="header-text">Choose Champions</h1>
            </header>

            <div className="add-matchup-interaction-container">
                <div className="select-matchup-container">
                    <h2 className="img-border-text">Enemy<br />Champion</h2>
                    <div></div>
                    <h2 className="img-border-text">Your<br />Counter Pick</h2>
                    <div className="img-border">
                        <img src={urlEnemyChamp}
                        alt="champion icon"
                        onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                        />
                    </div>
                    <div className="arrow-left">&#8592;</div>
                    <div className="img-border">
                        <img 
                        src={urlcounterPick}
                        alt="champion icon"
                        onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                        />
                    </div>
                    <input 
                        type="text"
                        className="matchup-champion-search"
                        value={inputEnemyChamp}
                        placeholder="Search"
                        disabled={isEditingMatchup}
                        onChange={(e) => {
                            handleSearchEnemyChamp(e.target.value);
                            setInputEnemyChamp(e.target.value);}}
                    />
                    <div></div>
                    <input 
                        type="text"
                        className="matchup-champion-search"
                        value={inputCounterPick}
                        placeholder="Search"
                        disabled={isEditingMatchup}
                        onChange={(e) => {
                            handleSearchCounterPick(e.target.value);
                            setInputCounterPick(e.target.value);}}
                    />
                </div> 

                <div className="matchup-severity-btn-container">
                    <button 
                    className={matchupSeverity == "hard" ? "severity-btn hard selected" : "severity-btn hard"}
                    onClick={() => setMatchupSeverity("hard")}>
                        Hard Counter
                    </button>
                    <button 
                    className={matchupSeverity == "medium" ? "severity-btn medium selected" : "severity-btn medium"}
                    onClick={() => setMatchupSeverity("medium")}>
                        Medium Counter
                    </button>
                    <button 
                    className={matchupSeverity == "soft" ? "severity-btn soft selected" : "severity-btn soft"}
                    onClick={() => setMatchupSeverity("soft")}>
                        Soft Counter
                    </button>
                </div>

                <div className="save-btn-container">
                    <button 
                    className="save-btn"
                    onClick={handleSave}
                    >Save</button>
                    <p className="error-msg">{errorMsg}</p>
                </div>
            </div>
        </>
    )
}

export default AddMatchupView;