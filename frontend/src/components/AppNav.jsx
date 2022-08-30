import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from 'axios'
import logo from '../assets/logo.png'
import { Col, Row } from "react-bootstrap";

function AppNav(props) {

  const{user} = props
  
  function sendLogout(){
    axios.post('/logout').then((response) => {
      console.log('response from server', response)
      window.location.reload()
    })
  }



  return (
    <div>
    <div className="BarContainer">
        <Row>
          <Col lg='1'>
          </Col>
          <Col lg='9' >
          <img width='180px' height='180px' className="logo" src={logo}></img><h1>Gamers Haven</h1>
          </Col>
          
        <Col lg='1'>
      {user ? 
          <div className="user-image">
            <span>{user.username}</span> <img className='circle' src={user.profile_image} height='100px' width='100px'></img> 
            <a href='' className='logout' onClick={sendLogout}>Log out</a>
          </div>
              : <a className="sign-in" href='/#/login'>Sign in</a>}
          </Col>
      </Row>
      
      
       
    </div>
    <Navbar expand="xxl" className="m-auto Bar">
        <Navbar.Toggle className="m-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="NavCol">
          <Nav className="ml-auto NavEle">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/games">Games</Nav.Link>
            <Nav.Link href="/#/animes">Anime</Nav.Link>
            <Nav.Link href="/#/polls">Polls</Nav.Link>
            <Nav.Link href="/#/events">Events</Nav.Link>
          </Nav>
           </Navbar.Collapse>
          </Navbar>
    </div>
  );
}

export default AppNav;
