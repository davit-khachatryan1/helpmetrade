const LoadingSpinner = ({ message = "Analyzing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-accent animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-r-success animate-ping opacity-20"></div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-accent">{message}</p>
        <p className="text-sm text-gray-500 mt-1">This may take a few moments...</p>
      </div>
      
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
    </div>
  )
}

export default LoadingSpinner