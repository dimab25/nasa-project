import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function NavBar() {
  // 9. Subscribe to the context and use the elements available
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar
      expand="xl"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>
         UNISCOPE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <NavDropdown title="Solar System" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to={"/about"}>
                About
              </NavDropdown.Item>
              <NavDropdown title="Planets" id="navbarScrollingDropdown" drop="end">
              <NavDropdown.Item as={Link} to={"/earth"}>
                  Earth
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/jupiter"}>
                  Jupiter
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/mars"}>
                  Mars
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/mercury"}>
                  Mercury
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/neptune"}>
                  Neptune
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/saturn"}>
                  Saturn
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/uranus"}>
                  Uranus
                  </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/venus"}>
                  Venus
                  </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item as={Link} to={"/dwarf"}>
                Dwarf Planets
                </NavDropdown.Item>
            </NavDropdown>
          
            
            <NavDropdown title="Images" id="navbarScrollingDropdown">
            <NavDropdown.Item  as={Link} to={"/day"}>
                Image of the Day
                </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to={"/media"}>
                Search
                </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="User" id="navbarScrollingDropdown">
              {user ? null : (
                <NavDropdown.Item as={Link} to={"/register"}>
                  Register
                </NavDropdown.Item>
              )}
              {user ? (
                <NavDropdown.Item as={Link} to={"/profile"}>
                  Profile
                </NavDropdown.Item>
              ) : null}
              {user ? null : (
                <NavDropdown.Item as={Link} to={"/login"}>
                  Login
                </NavDropdown.Item>
              )}
              {user ? (
                <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
              ) : null}

<NavDropdown.Item as={Link} to={"/chat"}>
              Chat
            </NavDropdown.Item>
              {user ? (
                <>
                 
                  <NavDropdown.Divider />
                  <Navbar.Text>User: {user.email}</Navbar.Text>
                </>
              ) : null}
            </NavDropdown>
            {/* {user ? (
              <Button variant="outline-success" onClick={logout}>
                Log out
              </Button>
            ) : (
              <Button as={Link} to={"/login"} variant="outline-danger">
                Login
              </Button>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
