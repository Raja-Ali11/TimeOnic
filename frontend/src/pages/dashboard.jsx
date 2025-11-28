import React, { useState,useEffect } from "react";
import Navbar from "../components/navbar";
import data from "../components/cards"; // make sure this is default export
import Modal from "./view";
import axios from "axios"
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

export default function Dashboard() {
 
const [filterdata, setfilterdata] = useState([]);
const [allPosts, setAllPosts] = useState([]);

useEffect(() => {
  const fetchPosts = async () => {
          try {
        const BASE_URL = "https://timeonic.onrender.com"; // deployed backend

        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

      
    console.log("Raw response:", res);
    console.log("Response data:", res.data);


      setAllPosts(res.data);      
      setfilterdata(res.data);   
    } catch (error) {
      console.log(error);
    }
  };

  fetchPosts();
}, []);







  const [isOpen, setIsOpen] =useState(false);
  const[selecteddata,setselecteddata]=useState(null);


  const openModel=(data)=>{
    setselecteddata(data);
    setIsOpen(true);
  };

   const closedModel=()=>{
    setselecteddata(null);
    setIsOpen(false);
  };
  
const filtercards = (mood) => {
  const newData = allPosts.filter((card) => 
    (card.mood || "").toLowerCase() === mood.toLowerCase()
  );
  setfilterdata(newData);
};




  const user=JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />

      <div className="flex flex-col mt-14 items-center justify-center">
        <h4 className="text-base sm:text-base md:text-l lg:text-3xl font-bold text-gray-900 mt-5 mb-2">
          Hi {user.username}, What's on your mind today?
        </h4>

        <h2 className="text-xs sm:text-sm md:text-base lg:text-l">
          "Every Moment Deserves to be Remembered"
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => filtercards("love")}
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-red-200/40 backdrop-blur-md text-red-500 
                        border border-transparent focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-red-200/60 transition-all duration-200"
          >
            ❤️ Love
          </button>

          <button
            type="button"
            onClick={() => filtercards("happy")}
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-yellow-100/40 backdrop-blur-md text-yellow-400 
                        border border-transparent focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-yellow-100/60 transition-all duration-200"
          >
            😄 Happy
          </button>

          <button
            type="button"
            onClick={() => filtercards("sad")}
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-blue-200/40 backdrop-blur-md text-blue-500 
                        border border-transparent focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-blue-200/60 transition-all duration-200"
          >
            😢 Sad
          </button>

          <button
            type="button"
            onClick={() => filtercards("neutral")}
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-gray-300/40 backdrop-blur-md text-gray-400 
                        border border-transparent focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-gray-200/60 transition-all duration-200"
          >
            😐 Neutral
          </button>

          <button
            type="button"
            onClick={() => setfilterdata(allPosts)}
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-gray-400/40 backdrop-blur-md text-black
                        border border-transparent focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-gray-400/60 transition-all duration-200"
          >
            🌟 All
          </button>

          <Link to={"./ader"}>
           <button
            type="button"
            className="w-20 sm:w-24 md:w-25 p-1 sm:p-2 md:p-2 flex justify-center rounded-2xl text-xs sm:text-sm md:text-base 
                        bg-gray-400/40 backdrop-blur-md text-black font-bold 
                        border border-blue-950 focus:border-2 focus:border-black
                        hover:scale-105 hover:bg-gray-400/60 transition-all duration-200 ml-3"
            >
            Add new
            </button>
          </Link>
        </div>

        {/* Cards Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filterdata.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border rounded-2xl shadow-md bg-white flex flex-col 
                            hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                  onClick={() => openModel(item)}
                >

                  {/* TOP AREA */}
                  <div className="flex justify-between items-start">

                    {/* IMAGE + MOOD */}
                    <div className="flex items-center gap-3">

                 {/* IMAGE */}
                      {item.image && (
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt="post"
                          className="w-12 h-12 rounded-xl object-cover border shadow-sm"
                        />
                      )}

                      {/* MOOD */}
                      <span className="text-xl font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {item.mood}
                      </span>

                    </div>


                    {/* DATE */}
                    <span className="text-gray-500 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="mt-3 text-lg font-bold text-gray-800 leading-snug">
                    {item.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
                        <Modal
              isOpen={isOpen}
              closeModal={closedModel}
              data={selecteddata}
            />

              


              

              </div>
            </div>
            
  );
}
