const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const ANALYSIS_PROMPT = `You are a crypto trading advisor. Analyze the news and provide trading signals in JSON format:

{
  "15min_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "1h_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "4h_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "1day_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "overall_summary": "Brief reasoning",
  "risk_warning": "Key risks"
}

Analyze this crypto news:`

export const analyzeNews = async (text, apiKey) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: ANALYSIS_PROMPT
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 429 || errorData.code === 'insufficient_quota') {
        throw new Error('API quota exceeded. Please check your OpenAI billing or try again later.')
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const analysisText = data.choices[0].message.content
    
    try {
      return JSON.parse(analysisText)
    } catch (parseError) {
      console.error('Failed to parse JSON response:', analysisText)
      throw new Error('Invalid response format from AI')
    }
  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  }
}

export const fetchCryptoPrices = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true')
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Price fetch error:', error)
    return {
      bitcoin: { usd: 0, usd_24h_change: 0 },
      ethereum: { usd: 0, usd_24h_change: 0 }
    }
  }
}

export const fetchUrlContent = async (url) => {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    
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