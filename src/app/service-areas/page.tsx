// app/service-areas/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function ServiceAreasPage() {
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would load from an API or static data
    // For this example, we'll simulate loading the data
    const fetchData = async () => {
      try {
        // In a real implementation, you would use:
        // const response = await fetch('/api/states-cities');
        // const data = await response.json();

        // For demonstration, using the data from the JSON file
        const data = require("../../utils/statesCities.json");

        // Process the data to include city counts
        const processedData = {};
        Object.keys(data).forEach((state) => {
          processedData[state] = {
            cities: data[state],
            count: data[state].length,
          };
        });

        setStateData(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load state data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create chunks of states for column layout
  const createStateColumns = (states) => {
    if (!states) return [];

    const stateNames = Object.keys(states).sort();
    const columns = [[], [], [], []]; // 4 columns

    stateNames.forEach((state, index) => {
      const columnIndex = index % 4;
      columns[columnIndex].push(state);
    });

    return columns;
  };

  const stateColumns = stateData
    ? createStateColumns(stateData)
    : [[], [], [], []];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#222222] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <MapPin className="mr-2 h-5 w-5" />
            <p className="text-sm">USA</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            BigRentz Equipment Rental Service Areas
            <br />
            in the United States
          </h1>
        </div>
      </div>

      {/* States List */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stateColumns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-3">
                  {column.map((state) => (
                    <div key={state}>
                      <Link
                        href={`/service-areas/${state
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-blue-700 hover:text-yellow-500 transition-colors"
                      >
                        {state}{" "}
                        <span className="text-gray-500">
                          ({stateData[state].count})
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
