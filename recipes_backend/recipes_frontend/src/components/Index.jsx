import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleVals = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", user)
      .then((res) => {
        console.log(res);
        navigate("/recipes");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", user)
      .then((res) => {
        console.log(res);
        navigate("/recipes");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className="container">
      <div className="register">
        <div>
          <h2>Register</h2>
          <p className="fields">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="input" />
          </p>
          <p className="fields">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="input" />
          </p>
          <p className="fields">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
            />
          </p>
          <p className="fields">
            <label htmlFor="password"> Confirm Password</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              className="input"
            />
          </p>
          <button className="add-btn">Register</button>
        </div>
        <div>
          <h2>Login</h2>
          <p className="fields">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="input" />
          </p>
          <p className="fields">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
            />
          </p>
          <button className="update-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
