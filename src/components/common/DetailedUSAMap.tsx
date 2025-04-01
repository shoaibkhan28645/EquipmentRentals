import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

export default function ImprovedUSAMap() {
  const [usaMapData, setUsaMapData] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgRef = useRef(null);
  const mapRef = useRef(null);

  // Location data
  const locations = [
    {
      id: "los-angeles",
      name: "Los Angeles",
      state: "CA",
      coordinates: [-118.243683, 34.052235],
      equipmentCount: 254,
    },
    {
      id: "new-york-city",
      name: "New York City",
      state: "NY",
      coordinates: [-74.005974, 40.712776],
      equipmentCount: 341,
    },
    {
      id: "chicago",
      name: "Chicago",
      state: "IL",
      coordinates: [-87.629799, 41.878113],
      equipmentCount: 198,
    },
    {
      id: "houston",
      name: "Houston",
      state: "TX",
      coordinates: [-95.369804, 29.760427],
      equipmentCount: 267,
    },
    {
      id: "miami",
      name: "Miami",
      state: "FL",
      coordinates: [-80.19179, 25.761681],
      equipmentCount: 185,
    },
    {
      id: "denver",
      name: "Denver",
      state: "CO",
      coordinates: [-104.990251, 39.739236],
      equipmentCount: 126,
    },
  ];

  // Updated state color mappings with more contrast
  const stateColors = {
    CA: "#FFDD94", // Darker yellow for states with locations
    NY: "#FFDD94",
    IL: "#FFDD94",
    TX: "#FFDD94",
    FL: "#FFDD94",
    CO: "#FFDD94",
  };

  // Mapping of state names to abbreviations
  const statesMap = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
    "District of Columbia": "DC",
  };

  // Create a reverse mapping from abbreviations to state names
  const abbrToStateMap = {};
  Object.entries(statesMap).forEach(([name, abbr]) => {
    abbrToStateMap[abbr] = name;
  });

  // Load the USA map data
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // Fetch US TopoJSON data
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
        );
        const data = await response.json();
        setUsaMapData(data);
      } catch (error) {
        console.error("Error loading map data:", error);
      }
    };

    fetchMapData();
  }, []);

  // Create and render the map
  useEffect(() => {
    if (!usaMapData || !mapContainerRef.current) return;

    // Clear existing SVG
    d3.select(mapContainerRef.current).select("svg").remove();

    // Set dimensions
    const width = mapContainerRef.current.clientWidth;
    const height = Math.min(550, width * 0.6); // Responsive height

    // Create SVG
    const svg = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svgRef.current = svg.node();

    // Define projection
    const projection = d3
      .geoAlbersUsa()
      .fitSize(
        [width, height],
        topojson.feature(usaMapData, usaMapData.objects.states)
      );

    // Path generator
    const path = d3.geoPath().projection(projection);

    // Add a background rectangle for better visibility
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f0f4f8") // Light blue-gray background
      .attr("rx", 8)
      .attr("ry", 8);

    // Add defs for filters and patterns
    const defs = svg.append("defs");

    // Add a drop shadow filter with more pronounced effect for states
    const stateFilter = defs
      .append("filter")
      .attr("id", "state-shadow")
      .attr("height", "130%");

    stateFilter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    stateFilter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

    const stateFeComponentTransfer = stateFilter
      .append("feComponentTransfer")
      .attr("in", "offsetBlur")
      .attr("result", "offsetBlur");

    stateFeComponentTransfer
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.3);

    const stateFeMerge = stateFilter.append("feMerge");
    stateFeMerge.append("feMergeNode").attr("in", "offsetBlur");
    stateFeMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Add drop shadow filter for markers
    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 2)
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 1)
      .attr("dy", 1)
      .attr("result", "offsetBlur");

    const feComponentTransfer = filter
      .append("feComponentTransfer")
      .attr("in", "offsetBlur")
      .attr("result", "offsetBlur");

    feComponentTransfer
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.2);

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Add glow filter for markers
    const glowFilter = defs.append("filter").attr("id", "glow");

    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3.5") // Increased glow
      .attr("result", "blur");

    glowFilter
      .append("feComposite")
      .attr("in", "SourceGraphic")
      .attr("in2", "blur")
      .attr("operator", "over");

    // Map container for states
    const mapGroup = svg.append("g");
    mapRef.current = mapGroup;

    // Process state features
    const stateFeatures = topojson.feature(
      usaMapData,
      usaMapData.objects.states
    ).features;

    // Create a lookup for state features
    const stateFeatureMap = {};
    stateFeatures.forEach((feature) => {
      stateFeatureMap[feature.properties.name] = feature;
    });

    // Draw states with improved visibility
    const statePaths = mapGroup
      .selectAll("path")
      .data(stateFeatures)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const stateName = d.properties.name;
        const stateAbbr = statesMap[stateName] || stateName;

        // Check if this state has a location
        return stateColors[stateAbbr] || "#ffffff"; // White for states without locations
      })
      .attr("stroke", "#8c9cb1") // Darker border color for better visibility
      .attr("stroke-width", 0.8) // Thicker borders
      .attr("class", "state")
      .attr("id", (d) => `state-${statesMap[d.properties.name]}`)
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => 300 + i * 10)
      .attr("opacity", 1);

    // Add state borders with improved visibility
    mapGroup
      .append("path")
      .datum(
        topojson.mesh(usaMapData, usaMapData.objects.states, (a, b) => a !== b)
      )
      .attr("fill", "none")
      .attr("stroke", "#5a6987") // Darker border color for better contrast
      .attr("stroke-width", 1) // Thicker borders
      .attr("stroke-linejoin", "round")
      .attr("d", path)
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .delay(600)
      .attr("opacity", 1);

    // Add connections between locations
    const connectionsGroup = svg.append("g");

    for (let i = 0; i < locations.length; i++) {
      const currentLoc = locations[i];
      const nextLoc = locations[(i + 1) % locations.length];

      const start = projection(currentLoc.coordinates);
      const end = projection(nextLoc.coordinates);

      if (start && end) {
        connectionsGroup
          .append("path")
          .attr("d", `M${start[0]},${start[1]} L${end[0]},${end[1]}`)
          .attr("stroke", "#FFA726") // More visible orange connection lines
          .attr("stroke-width", 2) // Thicker lines
          .attr("stroke-dasharray", "5,3") // Modified dash pattern
          .attr("fill", "none")
          .attr("opacity", 0)
          .transition()
          .duration(1000)
          .delay(1000 + i * 200)
          .attr("opacity", 0.8);
      }
    }

    // Add location markers with animations
    const markersGroup = svg.append("g");

    locations.forEach((location, i) => {
      const [x, y] = projection(location.coordinates) || [0, 0];

      // Marker group
      const markerGroup = markersGroup
        .append("g")
        .attr("transform", `translate(${x}, ${y})`)
        .attr("class", "marker")
        .attr("data-location", location.id)
        .attr("data-state", location.state)
        .attr("cursor", "pointer")
        .style("opacity", 0);

      // Add a shadow beneath the marker for elevation effect
      markerGroup
        .append("ellipse")
        .attr("cx", 0)
        .attr("cy", 2)
        .attr("rx", 12)
        .attr("ry", 3)
        .attr("fill", "rgba(0,0,0,0.2)")
        .attr("filter", "url(#drop-shadow)");

      // Animate marker entrance
      markerGroup
        .transition()
        .duration(500)
        .delay(1500 + i * 150)
        .style("opacity", 1);

      // Pulse animation
      markerGroup
        .append("circle")
        .attr("r", 20)
        .attr("fill", "#FF9800") // Darker orange for better visibility
        .attr("opacity", 0.3)
        .attr("class", "pulse-circle");

      // Actual marker with shadow
      markerGroup
        .append("circle")
        .attr("r", 10)
        .attr("fill", "white")
        .attr("filter", "url(#glow)");

      markerGroup
        .append("circle")
        .attr("r", 8)
        .attr("fill", "#FF9800") // More visible orange
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // Add location label with improved visibility
      markerGroup
        .append("rect")
        .attr("x", 12)
        .attr("y", -14) // Moved up slightly
        .attr("width", location.name.length * 7 + 30) // More padding
        .attr("height", 24) // Taller for better readability
        .attr("fill", "white")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("opacity", 0.9) // More opaque
        .attr("stroke", "#FF9800")
        .attr("stroke-width", 1.5) // Thicker border
        .attr("filter", "url(#drop-shadow)"); // Add shadow for better visibility

      markerGroup
        .append("text")
        .attr("x", 16)
        .attr("y", 2) // Centered in the taller rectangle
        .attr("fill", "#333")
        .attr("font-weight", "bold")
        .attr("font-size", "12px")
        .text(`${location.name}, ${location.state}`);

      // Add event listeners for interactive behavior
      markerGroup
        .on("mouseenter", function (event) {
          // Store the location ID directly in a data attribute
          d3.selectAll(".marker").attr("data-active", "false");
          d3.select(this).attr("data-active", "true");

          // Handle state highlighting through D3 directly
          d3.selectAll(".state").each(function (d) {
            const stateName = d.properties.name;
            const stateAbbr = statesMap[stateName] || stateName;

            if (stateAbbr === location.state) {
              d3.select(this)
                .transition()
                .duration(300)
                .attr("fill", "#FFB74D"); // Brighter highlight
            } else {
              const hasLocation = locations.some(
                (loc) => loc.state === stateAbbr
              );
              d3.select(this)
                .transition()
                .duration(300)
                .attr("fill", hasLocation ? "#FFDD94" : "#ffffff");
            }
          });

          // For React components outside D3 that need to know the active location
          setActiveLocation(location.id);

          // Get state name for the full state name
          const stateName = abbrToStateMap[location.state] || location.state;

          // Show tooltip with state name emphasized
          setTooltipContent(
            `<b>${stateName}</b><br>${location.name}, ${location.state}: ${location.equipmentCount} equipment units`
          );
          setTooltipPosition({ x: event.pageX, y: event.pageY });
          setShowTooltip(true);

          // Animate marker on hover
          d3.select(this)
            .select("circle:nth-child(2)")
            .transition()
            .duration(300)
            .attr("r", 10);

          d3.select(this)
            .select("circle:nth-child(3)")
            .transition()
            .duration(300)
            .attr("r", 8);

          // Add pulse animation
          d3.select(this)
            .select(".pulse-circle")
            .attr("opacity", 0.3)
            .attr("r", 8)
            .transition()
            .duration(1500)
            .attr("r", 25)
            .attr("opacity", 0)
            .on("end", function () {
              // Use the data attribute to check if this is still the active marker
              if (
                d3
                  .select(d3.select(this).node()?.parentNode)
                  .attr("data-active") === "true"
              ) {
                d3.select(this)
                  .attr("r", 8)
                  .attr("opacity", 0.3)
                  .transition()
                  .duration(1500)
                  .attr("r", 25)
                  .attr("opacity", 0);
              }
            });
        })
        .on("mouseleave", function () {
          // Reset active marker status
          d3.select(this).attr("data-active", "false");

          // Reset state colors through D3
          d3.selectAll(".state").each(function (d) {
            const stateName = d.properties.name;
            const stateAbbr = statesMap[stateName] || stateName;
            const hasLocation = locations.some(
              (loc) => loc.state === stateAbbr
            );

            d3.select(this)
              .transition()
              .duration(300)
              .attr("fill", hasLocation ? "#FFDD94" : "#ffffff");
          });

          // Update React state for components outside D3
          setActiveLocation(null);
          setShowTooltip(false);

          // Reset marker size
          d3.select(this)
            .select("circle:nth-child(2)")
            .transition()
            .duration(300)
            .attr("r", 8);

          d3.select(this)
            .select("circle:nth-child(3)")
            .transition()
            .duration(300)
            .attr("r", 6);
        })
        .on("click", () => {
          window.location.href = `/locations/${location.id}`;
        });
    });

    // Add a hover effect to states
    d3.selectAll(".state")
      .on("mouseenter", function (event, d) {
        const stateName = d.properties.name;
        const stateAbbr = statesMap[stateName] || stateName;

        // Highlight state with gold color
        d3.select(this).transition().duration(300).attr("fill", "#FFB74D"); // More visible highlight

        // Find if this state has a location and highlight that location marker
        const locationInState = locations.find(
          (loc) => loc.state === stateAbbr
        );
        if (locationInState) {
          const marker = d3.select(
            `.marker[data-location="${locationInState.id}"]`
          );

          marker
            .select("circle:nth-child(2)")
            .transition()
            .duration(300)
            .attr("r", 10);

          marker
            .select("circle:nth-child(3)")
            .transition()
            .duration(300)
            .attr("r", 8);
        }
      })
      .on("mouseleave", function (event, d) {
        const stateName = d.properties.name;
        const stateAbbr = statesMap[stateName] || stateName;

        // Check if any marker is currently active
        const anyMarkerActive =
          d3.select(`.marker[data-active="true"]`).empty() === false;
        const activeMarkerState = anyMarkerActive
          ? d3.select(`.marker[data-active="true"]`).attr("data-state")
          : null;

        // Don't reset if a marker in this state is active
        if (activeMarkerState === stateAbbr) return;

        // Reset state color
        d3.select(this)
          .transition()
          .duration(300)
          .attr("fill", () => {
            const stateLocation = locations.find(
              (loc) => loc.state === stateAbbr
            );
            return stateLocation ? stateColors[stateLocation.state] : "#ffffff";
          });

        // Reset any highlighted location markers for this state
        const locationInState = locations.find(
          (loc) => loc.state === stateAbbr
        );
        if (locationInState) {
          const marker = d3.select(
            `.marker[data-location="${locationInState.id}"]`
          );

          // Only reset if this marker isn't the active one
          if (marker.attr("data-active") !== "true") {
            marker
              .select("circle:nth-child(2)")
              .transition()
              .duration(300)
              .attr("r", 8);

            marker
              .select("circle:nth-child(3)")
              .transition()
              .duration(300)
              .attr("r", 6);
          }
        }
      });

    // Make the map component responsive
    const resizeMap = () => {
      if (!mapContainerRef.current) return;

      const newWidth = mapContainerRef.current.clientWidth;
      const newHeight = Math.min(550, newWidth * 0.6);

      svg
        .attr("width", newWidth)
        .attr("height", newHeight)
        .attr("viewBox", [0, 0, newWidth, newHeight]);

      // Update background
      svg.select("rect").attr("width", newWidth).attr("height", newHeight);

      // Update projection to fit new dimensions
      projection.fitSize(
        [newWidth, newHeight],
        topojson.feature(usaMapData, usaMapData.objects.states)
      );

      // Update paths
      mapGroup.selectAll("path").attr("d", path);

      // Update borders
      mapGroup.select("path").attr("d", path);

      // Update connections
      connectionsGroup.selectAll("path").remove();

      for (let i = 0; i < locations.length; i++) {
        const currentLoc = locations[i];
        const nextLoc = locations[(i + 1) % locations.length];

        const start = projection(currentLoc.coordinates);
        const end = projection(nextLoc.coordinates);

        if (start && end) {
          connectionsGroup
            .append("path")
            .attr("d", `M${start[0]},${start[1]} L${end[0]},${end[1]}`)
            .attr("stroke", "#FF9800") // Updated to more visible orange
            .attr("stroke-width", 1.5)
            .attr("stroke-dasharray", "3,3")
            .attr("fill", "none")
            .attr("opacity", 0.7);
        }
      }

      // Update markers
      locations.forEach((location) => {
        const [x, y] = projection(location.coordinates) || [0, 0];
        const markerGroup = markersGroup.select(
          `.marker[data-location="${location.id}"]`
        );
        markerGroup.attr("transform", `translate(${x}, ${y})`);
      });
    };

    // Add resize listener
    window.addEventListener("resize", resizeMap);

    // Ensure the map is visible
    if (mapContainerRef.current) {
      mapContainerRef.current.style.opacity = "1";
      mapContainerRef.current.style.transform = "translateY(0)";
    }

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeMap);
    };
  }, [usaMapData]);

  return (
    <section className="bg-gray">
      <div>
        <div></div>

        {/* Improved USA Map */}
        <div
          className="relative bg-grey p-0 rounded-lg  opacity-0 transform translate-y-4 transition-all duration-1000"
          style={{ minHeight: "500px" }}
          ref={mapContainerRef}
        >
          {/* Map will be rendered here by D3 */}
          {!usaMapData && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-orange-500">
                <svg className="w-12 h-12 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          {/* Tooltip with improved styling */}
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute z-10 bg-white p-3 rounded-md shadow-lg text-sm pointer-events-none border border-gray-200"
              style={{
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 40,
                transform: "translateX(-50%)",
              }}
              dangerouslySetInnerHTML={{ __html: tooltipContent }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
}
