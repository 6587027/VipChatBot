import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center border border-white/20">
          
          {/* Header */}
          <div className="mb-8">
            <div className="mb-6">
              <div className="text-6xl mb-4 float-emoji">🤖</div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                VipChatBot
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-medium">
                Modern AI ChatBot by Vip
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Powered by React + TypeScript + Go + AI
              </p>
            </div>
          </div>
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-lg smooth-hover">
              <div className="text-2xl md:text-3xl mb-2">⚛️</div>
              <p className="text-blue-700 font-bold text-base md:text-lg">
                Frontend Ready
              </p>
              <p className="text-blue-600 text-xs md:text-sm mt-1">
                React + TypeScript + Vite
              </p>
            </div>
            
            <div className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-green-200 shadow-lg smooth-hover">
              <div className="text-2xl md:text-3xl mb-2">🚀</div>
              <p className="text-green-700 font-bold text-base md:text-lg">
                Backend Active
              </p>
              <p className="text-green-600 text-xs md:text-sm mt-1">
                Go + Gin on :8080
              </p>
            </div>
          </div>
          
          {/* Interactive Button */}
          <div className="mb-8">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
                       text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl text-base md:text-lg
                       hover:shadow-2xl hover:shadow-blue-500/25 
                       transform hover:-translate-y-2 hover:scale-105
                       transition-all duration-300 active:scale-95
                       border border-blue-500/20"
            >
              <span className="flex items-center justify-center gap-3">
                <span>🎯 Test Interaction</span>
                <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  {count} clicks
                </span>
              </span>
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-gray-200 shadow-sm smooth-hover">
              <div className="text-xl md:text-2xl mb-2">💬</div>
              <p className="text-xs font-medium text-gray-700">Real-time Chat</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-gray-200 shadow-sm smooth-hover">
              <div className="text-xl md:text-2xl mb-2">🧠</div>
              <p className="text-xs font-medium text-gray-700">AI Powered</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-gray-200 shadow-sm smooth-hover">
              <div className="text-xl md:text-2xl mb-2">📱</div>
              <p className="text-xs font-medium text-gray-700">Mobile Ready</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-gray-200 shadow-sm smooth-hover">
              <div className="text-xl md:text-2xl mb-2">🔒</div>
              <p className="text-xs font-medium text-gray-700">Secure</p>
            </div>
          </div>
          
          {/* Developer Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-base font-bold">
                  V
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">วิป (Phatra Wongsapsakul)</p>
                  <p className="text-xs md:text-sm text-gray-500">Mahidol University ICT</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-400">
              <p>Project Build By Vip</p>
              <p className="mt-1">
                Contact: <a 
                  href="https://vippersonalwebsite.vercel.app/contact" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  VipDevContact
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full pulse-particle"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white/40 rounded-full pulse-particle delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full pulse-particle delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white/20 rounded-full pulse-particle delay-500"></div>
      </div>
    </div>
  )
}

export default App
