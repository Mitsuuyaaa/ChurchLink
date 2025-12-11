import React, { useState } from "react";

export default function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a username and password.");
      return;
    }

    setLoading(true);
    const success = onRegister(username.trim(), password);
    if (success) {
      setUsername("");
      setPassword("");
      setConfirm("");
      setError("");
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-green-400"></path>
        </svg>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-emerald-400"></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Left Side - Registration Form */}
          <div className="w-full lg:w-5/12 bg-white rounded-3xl shadow-2xl p-8 lg:p-10 animate-slideUp">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Create Account!
            </h1>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex items-start animate-shake">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Username Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-green-400 transition-all duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-green-400 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl outline-none focus:border-green-400 transition-all duration-300"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && username && password && confirm && handleSubmit()}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 mr-2 w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400" 
                  required 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to <span className="text-green-600 font-medium">Terms of Service</span> and <span className="text-green-600 font-medium">Privacy Policy</span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign up"}
              </button>

              {/* Sign In Link */}
              <div className="text-center text-gray-600">
                Do you already have an account?{" "}
                <button
                  onClick={onSwitchToLogin}
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-full lg:w-7/12 flex justify-center items-center animate-fadeIn">
            <div className="relative w-full max-w-2xl">
              {/* Church Illustration */}
              <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-2xl">
                {/* Desk */}
                <ellipse cx="400" cy="520" rx="180" ry="30" fill="#2c3e50" opacity="0.3"/>
                <rect x="220" y="450" width="360" height="70" rx="10" fill="#34495e"/>
                <rect x="220" y="440" width="360" height="15" rx="5" fill="#4a5f7f"/>
                
                {/* Chair */}
                <rect x="340" y="480" width="120" height="15" rx="7" fill="#4a5f7f"/>
                <rect x="360" y="495" width="80" height="60" rx="10" fill="#5d7fa3"/>
                <rect x="360" y="495" width="80" height="15" fill="#4a5f7f"/>
                <rect x="340" y="520" width="15" height="40" rx="5" fill="#4a5f7f"/>
                <rect x="445" y="520" width="15" height="40" rx="5" fill="#4a5f7f"/>
                
                {/* Person */}
                <circle cx="400" cy="350" r="35" fill="#ffc896"/>
                <path d="M385 360 Q400 365 415 360" stroke="#333" strokeWidth="2" fill="none"/>
                <circle cx="390" cy="345" r="3" fill="#333"/>
                <circle cx="410" cy="345" r="3" fill="#333"/>
                <rect x="385" y="330" width="30" height="15" rx="7" fill="#4a5f7f"/>
                <path d="M365 385 L365 450 L380 450 L380 420 L420 420 L420 450 L435 450 L435 385 Z" fill="#10b981"/>
                <path d="M365 385 Q400 395 435 385" fill="#059669"/>
                <rect x="350" y="450" width="20" height="35" rx="5" fill="#ffc896"/>
                <rect x="430" y="450" width="20" height="35" rx="5" fill="#ffc896"/>
                
                {/* Laptop */}
                <rect x="320" y="420" width="160" height="10" rx="5" fill="#333"/>
                <rect x="325" y="360" width="150" height="60" rx="5" fill="#555"/>
                <rect x="332" y="367" width="136" height="46" rx="3" fill="#86efac"/>
                
                {/* Bible Book */}
                <rect x="500" y="430" width="70" height="50" rx="3" fill="#059669"/>
                <rect x="505" y="435" width="60" height="40" rx="2" fill="#10b981"/>
                <line x1="535" y1="435" x2="535" y2="475" stroke="#047857" strokeWidth="2"/>
                <path d="M520 445 L530 450 L520 455" fill="none" stroke="#fff" strokeWidth="1.5"/>
                
                {/* Coffee Cup */}
                <ellipse cx="260" cy="445" rx="20" ry="5" fill="#8b7355"/>
                <path d="M240 445 L240 420 Q240 410 250 410 L270 410 Q280 410 280 420 L280 445" fill="#d4a574" stroke="#8b7355" strokeWidth="2"/>
                <path d="M280 425 Q290 425 290 435 Q290 440 285 442" fill="none" stroke="#8b7355" strokeWidth="2"/>
                <path d="M250 415 Q255 405 260 415" stroke="#999" strokeWidth="1" fill="none" opacity="0.5"/>
                
                {/* Plant */}
                <ellipse cx="580" cy="480" rx="25" ry="8" fill="#34495e"/>
                <rect x="570" y="465" width="20" height="15" fill="#4a5f7f"/>
                <path d="M570 465 Q560 445 565 435 Q570 445 570 465" fill="#10b981"/>
                <path d="M590 465 Q600 445 595 435 Q590 445 590 465" fill="#059669"/>
                <path d="M580 465 Q580 440 580 430 Q580 440 580 465" fill="#34d399"/>
                
                {/* Cross on Wall */}
                <rect x="350" y="250" width="15" height="50" rx="3" fill="#10b981"/>
                <rect x="335" y="270" width="45" height="15" rx="3" fill="#10b981"/>
                
                {/* Light Rays from Above */}
                <path d="M400 200 L390 280" stroke="#fbbf24" strokeWidth="2" opacity="0.4"/>
                <path d="M400 200 L400 280" stroke="#fbbf24" strokeWidth="3" opacity="0.5"/>
                <path d="M400 200 L410 280" stroke="#fbbf24" strokeWidth="2" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Church Elements */}
      <div className="absolute top-20 right-10 animate-floatSlow">
        <svg className="w-16 h-16 text-green-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <rect x="10" y="2" width="4" height="6" rx="1"/>
          <rect x="10" y="16" width="4" height="6" rx="1"/>
          <rect x="4" y="10" width="6" height="4" rx="1"/>
          <rect x="14" y="10" width="6" height="4" rx="1"/>
        </svg>
      </div>

      <div className="absolute bottom-40 left-10 animate-floatSlow" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20 text-emerald-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v6c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7L12 2z"/>
        </svg>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        .animate-floatSlow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}