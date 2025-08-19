import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // App State
  theme: 'dark',
  isLoading: false,
  
  // Analysis State
  inputText: '',
  inputUrl: '',
  currentAnalysis: null,
  analysisHistory: [],
  
  // Settings
  apiKey: '',
  settings: {
    notifications: true,
    defaultTimeframe: '1h',
    riskTolerance: 'medium'
  },
  
  // UI State
  activeTab: '15min',
  showSettings: false,
  
  // Actions
  setTheme: (theme) => set({ theme }),
  setLoading: (isLoading) => set({ isLoading }),
  
  setInputText: (text) => set({ inputText: text }),
  setInputUrl: (url) => set({ inputUrl: url }),
  
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  addToHistory: (analysis) => set((state) => ({ 
    analysisHistory: [analysis, ...state.analysisHistory].slice(0, 50) 
  })),
  
  setApiKey: (key) => set({ apiKey: key }),
  updateSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowSettings: (show) => set({ showSettings: show }),
  
  clearInput: () => set({ inputText: '', inputUrl: '' }),
  clearAnalysis: () => set({ currentAnalysis: null }),
}))

export default useAppStore