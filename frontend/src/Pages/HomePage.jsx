import axios from "axios";
import { useEffect } from "react";
import GamePost from "../components/GamePost";
import {Row,Col} from 'react-bootstrap/'

function HomePage(props) {
  const { user, saveData, setSaveData } = props
  
  
  const getFeedData = () =>{
    axios.get('feed/get').then((response) =>{
      for (let category in response.data){ // Only sets the Save Data if the user has some sort of activity
        if (response.data[category].length > 0){
          setSaveData(response.data)
        }
      }
    })
  }

  useEffect(()=>{
    getFeedData()
  },[])


  console.log(saveData)

  return ( 
    <div>
      {user ? 
      <h1>Welcome back, {user.username}!</h1> :
      <h1>Welcome to Gamers Haven!</h1>
    }
      <hr/>
      {user ? 
      saveData ? 
        <div>
          {saveData.posts.map((post) => (
              <GamePost {...post}   /> 
          ))}

          {saveData.favorites.map((favorite)=> (
            <div className='Container' style={{width:'1000px',margin:'auto'}}>
              <Row>
                <Col sm='4' >
                  <h3>{user.username}</h3>
                  <img height='100px' width='100px' src={user.profile_image}></img>
                </Col>
                <Col sm='4'>
                  <h2><br/>Has<br/> Favorited </h2>
                </Col>
                <Col sm='4'>
                  <h3>{favorite.title}</h3>
                  <img height='100px' width='100px' src={favorite.image}></img>
                </Col>
              </Row>
              <br/>
              <br/>
            </div>
          ))}
        </div>: <h4>Loading feed...</h4> : <h1>Please login or create an account to see your activity</h1>}
      

      

    
    </div>
  );
}

export default HomePage;
