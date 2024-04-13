import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    cook_minutes: "",
    area: "",
    category: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState({});

  const handleVals = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
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
      <h1>Add a Recipe</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div style={{ flex: 1 }}>
            {error.name ? <p className="error">{error.name}</p> : null}
            <p className="fields">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleVals}
                className="input"
              />
            </p>
            {error.cook_minutes ? (
              <p className="error">{error.cook_minutes}</p>
            ) : null}
            <p className="fields">
              <label>Cook Time</label>
              <input
                type="number"
                name="cook_minutes"
                onChange={handleVals}
                className="input"
              />
            </p>
            <p className="fields">
              <label>Area</label>
              <input type="text" name="area" className="input" />
            </p>
            <p className="fields">
              <label>Category</label>
              <input type="text" name="category" className="input" />
            </p>
            <button type="submit" className="add-btn">
              Add
            </button>
          </div>
          <div style={{ flex: 2, marginLeft: 10 }}>
            <p>
              <label>Ingredients</label>
              <textarea
                name="ingredients"
                className="text_input"
                placeholder="Add measurement then ingredient and separate with a comma."
              ></textarea>
            </p>
            <p>
              <label>Instructions</label>
              <textarea
                name="instructions"
                className="text_input"
                placeholder="End each instruction with a period and do not number."
              ></textarea>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
