"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DetailedUSAMap from "@/components/common/DetailedUSAMap";
import RentalModal from "@/components/common/RentalModal"; // Import the new modal component

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLocation, setActiveLocation] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Add new state for the rental modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "scissor-lift",
      name: "Scissor Lift",
      image: "/images/product1.jpg",
    },
    {
      id: "rough-terrain-scissor-lift",
      name: "Rough Terrain Scissor Lift",
      image: "/images/product1.jpg",
    },
    {
      id: "man-lift",
      name: "Man Lift",
      image: "/images/product1.jpg",
    },
    {
      id: "forklift",
      name: "Forklift",
      image: "/images/product1.jpg",
    },
    {
      id: "excavator",
      name: "Excavator",
      image: "/images/product1.jpg",
    },
    {
      id: "earthmoving-equipment",
      name: "Earthmoving Equipment",
      image: "/images/product1.jpg",
    },
    {
      id: "compaction-equipment",
      name: "Compaction Equipment",
      image: "/images/product1.jpg",
    },
    {
      id: "boom-lift",
      name: "Boom Lift",
      image: "/images/product1.jpg",
    },
  ];

  // Location data with normalized SVG coordinates
  const locations = [
    {
      id: "los-angeles",
      name: "Los Angeles",
      state: "California",
      stateAbbr: "CA",
      coordinates: { x: 60, y: 230 },
      equipmentCount: 254,
    },
    {
      id: "new-york-city",
      name: "New York City",
      state: "New York",
      stateAbbr: "NY",
      coordinates: { x: 380, y: 165 },
      equipmentCount: 341,
    },
    {
      id: "chicago",
      name: "Chicago",
      state: "Illinois",
      stateAbbr: "IL",
      coordinates: { x: 285, y: 175 },
      equipmentCount: 198,
    },
    {
      id: "houston",
      name: "Houston",
      state: "Texas",
      stateAbbr: "TX",
      coordinates: { x: 220, y: 280 },
      equipmentCount: 267,
    },
    {
      id: "miami",
      name: "Miami",
      state: "Florida",
      stateAbbr: "FL",
      coordinates: { x: 350, y: 300 },
      equipmentCount: 185,
    },
    {
      id: "denver",
      name: "Denver",
      state: "Colorado",
      stateAbbr: "CO",
      coordinates: { x: 170, y: 200 },
      equipmentCount: 126,
    },
  ];

  // Map regions with state outlines
  const regions = [
    {
      id: "west-coast",
      name: "West Coast",
      path: "M60,100 L40,180 L70,230 L60,270 L110,220 L140,180 L120,100 Z",
      states: ["CA", "OR", "WA"],
      color: "#f59e0b",
    },
    {
      id: "mountain",
      name: "Mountain",
      path: "M120,100 L140,180 L170,200 L150,230 L180,280 L220,280 L240,220 L180,130 L160,100 Z",
      states: ["CO", "UT", "MT", "ID", "WY", "NV", "AZ", "NM"],
      color: "#f59e0b",
    },
    {
      id: "midwest",
      name: "Midwest",
      path: "M160,100 L180,130 L240,220 L270,220 L285,175 L300,120 L240,110 Z",
      states: [
        "IL",
        "IN",
        "MI",
        "OH",
        "WI",
        "MN",
        "IA",
        "MO",
        "ND",
        "SD",
        "NE",
        "KS",
      ],
      color: "#f59e0b",
    },
    {
      id: "south",
      name: "South",
      path: "M220,280 L240,220 L270,220 L290,260 L320,270 L350,300 L300,330 L230,320 Z",
      states: [
        "TX",
        "OK",
        "AR",
        "LA",
        "MS",
        "AL",
        "GA",
        "FL",
        "SC",
        "NC",
        "TN",
        "KY",
      ],
      color: "#f59e0b",
    },
    {
      id: "northeast",
      name: "Northeast",
      path: "M300,120 L285,175 L320,180 L330,200 L380,165 L400,140 L385,110 L350,115 Z",
      states: [
        "NY",
        "PA",
        "NJ",
        "CT",
        "RI",
        "MA",
        "VT",
        "NH",
        "ME",
        "DE",
        "MD",
        "WV",
        "VA",
      ],
      color: "#f59e0b",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const cityImages = document.querySelectorAll(".city-image");
      cityImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const scrollPosition = Math.max(
            0,
            Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
          );
          const scale = 1 + scrollPosition * 0.1;
          image.style.transform = `scale(${scale})`;
        }
      });

      // Animate map on scroll
      if (mapRef.current) {
        const mapRect = mapRef.current.getBoundingClientRect();
        const isMapVisible =
          mapRect.top < window.innerHeight && mapRect.bottom > 0;

        if (isMapVisible) {
          const progress = Math.max(
            0,
            Math.min(1, (window.innerHeight - mapRect.top) / window.innerHeight)
          );
          mapRef.current.style.opacity = progress;
          mapRef.current.style.transform = `translateY(${
            (1 - progress) * 40
          }px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for equipment:", searchTerm);
    // Implement search functionality
  };

  const handleRegionHover = (region, event) => {
    const servicesCount = locations.filter((loc) =>
      region.states.includes(loc.stateAbbr)
    ).length;

    setTooltipContent(`${region.name}: ${servicesCount} service locations`);

    // Get position relative to the SVG
    if (mapRef.current) {
      const svgRect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top - 20,
      });
    }

    setShowTooltip(true);
  };

  const handleMarkerHover = (location, event) => {
    setActiveLocation(location.id);

    setTooltipContent(
      `${location.name}, ${location.state}: ${location.equipmentCount} equipment units`
    );

    // Get position relative to the SVG
    if (mapRef.current) {
      const svgRect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top - 20,
      });
    }

    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setActiveLocation(null);
    setShowTooltip(false);
  };

  // New handlers for the rental modal
  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Prevent the default link behavior
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-150 md:min-h-206 flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/slider-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "auto",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Best Way to Rent Equipment.
          </h1>
          <p className="text-xl text-white mb-12">
            We don't match the price we simply beat it!!
          </p>
        </div>
      </section>

      {/* Categories Section - Modified to use our modal */}
      <section className="py-16 bg-white md:px-20">
        <div className="container mx-auto px-4">
          <div className="relative mb-12">
            <h2 className="text-4xl font-bold text-black relative">
              CATEGORIES
              <span className="absolute -bottom-4 left-0 w-16 h-1 bg-yellow-500"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <a
                href="#"
                key={category.id}
                className="group"
                onClick={(e) => handleCategoryClick(e, category)}
              >
                <div className="flex flex-col transition-transform duration-300">
                  <div className="relative border-4 border-transparent group-hover:border-yellow-500 transition-colors duration-300">
                    <div className="relative h-48 bg-white">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    {/* Invisible border to maintain size */}
                    <div className="absolute inset-0 border border-gray-200 pointer-events-none"></div>
                  </div>
                  <div className="p-4 text-center bg-white relative overflow-hidden group-hover:text-black transition-colors duration-300">
                    <div className="absolute inset-x-0 top-0 h-0 bg-yellow-500 group-hover:h-full transition-all duration-300 ease-in-out z-0 scale-85 group-hover:scale-100"></div>
                    <h3 className="font-medium text-black relative z-10">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How Does It Work Section */}
      <section className="py-16 bg-gray-50 md:px-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#333] uppercase relative inline-block">
              HOW DOES IT WORK
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-yellow-500"></span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-20">
              <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-2xl font-bold text-white">
                      1
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-black relative inline-block">
                      Contact Us
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-500"></span>
                    </h3>
                    <div className="mt-6">
                      <p className="text-gray-700 text-sm">
                        Reach out to our team through phone or email to inquire
                        about the equipment you need to rent. Tell us what
                        you're looking for, when you need it, and for how long.
                        We make the initial rental process simple and
                        straightforward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/images/step1.png"
                  alt="Search Equipment"
                  className="w-125 h-60 rounded-md "
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-20">
              <div className="md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
                <img
                  src="/images/step2.png"
                  alt="Search Equipment"
                  className="w-125 h-60 rounded-md"
                />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 text-2xl font-bold text-white">
                      2
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-black relative inline-block">
                      Let Us Handle The Rest
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-500"></span>
                    </h3>
                    <div className="mt-6">
                      <p className="text-gray-700 text-sm">
                        After your inquiry, our dedicated team will promptly
                        contact you to confirm details, discuss availability,
                        and process your order. We'll handle all logistics from
                        delivery to pickup, ensuring you get exactly what you
                        need without any hassle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Locations Section */}
      <section className="py-5 bg-gray-100 md:px-20">
        <div className="container mx-auto px-4">
          <div className="mb-5">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Popular locations serviced through our network.
            </h2>
            <Link
              href="/locations"
              className="text-indigo-600 hover:text-indigo-700 flex items-center w-fit"
            >
              View all 14,000+ locations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <DetailedUSAMap />
        </div>
      </section>

      {/* Rental Modal */}
      {selectedCategory && (
        <RentalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
        />
      )}
    </main>
  );
}
