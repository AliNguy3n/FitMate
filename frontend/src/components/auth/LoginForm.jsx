import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { getUserByUsername } from "../../services/userService";
import { useNotification } from "../ui/Notification";

const LoginForm = () => {
  const navigate = useNavigate();
  const { showNotification, NotificationContainer } = useNotification();
  return (
    <>
    <NotificationContainer />
    <Formik
      initialValues={{ username: "", password: "", remember: false }}
      validationSchema={Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const credentials = {
          username: values.username,
          password: values.password,
        };

        const result = await loginUser(credentials);
        if (result.success && result.data?.data?.token) {
          const { token, refreshToken } = result.data.data;
         
          localStorage.setItem("authToken", token);
          localStorage.setItem("refreshToken", refreshToken);
          const userInfo = await getUserByUsername(credentials.username);
          if (userInfo.success) {
            const userData = userInfo.data?.data;
            localStorage.setItem("userId", userData.id);
            const roleName = userInfo.data?.data?.role?.role || "";
            if (roleName === "USER") {
              showNotification("Login Successfully!", "success");
              navigate("/");
            }
          } else {
            showNotification("Login succeeded but failed to get user info", "error");
          }
        } else {
          showNotification(
            `Login failed: ${result.errors?.errors?.Exception || "Unknown error"}`,
            "error"
          );
        }

        setSubmitting(false);
        //  toast.success(`Login Successfully!`);
      }}
    >
      {() => (
        
        <Form className="space-y-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Field
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 focus:outline-none"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 focus:outline-none"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <Field
                type="checkbox"
                name="remember"
                className="form-checkbox rounded text-blue-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/recover-password"
              className="text-sm text-blue-600 underline"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>

        </Form>
      )}
    </Formik>
    </>
    
  );
};

export default LoginForm;
