import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
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
        <Form onSubmit={handleSubmitRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor="email">E-Mail</Form.Label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
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
          <Button variant="outline-success" type="submit">Register</Button>
        </Form>
      </div>
      <Link to={"/login"}>Do you already have an account? Please loggin</Link>
    </div>
  );
}

export default Register;
