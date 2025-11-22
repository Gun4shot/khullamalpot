import { useState } from 'react';
import { LayoutDashboard, FileText, CalendarPlus, Bell, User, Info, Menu, Calendar, TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, Scale, MapPin, Building } from 'lucide-react';
import { Link } from "react-router-dom";

export default function PublicTransparencyPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('last30');
  const [activeTab, setActiveTab] = useState('applications');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/userdashboard' },
    { id: 'applications', label: 'My Applications', icon: FileText, path: '/myapplications' },
    { id: 'services', label: 'Book Service', icon: CalendarPlus, path: '/bookservice' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portal', label: 'Transparency Portal', icon: Info, path: '/publicportal' },
  ];

  const stats = [
    { label: 'Total Applications Processed', value: '1,245,678', change: '+2.5%', trend: 'up' },
    { label: 'Average Processing Time', value: '15 Days', change: '-0.5 Days', trend: 'up' },
    { label: 'Total Complaints Reported', value: '5,890', change: '+1.2%', trend: 'down' },
    { label: 'Total Complaints Resolved', value: '5,210', change: '+3.1%', trend: 'up' },
  ];

  const secondaryStats = [
    { label: 'Land Transfer Approvals', value: '89,432', change: '+4.2%', trend: 'up' },
    { label: 'Disputes Raised', value: '2,145', change: '-8.3%', trend: 'up' },
    { label: 'On-Time Processing Rate', value: '78.5%', change: '+2.1%', trend: 'up' },
    { label: 'Public Land Leases Issued', value: '1,234', change: '+5.6%', trend: 'up' },
  ];

  const districtData = [
    { name: 'Kathmandu', applications: 45230, avgTime: 12, complaints: 890 },
    { name: 'Lalitpur', applications: 28450, avgTime: 14, complaints: 456 },
    { name: 'Bhaktapur', applications: 18920, avgTime: 11, complaints: 234 },
    { name: 'Pokhara', applications: 22150, avgTime: 16, complaints: 567 },
    { name: 'Chitwan', applications: 19870, avgTime: 15, complaints: 345 },
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 95000, complaints: 450 },
    { month: 'Feb', applications: 102000, complaints: 480 },
    { month: 'Mar', applications: 98000, complaints: 510 },
    { month: 'Apr', applications: 115000, complaints: 490 },
    { month: 'May', applications: 108000, complaints: 520 },
    { month: 'Jun', applications: 125000, complaints: 480 },
  ];

  const valuationTrends = [
    { area: 'Kathmandu Core', rate: 'Rs. 45,00,000', change: '+12.5%' },
    { area: 'Lalitpur City', rate: 'Rs. 32,00,000', change: '+8.3%' },
    { area: 'Bhaktapur', rate: 'Rs. 18,50,000', change: '+6.2%' },
    { area: 'Pokhara Metro', rate: 'Rs. 22,00,000', change: '+15.1%' },
    { area: 'Chitwan (Bharatpur)', rate: 'Rs. 12,00,000', change: '+9.8%' },
  ];

  const recentLeases = [
    { id: 'PL-2024-0892', location: 'Kathmandu', lessee: 'Nepal Telecom', purpose: 'Tower Installation' },
    { id: 'PL-2024-0891', location: 'Pokhara', lessee: 'Tourism Board', purpose: 'Park Development' },
    { id: 'PL-2024-0890', location: 'Chitwan', lessee: 'Agriculture Ministry', purpose: 'Research Center' },
  ];

  const tabs = [
    { id: 'applications', label: 'Total Applications' },
    { id: 'processing', label: 'Avg. Processing Time' },
    { id: 'complaints', label: 'Complaints Resolved' },
  ];

  const maxApps = Math.max(...districtData.map(d => d.applications));

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-56 bg-white border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white text-xs">🏛</div>
            <div>
              <div className="text-sm font-semibold text-blue-900">Khulla Malpot</div>
              <div className="text-xs text-gray-500">Government of Nepal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              to={item.path}
              key={item.id}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${item.id === 'portal' ? 'bg-blue-50 text-blue-900 font-medium border-l-4 border-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Public Transparency Portal</h1>
              <p className="text-sm text-gray-500 hidden sm:block">An overview of land service digitization and transparency in Nepal.</p>
            </div>
          </div>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Primary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {secondaryStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* District Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="font-semibold text-gray-900">District-Wise Performance</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === tab.id ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {districtData.map((district, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24 flex-shrink-0">{district.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(district.applications / maxApps) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{(district.applications / 1000).toFixed(1)}k</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              {/* Application Trends */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Application & Complaint Trends</h2>
                <div className="flex items-end justify-between h-32 gap-2">
                  {monthlyTrends.map((month, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${(month.applications / 130000) * 100}%` }}>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                      <span className="text-xs text-gray-500">{month.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-100 rounded" /> Applications</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /> Complaints</div>
                </div>
              </div>

              {/* Top Districts Bar */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Top 5 Performing Districts</h2>
                <div className="flex items-end justify-between h-28 gap-3">
                  {districtData.map((district, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-900 rounded-t" style={{ height: `${(district.applications / maxApps) * 100}%` }} />
                      <span className="text-xs text-gray-500 mt-2 text-center truncate w-full">{district.name.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Market Valuation */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Building size={18} className="text-blue-900" />
                <h2 className="font-semibold text-gray-900">Market Valuation Trends (per Sq. Meter)</h2>
              </div>
              <div className="space-y-3">
                {valuationTrends.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{item.area}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-900">{item.rate}</span>
                      <span className="text-xs text-green-600">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Public Land Leases */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-blue-900" />
                <h2 className="font-semibold text-gray-900">Recent Public Land Leases</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Location</th>
                      <th className="pb-2 font-medium">Lessee</th>
                      <th className="pb-2 font-medium">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeases.map((lease, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 text-blue-900 font-medium">{lease.id}</td>
                        <td className="py-2 text-gray-600">{lease.location}</td>
                        <td className="py-2 text-gray-900">{lease.lessee}</td>
                        <td className="py-2 text-gray-500">{lease.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="text-blue-900 text-sm font-medium mt-4 hover:underline">View All Leases →</button>
            </div>
          </div>

          {/* Processing Efficiency */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={18} className="text-blue-900" />
              <h2 className="font-semibold text-gray-900">Processing Efficiency by Service Type</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { service: 'Land Transfer', onTime: 82, avg: '12 days' },
                { service: 'Naam Sari', onTime: 75, avg: '18 days' },
                { service: 'Lal Purja Copy', onTime: 91, avg: '5 days' },
                { service: 'Tax Clearance', onTime: 88, avg: '3 days' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">{item.service}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.onTime}%` }} />
                    </div>
                    <span className="text-xs text-gray-600">{item.onTime}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Avg: {item.avg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}