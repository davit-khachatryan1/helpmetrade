import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import TimeframeTab from './TimeframeTab'
import LoadingSpinner from './LoadingSpinner'

const AnalysisResults = () => {
  const { 
    currentAnalysis, 
    isLoading, 
    activeTab, 
    setActiveTab, 
    theme,
    clearAnalysis 
  } = useAppStore()

  const timeframes = [
    { key: '15min_analysis', label: '15min', display: '15 Min' },
    { key: '1h_analysis', label: '1h', display: '1 Hour' },
    { key: '4h_analysis', label: '4h', display: '4 Hours' },
    { key: '1day_analysis', label: '1day', display: '1 Day' }
  ]

  const copyToClipboard = async () => {
    if (!currentAnalysis) return
    
    const analysisText = `
Crypto Signal Analysis - ${new Date(currentAnalysis.timestamp).toLocaleDateString()}

${timeframes.map(tf => `
${tf.display} Analysis:
- Action: ${currentAnalysis[tf.key]?.action || 'N/A'}
- Confidence: ${currentAnalysis[tf.key]?.confidence || 'N/A'}/10
- Price Prediction: ${currentAnalysis[tf.key]?.price_prediction || 'N/A'}
- Risk Level: ${currentAnalysis[tf.key]?.risk_level || 'N/A'}
- Sentiment: ${currentAnalysis[tf.key]?.sentiment_score || 'N/A'}%
`).join('')}

Overall Summary: ${currentAnalysis.overall_summary || 'N/A'}
Risk Warning: ${currentAnalysis.risk_warning || 'N/A'}
    `.trim()

    try {
      await navigator.clipboard.writeText(analysisText)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const shareResults = async () => {
    if (!currentAnalysis || !navigator.share) {
      copyToClipboard()
      return
    }

    try {
      await navigator.share({
        title: 'Crypto Signal Analysis',
        text: `Analysis completed on ${new Date(currentAnalysis.timestamp).toLocaleDateString()}`,
        url: window.location.href
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyToClipboard()
      }
    }
  }

  if (isLoading) {
    return (
      <div className={`${theme === 'dark' ? 'bg-primary' : 'bg-white'} rounded-lg shadow-lg`}>
        <LoadingSpinner message="Analyzing crypto signals..." />
      </div>
    )
  }

  if (!currentAnalysis) {
    return (
      <div className={`${theme === 'dark' ? 'bg-primary text-gray-300' : 'bg-white text-gray-600'} rounded-lg shadow-lg p-12 text-center`}>
        <div className="space-y-4">
          <div className="text-6xl">📊</div>
          <h3 className="text-xl font-semibold">Ready to Analyze</h3>
          <p>Enter news text or URL above to get AI-powered trading signals across multiple timeframes.</p>
        </div>
      </div>
    )
  }

  const activeAnalysis = currentAnalysis[timeframes.find(tf => tf.label === activeTab)?.key]

  return (
    <div className={`${theme === 'dark' ? 'bg-secondary' : 'bg-gray-50'} rounded-lg shadow-lg overflow-hidden`}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Timeframe tabs">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.label}
              onClick={() => setActiveTab(timeframe.label)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === timeframe.label
                  ? 'border-accent text-accent'
                  : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
              }`}
            >
              {timeframe.display}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <TimeframeTab 
          timeframe={activeTab} 
          analysis={activeAnalysis} 
        />
      </div>

      {/* Summary Section */}
      {(currentAnalysis.overall_summary || currentAnalysis.risk_warning) && (
        <div className={`border-t px-6 py-4 space-y-4 ${theme === 'dark' ? 'border-gray-700 bg-primary' : 'border-gray-200 bg-white'}`}>
          {currentAnalysis.overall_summary && (
            <div>
              <h4 className="font-semibold mb-2">Overall Summary</h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {currentAnalysis.overall_summary}
              </p>
            </div>
          )}
          
          {currentAnalysis.risk_warning && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <h4 className="font-semibold text-warning mb-1">⚠️ Risk Warning</h4>
              <p className="text-sm text-warning/80">
                {currentAnalysis.risk_warning}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className={`border-t px-6 py-4 ${theme === 'dark' ? 'border-gray-700 bg-secondary' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy Analysis</span>
          </button>

          <button
            onClick={shareResults}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share Results</span>
          </button>

          <button
            onClick={clearAnalysis}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Timestamp */}
      {currentAnalysis.timestamp && (
        <div className={`px-6 py-2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          Analysis completed: {new Date(currentAnalysis.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  )
}

export default AnalysisResults