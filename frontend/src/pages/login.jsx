import React from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();




  const onSubmit = async (data) => {
        try {
        const BASE_URL = "https://timeonic.onrender.com"; // deployed backend

        const res = await axios.post(`${BASE_URL}/api/auth/signin`, data, {
          headers: { "Content-Type": "application/json" },
        });
    localStorage.setItem("token",res.data.token)
    localStorage.setItem("user",JSON.stringify(res.data.user));

    console.log("signin successfull:",res.data)
    alert("login successfull")

    navigate("/dashboard");

    }catch(error){
      console.log("login failed:",error.response?.data);
      alert("login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('src/assets/bg.jpeg')] bg-cover bg-center backdrop-blur-md">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-white/20">
        <h2 className="text-2xl font-semibold text-center text-white mb-1">
          Login
        </h2>
        <h1 className="text-1x1font-semibold text-center text-white mb-5 ">
          to your memories
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
         

         
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
          </div>

         
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}
          </div>
          

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 mb-7 text-white py-2 rounded-md transition-all"
          >
            Login
          </button>
          <h1 className="text-sm  text-blue-700 mb-2  "  > Don't have an account  :
            
            <Link to="/signup"> signup </Link>
            
          </h1>


        </form>
      </div>
    </div>
  );
}
