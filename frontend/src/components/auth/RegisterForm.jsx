import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService";
import { useNotification } from "../ui/Notification";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showNotification, NotificationContainer } = useNotification();

  // handle Resister Action
  const handleRegister = async (values, { setSubmitting }) => {
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

    const resultCreate = await createUser(userData);
    if (resultCreate.success) {
      showNotification(
        `Hello ${resultCreate?.firstName} ${resultCreate?.lastName},\n
        Please, go to your email(${resultCreate?.email}) to complete created account!`,
        "warning",
        5000
      );
      navigate("/login");
    } else {
      const exception = resultCreate.errors?.Exception;
      console.log(exception);
      showNotification(`Please check your input data!\n${exception}`, "error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <NotificationContainer />
      <div className="relative flex flex-col justify-between m-6 space-x-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:mx-80">
        {/* Left Side */}
        <img
          src={LoginImage}
          alt="Login Right Side Image"
          className="w-1/2 hidden md:block rounded-l-2xl"
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

          {/* Error messages */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <ErrorMessage name="gender" component="div" className="text-red-600 text-sm w-full md:w-1/2" />
            <ErrorMessage name="dob" component="div" className="text-red-600 text-sm w-full md:w-1/2" />
          </div>

          <label className="text-sm text-gray-600 flex items-center">
            <Field type="checkbox" name="agreeTerms" className="mr-2" />
            I agree to the terms and conditions
          </label>
          <ErrorMessage name="agreeTerms" component="div" className="text-red-600 text-sm" />

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
