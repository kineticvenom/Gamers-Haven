import axios from "axios";
import { useEffect } from "react";
import GamePost from "../components/GamePost";
import {Row,Col} from 'react-bootstrap/'
import EventCard from '../components/EventCard'

function HomePage(props) {
  const { user, saveData, setSaveData } = props

  
  
  const getFeedData = () =>{
    axios.get('feed/get').then((response) =>{
      // for (let category in response.data){ // Only sets the Save Data if the user has some sort of activity
      //   if (response.data[category].length > 0){
          
      //   }
      // }
      setSaveData(response.data.results)
    })
  }

  useEffect(() => {
    getFeedData()
  }, [])



  console.log(user)
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
          {saveData.map((object) => (
            object.hasOwnProperty('user_image') ? <GamePost {...object} user={user}/> : false || 

            object.hasOwnProperty('image') ? 
            <div className='favorites' style={{ width: '1000px', margin: 'auto' }}>
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
            <br />
            <br />
          </div> : false ||
          object.hasOwnProperty('activity') ? <EventCard {...object}/> : false 

          ))}

          {/* { {saveData.objects.map((object) => (
            <div className='Container' style={{ width: '1000px', margin: 'auto' }}>
              <Row>
                <Col sm='4' >
                  <h3>{user.username}</h3>
                  <img height='100px' width='100px' src={user.profile_image}></img>
                </Col>
                <Col sm='4'>
                  <h2><br />Has<br /> objectd </h2>
                </Col>
                <Col sm='4'>
                  <h3>{object.title}</h3>
                  <img height='100px' width='100px' src={object.image}></img>
                </Col>
              </Row>
              <br />
              <br />
            </div>
          ))} */}
        </div>: <h4>Loading feed...</h4> : <h1>Please login or create an account to see your activity</h1>} 
      


    
    </div>
  );
}

export default HomePage;
