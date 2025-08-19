import { useState, useEffect } from 'react'
import useAppStore from '../store/useAppStore'

const SettingsModal = () => {
  const { 
    showSettings, 
    setShowSettings, 
    apiKey, 
    setApiKey, 
    theme, 
    setTheme,
    settings,
    updateSettings
  } = useAppStore()
  
  const [localApiKey, setLocalApiKey] = useState('')
  const [localSettings, setLocalSettings] = useState(settings)
  const [showApiKey, setShowApiKey] = useState(false)

  useEffect(() => {
    setLocalApiKey(apiKey)
    setLocalSettings(settings)
  }, [apiKey, settings, showSettings])

  const handleSave = () => {
    setApiKey(localApiKey)
    updateSettings(localSettings)
    setShowSettings(false)
  }

  const handleCancel = () => {
    setLocalApiKey(apiKey)
    setLocalSettings(settings)
    setShowSettings(false)
  }

  if (!showSettings) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className={`inline-block align-bottom ${theme === 'dark' ? 'bg-primary text-white' : 'bg-white text-gray-900'} rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}>
          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg leading-6 font-medium mb-6">
                Settings
              </h3>

              <div className="space-y-6">
                {/* API Key Section */}
                <div>
                  <label htmlFor="api-key" className="block text-sm font-medium mb-2">
                    Gemini API Key *
                  </label>
                  <div className="relative">
                    <input
                      id="api-key"
                      type={showApiKey ? 'text' : 'password'}
                      value={localApiKey}
                      onChange={(e) => setLocalApiKey(e.target.value)}
                      placeholder="AIza..."
                      className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                        theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-gray-900'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showApiKey ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L9.878 9.878m4.242 4.242L8.464 19.536m5.656-5.656l1.415-1.415m-1.415 1.415L14.12 14.12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Required for AI analysis. Get your key from{' '}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>

                {/* Theme Section */}
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`px-4 py-2 rounded-lg border ${
                        theme === 'light' 
                          ? 'bg-accent text-white border-accent' 
                          : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-secondary'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`px-4 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'bg-accent text-white border-accent' 
                          : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-secondary'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localSettings.notifications}
                      onChange={(e) => setLocalSettings({...localSettings, notifications: e.target.checked})}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <span className="ml-2 text-sm">Enable notifications</span>
                  </label>
                </div>

                {/* Default Timeframe */}
                <div>
                  <label htmlFor="default-timeframe" className="block text-sm font-medium mb-2">
                    Default Timeframe
                  </label>
                  <select
                    id="default-timeframe"
                    value={localSettings.defaultTimeframe}
                    onChange={(e) => setLocalSettings({...localSettings, defaultTimeframe: e.target.value})}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                      theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    <option value="15min">15 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="4h">4 Hours</option>
                    <option value="1day">1 Day</option>
                  </select>
                </div>

                {/* Risk Tolerance */}
                <div>
                  <label htmlFor="risk-tolerance" className="block text-sm font-medium mb-2">
                    Risk Tolerance
                  </label>
                  <select
                    id="risk-tolerance"
                    value={localSettings.riskTolerance}
                    onChange={(e) => setLocalSettings({...localSettings, riskTolerance: e.target.value})}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                      theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    <option value="low">Conservative</option>
                    <option value="medium">Moderate</option>
                    <option value="high">Aggressive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-accent text-base font-medium text-white hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`mt-3 w-full inline-flex justify-center rounded-lg border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:w-auto sm:text-sm ${
                theme === 'dark'
                  ? 'border-gray-600 text-gray-300 bg-secondary hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal