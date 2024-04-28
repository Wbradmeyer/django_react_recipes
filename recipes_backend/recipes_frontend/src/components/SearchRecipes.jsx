import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

const SearchRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [search, setSearch] = useState({
    nameSearch: "",
    letterSearch: "",
  });
  const [categories, setCategories] = useState([]);
  const [secondColumnStart, setSecondColumnStart] = useState(0);
  // let [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

  const searchUrls = [
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.nameSearch}`,
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.letterSearch}`,
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=`,
  ];

  // bring in all searchable recipe categories when the page loads
  useEffect(() => {
    axios
      .get(searchUrls[2])
      .then((res) => {
        console.log(res);
        setCategories(res.data.categories);
        setSecondColumnStart(Math.ceil(res.data.categories.length / 2));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVals = (e) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [e.target.name]: e.target.value,
    }));
  };

  //
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
    }
  };

  const categorySearch = (e, categoryName) => {
    e.preventDefault();
    axios
      .get(searchUrls[3] + categoryName)
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
      <div className="search-entries">
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
        <div className="categories-box">
          <div className="column">
            {categories.slice(0, secondColumnStart).map((category) => (
              <div key={category.idCategory}>
                <p
                  onClick={(e) => categorySearch(e, category.strCategory)}
                  className="category"
                >
                  {category.strCategory}
                </p>
              </div>
            ))}
          </div>
          <div className="column">
            {categories.slice(secondColumnStart).map((category) => (
              <div key={category.idCategory}>
                <p
                  onClick={(e) => categorySearch(e, category.strCategory)}
                  className="category"
                >
                  {category.strCategory}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="search-results">
        {searchedRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2 className="card-title">{recipe.strMeal}</h2>
            {recipe.strCategory ? (
              <p className="info">Category - {recipe.strCategory}</p>
            ) : null}
            {recipe.strArea ? (
              <p className="info">Region - {recipe.strArea}</p>
            ) : null}
            <Link to={`/recipes/search/${recipe.idMeal}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecipes;
