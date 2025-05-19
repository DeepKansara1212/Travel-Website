"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { RefreshCw, DollarSign, ArrowRight } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  rate: number // Relative to USD
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rate: 0.93 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", rate: 0.79 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", rate: 110.21 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rate: 1.47 },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$", flag: "🇨🇦", rate: 1.36 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", rate: 0.91 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", rate: 6.45 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rate: 84.26 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rate: 1.35 },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", rate: 1.6 },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", rate: 7.77 },
]

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100)
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = () => {
    const from = currencies.find((c) => c.code === fromCurrency)
    const to = currencies.find((c) => c.code === toCurrency)

    if (from && to) {
      // Convert to USD, then to target currency
      const valueInUSD = amount / from.rate
      const convertedValue = valueInUSD * to.rate
      setResult(convertedValue)
    }
  }

  const handleSwapCurrencies = () => {
    setIsFlipped(true)
    setTimeout(() => {
      const temp = fromCurrency
      setFromCurrency(toCurrency)
      setToCurrency(temp)
      setIsFlipped(false)
    }, 300)
  }

  const getSymbol = (code: string): string => {
    return currencies.find((c) => c.code === code)?.symbol || ""
  }

  const getFlag = (code: string): string => {
    return currencies.find((c) => c.code === code)?.flag || ""
  }

  const formatCurrency = (value: number, code: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <section id="tools" className="section bg-gradient-to-b from-gray-50 to-white">
      <SectionTitle
        title="Currency Converter"
        description="Convert between currencies for your travel budget planning. Get real-time exchange rates for major world currencies."
        icon={DollarSign}
      />

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-card p-6">
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
              className="block w-full pr-12 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">{getSymbol(fromCurrency)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <div className="relative">
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="block w-full py-3 pl-10 pr-10 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              >
                {currencies.map((currency) => (
                  <option key={`from-${currency.code}`} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span>{getFlag(fromCurrency)}</span>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="relative">
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="block w-full py-3 pl-10 pr-10 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
              >
                {currencies.map((currency) => (
                  <option key={`to-${currency.code}`} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span>{getFlag(toCurrency)}</span>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Swap Button (Overlay) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 sm:translate-y-4 z-10 hidden sm:block">
            <button
              onClick={handleSwapCurrencies}
              className={`bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 ${
                isFlipped ? "rotate-180" : ""
              }`}
              aria-label="Swap currencies"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Swap Button */}
        <div className="sm:hidden mb-6">
          <button onClick={handleSwapCurrencies} className="w-full flex items-center justify-center btn btn-primary">
            <RefreshCw className="mr-2 h-5 w-5" />
            Swap Currencies
          </button>
        </div>

        {/* Exchange Rate */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500">
            Exchange Rate: 1 {fromCurrency} ={" "}
            {(currencies.find((c) => c.code === toCurrency)?.rate || 0) /
              (currencies.find((c) => c.code === fromCurrency)?.rate || 1)}{" "}
            {toCurrency}
          </p>
        </div>

        {/* Result */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Converted Amount</p>
            <div className="flex justify-center items-center mb-2">
              <h3 className="text-3xl font-bold text-gray-900">
                {result !== null ? formatCurrency(result, toCurrency) : "—"}
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              {amount} {fromCurrency} = {result !== null ? result.toFixed(2) : "0"} {toCurrency}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverter
