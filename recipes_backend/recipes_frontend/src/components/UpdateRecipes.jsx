import { React, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    cook_minutes: "",
    area: "",
    category: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes/${id}`)
      .then((res) => {
        console.log(res);
        setRecipe(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/recipes/update/${id}`, recipe)
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
      <h1>Update Recipe</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div className="add-recipe">
            <div style={{ flex: 1 }}>
              {error.name ? <p className="error">{error.name}</p> : null}
              <p className="fields">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
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
                  value={recipe.cook_minutes}
                  onChange={handleVals}
                  className="input"
                />
              </p>
              {error.area ? <p className="error">{error.area}</p> : null}
              <p className="fields">
                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  value={recipe.area}
                  onChange={handleVals}
                  className="input"
                />
              </p>
              {error.category ? (
                <p className="error">{error.category}</p>
              ) : null}
              <p className="fields">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={recipe.category}
                  onChange={handleVals}
                  className="input"
                />
              </p>
              <button type="submit" className="add-btn">
                Update
              </button>
            </div>
            <div style={{ flex: 2, marginLeft: 10 }}>
              {error.ingredients ? (
                <p className="error">{error.ingredients}</p>
              ) : null}
              <p>
                <label>Ingredients</label>
                <textarea
                  name="ingredients"
                  onChange={handleVals}
                  className="text_input"
                  placeholder="Add measurement then ingredient and separate with a comma."
                >
                  {recipe.ingredients}
                </textarea>
              </p>
              {error.instructions ? (
                <p className="error">{error.instructions}</p>
              ) : null}
              <p>
                <label>Instructions</label>
                <textarea
                  name="instructions"
                  onChange={handleVals}
                  className="text_input"
                  placeholder="End each instruction with a period and do not number."
                >
                  {recipe.instructions}
                </textarea>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
