import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import TravelDestinationsApp from "./pages/DestinationsPage";
import FavoritesPage from "./pages/FavoritesPage";
import BudgetPlanner from "./pages/BudgetPlannerPage";
import LoginForm from "./pages/LoginPage";
import SignUpForm from "./pages/SignUpPage";


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Ruta pentru pagina de login */}
                    <Route path="/" element={<LoginForm />} />

                    {/* Ruta pentru homepage */}
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/destinations" element={<TravelDestinationsApp />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/budget" element={<BudgetPlanner />} />
                    <Route path="/signup" element={<SignUpForm />} />



                </Routes>
            </div>
        </Router>
    );
}

export default App;