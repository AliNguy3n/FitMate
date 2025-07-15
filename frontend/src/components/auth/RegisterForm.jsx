import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginImage from "../../assets/images/login_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService";
import { useNotification } from "../ui/Notification";

function RegisterForm() {
  const navigate = useNavigate();
  // const { showNotification } = useNotification();
  const { showNotification, NotificationContainer } = useNotification();

  // handle Resister Action
  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    const userData = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender == "male" ? 1 : 0,
      phone: values.phone,
      dob: values.dob,
      address: values.address,
    };

    const result = await createUser(userData);
    if (result.success) {
      // active in email
      showNotification(
        "Please, go to your email to complete created account!",
        "success"
      );

      navigate("/login");
    } else {
      showNotification(
        `Please check your input data!\n(${result.errors.Exception})`,
        "error"
      );
      setSubmitting(false);
    }
  };

  return (
    <>
      <NotificationContainer />
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:mx-80">
        {/* Left Side */}
        <img
          src={LoginImage}
          alt="Login Right Side Image"
          className="w-[430px] hidden md:block rounded-l-2xl"
        />

        {/* Right Side */}
        <div className="p-6 md:p-20">
          <div className="mb-5 text-4xl font-bold">Create your account</div>
          <div className="max-w-sm mb-5 py-4 font-light text-gray-600">
            Create a new account to get started with our fitness platform. Are
            you already have an account?{" "}
            <Link className="text-sky-800" to={"/login"}>
              <b>Sign in</b>
            </Link>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
              firstName: "",
              lastName: "",
              phone: "",
              address: "",
              dob: "",
              gender: "",
              agreeTerms: false,
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(3, "Username must be at least 3 characters")
                .max(30, "Username must be less than 20 characters")
                .required("Username is required"),
              password: Yup.string()
                .min(8, "Password must be at least 6 characters")
                .required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required"),
              email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
              firstName: Yup.string().required("FirstName is required"),
              lastName: Yup.string().required("LastName is required"),
              phone: Yup.string()
                .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
                .required("Phone number is required"),
              address: Yup.string()
                .min(5, "Address must be at least 5 characters")
                .required("Address is required"),
              gender: Yup.string()
                .oneOf(["male", "female"], "Please select a valid gender")
                .required("Gender is required"),
              dob: Yup.date()
                .max(new Date(), "Date of birth cannot be in the future")
                .required("Date of birth is required"),
              agreeTerms: Yup.boolean()
                .oneOf([true], "You must agree to the terms and conditions")
                .required("You must agree to the terms and conditions"),
            })}
            onSubmit={handleRegister}
          >
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Enter your Username"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="username" />
              </div>

              <Field
                name="password"
                type="password"
                placeholder="Enter your Password"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="password" />
              </div>

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Enter your Password Again"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="confirmPassword" />
              </div>

              <Field
                name="email"
                type="email"
                placeholder="Enter your Email"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="email" />
              </div>

              <Field
                name="firstName"
                type="text"
                placeholder="Enter your First Name"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="firstName" />
              </div>

              <Field
                name="lastName"
                type="text"
                placeholder="Enter your Last Name"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="lastName" />
              </div>

              <Field
                name="phone"
                type="tel"
                placeholder="Enter your Phone"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="phone" />
              </div>

              <Field
                name="address"
                type="text"
                placeholder="Enter your Address"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="address" />
              </div>
              <Field name="gender">
                {({ field }) => (
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        {...field}
                        type="radio"
                        value="male"
                        checked={field.value === "male"}
                        className="mr-2 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...field}
                        type="radio"
                        value="female"
                        checked={field.value === "female"}
                        className="mr-2 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                  </div>
                )}
              </Field>
              <div className="mb-4 text-red-600 text-sm">
                <ErrorMessage name="gender" />
              </div>

              <Field
                name="dob"
                type="date"
                placeholder="Day of Birth"
                className="w-full p-4 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-4 text-red-600">
                <ErrorMessage name="dob" />
              </div>

              <div className="flex items-center mb-2">
                <Field name="agreeTerms" type="checkbox" className="mr-2" />
                <label htmlFor="agreeTerms" className="text-gray-700 text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-cyan-700 underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <div className="mb-6 text-red-600">
                <ErrorMessage name="agreeTerms" />
              </div>

              <button
                type="submit"
                className="w-full p-6 font-bold text-white border rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-sky-500 hover:shadow-2xl"
              >
                Sign Up
              </button>
            </Form>
          </Formik>

          <div className="mt-12 border-b border-b-gray-300"></div>

          <p className="mt-12 p-4 font-light text-gray-600 text-center">
            Continue with Social Account
          </p>
          <div className="flex flex-col space-x-0 space-y-0 md:flex-row md:space-x-4 md:space-y-0 mt-6">
            <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-transition-y-0 5 transition duration-150 md:w-1/2">
              <a href="#">
                <FontAwesomeIcon
                  icon={["fab", "facebook-f"]}
                  size="3x"
                  color="blue"
                />
              </a>
              <p>Facebook</p>
            </button>
            <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-transition-y-0 5 transition duration-150 md:w-1/2">
              <a href="#">
                <FontAwesomeIcon
                  icon={["fab", "google-plus-g"]}
                  size="3x"
                  color="#C70039"
                />
              </a>
              <p>Google</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
