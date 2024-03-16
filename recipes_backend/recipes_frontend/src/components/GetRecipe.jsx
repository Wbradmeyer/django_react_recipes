import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
    <div style={{ width: "750px" }}>
      <div>
        <h1>Get Recipe</h1>
      </div>
      <div>
        <p style={{ marginRight: "15px" }}>Random Note</p>
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
