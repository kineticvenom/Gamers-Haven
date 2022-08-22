import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function AppNav() {
    

    return (
        
      <div className='NavBarContainer'>
      
        <Navbar expand="xxl" className='m-auto'> 
        <Navbar.Toggle className='m-auto' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto NavEle" >
            <Nav.Link href="">NAV 1</Nav.Link>
              <Nav.Link href="">NAV 2</Nav.Link>
              <Nav.Link href="">NAV 3</Nav.Link>
              <Nav.Link href="">NAV 4</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    
    )
}

export default AppNav
