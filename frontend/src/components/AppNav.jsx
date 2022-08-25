import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from 'axios'
import logo from '../assets/logo.png'

function AppNav(props) {

  const{user} = props
  
  function sendLogout(){
    axios.post('/logout').then((response) => {
      console.log('response from server', response)
      window.location.reload()
    })
  }



  return (
    <div className="NavBarContainer">
      <Navbar expand="xxl" className="m-auto">
        <Navbar.Brand href="#home"><img width='80px' height='80px' className="logo" src={logo}></img>Gamer's Haven</Navbar.Brand>
        <Navbar.Toggle className="m-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto NavEle">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/games">Games</Nav.Link>
            <Nav.Link href="/#/animes">Anime</Nav.Link>
          </Nav>
          {user ? 
          <div className="user-image">
            <span>{user.username}</span> <img src={user.profile_image} height='100px' width='100px'></img> 
            <Nav.Link className='logout' onClick={sendLogout}>Log out</Nav.Link>
          </div>
          : <Nav.Link className="sign-in" href='/#/login'>Sign in</Nav.Link> }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppNav;
