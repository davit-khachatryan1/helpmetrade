import { useState } from 'react'
import useAppStore from '../store/useAppStore'
import TimeframeTab from './TimeframeTab'
import EducationalTooltip from './EducationalTooltip'

const TokenAnalysis = ({ tokenSymbol, tokenData, timeframe }) => {
  const { theme } = useAppStore()
  const [activeTimeframe, setActiveTimeframe] = useState(timeframe || '1day')
  
  if (!tokenData) return null

  const timeframes = [
    { key: '15min_analysis', label: '15min', display: '15 Min' },
    { key: '1h_analysis', label: '1h', display: '1 Hour' },
    { key: '4h_analysis', label: '4h', display: '4 Hours' },
    { key: '1day_analysis', label: '1day', display: '1 Day' }
  ]

  const getActionColor = (action) => {
    switch (action?.toUpperCase()) {
      case 'BUY': return 'text-success bg-success/10 border-success/20'
      case 'SELL': return 'text-danger bg-danger/10 border-danger/20'
      case 'HOLD': return 'text-warning bg-warning/10 border-warning/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk?.toUpperCase()) {
      case 'LOW': return 'text-success'
      case 'MEDIUM': return 'text-warning'
      case 'HIGH': return 'text-danger'
      default: return 'text-gray-500'
    }
  }

  const getVolumeColor = (volume) => {
    switch (volume?.toUpperCase()) {
      case 'HIGH': return 'text-success'
      case 'MEDIUM': return 'text-warning'
      case 'LOW': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const activeAnalysis = tokenData[timeframes.find(tf => tf.label === activeTimeframe)?.key]

  return (
    <div className={`${theme === 'dark' ? 'bg-secondary' : 'bg-gray-50'} rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      {/* Token Header */}
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-primary' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-accent">{tokenSymbol}</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {tokenData.name || 'Cryptocurrency'}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-block px-3 py-1 rounded-lg border font-bold text-sm ${getActionColor(activeAnalysis?.action)}`}>
              {activeAnalysis?.action || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-6 px-6" aria-label="Timeframe tabs">
          {timeframes.map((tf) => (
            <button
              key={tf.label}
              onClick={() => setActiveTimeframe(tf.label)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTimeframe === tf.label
                  ? 'border-accent text-accent'
                  : `border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
              }`}
            >
              {tf.display}
            </button>
          ))}
        </nav>
      </div>

      {/* Analysis Content */}
      <div className="p-6">
        {activeAnalysis ? (
          <div className="space-y-6">
            {/* Trading Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'}`}>
                <EducationalTooltip 
                  term="Entry Price" 
                  explanation="The price at which you should buy this cryptocurrency. This is your starting point for the trade."
                >
                  <h4 className="font-semibold text-sm mb-2">Entry Price</h4>
                </EducationalTooltip>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeAnalysis.entry_price || 'N/A'}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'}`}>
                <EducationalTooltip 
                  term="Stop Loss" 
                  explanation="The price where you should sell to limit your losses. This protects your money if the price goes down."
                >
                  <h4 className="font-semibold text-sm mb-2">Stop Loss</h4>
                </EducationalTooltip>
                <p className="text-lg font-bold text-danger">
                  {activeAnalysis.stop_loss || 'N/A'}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'}`}>
                <EducationalTooltip 
                  term="Target Price" 
                  explanation="The price where you should sell to make a profit. This is your goal for the trade."
                >
                  <h4 className="font-semibold text-sm mb-2">Target Price</h4>
                </EducationalTooltip>
                <p className="text-lg font-bold text-success">
                  {activeAnalysis.target_price || 'N/A'}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'}`}>
                <EducationalTooltip 
                  term="Risk/Reward Ratio" 
                  explanation="The ratio between potential profit and potential loss. Higher ratios mean better potential returns relative to risk."
                >
                  <h4 className="font-semibold text-sm mb-2">Risk/Reward</h4>
                </EducationalTooltip>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeAnalysis.risk_reward_ratio || 'N/A'}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <EducationalTooltip 
                  term="Confidence Level" 
                  explanation="How sure the AI is about this prediction, from 1 (not sure) to 10 (very sure). Higher confidence means more reliable predictions."
                >
                  <div className="text-2xl font-bold">
                    <span className="text-accent">{activeAnalysis.confidence || 0}</span>
                    <span className="text-gray-500 text-lg">/10</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Confidence Level</p>
                </EducationalTooltip>
              </div>

              <div className="text-center">
                <EducationalTooltip 
                  term="Sentiment Score" 
                  explanation="How positive or negative the market sentiment is for this cryptocurrency. Higher percentages mean more positive sentiment."
                >
                  <div className={`text-2xl font-bold ${getRiskColor(activeAnalysis.risk_level)}`}>
                    {activeAnalysis.sentiment_score || 0}%
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Sentiment Score</p>
                </EducationalTooltip>
              </div>

              <div className="text-center">
                <EducationalTooltip 
                  term="Volume Impact" 
                  explanation="How much trading volume is expected to change. HIGH means lots of trading activity, LOW means quiet trading."
                >
                  <div className={`text-2xl font-bold ${getVolumeColor(activeAnalysis.volume_impact)}`}>
                    {activeAnalysis.volume_impact || 'N/A'}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Volume Impact</p>
                </EducationalTooltip>
              </div>
            </div>

            {/* Price Prediction */}
            <div>
              <h4 className="font-semibold mb-2">Price Prediction</h4>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {activeAnalysis.price_prediction || 'No prediction available'}
              </p>
            </div>

            {/* Key Factors */}
            <div>
              <h4 className="font-semibold mb-2">Key Factors</h4>
              <ul className="space-y-1">
                {activeAnalysis.key_factors?.map((factor, index) => (
                  <li key={index} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    • {factor}
                  </li>
                )) || <li className="text-sm text-gray-500">No key factors available</li>}
              </ul>
            </div>

            {/* Risk Assessment */}
            <div>
              <h4 className="font-semibold mb-2">Risk Assessment</h4>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(activeAnalysis.risk_level)} bg-current/10`}>
                {activeAnalysis.risk_level || 'Unknown'} Risk
              </span>
            </div>

            {/* Timeframe Reasoning */}
            {activeAnalysis.timeframe_reasoning && (
              <div>
                <h4 className="font-semibold mb-2">Analysis Reasoning</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeAnalysis.timeframe_reasoning}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No analysis available for this timeframe
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenAnalysis
