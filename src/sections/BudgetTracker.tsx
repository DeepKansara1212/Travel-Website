"use client"

import type React from "react"
import { useState } from "react"
import { DollarSign, PieChart, Plus, Trash } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const categories = [
  { id: "accommodation", name: "Accommodation", color: "#38bdf8" },
  { id: "food", name: "Food & Dining", color: "#f97316" },
  { id: "transportation", name: "Transportation", color: "#10b981" },
  { id: "activities", name: "Activities", color: "#8b5cf6" },
  { id: "shopping", name: "Shopping", color: "#ec4899" },
  { id: "other", name: "Other", color: "#6b7280" },
]

const initialBudget = 2000

const BudgetTracker: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(initialBudget)
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Hotel Booking",
      amount: 550,
      category: "accommodation",
      date: "2025-06-15",
    },
    {
      id: "2",
      description: "Flight Tickets",
      amount: 420,
      category: "transportation",
      date: "2025-06-14",
    },
    {
      id: "3",
      description: "Museum Tickets",
      amount: 85,
      category: "activities",
      date: "2025-06-17",
    },
  ])

  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    description: "",
    amount: 0,
    category: "accommodation",
    date: new Date().toISOString().split("T")[0],
  })

  const [editingBudget, setEditingBudget] = useState(false)
  const [tempBudget, setTempBudget] = useState(totalBudget.toString())

  // Calculate expense statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const remainingBudget = totalBudget - totalExpenses
  const spentPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0

  // Calculate expenses per category
  const expensesByCategory = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0)

    return {
      ...category,
      total,
      percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
    }
  })

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newExpense.description || newExpense.amount <= 0) return

    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString(),
    }

    setExpenses([...expenses, expense])

    // Reset form
    setNewExpense({
      description: "",
      amount: 0,
      category: "accommodation",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const handleUpdateBudget = () => {
    const budget = Number.parseFloat(tempBudget)
    if (!isNaN(budget) && budget > 0) {
      setTotalBudget(budget)
    }
    setEditingBudget(false)
  }

  const getCategoryName = (categoryId: string): string => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown"
  }

  const getCategoryColor = (categoryId: string): string => {
    return categories.find((c) => c.id === categoryId)?.color || "#6b7280"
  }

  return (
    <section id="budget" className="section bg-white">
      <SectionTitle
        title="Trip Budget Tracker"
        description="Plan and manage your travel expenses. Keep track of your spending to stay within budget."
        icon={DollarSign}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Budget Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6 bg-primary-500 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Budget Overview</h3>
                <button onClick={() => setEditingBudget(!editingBudget)} className="text-white/80 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>

              {editingBudget ? (
                <div className="flex mb-4">
                  <input
                    type="number"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/40 rounded-l focus:outline-none text-white placeholder-white/60"
                    placeholder="Enter budget amount"
                  />
                  <button
                    onClick={handleUpdateBudget}
                    className="bg-white text-primary-500 font-medium px-3 py-2 rounded-r"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <span className="text-white/80 text-sm">Total Budget</span>
                  <div className="text-3xl font-bold">${totalBudget.toLocaleString()}</div>
                </div>
              )}

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/80">Spent: ${totalExpenses.toLocaleString()}</span>
                  <span className="text-white/80">Remaining: ${remainingBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${spentPercentage > 90 ? "bg-red-500" : "bg-white"}`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-white/80 text-xs text-right">{spentPercentage.toFixed(0)}% of budget used</div>
            </div>

            <div className="p-6">
              <h4 className="font-medium text-gray-800 mb-4">Spending by Category</h4>

              {expensesByCategory
                .filter((cat) => cat.total > 0)
                .sort((a, b) => b.total - a.total)
                .map((category) => (
                  <div key={category.id} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">${category.total.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                    <div className="text-gray-500 text-xs text-right mt-0.5">
                      {category.percentage.toFixed(0)}% of expenses
                    </div>
                  </div>
                ))}

              {!expensesByCategory.some((cat) => cat.total > 0) && (
                <div className="text-center py-6 text-gray-500">
                  <PieChart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No expenses recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Expense Entry and List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Add New Expense</h3>

            <form onSubmit={handleAddExpense}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Hotel Booking"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={newExpense.amount || ""}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number.parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Expense
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-bold text-xl text-gray-800">Expense List</h3>
            </div>

            <div className="overflow-x-auto">
              {expenses.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{expense.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center">
                            <span
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: getCategoryColor(expense.category) }}
                            ></span>
                            {getCategoryName(expense.category)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right font-medium">
                          ${expense.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete expense"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No expenses recorded yet</p>
                  <p className="text-sm mt-1">Add your first expense using the form above</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BudgetTracker
