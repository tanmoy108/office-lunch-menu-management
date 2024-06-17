import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { getResponse } from "../../../lib/checkToken";
import Cookies from 'js-cookie';

type Inputs = {
  name: string;
  email: string;
  designation: string;
  role: string;
  password: string;
};
const SignUp: FC = () => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const fetchData = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const uploadData = await fetchData.json();
      if (uploadData) {
        if (uploadData.success == false) alert(uploadData.result);
        if (uploadData.success == true) {
          alert(uploadData.result);
          navigate(`/auth/check?id=${uploadData.id}`);
          reset();
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img src="/vite.svg" alt="logo" />
        </a>
        <div className="w-full bg-[#ffffff] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jhon Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("name", { required: "Name is required" })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="text-red-600">{message}</p>
                  )}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Email
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
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Designation
                </label>
                <input
                  type="text"
                  placeholder="Junior Software Engineer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="designation"
                  render={({ message }) => (
                    <p className="text-red-600">{message}</p>
                  )}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your Role( Just showing Purpose not for real world )
                </label>

                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name="role"
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
              <input
                className="w-full text-[#F1EFEF] bg-[#191717] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              />
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-primary-600 hover:underline px-1"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
