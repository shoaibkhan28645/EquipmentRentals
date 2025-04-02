// app/service-areas/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
// Import JSON data properly
import statesCitiesData from "../../utils/statesCities.json";

// Define types for our state data
interface CityData {
  cities: string[];
  count: number;
}

interface StateDataType {
  [state: string]: CityData;
}

export default function ServiceAreasPage() {
  const [stateData, setStateData] = useState<StateDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Process the data to include city counts
    const processedData: StateDataType = {};

    // Use the imported JSON data instead of require
    Object.keys(statesCitiesData).forEach((state) => {
      const cities = statesCitiesData[state as keyof typeof statesCitiesData];
      if (Array.isArray(cities)) {
        processedData[state] = {
          cities: cities,
          count: cities.length,
        };
      }
    });

    setStateData(processedData);
    setLoading(false);
  }, []);

  // Create chunks of states for column layout
  const createStateColumns = (states: StateDataType): string[][] => {
    if (!states) return [];

    const stateNames = Object.keys(states).sort();
    const columns: string[][] = [[], [], [], []]; // 4 columns

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
            <p>Loading service areas...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stateColumns.map((column, colIndex) => (
                <div key={colIndex}>
                  {column.map((state) => (
                    <div key={state} className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">{state}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {stateData?.[state]?.count} Cities
                      </p>
                      <ul className="space-y-1">
                        {stateData?.[state]?.cities.slice(0, 5).map((city) => (
                          <li key={city} className="text-sm">
                            <Link
                              href={`/service-areas/${state.toLowerCase()}/${city
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="text-blue-600 hover:underline"
                            >
                              {city}
                            </Link>
                          </li>
                        ))}
                        {/* Fix the TypeScript error by adding null check and optional chaining */}
                        {stateData &&
                          stateData[state] &&
                          stateData[state].cities.length > 5 && (
                            <li className="text-sm">
                              <Link
                                href={`/service-areas/${state.toLowerCase()}`}
                                className="text-blue-600 hover:underline font-medium"
                              >
                                + {stateData[state].cities.length - 5} more
                                cities
                              </Link>
                            </li>
                          )}
                      </ul>
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
