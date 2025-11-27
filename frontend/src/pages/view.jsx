import React from "react";

export default function Modal({ isOpen, closeModal, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 overflow-auto p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-red-500 transition-colors duration-200 z-10"
        >
          &times;
        </button>

        {/* Image */}
        {data.image && (
                    <div className="w-full relative rounded-t-3xl overflow-hidden shadow-inner  ">
                        {/* Blurred Background */}
                        <div
                        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-105"
                        style={{ backgroundImage: `url(http://localhost:5000/uploads/${data.image})` }}
                        ></div>

                        {/* Centered Image */}
                       <div className="relative flex justify-center items-center w-full h-40 sm:h-48 md:h-52">
                        <img
                            src={`http://localhost:5000/uploads/${data.image}`}
                            alt="post"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-lg z-10"
                        />
                        </div>
                    </div>
                    )}

        {/* Content */}
        <div className="p-4 flex flex-col gap-1 overflow-y-auto max-h-[calc(120vh-16rem)]">
          
          {/* Mood + Date */}
          <div className="flex justify-between items-center mb-2 ">
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm shadow-sm">
              {data.mood}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(data.date).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800  mb-2 ">{data.title}</h2>

          {/* Description */}
          <div className="text-gray-700 overflow-y-auto max-h-[40vh] pr-2 mt-1">
            <p className="whitespace-pre-wrap">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
