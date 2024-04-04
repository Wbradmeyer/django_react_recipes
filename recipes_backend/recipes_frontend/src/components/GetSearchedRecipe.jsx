import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetSearchedRecipe = () => {
  const { id } = useParams();
  const [thisRecipe, setThisRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log(res);
        const recipe = res.data.meals[0];
        setThisRecipe(recipe);
        const instructions = recipe.strInstructions.split(". ");
        setInstructions(instructions);
        let i = 1;
        const newIngredients = [];
        while (recipe[`strIngredient${i}`]) {
          const measure = recipe[`strMeasure${i}`];
          const ingredient = recipe[`strIngredient${i}`];
          newIngredients.push({ measure, ingredient });
          i++;
        }
        setIngredients(newIngredients);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <div>
        <h1>Searched Recipe</h1>
      </div>
      <hr />
      <div className="one-recipe">
        <div className="recipe-card">
          <h2 className="card-title">{thisRecipe.strMeal}</h2>
          <div style={{ display: "flex" }} className="info">
            <p style={{ flex: 1, margin: 0 }}>Area: {thisRecipe.strArea}</p>
            <p style={{ flex: 1, margin: 0 }}>
              Category: {thisRecipe.strCategory}
            </p>
          </div>
          {ingredients.map(({ measure, ingredient }, index) => (
            <p key={index} className="info">
              {measure} {ingredient}
            </p>
          ))}
        </div>
      </div>
      <div className="instructions-box">
        <p>Instructions:</p>
        {instructions.map((step, index) => (
          <p key={index}>
            {index + 1}. {step}
          </p>
        ))}
      </div>
      <button>Save to My Recipes</button>
    </div>
  );
};

export default GetSearchedRecipe;
