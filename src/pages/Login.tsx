import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const DelayedLink = () => {
  // const [delay, setDelay] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // setDelay(true);
      return navigate("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // console.log(delay);
};

function Login() {
  const { login } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email,password", email, password);
    login(email, password);
  };

  
  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmitRegister}>
          <div className="label-input">
            <label htmlFor="email">E-Mail</label>
            {user ? (
              <input disabled={true} />
            ) : (
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            )}
          </div>
          <div className="label-input">
            <label htmlFor="password">Password</label>
            {user ? (
              <input type="password" disabled={true} />
            ) : (
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            )}
          </div>
          {user ? null : (
            <Button variant="outline-success" type="submit">
              Login
            </Button>
          )}
        </form>
      </div>
      {user ? (
        <>
          <p>You have successfully logged in.</p>
          <p>You will be redirected to the home display</p>
        </>
      ) : (
        <Link to={"/register"}>No account yet? Please register</Link>
      )}
      {user && <DelayedLink />}
   
    </div>
  );
}

export default Login;
