import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
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
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button variant="outline-success" type="submit">Login</Button>
        </form>
      </div>
      <Link to={"/register"}>No account yet? Please register</Link>
    </div>
  );
}

export default Login;
