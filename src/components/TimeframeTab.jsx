import useAppStore from '../store/useAppStore'

const TimeframeTab = ({ timeframe, analysis }) => {
  const { theme } = useAppStore()
  
  if (!analysis) return null

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

  const getSentimentColor = (score) => {
    if (score >= 70) return 'text-success'
    if (score >= 40) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-primary' : 'bg-white'} rounded-lg p-6 space-y-6`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className={`inline-block px-4 py-2 rounded-lg border font-bold text-lg ${getActionColor(analysis.action)}`}>
            {analysis.action || 'N/A'}
          </div>
          <p className="text-sm text-gray-500 mt-2">Recommended Action</p>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold">
            <span className="text-accent">{analysis.confidence || 0}</span>
            <span className="text-gray-500 text-lg">/10</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Confidence Level</p>
        </div>

        <div className="text-center">
          <div className={`text-2xl font-bold ${getSentimentColor(analysis.sentiment_score)}`}>
            {analysis.sentiment_score || 0}%
          </div>
          <p className="text-sm text-gray-500 mt-2">Sentiment Score</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Price Prediction</h4>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {analysis.price_prediction || 'No prediction available'}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Key Factors</h4>
          <ul className="space-y-1">
            {analysis.key_factors?.map((factor, index) => (
              <li key={index} className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                • {factor}
              </li>
            )) || <li className="text-sm text-gray-500">No key factors available</li>}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Risk Assessment</h4>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.risk_level)} bg-current/10`}>
            {analysis.risk_level || 'Unknown'} Risk
          </span>
        </div>
      </div>
    </div>
  )
}

export default TimeframeTab