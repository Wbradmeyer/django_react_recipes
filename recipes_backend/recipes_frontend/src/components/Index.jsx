import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Index = (props) => {
  const { setCurrentUser } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    // confirm: "",
  });
  const [error, setError] = useState({});

  const handleVals = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", user)
      // {
      //   withCredentials: true,
      // })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
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
      // , { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
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
          <form onSubmit={registrationHandler}>
            {error.username ? <p className="error">{error.username}</p> : null}
            <p className="fields">
              <label htmlFor="username1">Username</label>
              <input
                type="text"
                name="username"
                id="username1"
                onChange={handleVals}
                className="input"
              />
            </p>
            <p className="fields">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleVals}
                className="input"
              />
            </p>
            {error.password ? <p className="error">{error.password}</p> : null}
            <p className="fields">
              <label htmlFor="password1">Password</label>
              <input
                type="password"
                name="password"
                id="password1"
                onChange={handleVals}
                className="input"
              />
            </p>
            {/* {error.confirm ? <p className="error">{error.confirm}</p> : null}
            <p className="fields">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                onChange={handleVals}
                className="input"
              />
            </p> */}
            <button className="add-btn">Register</button>
          </form>
        </div>
        <div>
          <h2>Login</h2>
          <form onSubmit={loginHandler}>
            {error.detail ? <p className="error">{error.detail}</p> : null}
            <p className="fields">
              <label htmlFor="username2">Username</label>
              <input
                type="text"
                name="username"
                id="username2"
                onChange={handleVals}
                className="input"
              />
            </p>
            <p className="fields">
              <label htmlFor="password2">Password</label>
              <input
                type="password"
                name="password"
                id="password2"
                onChange={handleVals}
                className="input"
              />
            </p>
            <button className="update-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
