"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Map } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

type Region = "all" | "asia" | "europe" | "americas" | "africa" | "oceania"

interface Destination {
  id: string
  name: string
  location: string
  description: string
  image: string
  region: Region
  tags: string[]
}

const destinations: Destination[] = [
  {
    id: "dest1",
    name: "Kyoto",
    location: "Japan",
    description: "Historic temples, beautiful gardens, and traditional geisha districts.",
    image:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "asia",
    tags: ["culture", "historic", "temples"],
  },
  {
    id: "dest2",
    name: "Santorini",
    location: "Greece",
    description: "Stunning white and blue buildings overlooking the Aegean Sea.",
    image:
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "europe",
    tags: ["beaches", "romantic", "island"],
  },
  {
    id: "dest3",
    name: "Machu Picchu",
    location: "Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains.",
    image:
      "https://images.pexels.com/photos/2539472/pexels-photo-2539472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "americas",
    tags: ["historic", "adventure", "hiking"],
  },
  {
    id: "dest4",
    name: "Serengeti",
    location: "Tanzania",
    description: "Famous wildlife safari destination with annual migration.",
    image:
      "https://images.pexels.com/photos/624063/pexels-photo-624063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "africa",
    tags: ["wildlife", "safari", "nature"],
  },
  {
    id: "dest5",
    name: "Great Barrier Reef",
    location: "Australia",
    description: "World's largest coral reef system with incredible marine life.",
    image:
      "https://images.pexels.com/photos/2937566/pexels-photo-2937566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "oceania",
    tags: ["diving", "beach", "nature"],
  },
  {
    id: "dest6",
    name: "Barcelona",
    location: "Spain",
    description: "Vibrant city known for Gaudí architecture and Mediterranean beaches.",
    image:
      "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "europe",
    tags: ["city", "architecture", "culture"],
  },
  {
    id: "dest7",
    name: "Bali",
    location: "Indonesia",
    description: "Tropical paradise with lush rice terraces, beaches, and temples.",
    image:
      "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "asia",
    tags: ["beach", "nature", "culture"],
  },
  {
    id: "dest8",
    name: "New York City",
    location: "USA",
    description: 'The bustling "Big Apple" with iconic skyscrapers and landmarks.',
    image:
      "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    region: "americas",
    tags: ["city", "urban", "culture"],
  },
]

const regionEmojis: Record<Region, string> = {
  all: "🌎",
  asia: "🌏",
  europe: "🌍",
  americas: "🌎",
  africa: "🌍",
  oceania: "🌏",
}

const DestinationExplorer: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredDestinations = destinations.filter(
    (destination) =>
      (selectedRegion === "all" || destination.region === selectedRegion) &&
      (selectedTag === null || destination.tags.includes(selectedTag)),
  )

  // Get all unique tags
  const allTags = Array.from(new Set(destinations.flatMap((destination) => destination.tags)))

  return (
    <section id="destinations" className="section bg-white">
      <SectionTitle
        title="Destination Explorer"
        description="Discover breathtaking destinations around the world. Filter by region or interests to find your perfect travel spot."
        icon={Map}
      />

      {/* Region Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {(Object.keys(regionEmojis) as Region[]).map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedRegion === region
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <span className="mr-2">{regionEmojis[region]}</span>
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 text-sm rounded-full transition-all ${
              selectedTag === null ? "bg-secondary-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedTag === tag ? "bg-secondary-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.id}
            className="card card-hover overflow-hidden flex flex-col h-full transform transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">{destination.name}</h3>
                <div className="flex items-center text-white/90">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
              </div>
            </div>
            <div className="flex-grow p-4">
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 pt-0">
              <button className="btn btn-outline w-full text-primary-600 border-primary-600 hover:bg-primary-50">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No destinations found with the selected filters.</p>
          <button
            onClick={() => {
              setSelectedRegion("all")
              setSelectedTag(null)
            }}
            className="mt-4 btn btn-primary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}

export default DestinationExplorer
