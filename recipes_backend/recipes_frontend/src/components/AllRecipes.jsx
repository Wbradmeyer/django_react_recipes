import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes")
      .then((res) => {
        console.log(res);
        setAllRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <hr />
      <div style={{ textAlign: "left" }}>
        {allRecipes.map((thisRecipe) => (
          <div key={thisRecipe.id}>
            <h2>{thisRecipe.name}</h2>
            <p>{thisRecipe.cook_minutes}</p>
            <p>Added on {thisRecipe.created_at}</p>
            <Link to={`/recipes/${thisRecipe.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
