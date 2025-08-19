import { useEffect } from 'react'
import useAppStore from './store/useAppStore'
import Header from './components/Header'
import InputForm from './components/InputForm'
import AnalysisResults from './components/AnalysisResults'
import SettingsModal from './components/SettingsModal'

function App() {
  const { theme, setActiveTab, settings } = useAppStore()

  useEffect(() => {
    setActiveTab(settings.defaultTimeframe)
  }, [setActiveTab, settings.defaultTimeframe])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">AI-Powered Crypto Signal Analysis</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Get professional trading signals across multiple timeframes using advanced AI analysis
            </p>
          </div>
          
          <InputForm />
          <AnalysisResults />
        </div>
      </main>
      
      <SettingsModal />
      
      <footer className={`mt-16 py-8 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            ⚠️ This tool provides AI-generated analysis for educational purposes only. 
            Always do your own research and never invest more than you can afford to lose.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
