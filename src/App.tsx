import Header from "./components/Header"
import Hero from "./sections/Hero"
import PackingChecklist from "./sections/PackingChecklist"
import DestinationExplorer from "./sections/DestinationExplorer"
import CurrencyConverter from "./sections/CurrencyConverter"
import TripCountdown from "./sections/TripCountdown"
import PhotoGallery from "./sections/PhotoGallery"
import BudgetTracker from "./sections/BudgetTracker"
import LanguageCheatSheet from "./sections/LanguageCheatSheet"
import Itinerary from "./sections/Itinerary"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main>
        <Hero />
        <PackingChecklist />
        <DestinationExplorer />
        <CurrencyConverter />
        <TripCountdown />
        <PhotoGallery />
        <BudgetTracker />
        <LanguageCheatSheet />
        <Itinerary />
      </main>
      <Footer />
    </div>
  )
}

export default App
