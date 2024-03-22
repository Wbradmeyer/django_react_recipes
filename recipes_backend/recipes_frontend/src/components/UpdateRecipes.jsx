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
        // need to adjust this, probably Django REST sending an error to access these catches
        console.log(res.data);
        setError(res.data);
      });
  };

  return (
    <div className="container">
      <h1>Update Recipe</h1>
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
              value={recipe.name}
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
              value={recipe.cook_minutes}
              onChange={handleVals}
              className="input"
            />
          </p>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
