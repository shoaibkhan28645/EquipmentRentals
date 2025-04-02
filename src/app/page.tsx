"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import DetailedUSAMap from "@/components/common/DetailedUSAMap";
import RentalModal from "@/components/common/RentalModal";

// Define types for our location and region objects
interface Location {
  id: string;
  name: string;
  state: string;
  stateAbbr: string;
  coordinates: { x: number; y: number };
  equipmentCount: number;
}

interface Region {
  id: string;
  name: string;
  path: string;
  states: string[];
  color: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

export default function HomePage() {
  // Remove unused state variables and handlers
  const mapRef = useRef<HTMLDivElement>(null);

  // Add new state for the rental modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Categories array with proper typing
  const categories: Category[] = [
    {
      id: "scissor-lift",
      name: "Scissor Lift",
      image: "/images/product1.jpg",
    },
    {
      id: "rough-terrain-scissor-lift",
      name: "Rough Terrain Scissor Lift",
      image: "/images/RoughTerrainScissorLift.png",
    },
    {
      id: "man-lift",
      name: "Man Lift",
      image: "/images/ManLift.webp",
    },
    {
      id: "forklift",
      name: "Forklift",
      image: "/images/forklift.jpg",
    },
    {
      id: "excavator",
      name: "Excavator",
      image: "/images/excavator.webp",
    },
    {
      id: "earthmoving-equipment",
      name: "Earthmoving Equipment",
      image: "/images/earthmoving.webp",
    },
    {
      id: "compaction-equipment",
      name: "Compaction Equipment",
      image: "/images/compaction.png",
    },
    {
      id: "boom-lift",
      name: "Boom Lift",
      image: "/images/BoomLift.webp",
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
          // Add type assertion to fix the error
          const htmlImage = image as HTMLElement;
          htmlImage.style.transform = `scale(${scale})`;
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
          mapRef.current.style.opacity = `${progress}`;
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

  // New handlers for the rental modal with proper types
  const handleCategoryClick = (e: React.MouseEvent, category: Category) => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We Don&apos;t Match The Price We Simply Beat It!!{" "}
          </h1>
          <p className="text-2xl text-white mb-12">
            Your one stop shop for all equipment rental needs.
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
                        you&apos;re looking for, when you need it, and for how
                        long. We make the initial rental process simple and
                        straightforward.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                  <Image
                    src="/images/step1.png"
                    alt="Search Equipment"
                    width={500}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-20">
              <div className="md:w-1/2 order-2 md:order-1 mt-8 md:mt-0">
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                  <Image
                    src="/images/step2.png"
                    alt="Search Equipment"
                    width={500}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
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
                        and process your order. We&apos;ll handle all logistics
                        from delivery to pickup, ensuring you get exactly what
                        you need without any hassle.
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
            {/* <Link
              href="/locations"
              className="text-indigo-600 hover:text-indigo-700 flex items-center w-fit"
            >
              View all 14,000+ locations <ArrowRight className="ml-2 h-4 w-4" />
            </Link> */}
          </div>
          {/* Apply the ref to a div that wraps DetailedUSAMap */}
          <div ref={mapRef}>
            <DetailedUSAMap />
          </div>
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
