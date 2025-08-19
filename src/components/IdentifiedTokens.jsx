import useAppStore from '../store/useAppStore'
import EducationalTooltip from './EducationalTooltip'
import { formatPrice, formatChange, formatMarketCap } from '../utils/formatters'

const IdentifiedTokens = ({ tokens }) => {
  const { theme } = useAppStore()
  
  if (!tokens || tokens.length === 0) return null

  return (
    <div className={`${theme === 'dark' ? 'bg-secondary' : 'bg-gray-50'} rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-primary' : 'border-gray-200 bg-white'}`}>
        <h3 className="text-xl font-bold text-accent">Identified Tokens</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Cryptocurrencies mentioned or affected by the news
        </p>
      </div>

      {/* Tokens Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-primary border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-accent">{token.symbol}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {token.name}
                  </p>
                </div>
                <EducationalTooltip 
                  term={token.mentioned_in_news ? 'Mentioned in News' : 'Affected by News'} 
                  explanation={token.mentioned_in_news 
                    ? 'This cryptocurrency was directly mentioned in the news article.' 
                    : 'This cryptocurrency was not mentioned but is likely to be affected by the news.'
                  }
                >
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    token.mentioned_in_news 
                      ? 'bg-success/10 text-success border border-success/20' 
                      : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                  }`}>
                    {token.mentioned_in_news ? 'Mentioned' : 'Affected'}
                  </div>
                </EducationalTooltip>
              </div>
              
              {token.real_price_data ? (
                <div className="space-y-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Current Price</p>
                    <p className={`font-bold text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formatPrice(token.current_price)}
                    </p>
                  </div>
                  
                  {token.price_change_24h !== undefined && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">24h Change</p>
                      <p className={`font-bold text-sm ${token.price_change_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                        {formatChange(token.price_change_24h)}
                      </p>
                    </div>
                  )}
                  
                  {token.market_cap && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                      <p className={`font-bold text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatMarketCap(token.market_cap)}
                      </p>
                    </div>
                  )}
                </div>
              ) : token.current_price_estimate ? (
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Estimated Price</p>
                  <p className={`font-bold text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {token.current_price_estimate}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IdentifiedTokens
