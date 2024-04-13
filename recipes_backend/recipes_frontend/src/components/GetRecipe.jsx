import { React, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisRecipe, setThisRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes/${id}`)
      .then((res) => {
        console.log(res);
        const recipe = res.data;
        setThisRecipe(recipe);
        const ingredientsList = recipe.ingredients.split(", ");
        setIngredients(ingredientsList);
        const instructionsList = recipe.instructions.split(". ");
        setInstructions(instructionsList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/recipes/delete/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/recipes");
  };

  return (
    <div className="container">
      <div>
        <h1>Get Recipe</h1>
      </div>
      <hr />
      <div id="one-recipe">
        <div className="recipe-card">
          <h2 className="card-title">Name: {thisRecipe.name}</h2>
          <p className="info">Cook Time: {thisRecipe.cook_minutes}</p>
          <div style={{ display: "flex" }} className="info">
            <p style={{ flex: 1, margin: 0 }}>Area: {thisRecipe.area}</p>
            <p style={{ flex: 1, margin: 0 }}>
              Category: {thisRecipe.category}
            </p>
          </div>
          <div>
            <p className="info">----</p>
            {ingredients.map((ingredient, index) => (
              <p key={index} className="info">
                {ingredient}
              </p>
            ))}
          </div>
          <button className="update-btn">
            <Link to={`/recipes/update/${thisRecipe.id}`}>Update</Link>
          </button>
          <button
            onClick={(e) => handleDelete(e, thisRecipe.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
        <div className="instructions-box">
          <p>Instructions:</p>
          {instructions.map((step, index) => (
            <p key={index}>
              {index + 1}. {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetRecipe;
