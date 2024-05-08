import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Index from "./components/Index";
import GetRecipe from "./components/GetRecipe";
import AllRecipes from "./components/AllRecipes";
import RecipeForm from "./components/RecipeForm";
import UpdateRecipe from "./components/UpdateRecipes";
import SearchRecipes from "./components/SearchRecipes";
import GetSearchedRecipe from "./components/GetSearchedRecipe";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        {currentUser ? <NavBar currentUser={currentUser} /> : null}
        <div>
          <Routes>
            <Route
              path="/"
              element={<Index setCurrentUser={setCurrentUser} />}
            />
            <Route element={<PrivateRoutes currentUser={currentUser} />}>
              <Route path="/recipes" element={<AllRecipes />} />
              <Route path="/recipes/add" element={<RecipeForm />} />
              <Route path="/recipes/:id" element={<GetRecipe />} />
              <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
              <Route path="/recipes/search" element={<SearchRecipes />} />
              <Route
                path="/recipes/search/:id"
                element={<GetSearchedRecipe />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
