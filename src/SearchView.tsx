function SearchView({ champion, version }: { champion: string, version: string }) {
    let url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion}.png`
    
    if (champion == "Wukong") {
        url = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/MonkeyKing.png`;
    }

    return (
        <>
            <header className="panel-header">
                <h1 className="header-text">Found Champions</h1>
            </header>
            
            <div className="search-info">
                <div className="img-border">
                    <img 
                    src={url} 
                    alt="champion icon" 
                    onError={(e) => {e.currentTarget.src = '/-1.png'; }}
                    />
                </div>
                {champion ? (<h2>{champion}</h2>) : (<h2>Champion Name</h2>)}
            </div>

            <div className="search-results-container">

            </div>
        </>
    )
}

export default SearchView;