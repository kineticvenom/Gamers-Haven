import { useState, useEffect } from "react"
import axios from 'axios'
import GameList from "./GameList"

function GameSearch(props) {
    const {results,setResults, searchTitle,setSearchTitle,setCurrentGame} = props
    
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const value = document.getElementById('searchIn').value;
        console.log(`searching : ${value}`)
        const formVal = value.replaceAll(" ", "%20")
        setSearchTitle(formVal)
        document.getElementById('searchIn').value=''
    }
    

    async function fetchQ() {
        axios.post('/api/game/search', {
            query: searchTitle
        })
        .then((response) => {
            setResults(response.data.results)
            console.log(response.data.results)
        })
    }

    useEffect(() => {
        if (searchTitle != '') {
            fetchQ()
        } else {
            setResults([])
        }
    }, [searchTitle])

    return (
        <div>
            <form onSubmit={(event) => { handleSubmit(event) }}>
                <input id='searchIn' type='text'></input>
                <input className="InputBox" type="submit" value="Search" />
            </form>
            <br/>
            <div>
                {
                    results.length >0
                        ? <div >
                            <br/>
                            <h2> '{searchTitle.replace('%20',' ') }' search results</h2>
                            <br/>
                            <div>
                                <GameList games={results} setCurrentGame={setCurrentGame}/>
                            </div>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}


export default GameSearch