// Using Gemini 1.5 Flash (free tier model) for cost-effective analysis
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

// Common cryptocurrency IDs for CoinGecko API
const COMMON_TOKENS = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'BNB': 'binancecoin',
  'SOL': 'solana',
  'ADA': 'cardano',
  'XRP': 'ripple',
  'DOT': 'polkadot',
  'DOGE': 'dogecoin',
  'AVAX': 'avalanche-2',
  'MATIC': 'matic-network',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'ATOM': 'cosmos',
  'LTC': 'litecoin',
  'BCH': 'bitcoin-cash',
  'XLM': 'stellar',
  'VET': 'vechain',
  'FIL': 'filecoin',
  'TRX': 'tron',
  'ETC': 'ethereum-classic'
}

const ANALYSIS_PROMPT = `You are a crypto trading advisor. Analyze the news and provide detailed trading signals with specific token recommendations in JSON format ONLY (no markdown, no code blocks).

First, identify all specific cryptocurrencies/tokens mentioned in the news. For each token, provide detailed analysis.

Expected JSON format:
{
  "identified_tokens": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "current_price_estimate": "approximate current price",
      "mentioned_in_news": true/false
    }
  ],
  "token_analysis": {
    "BTC": {
      "15min_analysis": {
        "action": "BUY|SELL|HOLD",
        "confidence": 1-10,
        "entry_price": "specific price or range",
        "stop_loss": "specific price",
        "target_price": "specific price or range",
        "price_prediction": "percentage change expected",
        "key_factors": ["factor1", "factor2"],
        "risk_level": "LOW|MEDIUM|HIGH",
        "sentiment_score": 1-100,
        "volume_impact": "HIGH|MEDIUM|LOW",
        "timeframe_reasoning": "why this timeframe"
      },
      "1h_analysis": {same structure},
      "4h_analysis": {same structure},
      "1day_analysis": {same structure}
    }
  },
  "overall_market_analysis": {
    "15min_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
    "1h_analysis": {same structure},
    "4h_analysis": {same structure},
    "1day_analysis": {same structure}
  },
  "overall_summary": "Brief reasoning",
  "risk_warning": "Key risks",
  "top_recommendations": [
    {
      "token": "BTC",
      "timeframe": "1day",
      "action": "BUY",
      "reason": "why this is the top recommendation",
      "priority": 1
    }
  ]
}

Return ONLY the JSON object, no markdown formatting. Analyze this crypto news:`

export const analyzeNews = async (text, apiKey) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: ANALYSIS_PROMPT + '\n\n' + text
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
          topP: 0.8,
          topK: 40
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 429 || errorData.error?.code === 429) {
        throw new Error('API quota exceeded. Please check your Gemini API quota or try again later.')
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API')
    }
    
    const analysisText = data.candidates[0].content.parts[0].text
    
    try {
      // Clean the response text - remove markdown code blocks if present
      let cleanText = analysisText.trim()
      
      // Remove ```json and ``` markers if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '')
      }
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '')
      }
      if (cleanText.endsWith('```')) {
        cleanText = cleanText.replace(/\s*```$/, '')
      }
      
      const analysis = JSON.parse(cleanText)
      
      // Enhance analysis with real-time price data
      if (analysis.identified_tokens && Array.isArray(analysis.identified_tokens)) {
        for (const token of analysis.identified_tokens) {
          if (token.symbol) {
            try {
              const priceData = await fetchTokenPrice(token.symbol)
              if (priceData) {
                token.current_price = priceData.usd
                token.price_change_24h = priceData.usd_24h_change
                token.market_cap = priceData.usd_market_cap
                token.volume_24h = priceData.usd_24h_vol
                token.real_price_data = true
              }
            } catch (error) {
              console.warn(`Failed to fetch real price for ${token.symbol}:`, error)
            }
          }
        }
      }
      
      return analysis
    } catch (parseError) {
      console.error('Failed to parse JSON response:', analysisText)
      console.error('Parse error:', parseError)
      throw new Error('Invalid response format from AI')
    }
  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  }
}

export const fetchCryptoPrices = async () => {
  try {
    const COINGECKO_API_URL = import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3'
    
    // Fetch prices for common tokens
    const tokenIds = Object.values(COMMON_TOKENS).join(',')
    const response = await fetch(`${COINGECKO_API_URL}/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices')
    }
    
    const data = await response.json()
    
    // Transform data to include symbol mapping
    const transformedData = {}
    Object.entries(COMMON_TOKENS).forEach(([symbol, id]) => {
      if (data[id]) {
        transformedData[symbol] = {
          ...data[id],
          symbol: symbol,
          id: id
        }
      }
    })
    
    return transformedData
  } catch (error) {
    console.error('Price fetch error:', error)
    // Return fallback data for BTC and ETH
    return {
      BTC: { usd: 0, usd_24h_change: 0, symbol: 'BTC', id: 'bitcoin' },
      ETH: { usd: 0, usd_24h_change: 0, symbol: 'ETH', id: 'ethereum' }
    }
  }
}

export const fetchTokenPrice = async (symbol) => {
  try {
    const COINGECKO_API_URL = import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3'
    
    // Check if we have the token in our common tokens list
    const tokenId = COMMON_TOKENS[symbol.toUpperCase()]
    
    if (tokenId) {
      const response = await fetch(`${COINGECKO_API_URL}/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch price for ${symbol}`)
      }
      
      const data = await response.json()
      return {
        ...data[tokenId],
        symbol: symbol.toUpperCase(),
        id: tokenId
      }
    }
    
    // If not in common tokens, try to search for it
    const searchResponse = await fetch(`${COINGECKO_API_URL}/search?query=${symbol}`)
    if (searchResponse.ok) {
      const searchData = await searchResponse.json()
      if (searchData.coins && searchData.coins.length > 0) {
        const coin = searchData.coins[0]
        const priceResponse = await fetch(`${COINGECKO_API_URL}/simple/price?ids=${coin.id}&vs_currencies=usd&include_24hr_change=true`)
        
        if (priceResponse.ok) {
          const priceData = await priceResponse.json()
          return {
            ...priceData[coin.id],
            symbol: symbol.toUpperCase(),
            id: coin.id,
            name: coin.name
          }
        }
      }
    }
    
    throw new Error(`Token ${symbol} not found`)
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error)
    return null
  }
}

export const fetchUrlContent = async (url) => {
  try {
    const ALLORIGINS_API_URL = import.meta.env.VITE_ALLORIGINS_API_URL || 'https://api.allorigins.win'
    const response = await fetch(`${ALLORIGINS_API_URL}/get?url=${encodeURIComponent(url)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch URL content')
    }
    
    const data = await response.json()
    return data.contents
  } catch (error) {
    console.error('URL fetch error:', error)
    throw error
  }
}