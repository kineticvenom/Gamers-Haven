import GamePost from "./GamePost"
import { useEffect } from "react"

function GamePostList(props){
    const{posts, grabPosts, user} = props


    useEffect(()=>{
        grabPosts()
      }, [])

    


    return (
        posts.map((post) => (
            <GamePost {...post} user={user}   /> 
        ))
    )

}

export default GamePostList