import React, { useState } from "react";

export default function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password.");
      return;
    }

    onLogin(username.trim(), password);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Top Wave - Animated */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none animate-waveSlideDown">
        <svg className="relative block w-full h-32 animate-wavePulse" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-green-400"></path>
        </svg>
      </div>

      {/* Bottom Wave - Animated */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 animate-waveSlideUp">
        <svg className="relative block w-full h-32 animate-wavePulse" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animationDelay: '1s' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-emerald-400"></path>
        </svg>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-particle1"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-particle2"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-particle3"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-300 rounded-full animate-particle4"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-emerald-300 rounded-full animate-particle5"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Left Side - Information */}
          <div className="w-full lg:w-1/2 animate-slideRight">
            {/* Logo */}
            <div className="mb-8 animate-fadeInScale">
              <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 animate-gradientText">
                ChurchLink
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-expandWidth"></div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-lg animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Connect with your faith community, stay updated on events, and grow spiritually together.
            </p>

            {/* Feature Icons */}
            <div className="space-y-5 max-w-lg">
              <div className="flex items-center space-x-4 animate-slideInLeft hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-soft">
                  <svg className="w-6 h-6 text-white animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Connect with Members</h3>
                  <p className="text-sm text-gray-600">Build lasting relationships</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-slideInLeft hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-6 h-6 text-white animate-bounce-subtle" style={{ animationDelay: '0.5s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Stay Updated</h3>
                  <p className="text-sm text-gray-600">Never miss an event</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-slideInLeft hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.6s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-soft" style={{ animationDelay: '1s' }}>
                  <svg className="w-6 h-6 text-white animate-bounce-subtle" style={{ animationDelay: '1s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Grow Spiritually</h3>
                  <p className="text-sm text-gray-600">Access resources & teachings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-5/12 bg-white rounded-3xl shadow-2xl p-8 lg:p-10 animate-slideUp hover:shadow-3xl transition-shadow duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 animate-fadeInScale">
              Sign In
            </h2>

            <div className="space-y-5">
              {/* Username Input */}
              <div className="relative group animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-green-500">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-green-400 transition-all duration-300 hover:border-gray-400 focus:shadow-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative group animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-green-500">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-green-400 transition-all duration-300 hover:border-gray-400 focus:shadow-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && username && password && handleSubmit()}
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <label className="flex items-center text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300">
                  <input type="checkbox" className="mr-2 w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400 transition-all duration-300" />
                  Remember me
                </label>
                <button className="text-green-600 hover:text-green-700 font-medium hover:underline transition-all duration-300">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fadeIn"
                style={{ animationDelay: '0.5s' }}
              >
                Sign In
              </button>

              {/* Register Link */}
              <div className="text-center text-gray-600 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                Don't have an account?{" "}
                <button
                  onClick={onSwitchToRegister}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-all duration-300"
                >
                  Register here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Church Elements */}
      <div className="absolute top-20 right-10 animate-floatSlow animate-spin-slow">
        <svg className="w-16 h-16 text-green-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <rect x="10" y="2" width="4" height="6" rx="1"/>
          <rect x="10" y="16" width="4" height="6" rx="1"/>
          <rect x="4" y="10" width="6" height="4" rx="1"/>
          <rect x="14" y="10" width="6" height="4" rx="1"/>
        </svg>
      </div>

      <div className="absolute bottom-40 left-10 animate-floatSlow animate-spin-slow" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20 text-emerald-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v6c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7L12 2z"/>
        </svg>
      </div>

      <div className="absolute top-1/2 right-20 animate-floatSlow" style={{ animationDelay: '2s' }}>
        <svg className="w-12 h-12 text-teal-300 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v6c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7L12 2z"/>
        </svg>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes waveSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes waveSlideUp {
          from { transform: translateY(100%) rotate(180deg); opacity: 0; }
          to { transform: translateY(0) rotate(180deg); opacity: 1; }
        }
        @keyframes wavePulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 8rem; }
        }
        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes particle1 {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(100px, -100px); opacity: 0; }
        }
        @keyframes particle2 {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-80px, 120px); opacity: 0; }
        }
        @keyframes particle3 {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(120px, 80px); opacity: 0; }
        }
        @keyframes particle4 {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-100px, -90px); opacity: 0; }
        }
        @keyframes particle5 {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(90px, -110px); opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slideRight {
          animation: slideRight 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-floatSlow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-waveSlideDown {
          animation: waveSlideDown 1s ease-out;
        }
        .animate-waveSlideUp {
          animation: waveSlideUp 1s ease-out;
        }
        .animate-wavePulse {
          animation: wavePulse 8s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
          animation-fill-mode: both;
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-expandWidth {
          animation: expandWidth 1s ease-out 0.3s;
          animation-fill-mode: both;
        }
        .animate-gradientText {
          background-size: 200% 200%;
          animation: gradientText 3s ease infinite;
        }
        .animate-pulse-soft {
          animation: pulseSoft 3s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }
        .animate-particle1 {
          animation: particle1 8s ease-in-out infinite;
        }
        .animate-particle2 {
          animation: particle2 10s ease-in-out infinite;
        }
        .animate-particle3 {
          animation: particle3 9s ease-in-out infinite;
        }
        .animate-particle4 {
          animation: particle4 11s ease-in-out infinite;
        }
        .animate-particle5 {
          animation: particle5 7s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}