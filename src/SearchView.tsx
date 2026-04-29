function SearchView({ champion, version }: { champion: string, version: string }) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`

    const validChampion = champion && champion.length > 2; // add actual champion validation later

    return (
        <>
            <header className="panel-header">
                <h1 className="header-text">Found Champions</h1>
            </header>
            
            <div className="searched-champion-info">
                <div className="img-container">
                    <img 
                    src={url} 
                    alt="champion icon" 
                    onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                    />
                </div>
                {validChampion ? (<h2>{champion}</h2>) : (<h2>Champion Name</h2>)}
            </div>
        </>
    )
}

export default SearchView;