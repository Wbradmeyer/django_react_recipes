import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const AllRecipes = () => {
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

  return (
    <div className="container">
      <h1>Recipes</h1>
      <hr />
      <div className="recipes">
        {allRecipes.map((thisRecipe) => (
          <div key={thisRecipe.id} className="recipe-card">
            <h2 className="card-title">{thisRecipe.name}</h2>
            <p className="info">Cook Time: {thisRecipe.cook_minutes} minutes</p>
            <p className="info">Instructions</p>
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
