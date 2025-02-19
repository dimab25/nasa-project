import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const DelayedLink = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      return navigate("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return <div></div>;
};

function Login() {
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const { errorMessage, handleSetErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect;

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginOperation = await login(email, password);
    console.log(loginOperation);
    handleSetErrorMessage("");

    // i dont understand that
  };

  return (
    <>
      <div className="loginDiv">
        <h2>Login</h2>
        <Form onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
           {user? null:
              <Form.Text className="text-muted">
              The password has to be minimum 6 characters long!{" "}
            </Form.Text> }
          </Form.Group>

          {user ? null : (
            <Button variant="outline-success" type="submit">
              Login
            </Button>
          )}
        </Form>

        <div className="loginTextDiv">
          {errorMessage == "auth/invalid-credential" ? (
            <div
              style={{
                background: "red",
                borderRadius: "20px",
                width: "max-content",
              }}
            >
              {"Your email and password do not match. Please try again."}{" "}
            </div>
          ) : null}

          {user ? (
            <>
              <p>You have successfully logged in.</p>
              <p>You will be redirected to the home display.</p>
            </>
          ) : (
            <Link to={"/register"}>No account yet? Please register here.</Link>
          )}
          {user && <DelayedLink />}
        </div>
      </div>
    </>
  );
}

export default Login;
