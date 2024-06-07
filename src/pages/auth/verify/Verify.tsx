import { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, useSearchParams } from 'react-router-dom';
type Inputs = {
  code: string;
};


const Verify:FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    console.log(searchParams);
    const getId = searchParams.get("id");
    const navigate = useNavigate();
    console.log(getId);

  if (!getId) navigate("/auth/signup");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const fetchData = await fetch(`http://localhost:5000/api/v1/check/${getId}`, {
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
          navigate(`/auth/login`);
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
         <img src="/vite.svg" alt="logo" />
        </a>
        <div className="w-full bg-[#ffffff] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Verify Your Email
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                 otp
                </label>
                <input
                  type="text"
                  placeholder="6 characters of code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("code", {
                    required: "Enter your provided code",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="code"
                  render={({ message }) => (
                    <p className="text-red-600">{message}</p>
                  )}
                />
              </div>
              <input
                className="w-full text-[#F1EFEF] bg-[#191717] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Verify