import GamePost from "./GamePost"
import { useEffect } from "react"

function GamePostList(props){
    const{posts, grabPosts} = props


    useEffect(()=>{
        grabPosts()
      }, [])

    


    return (
        posts.map((post) => (
            <GamePost {...post}   /> 
        ))
    )

}

export default GamePostList