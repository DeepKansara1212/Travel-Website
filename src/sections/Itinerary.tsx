"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, ChevronDown, ChevronUp, Clock, MapPin, Plus, Trash } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface Activity {
  id: string
  title: string
  time: string
  location: string
  icon: string
  description: string
}

interface Day {
  id: string
  dayNumber: number
  date: string
  activities: Activity[]
}

const initialDays: Day[] = [
  {
    id: "day1",
    dayNumber: 1,
    date: "June 15, 2025",
    activities: [
      {
        id: "activity1-1",
        title: "Arrive at Airport",
        time: "10:00 AM",
        location: "International Airport",
        icon: "✈️",
        description: "Arrival and transfer to hotel",
      },
      {
        id: "activity1-2",
        title: "Hotel Check-in",
        time: "12:00 PM",
        location: "Grand Hotel",
        icon: "🏨",
        description: "Check in and freshen up",
      },
      {
        id: "activity1-3",
        title: "Lunch at Local Restaurant",
        time: "2:00 PM",
        location: "Downtown Market",
        icon: "🍽️",
        description: "Try local specialties",
      },
    ],
  },
  {
    id: "day2",
    dayNumber: 2,
    date: "June 16, 2025",
    activities: [
      {
        id: "activity2-1",
        title: "Museum Visit",
        time: "9:00 AM",
        location: "National Museum",
        icon: "🏛️",
        description: "Guided tour of historical exhibits",
      },
      {
        id: "activity2-2",
        title: "Lunch Break",
        time: "12:30 PM",
        location: "Cafe Central",
        icon: "☕",
        description: "Light lunch and coffee",
      },
      {
        id: "activity2-3",
        title: "City Tour",
        time: "2:00 PM",
        location: "Old Town",
        icon: "🚶",
        description: "Walking tour of historic sites",
      },
    ],
  },
  {
    id: "day3",
    dayNumber: 3,
    date: "June 17, 2025",
    activities: [
      {
        id: "activity3-1",
        title: "Beach Day",
        time: "10:00 AM",
        location: "Paradise Beach",
        icon: "🏖️",
        description: "Relax and enjoy the sun",
      },
      {
        id: "activity3-2",
        title: "Seafood Dinner",
        time: "7:00 PM",
        location: "Ocean View Restaurant",
        icon: "🦞",
        description: "Fresh seafood dinner with sunset view",
      },
    ],
  },
]

const activityIcons = [
  "✈️",
  "🏨",
  "🍽️",
  "🏛️",
  "🚶",
  "🏖️",
  "🦞",
  "🚗",
  "⛩️",
  "🏞️",
  "🚂",
  "🎭",
  "🛒",
  "🚣",
  "🧗",
  "☕",
  "🥂",
  "🏰",
  "🎡",
  "🎪",
]

const Itinerary: React.FC = () => {
  const [days, setDays] = useState<Day[]>(initialDays)
  const [expandedDays, setExpandedDays] = useState<string[]>(["day1"])
  const [isAddingActivity, setIsAddingActivity] = useState<string | null>(null)
  const [newActivity, setNewActivity] = useState<Omit<Activity, "id">>({
    title: "",
    time: "",
    location: "",
    icon: "🚶",
    description: "",
  })
  const [isAddingDay, setIsAddingDay] = useState(false)
  const [newDay, setNewDay] = useState<Omit<Day, "id" | "activities">>({
    dayNumber: days.length + 1,
    date: "",
  })
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState<{ dayId: string; activityId: string } | null>(null)

  const toggleDayExpanded = (dayId: string) => {
    setExpandedDays((prev) => (prev.includes(dayId) ? prev.filter((id) => id !== dayId) : [...prev, dayId]))
  }

  const handleAddActivity = (dayId: string) => {
    if (!newActivity.title || !newActivity.time) return

    const activityId = `activity-${Date.now()}`

    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: [...day.activities, { id: activityId, ...newActivity }],
          }
        }
        return day
      }),
    )

    setNewActivity({
      title: "",
      time: "",
      location: "",
      icon: "🚶",
      description: "",
    })

    setIsAddingActivity(null)
  }

  const handleAddDay = () => {
    if (!newDay.date) return

    const dayId = `day-${Date.now()}`

    setDays([
      ...days,
      {
        id: dayId,
        ...newDay,
        activities: [],
      },
    ])

    setNewDay({
      dayNumber: days.length + 2,
      date: "",
    })

    setIsAddingDay(false)
    setExpandedDays([...expandedDays, dayId])
  }

  const handleDragStart = (dayId: string, activityId: string) => {
    setIsDragging(true)
    setDraggedItem({ dayId, activityId })
  }

  const handleDragOver = (e: React.DragEvent, targetDayId: string, targetIndex: number) => {
    e.preventDefault()

    if (!draggedItem || draggedItem.dayId === targetDayId) return

    // Find the dragged activity
    const sourceDayIndex = days.findIndex((day) => day.id === draggedItem.dayId)
    const sourceActivityIndex = days[sourceDayIndex].activities.findIndex(
      (activity) => activity.id === draggedItem.activityId,
    )
    const draggedActivity = days[sourceDayIndex].activities[sourceActivityIndex]

    // Create new array with activity moved
    setDays(
      days.map((day) => {
        // Remove from source day
        if (day.id === draggedItem.dayId) {
          return {
            ...day,
            activities: day.activities.filter((activity) => activity.id !== draggedItem.activityId),
          }
        }

        // Add to target day
        if (day.id === targetDayId) {
          const newActivities = [...day.activities]
          newActivities.splice(targetIndex, 0, draggedActivity)
          return {
            ...day,
            activities: newActivities,
          }
        }

        return day
      }),
    )

    setDraggedItem({ dayId: targetDayId, activityId: draggedItem.activityId })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedItem(null)
  }

  const handleDeleteActivity = (dayId: string, activityId: string) => {
    setDays(
      days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.filter((activity) => activity.id !== activityId),
          }
        }
        return day
      }),
    )
  }

  return (
    <section id="itinerary" className="section bg-gradient-to-b from-white to-gray-50">
      <SectionTitle
        title="Trip Itinerary Builder"
        description="Plan your perfect trip day by day. Create a detailed itinerary with activities, times, and locations."
        icon={Calendar}
      />

      <div className="max-w-4xl mx-auto">
        {/* Days List */}
        <div className="space-y-6 mb-8">
          {days.map((day) => (
            <div key={day.id} className="bg-white rounded-lg shadow-card overflow-hidden">
              {/* Day Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-primary-50 border-l-4 border-primary-500"
                onClick={() => toggleDayExpanded(day.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold mr-4">
                    {day.dayNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Day {day.dayNumber}</h3>
                    <p className="text-sm text-gray-500">{day.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{day.activities.length} activities</span>
                  <button className="text-gray-400">
                    {expandedDays.includes(day.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedDays.includes(day.id) && (
                <div className="p-4">
                  {/* Activities */}
                  <div className="space-y-3 mb-4" onDragOver={(e) => e.preventDefault()}>
                    {day.activities.map((activity, index) => (
                      <div
                        key={activity.id}
                        draggable
                        onDragStart={() => handleDragStart(day.id, activity.id)}
                        onDragOver={(e) => handleDragOver(e, day.id, index)}
                        onDragEnd={handleDragEnd}
                        className={`bg-gray-50 rounded-md p-3 border-l-4 border-primary-200 flex items-start cursor-move ${
                          isDragging && draggedItem?.activityId === activity.id ? "opacity-50" : ""
                        }`}
                      >
                        <div className="mr-3 text-2xl">{activity.icon}</div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">{activity.title}</h4>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDeleteActivity(day.id, activity.id)}
                                className="text-gray-400 hover:text-red-500"
                                aria-label="Delete activity"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                              {activity.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {activity.location}
                                </>
                              )}
                            </div>
                            {activity.description && <p className="mt-1 text-gray-600">{activity.description}</p>}
                          </div>
                        </div>
                      </div>
                    ))}

                    {day.activities.length === 0 && (
                      <div className="text-center py-6 text-gray-400">
                        <p>No activities planned for this day</p>
                      </div>
                    )}
                  </div>

                  {/* Add Activity Button/Form */}
                  {isAddingActivity === day.id ? (
                    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3">Add New Activity</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Activity Title*</label>
                          <input
                            type="text"
                            value={newActivity.title}
                            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g., Museum Visit"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Time*</label>
                          <input
                            type="text"
                            value={newActivity.time}
                            onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g., 10:00 AM"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Location</label>
                          <input
                            type="text"
                            value={newActivity.location}
                            onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g., City Museum"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Icon</label>
                          <select
                            value={newActivity.icon}
                            onChange={(e) => setNewActivity({ ...newActivity, icon: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            {activityIcons.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon} {icon === "✈️" ? "Flight" : icon === "🏨" ? "Hotel" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm text-gray-600 mb-1">Description</label>
                        <textarea
                          value={newActivity.description}
                          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Brief description of the activity"
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setIsAddingActivity(null)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddActivity(day.id)}
                          className="btn btn-primary"
                          disabled={!newActivity.title || !newActivity.time}
                        >
                          Add Activity
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingActivity(day.id)}
                      className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-primary-600 hover:border-primary-400 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Activity
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Day Button/Form */}
        {isAddingDay ? (
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h3 className="font-medium text-lg text-gray-800 mb-4">Add New Day</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Day Number</label>
                <input
                  type="number"
                  value={newDay.dayNumber}
                  onChange={(e) => setNewDay({ ...newDay, dayNumber: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="text"
                  value={newDay.date}
                  onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., June 18, 2025"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingDay(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={handleAddDay} className="btn btn-primary" disabled={!newDay.date}>
                Add Day
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingDay(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-400 flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Day
          </button>
        )}

        {/* Drag and Drop Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 mt-8 text-center text-gray-600 text-sm">
          <p>Tip: Drag and drop activities to rearrange them between days</p>
        </div>
      </div>
    </section>
  )
}

export default Itinerary
