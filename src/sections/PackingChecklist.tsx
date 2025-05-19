"use client"

import type React from "react"
import { useState } from "react"
import {
  CheckSquare,
  Shirt,
  Smartphone,
  Pill,
  PlusCircle,
  Check,
  Coffee,
  Umbrella,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import SectionTitle from "../components/SectionTitle"

// Define categories and their initial items
const initialCategories = [
  {
    id: "clothes",
    name: "Clothes",
    icon: Shirt,
    items: [
      { id: "c1", name: "T-shirts", checked: false },
      { id: "c2", name: "Pants/Shorts", checked: false },
      { id: "c3", name: "Underwear", checked: false },
      { id: "c4", name: "Socks", checked: false },
      { id: "c5", name: "Jacket/Sweater", checked: false },
      { id: "c6", name: "Swimwear", checked: false },
    ],
  },
  {
    id: "tech",
    name: "Technology",
    icon: Smartphone,
    items: [
      { id: "t1", name: "Phone Charger", checked: false },
      { id: "t2", name: "Camera", checked: false },
      { id: "t3", name: "Headphones", checked: false },
      { id: "t4", name: "Power Bank", checked: false },
      { id: "t5", name: "Adapters", checked: false },
    ],
  },
  {
    id: "toiletries",
    name: "Toiletries",
    icon: Coffee,
    items: [
      { id: "to1", name: "Toothbrush & Toothpaste", checked: false },
      { id: "to2", name: "Shampoo & Conditioner", checked: false },
      { id: "to3", name: "Deodorant", checked: false },
      { id: "to4", name: "Sunscreen", checked: false },
    ],
  },
  {
    id: "medicine",
    name: "Medicine",
    icon: Pill,
    items: [
      { id: "m1", name: "Pain Relievers", checked: false },
      { id: "m2", name: "Band-Aids", checked: false },
      { id: "m3", name: "Prescription Medication", checked: false },
      { id: "m4", name: "Motion Sickness Pills", checked: false },
    ],
  },
  {
    id: "misc",
    name: "Miscellaneous",
    icon: Umbrella,
    items: [
      { id: "mi1", name: "Passport/ID", checked: false },
      { id: "mi2", name: "Travel Insurance", checked: false },
      { id: "mi3", name: "Cash/Cards", checked: false },
      { id: "mi4", name: "Umbrella", checked: false },
    ],
  },
]

const PackingChecklist: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [newItemText, setNewItemText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("clothes")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories.map((cat) => cat.id))

  const handleToggleItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, checked: !item.checked }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemText.trim()) return

    setCategories(
      categories.map((category) => {
        if (category.id === selectedCategory) {
          return {
            ...category,
            items: [
              ...category.items,
              {
                id: `${category.id}-${Date.now()}`,
                name: newItemText,
                checked: false,
              },
            ],
          }
        }
        return category
      }),
    )

    setNewItemText("")
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Calculate progress
  const getTotalItems = () => categories.reduce((acc, category) => acc + category.items.length, 0)
  const getCheckedItems = () =>
    categories.reduce((acc, category) => acc + category.items.filter((item) => item.checked).length, 0)

  const progress = getTotalItems() > 0 ? Math.round((getCheckedItems() / getTotalItems()) * 100) : 0

  return (
    <section id="packing" className="section bg-gradient-to-b from-white to-gray-50 relative">
      <SectionTitle
        title="Packing Checklist"
        description="Never forget essential items for your trip. Customize your packing list to ensure you're fully prepared for your adventure."
        icon={CheckSquare}
      />

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Packing Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600 text-center">
          {getCheckedItems()} of {getTotalItems()} items packed
        </div>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add a custom item..."
            className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="sm:w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary flex items-center justify-center">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Item
          </button>
        </div>
      </form>

      {/* Checklist */}
      <div className="max-w-3xl mx-auto space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-card overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <category.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.items.filter((item) => item.checked).length} of {category.items.length} packed
                  </p>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                aria-label={expandedCategories.includes(category.id) ? "Collapse category" : "Expand category"}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {expandedCategories.includes(category.id) && (
              <div className="px-4 pb-4">
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <button
                        onClick={() => handleToggleItem(category.id, item.id)}
                        className={`w-5 h-5 mr-3 rounded flex items-center justify-center transition-colors duration-200 ${
                          item.checked
                            ? "bg-primary-500 text-white"
                            : "border border-gray-300 text-transparent hover:border-primary-400"
                        }`}
                        aria-label={item.checked ? `Uncheck ${item.name}` : `Check ${item.name}`}
                      >
                        {item.checked && <Check className="h-4 w-4" />}
                      </button>
                      <span className={`${item.checked ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PackingChecklist
