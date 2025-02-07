import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  // 9. Subscribe to the context and use the elements available
  const { user, login, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" sticky="top"  >
      <Container fluid>
        
          <Navbar.Brand as={Link} to={"/"}>Nasa</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

        <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll>
          <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
          <Nav.Link as={Link} to={"/planets"}>Planets</Nav.Link>
          <Nav.Link as={Link} to={"/chat"}>Chat</Nav.Link>
          <NavDropdown title="Media" id="navbarScrollingDropdown">
          <NavDropdown.Item as={Link} to={"/day"}>Picture of the Day</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={"/media"}>Multimedia</NavDropdown.Item>
       
          </NavDropdown>
          <NavDropdown title="User" id="navbarScrollingDropdown">
          <NavDropdown.Item as={Link} to={"/register"}>Register</NavDropdown.Item>
          <NavDropdown.Item as={Link} to={"/login"}>Login</NavDropdown.Item>
          <NavDropdown.Divider />
          {user?  <Navbar.Text>
                Signed in as: {user.email} 
              </Navbar.Text> : <Navbar.Text>Please sign in</Navbar.Text>
              }
         
          </NavDropdown>
          {user ? (
            <Button  variant="outline-success" onClick={logout} >
              Log out
            </Button>
          ) : (
            <Button as={Link} to={"/login"} variant="danger" >Login</Button>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

console.log("Start");





