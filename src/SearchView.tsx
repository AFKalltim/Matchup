function SearchView({ champion }: { champion: string }) {
    const url = `https://ddragon.leagueoflegends.com/cdn/16.8.1/img/champion/${champion}.png`

    const validChampion = champion && champion.length > 2; // add actual hampion validation later

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