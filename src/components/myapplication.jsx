import { useState } from 'react';
import { LayoutDashboard, FileText, CalendarPlus, Bell, User, Search, Plus, ChevronLeft, ChevronRight, Menu,Info } from 'lucide-react';
import { Link } from "react-router-dom";

export default function MyApplications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard,path:'/userdashboard' },
    { id: 'applications', label: 'My Applications', icon: FileText,path:'/myapplications' },
    { id: 'services', label: 'Book Service', icon: CalendarPlus, path:'/bookservice' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portal', label: 'Transparency Portal', icon: Info, path: '/publicportal' },
  ];

  const applications = [
    { type: 'Property Ownership Transfer', id: 'LTS-2024-00123', date: '2024-07-15', status: 'approved' },
    { type: 'Land Parcel Registration', id: 'LTS-2024-00122', date: '2024-07-12', status: 'rejected' },
    { type: 'Ownership Certificate', id: 'LTS-2024-00121', date: '2024-07-10', status: 'review' },
    { type: 'Land Transfer', id: 'LTS-2024-00120', date: '2024-07-09', status: 'pending' },
    { type: 'Property Ownership Transfer', id: 'LTS-2024-00119', date: '2024-07-05', status: 'approved' },
  ];

  const statusStyles = {
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-600',
    review: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-orange-100 text-orange-600',
  };

  const statusLabels = {
    approved: 'Approved',
    rejected: 'Rejected',
    review: 'In Review',
    pending: 'Pending',
  };

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
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${item.id === 'applications' ? 'bg-blue-50 text-blue-900 font-medium border-l-4 border-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
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
        <header className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white text-xs">🏔</div>
              <span className="font-semibold text-gray-900">Nepal Land Services</span>
            </div>
           
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-orange-600" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <Link to="/bookservice">
            <button className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Plus size={18} />
              New Application
            </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg flex-1 min-w-0">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by servic..."
                  className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white cursor-pointer">
                <option>Status: All</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
                <option>In Review</option>
              </select>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white cursor-pointer">
                <option>Service Type: All</option>
                <option>Property Transfer</option>
                <option>Land Registration</option>
                <option>Ownership Certificate</option>
              </select>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white cursor-pointer">
                <option>Date: All</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Service Type</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Application ID</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Submission Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{app.type}</td>
                      <td className="px-6 py-4 text-sm text-blue-900 font-medium">{app.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-blue-900 font-medium hover:underline">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
                
             
            
          </div>
        </div>
      </main>
    </div>
  );
}