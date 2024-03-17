import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const RecipeForm = (props) => {
  const navigate = useNavigate();
  const { allRecipes, setAllRecipes } = props;
  const [recipe, setRecipe] = useState({
    name: "",
    cook_minutes: "",
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
        console.log(res.data);
        setAllRecipes([...allRecipes], res.data);
        navigate("/recipes");
      })
      .catch((err) => {
        navigate("/recipes");
        // console.log(err.response.data.error.errors);
        // setError(err.response.data.error.errors);
      });
  };

  return (
    <div className="container">
      <h1>Add a Recipe</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <p className="fields">
            <label>Name</label>
            {error.name ? <p>{error.name.message}</p> : null}
            <input
              type="text"
              name="name"
              onChange={handleVals}
              className="input"
            />
          </p>
          <p className="fields">
            <label>Cook Time</label>
            {error.cook_minutes ? <p>{error.cook_minutes.message}</p> : null}
            <input
              type="number"
              name="cook_minutes"
              onChange={handleVals}
              className="input"
            />
          </p>

          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
