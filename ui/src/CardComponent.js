// src/components/Card.jsx

import React from "react";
import tag from "./images/tag.png";

const data = [
  {
    name: "Obstacle Avoidance using Behaviour Cloning",
    tags: ["python", "ROS", "Gazebo", "OpenCV"],
    aim: "A nitro engine based RC car modified to run on BLDC motor and LiPo battery capable of avoiding obstacles using Behaviour Cloning.",
  },
  {
    name: "Obstacle Avoidance using Behaviour Cloning",
    tags: ["python", "ROS", "Gazebo", "OpenCV"],
    aim: "A nitro engine based RC car modified to run on BLDC motor and LiPo battery capable of avoiding obstacles using Behaviour Cloning.",
  },
];

const CardComponent = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {data.map((item) => (
        <div>
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src="https://via.placeholder.com/400x300"
              alt="Wooden House, Florida"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 pb-6">
              {item.name}
            </h3>
            <p className="text-gray-700 text-sm">{item.aim}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <img className="h-[20px] w-[20px]" src={tag} alt="" />
                {item.tags.map((tag) => (
                  <span className="bg-gray-200 rounded-full h-[20px]">{tag}</span>
                ))}
              </div>
              <button className="bg-black text-white px-4 py-2 rounded">
                RESERVE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
