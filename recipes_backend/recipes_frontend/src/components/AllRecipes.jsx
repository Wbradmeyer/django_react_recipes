import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const AllRecipes = (props) => {
  const { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const [allRecipes, setAllRecipes] = useState([]);
  const [previousUrl, setPreviousUrl] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes")
      .then((res) => {
        console.log(res);
        setPreviousUrl(res.data.previous);
        setNextUrl(res.data.next);
        setAllRecipes(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const paginationHandler = (e, url) => {
    e.preventDefault();
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setPreviousUrl(res.data.previous);
        setNextUrl(res.data.next);
        setAllRecipes(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/logout", null, {
        headers: { Authorization: `Token ${currentUser.token}` },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("currentUser");
        setCurrentUser({});
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div>
        <h1>Recipes</h1>
        <button className="delete-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <hr />
      <div className="recipes">
        {allRecipes.map((thisRecipe) => (
          <div key={thisRecipe.id} className="recipe-card">
            <h2 className="card-title">{thisRecipe.name}</h2>
            <p className="info">Cook Time: {thisRecipe.cook_minutes} minutes</p>
            <div style={{ display: "flex" }} className="info">
              <p style={{ flex: 1, margin: 0 }}>Area: {thisRecipe.area}</p>
              <p style={{ flex: 1, margin: 0 }}>
                Category: {thisRecipe.category}
              </p>
            </div>
            <Link to={`/recipes/${thisRecipe.id}`}>View</Link>
          </div>
        ))}
        <div>
          {previousUrl ? (
            <button
              className="update-btn"
              onClick={(e) => paginationHandler(e, previousUrl)}
            >
              Previous
            </button>
          ) : null}
          {nextUrl ? (
            <button
              className="update-btn"
              onClick={(e) => paginationHandler(e, nextUrl)}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
