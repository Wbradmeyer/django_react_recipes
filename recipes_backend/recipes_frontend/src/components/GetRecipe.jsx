import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const GetRecipe = () => {
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

  return (
    <div className="container">
      <div>
        <h1>Get Recipe</h1>
      </div>
      <hr />
      <div style={{ textAlign: "start" }}>
        <h2>{thisRecipe.name}</h2>
        <p>{thisRecipe.cook_minutes}</p>
      </div>
    </div>
  );
};

export default GetRecipe;
