import AnimePost from "./AnimePost"
import { useEffect } from "react"

function AnimePostList(props){
    const{posts, grabPosts} = props


    useEffect(()=>{
        grabPosts()
      }, [])

    


    return (
        posts.map((post) => (
            <AnimePost {...post}   /> 
        ))
    )

}

export default AnimePostList