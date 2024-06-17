import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { getResponse } from "../../../lib/checkToken";

type Inputs = {
  email: string;
  password: string;
};
const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    const tokensend = async (accessToken: String) => {
      const res = await getResponse(accessToken);
      return res;
    };

    const VerifyToken = async (accessToken: String | null) => {
      if (accessToken) {
        const respond = await tokensend(accessToken);
        if (respond) navigate("/");
        else navigate("/auth/login");
      } else {
        console.log("Access Token not found");
        navigate("/auth/login");
      }
    };

    VerifyToken(accessToken!);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (dataInfo) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(dataInfo),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const uploadData = await response.json();

      if (uploadData) {
        if (uploadData.success == false) alert(uploadData.result);
        if (uploadData.success == true) {
          alert(uploadData.result);
          reset();
          navigate("/");
        }
      } else {
        alert("Registration failed! Please check the form for errors.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  return (
    <section className="bg-[#f0edd7]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img className="mr-2" src="/vite.svg" alt="logo" />
        </a>
        <div className="w-full bg-[#ffffff] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("email", {
                    required: "Your Email is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p className="text-red-600">{message}</p>
                  )}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-600">{message}</p>
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                className="w-full text-[#F1EFEF] bg-[#191717] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              />

              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?
                <Link
                  to="/auth/signup"
                  className="font-medium text-primary-600 hover:underline px-1"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
