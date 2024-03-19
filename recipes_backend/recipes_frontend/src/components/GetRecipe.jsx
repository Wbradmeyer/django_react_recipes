import { React, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [thisRecipe, setThisRecipe] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes/${id}`)
      .then((res) => {
        console.log(res);
        setThisRecipe(res.data);
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
      <div style={{ textAlign: "start" }}>
        <h2>{thisRecipe.name}</h2>
        <p>{thisRecipe.cook_minutes}</p>
        <button>
          <Link to={`/recipes/update/${thisRecipe.id}`}>Update Recipe</Link>
        </button>
        <button onClick={(e) => handleDelete(e, thisRecipe.id)}>Delete</button>
      </div>
    </div>
  );
};

export default GetRecipe;
