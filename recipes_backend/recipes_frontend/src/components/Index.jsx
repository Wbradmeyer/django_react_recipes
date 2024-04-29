import React from "react";
import "./style.css";

const Index = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Index;
