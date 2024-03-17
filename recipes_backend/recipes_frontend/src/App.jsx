import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Index from "./components/Index";
import GetRecipe from "./components/GetRecipe";
import AllRecipes from "./components/AllRecipes";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [allRecipes, setAllRecipes] = useState({});

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recipes" element={<AllRecipes />} />
            <Route
              path="/recipes/add"
              element={
                <RecipeForm
                  allRecipes={allRecipes}
                  setAllRecipes={setAllRecipes}
                />
              }
            />
            <Route path="/recipes/:id" element={<GetRecipe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
