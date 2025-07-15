import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthLayout from "../../layouts/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginImage from "../../assets/images/login_image.jpg";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // handle Login action
  return (
    // Card Container
    <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
      {/* Left Side */}
      <div className="p-6 md:p-20">
        <div className="mb-5 text-4xl font-bold">Sign In</div>
        <div className="max-w-sm mb-5 py-4 font-light text-gray-600">
          Log in to your account to get products or track your progress about
          exercises and meals. If you don't had an account, please{" "}
          <Link className="text-sky-800" to={"/register"}>
            <b>register</b>
          </Link>{" "}
          first.
        </div>
        <div className="flex flex-col space-x-0 space-y-0 md:flex-row md:space-x-4 md:space-y-0">
          <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-transition-y-0 5 transition duration-150 md:w-1/2">
            <a href="#">
              <FontAwesomeIcon
                icon={["fab", "facebook-f"]}
                size="3x"
                color="blue"
              />
            </a>
            <p>with Facebook</p>
          </button>
          <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-transition-y-0 5 transition duration-150 md:w-1/2">
            <a href="#">
              <FontAwesomeIcon
                icon={["fab", "google-plus-g"]}
                size="3x"
                color="#C70039"
              />
            </a>
            <p>with Google</p>
          </button>
        </div>

        <div className="mt-12 border-b border-b-gray-300"></div>

        <div className="mb-2 text-center text-2xl">
          <i>or with your email and password</i>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // handle
            alert(JSON.stringify(values));
            setSubmitting(false);
          }}
        >
          <Form>
            <Field
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full p-6 border mb-2 border-gray-300 rounded-md placeholder:font-light"
            />
            <div className="mb-6 text-red-600">
              <ErrorMessage name="email"/>
            </div>

            <Field
              name="password"
              type="password"
              placeholder="Enter your Password"
              className="w-full p-6 border mb-2 border-gray-300 rounded-md placeholder:font-light"
            />
            <div className="mb-6 text-red-600">
              <ErrorMessage name="password"/>
            </div>

            <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <a href="#" className="font-thin text-cyan-700">
                Forgot password
              </a>
              <button
                type="submit"
                className="w-full md:width-auto p-6 font-bold text-white border rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-sky-500 hover:shadow-2xl"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
        {/* <form onSubmit={formik.handleSubmit}>
          <input
            id="email"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your Email"
            className="w-full p-6 border mb-6 border-gray-300 rounded-md placeholder:font-light"
          />

          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your Password"
            className="w-full p-6 border mb-6 border-gray-300 rounded-md placeholder:font-light"
          />
          <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
            <a href="#" className="font-thin text-cyan-700">
              Forgot password
            </a>
            <button
              type="submit"
              className="w-full md:width-auto p-6 font-bold text-white border rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-sky-500 hover:shadow-2xl"
            >
              Login
            </button>
          </div>
        </form> */}
      </div>

      {/* Right Side */}
      <img
        src={LoginImage}
        alt="Login Right Side Image"
        className="w-[430px] hidden md:block"
      />
    </div>
  );
};

export default LoginForm;
