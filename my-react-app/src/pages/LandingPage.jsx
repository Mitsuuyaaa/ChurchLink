import { useState } from "react";

// Mock AuthContext for demonstration - replace with your actual context
const useAuth = () => {
  return {
    user: null,
    login: (email, password) => console.log('Login:', email, password),
    register: (email, password) => console.log('Register:', email, password),
    logout: () => console.log('Logout')
  };
};

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, login, register } = useAuth();

  return (
    <div className="font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, 50px) rotate(10deg); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-slide-left {
          animation: slideInLeft 0.8s ease;
        }

        .animate-slide-left-delay {
          animation: slideInLeft 0.8s ease 0.2s backwards;
        }

        .animate-slide-left-delay-2 {
          animation: slideInLeft 0.8s ease 0.4s backwards;
        }

        .animate-slide-left-delay-3 {
          animation: slideInLeft 0.8s ease 0.6s backwards;
        }

        .animate-slide-right {
          animation: slideInRight 0.8s ease 0.4s backwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .floating-bg {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md px-[5%] py-5 flex justify-between items-center z-50 shadow-md hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 text-2xl font-bold text-[#2d5016]">
          <div className="w-11 h-11 bg-gradient-to-br from-[#6b9b37] to-[#8bc34a] rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-[#6b9b37]/30 hover:rotate-6 hover:scale-105 transition-transform duration-300">
            ⛪
          </div>
          <span>ChurchLink</span>
        </div>

        <ul className="flex gap-10 items-center">
          {['HOME', 'ABOUT', 'SERVICE', 'CONTACT'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 font-medium relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-[#6b9b37] after:transition-all after:duration-300 hover:text-[#6b9b37] hover:after:w-full"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-2.5 bg-transparent border-2 border-[#6b9b37] text-[#6b9b37] rounded-lg font-semibold hover:bg-[#6b9b37] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6b9b37]/30 transition-all duration-300"
          >
            Log In
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6b9b37] to-[#8bc34a] text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6b9b37]/40 transition-all duration-300 border-none"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Landing Page */}
      <div className="min-h-screen bg-gradient-to-br from-[#f0f8e8] via-[#e8f5e0] to-[#d4edc4] pt-24 relative overflow-hidden">
        {/* Floating Background Element */}
        <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(139,195,74,0.15)_0%,_transparent_70%)] rounded-full floating-bg pointer-events-none" />

        <div className="max-w-7xl mx-auto px-[5%] py-16 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-bold text-[#2d5016] mb-6 leading-tight animate-slide-left">
              ChurchLink - <span className="bg-gradient-to-r from-[#6b9b37] to-[#8bc34a] bg-clip-text text-transparent">Member Tracking System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-slide-left-delay">
              ChurchLink makes it easy for churches to organize, update, and manage member records in one secure and accessible platform.
            </p>
            <div className="flex gap-8 mb-8 animate-slide-left-delay-2">
              <div className="flex items-center gap-2 text-gray-600">
                <span>📞</span>
                <span>09195555588</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>👤</span>
                <span>Luigi Nafnes</span>
              </div>
            </div>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-10 py-4 bg-gradient-to-r from-[#6b9b37] to-[#8bc34a] text-white rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6b9b37]/40 transition-all duration-300 shadow-xl shadow-[#6b9b37]/30 animate-slide-left-delay-3"
            >
              GET STARTED
            </button>
          </div>

          {/* Right Content - Member Cards */}
          <div className="relative animate-slide-right">
            <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-2xl relative">
              {[
                { name: 'John Smith', status: 'Active Member' },
                { name: 'Mary Johnson', status: 'Active Member' },
                { name: 'David Lee', status: 'Active Member' },
                { name: 'Sarah Davis', status: 'Active Member' }
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#f8fdf5] to-white p-6 rounded-2xl border-2 border-[#e8f5e0] hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6b9b37]/20 hover:border-[#8bc34a] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#6b9b37] to-[#8bc34a] rounded-full flex items-center justify-center text-white text-3xl mb-4">
                    👤
                  </div>
                  <div className="text-[#2d5016] font-semibold">{member.name}</div>
                  <div className="text-gray-500 text-sm">{member.status}</div>
                </div>
              ))}
              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-gradient-to-br from-[#2d5016] to-[#6b9b37] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl shadow-[#2d5016]/40 animate-pulse">
                🔍
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-white p-8 rounded-2xl max-w-md w-[90%] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#2d5016]">Login</h2>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg text-base focus:border-[#6b9b37] focus:outline-none transition-colors"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 mb-6 border-2 border-gray-200 rounded-lg text-base focus:border-[#6b9b37] focus:outline-none transition-colors"
            />
            <button className="w-full px-4 py-4 bg-gradient-to-r from-[#6b9b37] to-[#8bc34a] text-white rounded-lg text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
              Login
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]"
          onClick={() => setShowRegisterModal(false)}
        >
          <div 
            className="bg-white p-8 rounded-2xl max-w-md w-[90%] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#2d5016]">Register</h2>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg text-base focus:border-[#6b9b37] focus:outline-none transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg text-base focus:border-[#6b9b37] focus:outline-none transition-colors"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 mb-6 border-2 border-gray-200 rounded-lg text-base focus:border-[#6b9b37] focus:outline-none transition-colors"
            />
            <button className="w-full px-4 py-4 bg-gradient-to-r from-[#6b9b37] to-[#8bc34a] text-white rounded-lg text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}