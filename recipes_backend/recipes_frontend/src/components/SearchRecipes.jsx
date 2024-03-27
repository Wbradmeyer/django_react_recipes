import { React, useState } from "react";
import axios from "axios";
import "./style.css";

const SearchRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [search, setSearch] = useState({
    nameSearch: "",
    letterSearch: "",
    categorySearch: "",
  });
  const [error, setError] = useState(null);

  const searchUrls = [
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.nameSearch}`,
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.letterSearch}`,
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search.categorySearch}`,
  ];

  const handleVals = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (search.nameSearch) {
      axios
        .get(searchUrls[0])
        .then((res) => {
          console.log(res);
          setSearchedRecipes(res.data.meals);
          setSearch({
            nameSearch: "",
            letterSearch: "",
            categorySearch: "",
          });
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setSearchedRecipes([]);
        });
    } else if (search.letterSearch) {
      axios
        .get(searchUrls[1])
        .then((res) => {
          console.log(res);
          setSearchedRecipes(res.data.meals);
          setSearch({
            nameSearch: "",
            letterSearch: "",
            categorySearch: "",
          });
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setSearchedRecipes([]);
        });
    } else {
      axios
        .get(searchUrls[2])
        .then((res) => {
          console.log(res);
          setSearchedRecipes(res.data.meals);
          setSearch({
            nameSearch: "",
            letterSearch: "",
            categorySearch: "",
          });
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setSearchedRecipes([]);
        });
    }
  };

  const mealNameSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.nameSearch}`
      )
      .then((res) => {
        console.log(res);
        setSearchedRecipes(res.data.meals);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setSearchedRecipes([]);
      });
  };

  const firstLetterSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.letterSearch}`
      )
      .then((res) => {
        console.log(res);
        setSearchedRecipes(res.data.meals);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setSearchedRecipes([]);
      });
  };

  const categorySubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search.categorySearch}`
      )
      .then((res) => {
        console.log(res);
        setSearchedRecipes(res.data.meals);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setSearchedRecipes([]);
      });
  };

  return (
    <div className="container">
      <h1>Search for Recipes</h1>
      <div className="recipes">
        <form onSubmit={onSubmitHandler}>
          {error ? <p>Nope, didn't work.</p> : null}
          <p className="fields">
            <label>
              Search by meal name
              <input
                type="text"
                name="nameSearch"
                className="search-input"
                onChange={handleVals}
              />
            </label>
          </p>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={onSubmitHandler}>
          <p className="fields">
            <label>
              Search by first letter
              <input
                type="text"
                name="letterSearch"
                className="search-input"
                onChange={handleVals}
              />
            </label>
          </p>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={onSubmitHandler}>
          <p className="fields">
            <label>
              Search by category
              <input
                type="text"
                name="categorySearch"
                className="search-input"
                onChange={handleVals}
              />
            </label>
          </p>
          <button type="submit">Search</button>
        </form>
      </div>
      <hr />
      <div>
        {searchedRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2 className="card-title">{recipe.strMeal}</h2>
            <p className="info">{recipe.strCategory}</p>
            <p className="info">{recipe.strArea}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecipes;
