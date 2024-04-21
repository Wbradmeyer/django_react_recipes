import { React, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetSearchedRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisRecipe, setThisRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipeToSave, setRecipeToSave] = useState({
    name: "",
    cook_minutes: 30,
    area: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log(res);
        const recipe = res.data.meals[0];
        setThisRecipe(recipe);
        setRecipeToSave({
          name: recipe.strMeal,
          area: recipe.strArea,
          category: recipe.strCategory,
          instructions: recipe.strInstructions,
        });
        // break instructions up to array by periods; for page display
        const instructions = recipe.strInstructions
          .replace(/\n/g, "")
          .split(". ");
        console.log(instructions);
        setInstructions(instructions);
        // move separated measures and ingredients into one array
        let i = 1;
        const newIngredients = [];
        while (recipe[`strIngredient${i}`]) {
          const measure = recipe[`strMeasure${i}`];
          const ingredient = recipe[`strIngredient${i}`];
          newIngredients.push(`${measure} ${ingredient}`);
          i++;
        }
        setIngredients(newIngredients);
        // save to string separating measure/ingredient pair with a comma
        setRecipeToSave({
          ingredients: newIngredients.join(","),
        });
        console.log(recipeToSave);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmitHandler = (e, recipe) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/recipes/add", recipe)
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
          <p className="info">----</p>
          {/* {ingredients.map(({ measure, ingredient }, index) => (
            <p key={index} className="info">
              {measure} {ingredient}
            </p> */}
          {ingredients.map((ingredient, index) => (
            <p key={index} className="info">
              {ingredient}
            </p>
          ))}
        </div>
      </div>
      <div className="instructions-box">
        <p>Instructions:</p>
        {instructions.map((step, index) => (
          <p key={index}>
            {index === instructions.length - 1
              ? `${index + 1}. ${step}`
              : `${index + 1}. ${step}.`}
          </p>
        ))}
      </div>
      <button onClick={(e) => onSubmitHandler(e, recipeToSave)}>
        Save to My Recipes
      </button>
    </div>
  );
};

export default GetSearchedRecipe;
