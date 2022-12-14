import axios from "axios";
import { useEffect } from "react";
import GamePost from "../components/GamePost";
import {Row,Col} from 'react-bootstrap/'
import EventCard from '../components/EventCard'
import AnimePost from "../components/AnimePost";

function HomePage(props) {
  const { user, saveData, setSaveData, currentGame, setCurrentGame, currentAnime, setCurrentAnime } = props

  
  
  const getFeedData = () =>{
    axios.get('feed/get').then((response) =>{
      setSaveData(response.data.results)
    })
  }

  useEffect(() => {
    sessionStorage.clear()
    getFeedData()
  }, [])


  return ( 
    <div className="home">
      {user ? 
      <h1>Welcome Back, {user.username}!</h1> :
      <h1>Welcome to Gamers Haven!</h1>
    }
      
      {user ? 
      saveData ? 
        <div>
          {saveData.map((object) => (
            object.hasOwnProperty('user_image') ? Object.values(object).includes('anime') ?
              <div> <div className="py2"></div> <AnimePost  {...object} user={user} currentAnime={currentAnime} setCurrentAnime={setCurrentAnime} /> <div className="py2"></div></div>
                : <GamePost {...object} user={user} currentGame={currentGame} setCurrentGame={setCurrentGame} />
                : false || 

            object.hasOwnProperty('image') ? 
                <div className='favorites' style={{ width: '1000px', margin: 'auto', marginBottom:'20px'}}>
            <Row>
              <Col sm='4' >
                <h3>{user.username}</h3>
                <img height='100px' width='100px' src={user.profile_image}></img>
              </Col>
              <Col sm='4'>
                <h2><br />Has<br /> Favorited </h2>
              </Col>
              <Col sm='4'>
                <h3>{object.title}</h3>
                <img height='100px' width='100px' src={object.image}></img>
              </Col>
                  </Row>
                  <div className="py-2"></div>
          </div> : false ||
          object.hasOwnProperty('activity') ? <EventCard {...object} user={user}/> : false 
          ))
            }
        </div>: <h4>Loading feed...</h4> : <h1>Please login or create an account to see your activity</h1>} 
      


    
    </div>
  );
}

export default HomePage;
