// Using Gemini 1.5 Flash (free tier model) for cost-effective analysis
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

const ANALYSIS_PROMPT = `You are a crypto trading advisor. Analyze the news and provide trading signals in JSON format ONLY (no markdown, no code blocks):

{
  "15min_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "1h_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "4h_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "1day_analysis": {"action": "BUY|SELL|HOLD", "confidence": 1-10, "price_prediction": "range", "key_factors": ["factor1", "factor2"], "risk_level": "LOW|MEDIUM|HIGH", "sentiment_score": 1-100},
  "overall_summary": "Brief reasoning",
  "risk_warning": "Key risks"
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
          maxOutputTokens: 800,
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
      
      return JSON.parse(cleanText)
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