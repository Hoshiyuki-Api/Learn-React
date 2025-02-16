import "./App.css"
import NikChecker from "./components/NikChecker"

function App() {
  return (
    <div className="App bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <header className="App-header bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">NIK Checker App</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <NikChecker />
      </main>
    </div>
  )
}

export default App

