import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { authFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const [membersData, ministriesData, activitiesData, attendancesData] = await Promise.all([
        authFetch("/members", {}, token),
        authFetch("/ministries", {}, token),
        authFetch("/activities", {}, token),
        authFetch("/attendances", {}, token),
      ]);

      setMembers(membersData || []);
      setMinistries(ministriesData || []);
      setActivities(activitiesData || []);
      setAttendances(attendancesData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  const countMembersByMinistry = (ministryId) =>
    members.filter((m) => m.ministryId === ministryId).length;

  const chartData = ministries.map((min) => ({
    name: min.ministryName,
    members: countMembersByMinistry(min.ministryId),
  }));

  const now = new Date();
  const futureActivities = activities.filter((act) => new Date(act.date) > now);
  const recentActivities = activities
    .filter((act) => {
      const actDate = new Date(act.date);
      const daysDiff = (now - actDate) / (1000 * 60 * 60 * 24);
      return daysDiff >= 0 && daysDiff <= 30;
    })
    .slice(0, 5);
  const accomplishedActivities = activities
    .filter((act) => act.status === "completed" || act.accomplished === true)
    .slice(0, 5);

  const ministryColors = [
    { bg: "from-emerald-500 to-emerald-600", light: "bg-emerald-50", accent: "border-emerald-500" },
    { bg: "from-green-500 to-green-600", light: "bg-green-50", accent: "border-green-500" },
    { bg: "from-teal-500 to-teal-600", light: "bg-teal-50", accent: "border-teal-500" },
    { bg: "from-lime-500 to-lime-600", light: "bg-lime-50", accent: "border-lime-500" },
    { bg: "from-emerald-600 to-teal-600", light: "bg-emerald-50", accent: "border-emerald-600" },
    { bg: "from-green-600 to-emerald-600", light: "bg-green-50", accent: "border-green-600" },
    { bg: "from-teal-600 to-cyan-600", light: "bg-teal-50", accent: "border-teal-600" },
    { bg: "from-lime-600 to-green-600", light: "bg-lime-50", accent: "border-lime-600" },
    { bg: "from-emerald-400 to-emerald-500", light: "bg-emerald-50", accent: "border-emerald-400" },
    { bg: "from-green-400 to-green-500", light: "bg-green-50", accent: "border-green-400" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Church Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Ministry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ministries.slice(0, 5).map((min, index) => {
            const color = ministryColors[index % ministryColors.length];
            const memberCount = countMembersByMinistry(min.ministryId);
            const totalMembers = members.length;
            const percentage = totalMembers > 0 ? Math.round((memberCount / totalMembers) * 100) : 0;
            
            return (
              <div
                key={min.ministryId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`bg-gradient-to-br ${color.bg} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <span className="text-lg font-bold">{min.ministryName.charAt(0)}</span>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{min.ministryName}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm opacity-90">{memberCount} members</span>
                    <span className="text-xs opacity-75">{percentage}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000"
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Statistics & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 shadow-md text-white animate-slide-up" style={{animationDelay: '0ms'}}>
                <div className="text-3xl font-bold mb-1">{members.length}</div>
                <div className="text-sm opacity-90">Total Members</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 shadow-md text-white animate-slide-up" style={{animationDelay: '100ms'}}>
                <div className="text-3xl font-bold mb-1">{ministries.length}</div>
                <div className="text-sm opacity-90">Ministries</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-4 shadow-md text-white animate-slide-up" style={{animationDelay: '200ms'}}>
                <div className="text-3xl font-bold mb-1">{activities.length}</div>
                <div className="text-sm opacity-90">Activities</div>
              </div>
              <div className="bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl p-4 shadow-md text-white animate-slide-up" style={{animationDelay: '300ms'}}>
                <div className="text-3xl font-bold mb-1">{attendances.length}</div>
                <div className="text-sm opacity-90">Attendance</div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-md p-6 animate-fade-in-up border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Members Distribution
              </h2>
              {chartData.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="members" 
                      fill="url(#barGradient)" 
                      radius={[8, 8, 0, 0]}
                      animationDuration={1000}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Ministry List */}
            <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-800 mb-4">All Ministries</h2>
              <div className="space-y-3">
                {ministries.map((min, index) => {
                  const color = ministryColors[index % ministryColors.length];
                  return (
                    <div
                      key={min.ministryId}
                      className={`flex items-center justify-between p-4 ${color.light} rounded-xl hover:shadow-md transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${color.bg} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {min.ministryName.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{min.ministryName}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{countMembersByMinistry(min.ministryId)}</div>
                        <div className="text-xs text-gray-500">members</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Activities */}
          <div className="space-y-6">
            {/* Future Activities */}
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-md p-6 animate-slide-in-right border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Future Activities
              </h3>
              {futureActivities.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No upcoming activities</p>
              ) : (
                <div className="space-y-3">
                  {futureActivities.slice(0, 5).map((act, index) => (
                    <div key={act.activityId || index} className="bg-emerald-50 border-l-4 border-emerald-500 pl-3 py-3 hover:bg-emerald-100 rounded-r-lg transition-all duration-200 hover:shadow-md">
                      <p className="font-semibold text-gray-800 text-sm">{act.activityName || act.name}</p>
                      <p className="text-xs text-emerald-600 mt-1 font-medium">
                        {act.date ? new Date(act.date).toLocaleDateString() : 'Date TBD'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activities */}
            <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-md p-6 animate-slide-in-right border border-teal-100" style={{animationDelay: '100ms'}}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Recent Activities
              </h3>
              {recentActivities.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No recent activities</p>
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((act, index) => (
                    <div key={act.activityId || index} className="bg-teal-50 border-l-4 border-teal-500 pl-3 py-3 hover:bg-teal-100 rounded-r-lg transition-all duration-200 hover:shadow-md">
                      <p className="font-semibold text-gray-800 text-sm">{act.activityName || act.name}</p>
                      <p className="text-xs text-teal-600 mt-1 font-medium">
                        {act.date ? new Date(act.date).toLocaleDateString() : 'Date TBD'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accomplished Activities */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-md p-6 animate-slide-in-right border border-green-100" style={{animationDelay: '200ms'}}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-lime-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Accomplished
              </h3>
              {accomplishedActivities.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No accomplished activities</p>
              ) : (
                <div className="space-y-3">
                  {accomplishedActivities.map((act, index) => (
                    <div key={act.activityId || index} className="bg-green-50 border-l-4 border-green-500 pl-3 py-3 hover:bg-green-100 rounded-r-lg transition-all duration-200 hover:shadow-md">
                      <p className="font-semibold text-gray-800 text-sm">{act.activityName || act.name}</p>
                      <p className="text-xs text-green-600 mt-1 font-medium">
                        {act.date ? new Date(act.date).toLocaleDateString() : 'Date TBD'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}