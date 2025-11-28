import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import axios from "axios"

export default function Add({ setMemories }) {
   

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("mood", data.mood);
    formData.append("date", data.date);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // send actual file
    }

    const BASE_URL = "https://timeonic.onrender.com";

        const res = await axios.post(
          `${BASE_URL}/api/posts/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );


    alert("Post Added Successfully!");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    alert("Failed to add post");
  }
};


  const imagePreview = watch("image")?.[0]
    ? URL.createObjectURL(watch("image")[0])
    : null;

  return (
    <div className="flex justify-center mt-7 px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-[450px]
          p-8 
          bg-white/40 
          backdrop-blur-lg 
          rounded-3xl 
          shadow-xl 
          border border-gray-300/50
          flex flex-col 
          gap-6 
          transition-all 
          duration-300 
          hover:shadow-2xl
          hover:scale-[1.01]
        "
      >

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* IMAGE UPLOAD */}
          <div className="flex flex-col w-full  md:w-1/2">
            <label className="font-semibold pl-3 mb-2 text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="
                p-3 
                rounded-3xl 
                border 
                bg-gray-100 
                cursor-pointer 
                hover:bg-gray-200 
                transition 
                focus:ring-2 
                focus:ring-blue-400
              "
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-3 w-full h-36 rounded-3xl object-cover shadow-lg"
                alt="preview"
              />
            )}
          </div>

          {/* MOOD + DATE */}
          <div className="flex flex-col w-full md:w-1/2">
            <label className="font-semibold mb-2 pl-3 text-gray-700">
              Select Mood
            </label>
            <select
              {...register("mood", { required: "Mood is required" })}
              className="
                p-3 rounded-3xl border bg-gray-100 
                hover:bg-gray-200 transition 
                focus:ring-2 focus:ring-blue-400
              "
            >
              <option value="">Choose Mood</option>
              <option value="love">Love</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="neutral">Neutral</option>
            </select>
            {errors.mood && (
              <p className="text-red-500 text-sm">{errors.mood.message}</p>
            )}

            {/* DATE */}
            <label className="font-semibold mt-4 mb-2 ml-3 text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="
                p-3 rounded-3xl border bg-gray-100 
                hover:bg-gray-200 transition 
                focus:ring-2 focus:ring-blue-400
              "
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="font-semibold mb-2 pl-2 text-gray-700 block">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            {...register("title", { required: "Title is required" })}
            className="
              p-3 w-full rounded-2xl border pl-2 bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-blue-400
              hover:bg-gray-200 transition
            "
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold mb-2 text-gray-700 block">
            Description
          </label>
          <textarea
            placeholder="Write long note here..."
            {...register("description", {
              required: "Description required",
            })}
            className="
              p-3 w-full h-40 rounded-xl border bg-gray-100 
              focus:outline-none focus:ring-2 focus:ring-blue-400
              hover:bg-gray-200 transition resize-none
            "
          ></textarea>

          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            p-3 mt-1 rounded-3xl text-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 to-blue-800
            hover:from-blue-700 hover:to-blue-900
            transition shadow-lg
          "
        >
          Add
        </button>

      </form>
    </div>
  );
}
