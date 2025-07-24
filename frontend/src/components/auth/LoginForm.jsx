import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginImage from "../../assets/images/login_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getUserByUsername, loginUser } from "../../services/userService";
import { useNotification } from "../ui/Notification";
import useUserStore from "../../stores/useUserStore";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { showNotification, NotificationContainer } = useNotification();
  // handle Login action
  const handleLogin = async (values, { setSubmitting }) => {
    const requestData = {
      username: values.username,
      password: values.password,
    };

    // login to get token

    const tokenResult = await loginUser(requestData);
    if (tokenResult.success) {
      const token = tokenResult.data.token;
      localStorage.setItem("authToken", token);

      // get username and role from User by username

      const userResult = await getUserByUsername(requestData.username);
      if (userResult.success) {
        const user = {
          username: userResult?.data.username,
          role: userResult?.data.role.role,
        };
        setUser(user);

        showNotification(
          `Login successful! Welcome ${requestData.username}`,
          "success",
          2000
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        showNotification(
          `Can't not get role of account: ${requestData.username}\n
          ${userResult.errors}
          ` ,
          "warning",
          2000
        );
      }
    } else {
      // console.log(JSON.stringify(tokenResult?.errors))
      showNotification(
        "Login failed,\nPlease check username and password again!",
        "error"
      );
      setSubmitting(false);
    }
  };
  return (
    <>
      <NotificationContainer />
      {/* Card Container */}
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
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleLogin}
          >
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Enter your Username"
                className="w-full p-6 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-6 text-red-600">
                <ErrorMessage name="username" />
              </div>

              <Field
                name="password"
                type="password"
                placeholder="Enter your Password"
                className="w-full p-6 border mb-2 border-gray-300 rounded-md placeholder:font-light"
              />
              <div className="mb-6 text-red-600">
                <ErrorMessage name="password" />
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
        </div>

        {/* Right Side */}
        <img
          src={LoginImage}
          alt="Login Right Side Image"
          className="w-[430px] hidden md:block"
        />
      </div>
    </>
  );
};

export default LoginForm;
