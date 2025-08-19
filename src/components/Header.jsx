import { useState, useEffect } from 'react'
import useAppStore from '../store/useAppStore'
import { fetchCryptoPrices } from '../services/api'

const Header = () => {
  const { theme, setShowSettings } = useAppStore()
  const [prices, setPrices] = useState({ bitcoin: { usd: 0, usd_24h_change: 0 }, ethereum: { usd: 0, usd_24h_change: 0 } })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const fetchPrices = async () => {
      const priceData = await fetchCryptoPrices()
      setPrices(priceData)
    }
    
    fetchPrices()
    const priceInterval = setInterval(fetchPrices, 60000)

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(priceInterval)
      clearInterval(timeInterval)
    }
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatChange = (change) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
  }

  return (
    <header className={`${theme === 'dark' ? 'bg-primary text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-accent">Crypto Signal Analyzer</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              {currentTime.toLocaleTimeString()}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-orange-500 font-semibold">BTC:</span>
                <span className="ml-1">{formatPrice(prices.bitcoin.usd)}</span>
                <span className={`ml-1 text-xs ${prices.bitcoin.usd_24h_change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatChange(prices.bitcoin.usd_24h_change)}
                </span>
              </div>
              
              <div className="text-sm">
                <span className="text-blue-500 font-semibold">ETH:</span>
                <span className="ml-1">{formatPrice(prices.ethereum.usd)}</span>
                <span className={`ml-1 text-xs ${prices.ethereum.usd_24h_change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatChange(prices.ethereum.usd_24h_change)}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header