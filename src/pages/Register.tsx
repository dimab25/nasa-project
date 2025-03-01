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

function Register() {
  const { register, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage, handleSetErrorMessage } = useContext(AuthContext);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password);
    handleSetErrorMessage("");
  };

  return (
    <>
      <div className="loginDiv">
        <h2>Register</h2>

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
              Register
            </Button>
          )}
        </Form>

        <div className="loginTextDiv">
          {errorMessage == "FirebaseError" ? (
            <div
              style={{
                background: "red",
                borderRadius: "20px",
                width: "max-content",
              }}
            >
              {
                "Oops! That email or password is already taken. Try a different one."
              }{" "}
            </div>
          ) : null}

          {user ? (
            <>
              <p>You have successfully registered.</p>
              <p>You will be redirected to the home display.</p>
            </>
          ) : null}

          {user ? null : (
            <Link to={"/login"}>
              Do you already have an account? Please login here.
            </Link>
          )}
          {user && <DelayedLink />}
        </div>
      </div>
    </>
  );
}

export default Register;
