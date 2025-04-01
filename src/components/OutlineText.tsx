import { useState, useEffect } from "react";

const OutlineText = () => {
  return (
    <div className="relative mb-12">
      <div className="absolute -top-20 left-0">
        <div
          className="text-8xl font-bold tracking-wider"
          style={{ color: "transparent" }}
        >
          <span
            style={{
              WebkitTextStroke: "0.5px rgba(200, 200, 200, 0.5)",
              textStroke: "0.5px rgba(200, 200, 200, 0.5)",
            }}
          >
            LET'S CHOOSE
          </span>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-black relative">
        CATEGORIES
        <span className="absolute -bottom-4 left-0 w-16 h-1 bg-yellow-500"></span>
      </h2>
    </div>
  );
};

export default OutlineText;
