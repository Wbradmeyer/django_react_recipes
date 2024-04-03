import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetSearchedRecipe = () => {
  const { id } = useParams();
  const [thisRecipe, setThisRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log(res);
        const recipe = res.data.meals[0];
        setThisRecipe(recipe);
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
      <div id="one-recipe">
        <div className="recipe-card">
          <h2 className="card-title">Name: {thisRecipe.strMeal}</h2>
          <p className="info">Area: {thisRecipe.strArea}</p>
          <p className="info">Category: {thisRecipe.strCategory}</p>
          {ingredients.map(({ measure, ingredient }, index) => (
            <p key={index} className="info">
              {measure} {ingredient}
            </p>
          ))}
        </div>
        <p className="info">Instructions:</p>
        <p>{thisRecipe.strInstructions}</p>
        <button>Save to My Recipes</button>
      </div>
    </div>
  );
};

export default GetSearchedRecipe;
