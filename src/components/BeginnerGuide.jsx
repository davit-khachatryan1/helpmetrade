import { useState } from 'react'
import useAppStore from '../store/useAppStore'

const BeginnerGuide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useAppStore()

  const tradingTerms = [
    {
      term: "BUY Signal",
      explanation: "This means the AI thinks the price will go up. It's like buying something now because you expect it to be worth more later.",
      example: "Like buying a stock at $10 when you think it will go to $15"
    },
    {
      term: "SELL Signal", 
      explanation: "The AI thinks the price will go down. It's time to sell what you have before it loses more value.",
      example: "Like selling a stock at $10 before it drops to $5"
    },
    {
      term: "HOLD Signal",
      explanation: "The AI suggests waiting and not making any changes right now. The market is uncertain.",
      example: "Like keeping your money in the bank during uncertain times"
    },
    {
      term: "Entry Price",
      explanation: "The price at which you should buy the cryptocurrency. This is your starting point.",
      example: "If BTC is $45,000, that's your entry price"
    },
    {
      term: "Target Price",
      explanation: "The price where you should sell to make a profit. This is your goal.",
      example: "If you buy at $45,000 and target $52,000, you could make $7,000 profit"
    },
    {
      term: "Stop Loss",
      explanation: "The price where you should sell to limit your losses. This protects your money.",
      example: "If you buy at $45,000 and set stop loss at $42,000, you limit loss to $3,000"
    },
    {
      term: "Confidence Level",
      explanation: "How sure the AI is about this prediction, from 1 (not sure) to 10 (very sure).",
      example: "8/10 means the AI is 80% confident in this prediction"
    },
    {
      term: "Risk Level",
      explanation: "How risky this trade is. LOW = safer, MEDIUM = moderate risk, HIGH = very risky.",
      example: "LOW risk is like a savings account, HIGH risk is like gambling"
    },
    {
      term: "Timeframes",
      explanation: "How long the AI thinks this prediction will take to happen.",
      example: "15 Min = very quick, 1 Day = within 24 hours, 4 Hours = within 4 hours"
    }
  ]

  const tradingSteps = [
    {
      step: 1,
      title: "Understand the News",
      description: "Read the news that was analyzed. This helps you understand why the AI made its prediction."
    },
    {
      step: 2,
      title: "Check the Signals",
      description: "Look at the BUY/SELL/HOLD signals and confidence levels. Higher confidence means more reliable predictions."
    },
    {
      step: 3,
      title: "Review the Details",
      description: "Check entry price, target price, and stop loss. These tell you exactly what to do."
    },
    {
      step: 4,
      title: "Assess the Risk",
      description: "Look at the risk level. Only invest what you can afford to lose, especially with HIGH risk trades."
    },
    {
      step: 5,
      title: "Make Your Decision",
      description: "Based on all the information, decide if you want to follow the AI's recommendation or not."
    }
  ]

  return (
    <div className={`${theme === 'dark' ? 'bg-secondary' : 'bg-gray-50'} rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-primary' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-accent">🚀 Beginner's Guide to Crypto Trading</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Learn how to understand and use these trading signals
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isOpen 
                ? 'bg-accent text-white' 
                : theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isOpen ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 space-y-8">
          {/* Quick Start Steps */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">📋 How to Use These Signals</h4>
            <div className="space-y-4">
              {tradingSteps.map((step) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    theme === 'dark' ? 'bg-accent' : 'bg-accent'
                  }`}>
                    {step.step}
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">{step.title}</h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Terms */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">📚 Important Terms Explained</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tradingTerms.map((term, index) => (
                <div key={index} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h5 className="font-semibold text-accent mb-2">{term.term}</h5>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {term.explanation}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold">Example:</span> {term.example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">⚠️ Safety Tips</h4>
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-warning/10 border-warning/20' : 'bg-yellow-50 border-yellow-200'}`}>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-warning">•</span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Never invest more than you can afford to lose.</strong> Crypto is very risky.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-warning">•</span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Start small.</strong> Begin with small amounts to learn how trading works.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-warning">•</span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Always use stop losses.</strong> This limits how much money you can lose.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-warning">•</span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Don't trust everything.</strong> AI predictions are helpful but not guaranteed.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-warning">•</span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Learn about the technology.</strong> Understanding what you're investing in helps.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-danger/10 border-danger/20' : 'bg-red-50 border-red-200'}`}>
            <h5 className="font-semibold text-danger mb-2">📢 Important Disclaimer</h5>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              This tool provides AI-generated trading signals for educational purposes only. 
              Cryptocurrency trading involves significant risk and you can lose money. 
              These predictions are not financial advice. Always do your own research and 
              consider consulting with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BeginnerGuide
