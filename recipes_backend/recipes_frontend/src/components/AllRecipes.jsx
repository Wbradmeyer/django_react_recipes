import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes")
      .then((res) => {
        console.log(res);
        setAllRecipes(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Recipes</h1>
      <hr />
      <div className="recipes">
        {allRecipes.map((thisRecipe) => (
          <div key={thisRecipe.id} className="recipe-card">
            <h2>Recipe Name: {thisRecipe.name}</h2>
            <p>Cook Time: {thisRecipe.cook_minutes} minutes</p>
            <Link to={`/recipes/${thisRecipe.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
