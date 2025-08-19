import useAppStore from '../store/useAppStore'
import EducationalTooltip from './EducationalTooltip'

const TopRecommendations = ({ recommendations, tokenAnalysis }) => {
  const { theme } = useAppStore()
  
  if (!recommendations || recommendations.length === 0) return null

  const getActionColor = (action) => {
    switch (action?.toUpperCase()) {
      case 'BUY': return 'text-success bg-success/10 border-success/20'
      case 'SELL': return 'text-danger bg-danger/10 border-danger/20'
      case 'HOLD': return 'text-warning bg-warning/10 border-warning/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'text-success'
      case 2: return 'text-warning'
      case 3: return 'text-accent'
      default: return 'text-gray-500'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return '📊'
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-secondary' : 'bg-gray-50'} rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-primary' : 'border-gray-200 bg-white'}`}>
        <h3 className="text-xl font-bold text-accent">Top Trading Recommendations</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          AI-ranked recommendations based on news analysis
        </p>
      </div>

      {/* Recommendations List */}
      <div className="p-6 space-y-4">
        {recommendations
          .sort((a, b) => a.priority - b.priority)
          .map((rec, index) => {
            const tokenData = tokenAnalysis?.[rec.token]
            const analysis = tokenData?.[`${rec.timeframe}_analysis`]
            
            return (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPriorityIcon(rec.priority)}</span>
                    <div>
                      <h4 className="font-bold text-lg text-accent">{rec.token}</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {rec.timeframe} timeframe
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <EducationalTooltip 
                      term="Trading Action" 
                      explanation="The AI's recommendation: BUY (price will go up), SELL (price will go down), or HOLD (wait and see)."
                    >
                      <div className={`inline-block px-3 py-1 rounded-lg border font-bold text-sm ${getActionColor(rec.action)}`}>
                        {rec.action}
                      </div>
                    </EducationalTooltip>
                    <EducationalTooltip 
                      term="Priority Ranking" 
                      explanation="How important this recommendation is. #1 is the highest priority, #3 is lower priority."
                    >
                      <div className={`text-lg font-bold ${getPriorityColor(rec.priority)}`}>
                        #{rec.priority}
                      </div>
                    </EducationalTooltip>
                  </div>
                </div>

                {/* Trading Details */}
                {analysis && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Entry Price</p>
                      <p className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {analysis.entry_price || 'N/A'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="font-bold text-success">
                        {analysis.target_price || 'N/A'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Stop Loss</p>
                      <p className="font-bold text-danger">
                        {analysis.stop_loss || 'N/A'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Confidence and Risk */}
                {analysis && (
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Confidence</p>
                        <p className="font-bold text-accent">
                          {analysis.confidence || 0}/10
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Risk</p>
                        <p className={`font-bold ${
                          analysis.risk_level === 'LOW' ? 'text-success' :
                          analysis.risk_level === 'MEDIUM' ? 'text-warning' :
                          analysis.risk_level === 'HIGH' ? 'text-danger' : 'text-gray-500'
                        }`}>
                          {analysis.risk_level || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reasoning */}
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-semibold">Why: </span>
                    {rec.reason}
                  </p>
                </div>

                {/* Key Factors */}
                {analysis?.key_factors && analysis.key_factors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Key Factors:</p>
                    <ul className="space-y-1">
                      {analysis.key_factors.slice(0, 2).map((factor, idx) => (
                        <li key={idx} className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          • {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default TopRecommendations
