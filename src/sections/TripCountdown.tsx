"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, Calendar, Edit2, AlarmClock } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface DayPlan {
  day: number
  date: Date
  title: string
  notes: string
}

const TripCountdown: React.FC = () => {
  // Default trip date (2 weeks from now)
  const twoWeeksFromNow = new Date()
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)

  const [tripName, setTripName] = useState<string>("Summer Vacation")
  const [tripDate, setTripDate] = useState<Date>(twoWeeksFromNow)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Generate daily plans for 7 days of trip
  const createInitialDayPlans = (): DayPlan[] => {
    const plans: DayPlan[] = []
    const startDate = new Date(tripDate)

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startDate)
      dayDate.setDate(startDate.getDate() + i)

      plans.push({
        day: i + 1,
        date: dayDate,
        title: `Day ${i + 1}`,
        notes: "",
      })
    }

    return plans
  }

  const [dayPlans, setDayPlans] = useState<DayPlan[]>(createInitialDayPlans())

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +tripDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [tripDate])

  // Update day plans when trip date changes
  useEffect(() => {
    setDayPlans(createInitialDayPlans())
  }, [tripDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setTripDate(newDate)
  }

  const handleDayPlanNoteChange = (day: number, notes: string) => {
    setDayPlans(dayPlans.map((plan) => (plan.day === day ? { ...plan, notes } : plan)))
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  return (
    <section className="section bg-white">
      <SectionTitle
        title="Trip Countdown"
        description="Keep track of how many days until your adventure begins and plan daily activities for your journey."
        icon={AlarmClock}
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-b from-primary-500 to-primary-600 text-white rounded-lg shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-8 w-8 mr-3" />
              {isEditing ? (
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="text-2xl font-bold bg-white/20 border border-white/40 rounded px-2 py-1 text-white placeholder-white/60"
                  placeholder="Trip Name"
                />
              ) : (
                <h3 className="text-2xl font-bold">{tripName}</h3>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-2 p-1 rounded-full hover:bg-white/20"
                aria-label={isEditing ? "Save trip name" : "Edit trip name"}
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            {isEditing && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <input
                  type="date"
                  value={formatDate(tripDate)}
                  onChange={handleDateChange}
                  className="bg-white/20 border border-white/40 rounded px-2 py-1 text-white"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold mb-1">{timeLeft.days}</div>
              <div className="text-sm uppercase tracking-wide">Days</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold mb-1">{timeLeft.hours}</div>
              <div className="text-sm uppercase tracking-wide">Hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold mb-1">{timeLeft.minutes}</div>
              <div className="text-sm uppercase tracking-wide">Minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-4xl md:text-5xl font-bold mb-1">{timeLeft.seconds}</div>
              <div className="text-sm uppercase tracking-wide">Seconds</div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-white/90">
              Your adventure begins on{" "}
              {tripDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Itinerary Planner</h3>

          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {dayPlans.map((plan) => (
                <button
                  key={plan.day}
                  onClick={() => setSelectedDay(selectedDay === plan.day ? null : plan.day)}
                  className={`px-4 py-2 rounded-md flex flex-col items-center min-w-[90px] transition ${
                    selectedDay === plan.day
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <span className="font-bold">Day {plan.day}</span>
                  <span className="text-xs">
                    {plan.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">
                  Day {selectedDay} -{" "}
                  {dayPlans[selectedDay - 1].date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
              </div>
              <textarea
                value={dayPlans[selectedDay - 1].notes}
                onChange={(e) => handleDayPlanNoteChange(selectedDay, e.target.value)}
                placeholder="Add your plans for this day... (e.g., 🏨 Check-in, 🍽️ Dinner at local restaurant, 🏛️ Visit museum)"
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex justify-end mt-2">
                <button className="btn btn-primary">Save Plan</button>
              </div>
            </div>
          )}

          {!selectedDay && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Select a day to plan your activities</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TripCountdown
