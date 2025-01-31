import { Link, NavLink } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  // 9. Subscribe to the context and use the elements available
  const { user, login, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>Nasa</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <NavLink to={"/"}>Home</NavLink>|
          <Link to={"/planets"}>Planets</Link>|
          <Link to={"/day"}>Picture of the Day</Link>|
          <Link to={"/media"}>Multimedia</Link>|
          
          <Link to={"/detailsDayPicture"}>Details Daypicture</Link>|
          <Link to={"/register"}>Register</Link>|
          <Link to={"/login"}>Login</Link>|

          {user ? (
            <Button onClick={logout} variant="danger">
              Logout
            </Button>
          ) : (
            <Button onClick={login}>Login</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
