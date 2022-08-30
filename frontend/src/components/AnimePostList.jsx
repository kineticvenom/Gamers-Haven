import AnimePost from "./AnimePost"
import { useEffect } from "react"

function AnimePostList(props){
    const{posts, grabPosts,user} = props


    useEffect(()=>{
        grabPosts()
      }, [])

    


    return (
        posts.map((post) => (
            <AnimePost {...post} user={user}  /> 
        ))
    )

}

export default AnimePostList