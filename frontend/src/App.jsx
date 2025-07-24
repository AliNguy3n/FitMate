// This is the main component of your React application. It contains the structure and logic for your app’s user interface.
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import ProgressPage from "./pages/ProgressPage";
import WorkoutPage from "./pages/WorkoutPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import PromotionPage from "./pages/PromotionPage";

import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./components/auth/ProtectRoute";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import ZZZPage from "./pages/ZZZPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/promotions" element={<PromotionPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Test Page */}
        <Route path="/test" element={<ZZZPage/>} />

        {/* User routes*/}
        <Route
          path="/user/checkout"
          element={
            <ProtectedRoute requiredRole={"USER"}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/profile" element={
            <ProtectedRoute requiredRole={"USER"}>
              <ProfilePage />
            </ProtectedRoute> }
        />

        {/* Admin routes*/}
        <Route
          path="/admin/about"
          element={<ProtectedRoute requiredRole={"ADMIN"}></ProtectedRoute>}
        />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/workout/1" element={<WorkoutDetailPage />} />
        <Route path="/promotions" element={<PromotionPage />} /> */}

      </Routes>
    </Router>
    
  );
}

export default App;
