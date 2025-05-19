"use client"

import type React from "react"
import { useState } from "react"
import { Globe, Book, Copy, CheckCheck } from "lucide-react"
import SectionTitle from "../components/SectionTitle"

interface Phrase {
  id: string
  english: string
  translations: {
    [key: string]: string
  }
}

interface TravelType {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
]

const travelTypes: TravelType[] = [
  {
    id: "essential",
    name: "Essential Phrases",
    icon: "🗣️",
    description: "Must-know phrases for any traveler",
  },
  {
    id: "food",
    name: "Food & Dining",
    icon: "🍽️",
    description: "Restaurant and food-related phrases",
  },
  {
    id: "emergency",
    name: "Emergency",
    icon: "🚑",
    description: "Phrases for urgent situations",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    description: "Phrases for markets and stores",
  },
]

const essentialPhrases: Phrase[] = [
  {
    id: "hello",
    english: "Hello / Good day",
    translations: {
      es: "Hola / Buenos días",
      fr: "Bonjour",
      it: "Ciao / Buongiorno",
      de: "Hallo / Guten Tag",
      ja: "こんにちは (Konnichiwa)",
    },
  },
  {
    id: "goodbye",
    english: "Goodbye",
    translations: {
      es: "Adiós",
      fr: "Au revoir",
      it: "Arrivederci",
      de: "Auf Wiedersehen",
      ja: "さようなら (Sayonara)",
    },
  },
  {
    id: "please",
    english: "Please",
    translations: {
      es: "Por favor",
      fr: "S'il vous plaît",
      it: "Per favore",
      de: "Bitte",
      ja: "お願いします (Onegaishimasu)",
    },
  },
  {
    id: "thank_you",
    english: "Thank you",
    translations: {
      es: "Gracias",
      fr: "Merci",
      it: "Grazie",
      de: "Danke",
      ja: "ありがとう (Arigatou)",
    },
  },
  {
    id: "yes_no",
    english: "Yes / No",
    translations: {
      es: "Sí / No",
      fr: "Oui / Non",
      it: "Sì / No",
      de: "Ja / Nein",
      ja: "はい / いいえ (Hai / Iie)",
    },
  },
  {
    id: "excuse_me",
    english: "Excuse me",
    translations: {
      es: "Disculpe",
      fr: "Excusez-moi",
      it: "Mi scusi",
      de: "Entschuldigung",
      ja: "すみません (Sumimasen)",
    },
  },
  {
    id: "english",
    english: "Do you speak English?",
    translations: {
      es: "¿Habla inglés?",
      fr: "Parlez-vous anglais ?",
      it: "Parla inglese?",
      de: "Sprechen Sie Englisch?",
      ja: "英語を話せますか？ (Eigo o hanasemasu ka?)",
    },
  },
  {
    id: "understand",
    english: "I don't understand",
    translations: {
      es: "No entiendo",
      fr: "Je ne comprends pas",
      it: "Non capisco",
      de: "Ich verstehe nicht",
      ja: "分かりません (Wakarimasen)",
    },
  },
]

const foodPhrases: Phrase[] = [
  {
    id: "restaurant",
    english: "I would like to make a reservation",
    translations: {
      es: "Me gustaría hacer una reserva",
      fr: "Je voudrais faire une réservation",
      it: "Vorrei fare una prenotazione",
      de: "Ich möchte einen Tisch reservieren",
      ja: "予約をしたいです (Yoyaku o shitai desu)",
    },
  },
  {
    id: "menu",
    english: "Can I see the menu, please?",
    translations: {
      es: "¿Puedo ver el menú, por favor?",
      fr: "Puis-je voir le menu, s'il vous plaît ?",
      it: "Posso vedere il menu, per favore?",
      de: "Kann ich bitte die Speisekarte sehen?",
      ja: "メニューを見せていただけますか？ (Menyuu o misete itadakemasu ka?)",
    },
  },
  {
    id: "vegetarian",
    english: "I am vegetarian",
    translations: {
      es: "Soy vegetariano/a",
      fr: "Je suis végétarien(ne)",
      it: "Sono vegetariano/a",
      de: "Ich bin Vegetarier(in)",
      ja: "私はベジタリアンです (Watashi wa bejitarian desu)",
    },
  },
  {
    id: "allergy",
    english: "I am allergic to...",
    translations: {
      es: "Soy alérgico/a a...",
      fr: "Je suis allergique à...",
      it: "Sono allergico/a a...",
      de: "Ich bin allergisch gegen...",
      ja: "私は〜にアレルギーがあります (Watashi wa ... ni arerugii ga arimasu)",
    },
  },
  {
    id: "bill",
    english: "The bill, please",
    translations: {
      es: "La cuenta, por favor",
      fr: "L'addition, s'il vous plaît",
      it: "Il conto, per favore",
      de: "Die Rechnung, bitte",
      ja: "お会計をお願いします (Okaikei o onegaishimasu)",
    },
  },
]

const emergencyPhrases: Phrase[] = [
  {
    id: "help",
    english: "Help!",
    translations: {
      es: "¡Ayuda!",
      fr: "Au secours !",
      it: "Aiuto!",
      de: "Hilfe!",
      ja: "助けて！ (Tasukete!)",
    },
  },
  {
    id: "doctor",
    english: "I need a doctor",
    translations: {
      es: "Necesito un médico",
      fr: "J'ai besoin d'un médecin",
      it: "Ho bisogno di un medico",
      de: "Ich brauche einen Arzt",
      ja: "医者が必要です (Isha ga hitsuyou desu)",
    },
  },
  {
    id: "police",
    english: "Call the police",
    translations: {
      es: "Llame a la policía",
      fr: "Appelez la police",
      it: "Chiami la polizia",
      de: "Rufen Sie die Polizei",
      ja: "警察を呼んでください (Keisatsu o yonde kudasai)",
    },
  },
  {
    id: "lost",
    english: "I am lost",
    translations: {
      es: "Estoy perdido/a",
      fr: "Je suis perdu(e)",
      it: "Mi sono perso/a",
      de: "Ich habe mich verlaufen",
      ja: "道に迷いました (Michi ni mayoimashita)",
    },
  },
]

const shoppingPhrases: Phrase[] = [
  {
    id: "price",
    english: "How much is this?",
    translations: {
      es: "¿Cuánto cuesta esto?",
      fr: "Combien ça coûte ?",
      it: "Quanto costa questo?",
      de: "Wie viel kostet das?",
      ja: "これはいくらですか？ (Kore wa ikura desu ka?)",
    },
  },
  {
    id: "discount",
    english: "Is there a discount?",
    translations: {
      es: "¿Hay algún descuento?",
      fr: "Y a-t-il une réduction ?",
      it: "C'è uno sconto?",
      de: "Gibt es einen Rabatt?",
      ja: "割引はありますか？ (Waribiki wa arimasu ka?)",
    },
  },
  {
    id: "card",
    english: "Can I pay by credit card?",
    translations: {
      es: "¿Puedo pagar con tarjeta de crédito?",
      fr: "Puis-je payer par carte de crédit ?",
      it: "Posso pagare con carta di credito?",
      de: "Kann ich mit Kreditkarte bezahlen?",
      ja: "クレジットカードで支払えますか？ (Kurejitto kaado de haraemasuka?)",
    },
  },
  {
    id: "try_on",
    english: "Can I try this on?",
    translations: {
      es: "¿Puedo probarme esto?",
      fr: "Puis-je l'essayer ?",
      it: "Posso provarlo?",
      de: "Kann ich das anprobieren?",
      ja: "これを試着してもいいですか？ (Kore o shichaku shitemo ii desu ka?)",
    },
  },
]

const phrasesByType = {
  essential: essentialPhrases,
  food: foodPhrases,
  emergency: emergencyPhrases,
  shopping: shoppingPhrases,
}

const LanguageCheatSheet: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es")
  const [selectedType, setSelectedType] = useState("essential")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyPhrase = (phrase: Phrase) => {
    const textToCopy = `${phrase.english} - ${phrase.translations[selectedLanguage]}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(phrase.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const selectedPhrases = phrasesByType[selectedType as keyof typeof phrasesByType] || essentialPhrases

  return (
    <section className="section bg-gradient-to-b from-gray-50 to-white">
      <SectionTitle
        title="Language Cheat Sheet"
        description="Learn essential phrases in different languages to help you communicate during your travels."
        icon={Globe}
      />

      <div className="max-w-4xl mx-auto">
        {/* Language Selection */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2">
          <div className="flex space-x-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`flex items-center px-4 py-2 rounded-full transition ${
                  selectedLanguage === language.code
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Type Tabs */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {travelTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`py-4 px-4 text-center transition border-b-2 ${
                  selectedType === type.id
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-transparent hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className="text-xl mb-1">{type.icon}</div>
                <div className="font-medium">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Phrase Cards */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-center mb-6">
            {travelTypes.find((type) => type.id === selectedType)?.name || "Essential Phrases"} in{" "}
            {languages.find((lang) => lang.code === selectedLanguage)?.name || "Spanish"}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {selectedPhrases.map((phrase) => (
              <div key={phrase.id} className="bg-white rounded-lg shadow-card p-5 hover:shadow-card-hover transition">
                <div className="flex justify-between">
                  <div className="mb-2 font-medium text-gray-800">{phrase.english}</div>
                  <button
                    onClick={() => handleCopyPhrase(phrase)}
                    className="ml-2 text-gray-400 hover:text-primary-600 transition"
                    aria-label="Copy phrase"
                  >
                    {copiedId === phrase.id ? (
                      <CheckCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center text-primary-700">
                  <span className="mr-2">{languages.find((lang) => lang.code === selectedLanguage)?.flag}</span>
                  <span>{phrase.translations[selectedLanguage]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
          <div className="flex items-start">
            <Book className="h-6 w-6 text-primary-600 mr-3 mt-1" />
            <div>
              <h4 className="font-medium text-primary-800 mb-2">Language Learning Tips</h4>
              <ul className="text-primary-700 text-sm space-y-2">
                <li>• Practice pronunciation by listening to native speakers</li>
                <li>• Download an offline translation app before your trip</li>
                <li>• Learn basic greetings and polite phrases first</li>
                <li>• Use gestures and visual cues to aid communication</li>
                <li>• Most people appreciate your efforts to speak their language, even if imperfect</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LanguageCheatSheet
