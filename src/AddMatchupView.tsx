import { useState } from 'react';

function AddMatchupView({ championNames, version }: { championNames: string[], version: string }) {
    const [enemyChamp, setEnemyChamp] = useState('');
    const [counterPick, setCounterPick] = useState('');

    const isValidChampion = (userInput: string) => {
        return championNames ? championNames.includes(userInput) : false;
    }

    const handleSearchEnemyChamp = (userInput: string) => {
        const capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

        if (isValidChampion(capitalizedChampionName)) {
            setEnemyChamp(capitalizedChampionName);
        }
    };
    const handleSearchCounterPick = (userInput: string) => {
        const capitalizedChampionName = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

        if (isValidChampion(capitalizedChampionName)) {
            setCounterPick(capitalizedChampionName);
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
                    <h2 className="img-container-text">Enemy<br />Champion</h2>
                    <div></div>
                    <h2 className="img-container-text">Your<br />Counter Pick</h2>
                    <div className="img-container">
                        <img src={urlEnemyChamp}
                        alt="champion icon"
                        onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                        />
                    </div>
                    <div className="arrow-left">&#8592;</div>
                    <div className="img-container">
                        <img 
                        src={urlcounterPick}
                        alt="champion icon"
                        onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                        />
                    </div>
                    <input 
                        type="text"
                        className="matchup-champion-search"
                        placeholder="Search"
                        onChange={(e) => handleSearchEnemyChamp(e.target.value)}
                    />
                    <div></div>
                    <input 
                        type="text"
                        className="matchup-champion-search"
                        placeholder="Search"
                        onChange={(e) => handleSearchCounterPick(e.target.value)}
                    />
                </div> 

            </div>
        </>
    )
}

export default AddMatchupView;