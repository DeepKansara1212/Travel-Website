"use client"

import type React from "react"
import { useState } from "react"
import { Camera, X, ZoomIn, Tag } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface Photo {
  id: string
  src: string
  alt: string
  tags: string[]
  location: string
}

const photos: Photo[] = [
  {
    id: "photo1",
    src: "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Mountains with lake reflection",
    tags: ["nature", "mountains", "landscape"],
    location: "Swiss Alps, Switzerland",
  },
  {
    id: "photo2",
    src: "https://images.pexels.com/photos/3935707/pexels-photo-3935707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Beach sunset",
    tags: ["beach", "sunset", "landscape"],
    location: "Bali, Indonesia",
  },
  {
    id: "photo3",
    src: "https://images.pexels.com/photos/2118560/pexels-photo-2118560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "City skyline",
    tags: ["city", "urban", "architecture"],
    location: "New York, USA",
  },
  {
    id: "photo4",
    src: "https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Local street food",
    tags: ["food", "culture", "market"],
    location: "Bangkok, Thailand",
  },
  {
    id: "photo5",
    src: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Wildlife safari",
    tags: ["wildlife", "animals", "nature"],
    location: "Serengeti, Tanzania",
  },
  {
    id: "photo6",
    src: "https://images.pexels.com/photos/2563681/pexels-photo-2563681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Historic temple",
    tags: ["culture", "historic", "architecture"],
    location: "Kyoto, Japan",
  },
  {
    id: "photo7",
    src: "https://images.pexels.com/photos/1717932/pexels-photo-1717932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Desert landscape",
    tags: ["nature", "desert", "landscape"],
    location: "Sahara Desert, Morocco",
  },
  {
    id: "photo8",
    src: "https://images.pexels.com/photos/2817119/pexels-photo-2817119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Cafe in Paris",
    tags: ["food", "city", "culture"],
    location: "Paris, France",
  },
  {
    id: "photo9",
    src: "https://images.pexels.com/photos/2967810/pexels-photo-2967810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Underwater coral reef",
    tags: ["nature", "underwater", "wildlife"],
    location: "Great Barrier Reef, Australia",
  },
]

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(photos.flatMap((photo) => photo.tags)))

  // Filter photos by tag
  const filteredPhotos = selectedTag ? photos.filter((photo) => photo.tags.includes(selectedTag)) : photos

  return (
    <section id="gallery" className="section bg-gray-50">
      <SectionTitle
        title="Travel Photo Gallery"
        description="Explore stunning travel photographs from around the world. Get inspired for your next adventure."
        icon={Camera}
      />

      {/* Tags Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            selectedTag === null
              ? "bg-primary-600 text-white"
              : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
          }`}
        >
          All Photos
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm transition flex items-center ${
              selectedTag === tag
                ? "bg-primary-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white text-sm mb-1">{photo.location}</p>
              <div className="flex flex-wrap gap-1">
                {photo.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/30 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-2 right-2">
                <span className="bg-white/30 backdrop-blur-sm p-1.5 rounded-full">
                  <ZoomIn className="w-4 h-4 text-white" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No photos found with the selected tag.</p>
          <button onClick={() => setSelectedTag(null)} className="mt-4 btn btn-primary">
            Show All Photos
          </button>
        </div>
      )}

      {/* Modal View */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 bg-gray-900 flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              <div className="md:w-1/3 p-6">
                <h3 className="text-xl font-bold mb-2">{selectedPhoto.location}</h3>
                <p className="text-gray-600 mb-4">{selectedPhoto.alt}</p>

                <div className="mb-4">
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <button
                    className="btn btn-primary w-full flex items-center justify-center"
                    onClick={() => setSelectedPhoto(null)} // Placeholder for download action
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Add to Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoGallery
