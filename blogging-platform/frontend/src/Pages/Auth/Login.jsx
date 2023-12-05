import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../assets/Google.jsx";
import Spinner from "../../components/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    email,
    password,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-telemagnet">
      <div className="max-w-6xl w-5/6 flex rounded-2xl items-center justify-center  bg-soft-white shadow-md ">
        <div className="w-full px-6 md:w-2/6 mx-8 md:mb-0 ">
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://source.unsplash.com/user/wsanter"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {isLoading ? <Spinner /> : ""}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2"
              />
              <div className="flex flex-row ">
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-gray mr-6"
                >
                  Remember me
                </label>
                <p className="text-sm text-gray">
                  <a href="#">Forgot Password?</a>
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full  text-white  bg-soft-orange rounded-2xl py-2 mr-2"
            >
              Login
            </button>
          </form>
          <hr className="my-6 border-t border-gray-300" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Or Login with
            </p>
            <div>
              <a
                href="#"
                className="flex flex-row items-center justify-around  m-2"
              >
                <GoogleIcon />
              </a>
            </div>
          </div>
          <p>
            Don't have an accound?
            <Link to="/users/" className="text-soft-orange hover:underline">
              Register
            </Link>
          </p>
        </div>
        {/* Right side - Welcome message and illustration */}
        <div className="hidden md:block w-full md:w-4/6 pt-8  rounded-lg text-soft-white  bg-soft-orange">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome</h2>
            <p className="text-gray-600 mb-4">
              Enjoy the benefits of our platform by signing in. Join our
              community and explore a world of possibilities.
            </p>
          </div>
          <img
            src="https://source.unsplash.com/user/wsanter"
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
