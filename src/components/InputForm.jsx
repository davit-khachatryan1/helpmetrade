import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import { analyzeNews, fetchUrlContent } from '../services/api'

const InputForm = () => {
  const { 
    inputText, 
    inputUrl, 
    setInputText, 
    setInputUrl, 
    clearInput,
    setCurrentAnalysis,
    setLoading,
    isLoading,
    apiKey,
    theme,
    addToHistory
  } = useAppStore()
  
  const [charCount, setCharCount] = useState(0)
  const [urlError, setUrlError] = useState('')
  const [error, setError] = useState('')

  const handleTextChange = (e) => {
    const text = e.target.value
    setInputText(text)
    setCharCount(text.length)
    setError('')
  }

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value)
    setUrlError('')
    setError('')
  }

  const validateUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleAnalyze = async () => {
    if (!apiKey.trim()) {
      setError('Please set your OpenAI API key in settings first')
      return
    }

    let contentToAnalyze = inputText.trim()
    
    if (inputUrl.trim()) {
      if (!validateUrl(inputUrl)) {
        setUrlError('Please enter a valid URL')
        return
      }
      
      setLoading(true)
      try {
        contentToAnalyze = await fetchUrlContent(inputUrl)
        if (!contentToAnalyze) {
          throw new Error('Failed to extract content from URL')
        }
      } catch (urlFetchError) {
        setUrlError('Failed to fetch content from URL')
        setLoading(false)
        return
      }
    }

    if (!contentToAnalyze) {
      setError('Please enter some text or provide a URL to analyze')
      return
    }

    if (contentToAnalyze.length < 50) {
      setError('Please provide more substantial content (at least 50 characters)')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const analysis = await analyzeNews(contentToAnalyze, apiKey)
      setCurrentAnalysis({
        ...analysis,
        timestamp: new Date().toISOString(),
        sourceText: contentToAnalyze.substring(0, 200) + '...',
        sourceUrl: inputUrl || null
      })
      addToHistory({
        ...analysis,
        timestamp: new Date().toISOString(),
        sourceText: contentToAnalyze.substring(0, 200) + '...',
        sourceUrl: inputUrl || null
      })
    } catch (analysisError) {
      setError(analysisError.message || 'Failed to analyze content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    clearInput()
    setCharCount(0)
    setUrlError('')
    setError('')
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-primary' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
      <div className="space-y-6">
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium mb-2">
            News URL (Optional)
          </label>
          <input
            id="url-input"
            type="url"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/crypto-news-article"
            className={`w-full px-4 py-3 rounded-lg border ${
              urlError ? 'border-danger' : 'border-gray-300'
            } focus:ring-2 focus:ring-accent focus:border-transparent ${
              theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-gray-900'
            } text-base`}
            disabled={isLoading}
          />
          {urlError && (
            <p className="text-danger text-sm mt-2">{urlError}</p>
          )}
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-500">OR</span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="text-input" className="block text-sm font-medium">
              Paste News Text
            </label>
            <span className={`text-sm ${charCount > 5000 ? 'text-danger' : 'text-gray-500'}`}>
              {charCount} / 5000
            </span>
          </div>
          <textarea
            id="text-input"
            value={inputText}
            onChange={handleTextChange}
            placeholder="Paste the crypto news article text here for analysis..."
            rows={8}
            maxLength={5000}
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent ${
              theme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-gray-900'
            } text-base resize-none`}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || (!inputText.trim() && !inputUrl.trim())}
            className={`flex-1 py-4 px-6 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Signal'}
          </button>
          
          <button
            onClick={handleClear}
            disabled={isLoading}
            className={`px-6 py-4 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors ${
              theme === 'dark' ? 'text-white hover:bg-secondary/50' : 'text-gray-700'
            }`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputForm