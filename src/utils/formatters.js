// Price formatting utilities
export const formatPrice = (price, currency = 'USD') => {
  if (!price || isNaN(price)) return 'N/A'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

export const formatChange = (change) => {
  if (change === undefined || change === null || isNaN(change)) return 'N/A'
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
}

export const formatMarketCap = (marketCap) => {
  if (!marketCap || isNaN(marketCap)) return 'N/A'
  
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`
  } else {
    return formatPrice(marketCap)
  }
}

export const formatVolume = (volume) => {
  if (!volume || isNaN(volume)) return 'N/A'
  
  if (volume >= 1e12) {
    return `$${(volume / 1e12).toFixed(2)}T`
  } else if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`
  } else if (volume >= 1e3) {
    return `$${(volume / 1e3).toFixed(2)}K`
  } else {
    return formatPrice(volume)
  }
}

export const formatPercentage = (value, decimals = 2) => {
  if (value === undefined || value === null || isNaN(value)) return 'N/A'
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}
