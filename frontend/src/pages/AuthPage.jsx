import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";

function AuthPage({ mode }) {
  const isLogin = mode === "login";

  return (
    <AuthLayout
      authTitle={isLogin ? "Sign In" : "Sign Up"}
      bottomLinks={
        isLogin ? (
          <p className="text-gray-500 text-center text-sm">
            Don't have an account?
            <Link to="/register" className="text-primary ms-1 font-semibold">
              Register
            </Link>
          </p>
        ) : (
          <p className="text-gray-500 text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-primary ms-1 font-semibold">
              Login
            </Link>
          </p>
        )
      }
    >
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </AuthLayout>
  );
}

export default AuthPage;