// App.tsx
import React, { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import './styles/globals.css';

function App() {
  const [showChat, setShowChat] = useState(false);

  // If showChat is true, display MainLayout (Chat Interface)
  if (showChat) {
    return (
      <div className="h-screen bg-gray-50">
        {/* Back to Home Button - Zenith Style */}
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => setShowChat(false)}
            className="bg-white/95 backdrop-blur-sm text-zenith-navy-600 px-4 py-2 rounded-xl 
                     shadow-lg hover:shadow-xl transition-all duration-200 
                     hover:-translate-y-1 border border-zenith-navy-200 flex items-center gap-2
                     hover:bg-zenith-navy-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับหน้าหลัก
          </button>
        </div>
        
        {/* MainLayout (Chat Interface) */}
        <MainLayout />
      </div>
    )
  }

  // Zenith Comp Corporate Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-zenith-navy-900 via-zenith-navy-700 to-zenith-orange-600 relative overflow-hidden">
      {/* Background decorative elements - Corporate style */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-zenith-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-zenith-navy-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Zenith Pattern Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-zenith-orange-400/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-zenith-navy-400/20 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center border border-white/20">
          
          {/* Zenith Comp Header */}
          <div className="mb-8">
            <div className="mb-6">
              {/* Company Logo Area */}
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/assets/images/ZenithComp.png"
                  alt="Zenith Comp Logo"
                  className="object-contain transition-transform hover:scale-110"
                  style={{ width: '92px', height: '80px' }}
                />
              </div>

              {/* Company Name and Tagline */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-zenith-navy-600 to-zenith-orange-600 bg-clip-text text-transparent mb-2">
                Zenith Comp
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-zenith-navy-700 mb-4">
                AI Chat
              </h2>
              <p className="text-lg md:text-xl text-red-600 font-medium">
                AI Assistant Version DEMO (InDevelopment)
              </p>
            </div>
          </div>
          
          {/* Main Chat Button - Corporate Style */}
          <div className="mb-6">
            <button
              onClick={() => setShowChat(true)}
              className="w-full bg-gradient-to-r from-zenith-navy-500 to-zenith-orange-500 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-2xl text-lg md:text-xl
                       hover:shadow-2xl hover:shadow-zenith-navy-500/25 
                       transform hover:-translate-y-2 hover:scale-105
                       transition-all duration-300 active:scale-95
                       border border-zenith-navy-500/20"
            >
              <span className="flex items-center justify-center gap-3">
                <span>Welcome to AI Chat</span>
              </span>
            </button>
          </div>

          {/* Corporate Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-zenith-navy-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-xl md:text-2xl mb-2">🔧</div>
              <p className="text-xs font-medium text-zenith-navy-700">SYSTEM</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-zenith-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-xl md:text-2xl mb-2">🛡️</div>
              <p className="text-xs font-medium text-zenith-orange-700">SECURITY</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-zenith-navy-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-xl md:text-2xl mb-2">🌐</div>
              <p className="text-xs font-medium text-zenith-navy-700">NETWORK</p>
            </div>
            <div className="p-3 md:p-4 bg-white/60 rounded-xl border border-zenith-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-xl md:text-2xl mb-2">🏆</div>
              <p className="text-xs font-medium text-zenith-orange-700">SERVICES</p>
            </div>
          </div>
          
          {/* Corporate Company Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-zenith-navy-50 to-zenith-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-bold text-zenith-navy-700">Zenith Comp</h3>
              </div>
              <p className="text-xs text-zenith-navy-600 mb-1">
                Zenith Comp Co., Ltd. System Integration Company provides services across IT
              </p>
              <p className="text-xs text-zenith-orange-600 italic">
                "Your Success is Our Success."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-zenith-orange-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-zenith-navy-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-zenith-orange-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-zenith-navy-300/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
}

export default App;