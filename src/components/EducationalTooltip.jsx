import { useState } from 'react'
import useAppStore from '../store/useAppStore'

const EducationalTooltip = ({ term, explanation, children, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const { theme } = useAppStore()

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help"
      >
        {children}
        <span className="ml-1 text-accent">ⓘ</span>
      </div>
      
      {showTooltip && (
        <div className={`absolute z-50 w-80 p-4 rounded-lg shadow-lg border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-300 text-gray-800'
        } -top-2 left-full ml-2`}>
          <div className="font-semibold text-accent mb-2">{term}</div>
          <p className="text-sm leading-relaxed">{explanation}</p>
          <div className={`absolute top-4 -left-2 w-2 h-2 transform rotate-45 ${
            theme === 'dark' ? 'bg-gray-800 border-l border-b border-gray-600' : 'bg-white border-l border-b border-gray-300'
          }`}></div>
        </div>
      )}
    </div>
  )
}

export default EducationalTooltip
