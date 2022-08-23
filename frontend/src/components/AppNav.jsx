import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AppNav() {
  return (
    <div className="NavBarContainer">
      <Navbar expand="xxl" className="m-auto">
        <Navbar.Brand href="#home">Gamer's Haven</Navbar.Brand>
        <Navbar.Toggle className="m-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto NavEle">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/#/games">Games</Nav.Link>
            <Nav.Link href="/#/animes">Anime</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AppNav;
