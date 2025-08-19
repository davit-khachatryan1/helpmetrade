import useAppStore from '../store/useAppStore'

const WelcomeMessage = () => {
  const { theme } = useAppStore()

  return (
    <div className={`${theme === 'dark' ? 'bg-primary text-gray-300' : 'bg-white text-gray-600'} rounded-lg shadow-lg p-8 text-center`}>
      <div className="space-y-6">
        <div className="text-6xl">🤖</div>
        <h3 className="text-2xl font-semibold text-accent">Welcome to Crypto Signal Analyzer</h3>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-lg">
            This tool helps you understand how cryptocurrency news affects trading by using AI to analyze news and provide trading signals.
          </p>
          
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-secondary border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h4 className="font-semibold mb-2 text-accent">How it works:</h4>
            <ol className="text-left space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-accent font-bold">1.</span>
                <span>Paste crypto news or a news URL above</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-bold">2.</span>
                <span>AI analyzes the news and identifies affected cryptocurrencies</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-bold">3.</span>
                <span>Get specific trading recommendations with entry prices, targets, and stop losses</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-bold">4.</span>
                <span>Review risk levels and confidence scores to make informed decisions</span>
              </li>
            </ol>
          </div>

          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-warning/10 border-warning/20' : 'bg-yellow-50 border-yellow-200'}`}>
            <h4 className="font-semibold mb-2 text-warning">⚠️ Important for Beginners:</h4>
            <ul className="text-left space-y-1 text-sm">
              <li>• This is for educational purposes only</li>
              <li>• Cryptocurrency trading is very risky</li>
              <li>• Never invest more than you can afford to lose</li>
              <li>• Always do your own research before trading</li>
              <li>• Consider consulting a financial advisor</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500">
            Click the "Beginner Guide" tab after getting analysis results to learn more about trading terms and strategies.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeMessage
