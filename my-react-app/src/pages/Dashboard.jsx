import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

  // Calculate percentage with 1 decimal place
  const calculatePercentage = (memberCount, totalMembers) => {
    if (totalMembers === 0) return "0.0";
    return ((memberCount / totalMembers) * 100).toFixed(1);
  };

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

  const thisMonthActivities = activities.filter(act => {
    const actDate = new Date(act.date);
    return actDate.getMonth() === now.getMonth() && actDate.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-8 border-emerald-200 border-t-emerald-600 mb-4"></div>
            <div className="absolute inset-0 inline-block animate-ping rounded-full h-20 w-20 border-4 border-emerald-300 opacity-20"></div>
          </div>
          <p className="text-gray-700 text-xl font-semibold animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white border-l-4 border-red-500 p-8 rounded-2xl shadow-2xl max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Error Loading Data</h3>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
          <button 
            onClick={fetchDashboard}
            className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Church Dashboard</h1>
              <p className="text-emerald-100 text-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                  <span className="text-emerald-100 text-sm">Active Members</span>
                  <div className="text-2xl font-bold">{members.length}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                  <span className="text-emerald-100 text-sm">This Month</span>
                  <div className="text-2xl font-bold">{thisMonthActivities} Activities</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <MetricCard 
            title="Total Members" 
            value={members.length} 
            color="emerald" 
            delay="0ms"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
          />
          <MetricCard 
            title="Active Ministries" 
            value={ministries.length} 
            color="teal" 
            delay="100ms"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
          />
          <MetricCard 
            title="Total Activities" 
            value={activities.length} 
            color="cyan" 
            delay="200ms"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
          />
          <MetricCard 
            title="Attendance Records" 
            value={attendances.length} 
            color="green" 
            delay="300ms"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-emerald-100/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <IconBox color="from-emerald-500 to-teal-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </IconBox>
                  Members by Ministry
                </h2>
                <div className="text-sm text-gray-500 font-medium">{members.length} total</div>
              </div>
              {chartData.length === 0 ? (
                <EmptyState message="No ministry data available" />
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '13px', fontWeight: '500' }} tick={{ fill: '#6b7280' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '13px', fontWeight: '500' }} tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        padding: '12px 16px'
                      }}
                      cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                    />
                    <Bar dataKey="members" fill="url(#barGradient)" radius={[12, 12, 0, 0]} animationDuration={1200} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <IconBox color="from-teal-500 to-cyan-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </IconBox>
                All Ministries
              </h2>
              {ministries.length === 0 ? (
                <div className="text-center py-12"><p className="text-gray-500">No ministries found</p></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ministries.map((min) => {
                    const memberCount = countMembersByMinistry(min.ministryId);
                    const percentage = calculatePercentage(memberCount, members.length);
                    
                    return (
                      <div key={min.ministryId} className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200 cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {min.ministryName.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 text-base group-hover:text-emerald-700 transition-colors">
                                {min.ministryName}
                              </h3>
                              <p className="text-sm text-gray-600">{memberCount} members ({percentage}%)</p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-emerald-700">{memberCount}</div>
                        </div>
                        <div className="w-full bg-emerald-200/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000" 
                            style={{width: `${percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ActivitySection 
              title="Upcoming" 
              activities={futureActivities.slice(0, 5)} 
              color="emerald"
              iconPath={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
            />
            <ActivitySection 
              title="Recent" 
              activities={recentActivities} 
              color="teal"
              delay="100ms"
              iconPath={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
            />
            <ActivitySection 
              title="Accomplished" 
              activities={accomplishedActivities} 
              color="green"
              delay="200ms"
              iconPath={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

function MetricCard({ title, value, color, delay, icon }) {
  const colors = {
    emerald: 'from-emerald-500 to-emerald-600 text-emerald-100',
    teal: 'from-teal-500 to-teal-600 text-teal-100',
    cyan: 'from-cyan-500 to-cyan-600 text-cyan-100',
    green: 'from-green-500 to-green-600 text-green-100'
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-slide-up" style={{animationDelay: delay}}>
      <div className={`bg-gradient-to-br ${colors[color]} p-6 relative`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
          </div>
        </div>
        <div className="text-white relative z-10">
          <div className="text-4xl font-bold mb-1">{value}</div>
          <div className={`text-sm font-medium ${colors[color].split(' ')[1]}`}>{title}</div>
        </div>
      </div>
    </div>
  );
}

function IconBox({ children, color }) {
  return (
    <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{children}</svg>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

function ActivitySection({ title, activities, color, delay = "0ms", iconPath }) {
  const colors = {
    emerald: { bg: 'from-emerald-50 to-green-50', border: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700', hover: 'hover:border-emerald-600', gradient: 'from-emerald-500 to-green-500' },
    teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-500', badge: 'bg-teal-100 text-teal-700', text: 'text-teal-700', hover: 'hover:border-teal-600', gradient: 'from-teal-500 to-cyan-500' },
    green: { bg: 'from-green-50 to-lime-50', border: 'border-green-500', badge: 'bg-green-100 text-green-700', text: 'text-green-700', hover: 'hover:border-green-600', gradient: 'from-green-500 to-lime-500' }
  };
  const c = colors[color];
  
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100/50" style={{animationDelay: delay}}>
      <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
        <IconBox color={c.gradient}>{iconPath}</IconBox>
        {title}
        <span className={`ml-auto text-sm ${c.badge} px-3 py-1 rounded-full font-semibold`}>{activities.length}</span>
      </h3>
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{iconPath}</svg>
          </div>
          <p className="text-gray-400 text-sm">No {title.toLowerCase()} activities</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((act, index) => (
            <div key={act.activityId || index} className={`group bg-gradient-to-r ${c.bg} border-l-4 ${c.border} pl-4 pr-3 py-4 hover:shadow-lg rounded-r-xl transition-all duration-300 cursor-pointer ${c.hover}`}>
              <p className={`font-semibold text-gray-800 text-sm mb-2 group-hover:${c.text} transition-colors`}>
                {act.activityName || act.name}
              </p>
              <div className="flex items-center gap-2">
                <svg className={`w-4 h-4 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className={`text-xs ${c.text} font-medium`}>
                  {act.date ? new Date(act.date).toLocaleDateString() : 'Date TBD'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}