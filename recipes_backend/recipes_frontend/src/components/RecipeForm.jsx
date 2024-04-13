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
  let measureCount = 1;
  let ingredientCount = 1;

  const addMore = (e) => {
    e.preventDefault();
    measureCount++;
    ingredientCount++;
    add_inputs.innerHTML += (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <label>Measurement ${measureCount}</label>
          <input type="text" name="measure${measureCount}" className="input" />
        </p>
        <p>
          <label>Ingredient ${ingredientCount}</label>
          <input
            type="text"
            name="ingredient${ingredientCount}"
            className="input"
          />
        </p>
      </div>
    );
  };

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
              <label>Category</label>
              <input type="text" name="category" className="input" />
            </p>
            <button type="submit" className="add-btn">
              Add
            </button>
          </div>
          <div style={{ flex: 2, marginLeft: 10 }}>
            <div id="add_inputs">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <label>Measurement {measureCount}</label>
                  <input type="text" name="measure1" className="input" />
                </p>
                <p>
                  <label>Ingredient {ingredientCount}</label>
                  <input type="text" name="ingredient1" className="input" />
                </p>
              </div>
              <div
                style={{
                  width: "125px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  margin: "0px",
                }}
              >
                <p style={{ margin: "0px" }}>Add More</p>
                <button onClick={addMore} className="plus">
                  +
                </button>
              </div>
            </div>
            <p>
              <label>
                Instructions{" "}
                <span style={{ fontStyle: "italic" }}>
                  (End each instruction with a period and do not number.)
                </span>
              </label>
              <textarea
                name="instructions"
                className="instructions_input"
              ></textarea>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
