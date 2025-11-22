import { useState } from 'react';
import { LayoutDashboard, FileText, CalendarPlus, Bell, User, LogOut, AlertCircle, Info, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path:'/userdashboard' },
    { id: 'applications', label: 'My Applications', icon: FileText,path:'/myapplications' },
    { id: 'services', label: 'Book Service', icon: CalendarPlus, path:'/bookservice' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portal', label: 'Transparency Portal', icon: Info, path:'/publicportal' },
  ];

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
            
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${item.id === 'dashboard' ? 'bg-blue-50 text-blue-900 font-medium border-l-3 border-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
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
            
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <Link to="/">
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md transition-colors">
              Logout
            </button>
            </Link>
            <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-red-600" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Namaste,Ram!</h1>
            <p className="text-gray-500">Welcome back to your digital land services portal. Manage your applications and services with ease.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* My Applications Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-900">
                  <FileText size={20} />
                </div>
                <span className="font-semibold text-gray-900">My Applications</span>
              </div>
              <div className="space-y-1 mb-4 text-sm text-gray-600">
                <p>Total: 5</p>
                <p>In Progress: 2</p>
                <p>Approved: 3</p>
              </div>
              <Link to="/myapplications">
              <button className="text-blue-900 text-sm font-medium hover:underline">View All</button>
              </Link>
            </div>

            {/* Book Service Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                  <CalendarPlus size={20} />
                </div>
                
                <span className="font-semibold text-gray-900">Book a New Service</span>
                
              </div>
              <p className="text-sm text-gray-600 mb-4">Start a new application for land registration, transfer, or other available services.</p>
              <Link to="/bookservice">
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                Start Now
              </button>
              </Link>
            </div>

            {/* Notifications Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <Bell size={20} />
                </div>
                <span className="font-semibold text-gray-900">Notifications</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You have <span className="text-red-600 font-medium">3 unread messages</span> regarding your applications and system updates.
              </p>
              <button className="text-blue-900 text-sm font-medium hover:underline">View All</button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Announcements */}
            <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Announcements & Quick Tips</h3>
              <div className="space-y-3">
                <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm mb-1">System Maintenance Schedule</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Our portal will be temporarily unavailable on May 25th from 2 AM to 4 AM for scheduled maintenance.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info size={16} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm mb-1">Tip: How to track your application status</p>
                    <p className="text-xs text-gray-500 leading-relaxed">You can check the real-time status of any application by navigating to the 'My Applications' section.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Have Feedback?</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">Help us improve the service by reporting issues or suggesting new features.</p>
              <button className="px-5 py-2.5 border-2 border-blue-900 text-blue-900 rounded-lg text-sm font-medium hover:bg-blue-900 hover:text-white transition-colors">
                Feedback / Report Issues
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}