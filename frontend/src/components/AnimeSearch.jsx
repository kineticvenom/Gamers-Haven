import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import AnimeList from "./AnimeList"

function AnimeSearch(props) {
    const {results, setResults, searchAnime, setSearchAnime, setCurrentAnime} = props
    
    const isMounted = useRef(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const value = document.getElementById('searchIn').value;
        console.log(`searching : ${value}`)
        const formVal = value.replaceAll(" ", "%20")
        setSearchAnime(formVal)
        document.getElementById('searchIn').value=''
    }
    

    async function fetchQ() {
        axios.post('/api/anime/search', {
            query: searchAnime
        })
        .then((response) => {
            setResults(response.data.data)
        })
    }

    // useEffect(() => {
    //     if (searchAnime != '') {
    //         fetchQ()
    //     } else {
    //         setResults([])
    //     }
    // }, [searchAnime])

    useEffect(() => {
        if (isMounted.current)
         {
            if (searchAnime != '') {
                        fetchQ()
                    } else {
                        setResults([])
                    }
            } 
        else 
        {
          isMounted.current = true;
        }
      }, [searchAnime]);

    return (
        <div>
            <form onSubmit={(event) => { handleSubmit(event) }}>
                <input id='searchIn' type='text'></input>
                <input className="InputBox" type="submit" value="Search" />
            </form>
            <br/>
            <div>
                {
                    results.length > 0 ?
                         <div >
                            <br/>
                            {/* <h2> '{searchAnime.replace('%20',' ') }' search results</h2> */}
                            <br/>
                            <div>
                                <AnimeList anime={results} setCurrentAnime={setCurrentAnime}/>
                            </div>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}


export default AnimeSearch