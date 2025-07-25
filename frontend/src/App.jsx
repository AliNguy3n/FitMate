// This is the main component of your React application. It contains the structure and logic for your app’s user interface.
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import ProgressPage from "./pages/ProgressPage";
import WorkoutPage from "./pages/WorkoutPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import PromotionPage from "./pages/PromotionPage";
import AAAPage from "./pages/AAAPage";
import PaypalSuccessPage from "./pages/PaymentSucess";
import ExercisePage from "./pages/ExercisePage";
import MealPage from "./pages/MealPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/a" element={<AAAPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<AuthPage mode="login"/>} />
        <Route path="/register" element={<AuthPage mode="register"/>} />
        <Route path="/progress" element={<ProgressPage/>}/>
        <Route path="/exercise" element={<ExercisePage/>} />
        <Route path="/meal" element={<MealPage/>}/>
        <Route path="/workout" element={<WorkoutPage />}/>
        <Route path="/workout/1" element={<WorkoutDetailPage />}/>
        <Route path="/promotions" element={<PromotionPage />}/>
        <Route path="/payment/success" element={<PaypalSuccessPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
