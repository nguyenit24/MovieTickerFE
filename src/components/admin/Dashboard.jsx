
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from './StatCard';


const Dashboard = () => {
  const lineData = [
    { date: '11/8', luot: 80, doanhthu: 60, nguoi: 70 },
    { date: '12/8', luot: 65, doanhthu: 85, nguoi: 75 },
    { date: '13/8', luot: 90, doanhthu: 70, nguoi: 80 },
    { date: '14/8', luot: 70, doanhthu: 95, nguoi: 85 },
    { date: '15/8', luot: 85, doanhthu: 75, nguoi: 90 },
    { date: '16/8', luot: 95, doanhthu: 85, nguoi: 95 },
    { date: '17/8', luot: 100, doanhthu: 90, nguoi: 100 }
  ];

  const pieData = [
    { name: 'Demon Slayer: Infinity Castle', value: 90, color: '#8B5CF6' },
    { name: 'Bluek', value: 25, color: '#F59E0B' },
    { name: 'Hai Phùng', value: 35, color: '#3B82F6' },
    { name: 'Mai', value: 40, color: '#EF4444' }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">DASHBOARD</h2>
        <div className="flex gap-4">
          <input type="date" className="border rounded px-4 py-2" defaultValue="2025-01-06" />
          <input type="date" className="border rounded px-4 py-2" defaultValue="2025-01-06" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Số vé đã bán" value="1800 vé" change="6.00% (30 ngày)" isPositive={true} />
        <StatCard title="Lượt truy cập" value="180 lượt truy cập" change="5.27% (30 ngày)" isPositive={false} />
        <StatCard title="Tổng doanh thu" value="20,000,000 VND" change="7.27% (30 ngày)" isPositive={true} />
        <StatCard title="Người dùng truy cập hiện tại" value="18 người dùng" change="" isPositive={true} />
      </div>

      <div className="bg-white p-6 rounded-lg border mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="luot" stroke="#8B5CF6" strokeWidth={2} fill="#8B5CF6" fillOpacity={0.3} />
            <Line type="monotone" dataKey="doanhthu" stroke="#3B82F6" strokeWidth={2} fill="#3B82F6" fillOpacity={0.3} />
            <Line type="monotone" dataKey="nguoi" stroke="#F59E0B" strokeWidth={2} fill="#F59E0B" fillOpacity={0.3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">Top 3 Phim có doanh thu cao nhất</h3>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.value} vé</p>
                </div>
                <p className="font-bold">20,000,000 VND</p>
              </div>
            ))}
          </div>
          <div className="w-80">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;