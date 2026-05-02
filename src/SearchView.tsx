function CounterCard({ enemyChamp, counter, version, selectMatchup }: 
                     { enemyChamp: string, counter: any, version: string,
                       selectMatchup: (enemyChamp: string, counter: any) => void }) {
    let url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${counter.champion}.png`;

    if (counter.champion === "Wukong") {
        url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/MonkeyKing.png`;
    }

    return (
        <div className={`counter-card ${counter.severity}`} onClick={() => selectMatchup(enemyChamp, counter)}>
            <div className="img-border">
                <img 
                src={url} 
                alt="champion icon" 
                onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                />
            </div>
            <h2>{counter.champion}</h2>
        </div>
    )
}

function SearchView({ searchedChampion, version, matchups, selectMatchup }: 
                    { searchedChampion: string, version: string, matchups: any, 
                      selectMatchup: (enemyChamp: string, counter: any) => void }) {
    let url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${searchedChampion}.png`
    
    if (searchedChampion == "Wukong") {
        url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/MonkeyKing.png`;
    }

    const championCounters = matchups[searchedChampion]?.counters || [];

    const severityOrder = { hard: 0, medium: 1, soft: 2 } as const;

    const sortCounters = [...championCounters].sort((a, b) => {
        const aKey = a.severity as keyof typeof severityOrder;
        const bKey = b.severity as keyof typeof severityOrder;

        if (severityOrder[aKey] !== severityOrder[bKey]) {
            return severityOrder[aKey] - severityOrder[bKey];
        }

        return a.champion.localeCompare(b.champion);
    });

    return (
        <>
            <header className="panel-header">
                <h1 className="header-text">Found Champions</h1>
            </header>
            
            <div className="search-info-container">
                <div className="searched-champion-container">
                    <div className="img-border">
                        <img 
                        src={url} 
                        alt="champion icon" 
                        onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                        />
                    </div>
                    {searchedChampion ? (<h2>{searchedChampion}</h2>) : (<h2>Champion Name</h2>)}
                </div>

                <div className="search-results-container">
                    {sortCounters.length > 0 && sortCounters.map((counter) => (
                        <CounterCard 
                        key={counter.champion}
                        enemyChamp={searchedChampion}
                        counter={counter}
                        version={version}
                        selectMatchup={selectMatchup}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchView;