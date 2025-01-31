import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";


function Register() {
  const {register} =useContext (AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmitRegister = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
// console.log("email,password", email, password);
register (email, password)
  }

  return (
    <div>
      <h2>Register</h2>
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
          <Button type="submit">Register</Button>
        </form>
      </div>
      <Link to={"/login"}>Do you already have an account? Please loggin</Link>
    </div>
  );
}

export default Register;
