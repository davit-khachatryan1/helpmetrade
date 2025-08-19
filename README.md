# Crypto Signal Analyzer

An AI-powered web application that provides professional cryptocurrency trading signals and analysis across multiple timeframes using Google's Gemini AI technology.

## 🚀 Features

- **AI-Powered Analysis**: Leverages Google's Gemini AI for comprehensive crypto market analysis
- **Multi-Timeframe Signals**: Get trading signals for 15min, 1h, 4h, and 1-day timeframes  
- **Real-Time Crypto Prices**: Live BTC and ETH price tracking with 24h change indicators
- **URL & Text Input**: Analyze news articles via URL or direct text input
- **Mobile-First Design**: Fully responsive design optimized for all devices
- **Dark/Light Themes**: Toggle between dark and light UI themes
- **Copy & Share**: Easy sharing of analysis results
- **Settings Management**: Configurable API keys, themes, and preferences

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: Google Gemini AI API
- **Crypto Data**: CoinGecko API
- **Icons**: Heroicons

## 📱 Mobile Optimization

- Touch-friendly interface with 44px minimum touch targets
- Swipeable tabs for timeframe navigation
- Optimized for thumb navigation
- Fast loading with skeleton screens
- Responsive design across all screen sizes

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd helpmetrade
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Run the setup script (recommended)
   npm run setup
   
   # Or manually copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your API keys
   # Get your Gemini API key from: https://makersuite.google.com/app/apikey
   ```

4. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file as `VITE_GEMINI_API_KEY`

5. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to http://localhost:5173 (or the port shown in terminal)
   - Click the settings icon to configure your OpenAI API key

## 🎯 Usage

1. **Configure Settings**
   - Click the settings gear icon in the header
   - Verify your Gemini API key is loaded from environment variables
   - Choose your preferred theme and default settings

2. **Analyze News**
   - **Option A**: Paste a crypto news URL in the URL field
   - **Option B**: Copy and paste news text directly into the text area
   - Click "Analyze Signal" to get AI-powered trading insights

3. **Review Results**
   - Switch between timeframe tabs (15min, 1h, 4h, 1day)
   - Review recommended actions (BUY/SELL/HOLD)
   - Check confidence levels and risk assessments
   - Read key factors and price predictions

4. **Share Analysis**
   - Copy analysis to clipboard
   - Share results via native sharing (mobile)
   - Clear results to start a new analysis

## 📊 Analysis Framework

The AI advisor combines expertise from:
- Senior Cryptocurrency Trader (10+ years DeFi/CeFi experience)
- Senior Financial Analyst (traditional markets + crypto correlation)
- Senior Web3 Professional (protocol understanding, tokenomics)
- Senior Global Economist (macro trends, policy impact)

### Analysis Components
1. **News Impact Scoring** (1-10 scale)
2. **Market Sentiment Analysis** (1-100 percentage)
3. **Technical Confluence Check**
4. **Macro Environment Assessment**
5. **Risk-Reward Calculation**

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # App header with prices & settings
│   ├── InputForm.jsx    # News input form
│   ├── AnalysisResults.jsx  # Main results display
│   ├── TimeframeTab.jsx     # Individual timeframe analysis
│   ├── LoadingSpinner.jsx   # Loading animation
│   └── SettingsModal.jsx    # Settings configuration
├── services/            # API services
│   └── api.js          # Gemini AI & crypto price APIs
├── store/              # State management
│   └── useAppStore.js  # Zustand store configuration
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## 🎨 Color Palette

The app uses a carefully chosen 6-color palette:
- **Primary**: #1f2937 (Dark gray)
- **Secondary**: #374151 (Medium gray)
- **Accent**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Orange)
- **Success**: #10b981 (Green)

## ⚠️ Important Disclaimers

- **Educational Use Only**: This tool provides AI-generated analysis for educational purposes
- **Not Financial Advice**: Always do your own research before making trading decisions
- **Risk Warning**: Never invest more than you can afford to lose
- **API Costs**: Gemini API usage may incur costs based on your usage

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please ensure compliance with Google's Gemini AI usage policies and local financial regulations.

---

**Built with ❤️ for the crypto community**
