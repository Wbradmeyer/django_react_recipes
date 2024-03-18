import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const RecipeForm = () => {
  const navigate = useNavigate();
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
        console.log(res.data);
        if (res.data.id) {
          navigate("/recipes");
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>Add a Recipe</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          {error.name_error ? (
            <p className="error">{error.name_error}</p>
          ) : null}
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
          {error.time_error ? (
            <p className="error">{error.time_error}</p>
          ) : null}
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

          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
