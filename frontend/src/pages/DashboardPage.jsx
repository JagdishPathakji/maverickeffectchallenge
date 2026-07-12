import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { ShieldCheck, AlertTriangle, ShieldAlert, BarChart3, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/users/dashboard-stats');
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

  const getChartData = () => {
    if (!stats) return [];
    return [
      { name: 'Safe', value: stats.safe },
      { name: 'Suspicious', value: stats.suspicious },
      { name: 'High Risk', value: stats.high_risk },
    ];
  };

  const getRiskIcon = (level) => {
    switch(level.toLowerCase()) {
      case 'safe': return <ShieldCheck className="text-green-500" />;
      case 'suspicious': return <AlertTriangle className="text-yellow-500" />;
      default: return <ShieldAlert className="text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card p-6 flex flex-col items-center justify-center text-center">
                <BarChart3 className="text-primary-500 h-8 w-8 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Scans</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="card p-6 flex flex-col items-center justify-center text-center bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
                <ShieldCheck className="text-green-500 h-8 w-8 mb-2" />
                <p className="text-sm text-green-700 dark:text-green-400">Safe</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-300">{stats.safe}</p>
              </div>
              <div className="card p-6 flex flex-col items-center justify-center text-center bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800">
                <AlertTriangle className="text-yellow-500 h-8 w-8 mb-2" />
                <p className="text-sm text-yellow-700 dark:text-yellow-400">Suspicious</p>
                <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-300">{stats.suspicious}</p>
              </div>
              <div className="card p-6 flex flex-col items-center justify-center text-center bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800">
                <ShieldAlert className="text-red-500 h-8 w-8 mb-2" />
                <p className="text-sm text-red-700 dark:text-red-400">High Risk</p>
                <p className="text-3xl font-bold text-red-900 dark:text-red-300">{stats.high_risk}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Quick Actions */}
              <div className="card p-6 lg:col-span-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scan Something</h2>
                <div className="space-y-3">
                  <Link to="/analyze/message" className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600">
                    Scan SMS/Message
                  </Link>
                  <Link to="/analyze/url" className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600">
                    Check Suspicious URL
                  </Link>
                  <Link to="/analyze/screenshot" className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600">
                    Upload Screenshot
                  </Link>
                  <Link to="/analyze/upi" className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600">
                    Verify UPI Request
                  </Link>
                  <Link to="/analyze/audio" className="block w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 font-medium border border-gray-200 dark:border-gray-600">
                    Scan Audio Recording
                  </Link>
                </div>
              </div>

              {/* Chart */}
              <div className="card p-6 lg:col-span-2 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Distribution</h2>
                <div className="flex-1 min-h-[300px]">
                  {stats.total > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No data to display yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                <Link to="/history" className="text-primary-600 hover:text-primary-700 text-sm font-medium">View All</Link>
              </div>
              {stats.recent && stats.recent.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {stats.recent.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {item.input_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="flex items-center space-x-2">
                              {getRiskIcon(item.risk_level)}
                              <span className="text-gray-700 dark:text-gray-300">{item.risk_level}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.scam_category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                  <Clock className="h-12 w-12 mb-3 opacity-20" />
                  <p>No recent activity. Start scanning to see history.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
