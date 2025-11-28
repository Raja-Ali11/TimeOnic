import React from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      try {
      const BASE_URL = "https://timeonic.onrender.com"; // deployed backend
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, data, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("signup success:" ,res.data)
      alert("signup successfully")

    }
    catch(error){
      console.log("signup error:",error.response?.data);
      alert("Signup Failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('src/assets/bg.jpeg')] bg-cover bg-center backdrop-blur-md">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-white/20">
        <h2 className="text-2xl font-semibold text-center text-white mb-1">
          Sign Up
        </h2>
        <h1 className="text-1x1font-semibold text-center text-white mb-5 ">
          to save your memories 
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("username", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <p className="text-red-300 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
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
          

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 mb-7 text-white py-2 rounded-md transition-all"
          >
            Create Account
          </button>
           <h1 className="text-sm  text-blue-700 mb-2  "  >Already have an account :
            
            <Link to="/"> Login</Link>
            
          </h1>



        </form>
      </div>
    </div>
  );
}
