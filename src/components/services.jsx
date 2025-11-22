import { useState } from 'react';
import { LayoutDashboard, FileText, CalendarPlus, Bell, User, Menu, ArrowLeftRight, Users,Info, Receipt, MapPin, Check,FileCheck } from 'lucide-react';
import { Link } from "react-router-dom";

export default function BookService() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const navItems = [
   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard,path:'/userdashboard' },
    { id: 'applications', label: 'My Applications', icon: FileText,path:'/myapplications' },
    { id: 'services', label: 'Book Service', icon: CalendarPlus, path:'/bookservice' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portal', label: 'Transparency Portal', icon: Info, path: '/publicportal' },
  ];

  const services = [
    {
      id: 'transfer',
      title: 'Land Transfer (Kitta Kat)',
      description: 'For transferring property ownership from one person to another.',
      icon: ArrowLeftRight,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-900',
    },
    {
      id: 'mutation',
      title: 'Land Mutation (Naam Sari)',
      description: 'For updating owner details after inheritance, sale, or gift.',
      icon: Users,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      id: 'lalpurja',
      title: 'Lal Purja Copy Request',
      description: 'Request certified copies of land ownership documents or maps.',
      icon: FileCheck,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: 'tax',
      title: 'Land Tax Payment (Malpot Kar)',
      description: 'Pay land revenue taxes and get official tax clearance certificates.',
      icon: Receipt,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 'verification',
      title: 'Ownership Verification (Jagga Praman)',
      description: 'Verify land ownership records and transaction history.',
      icon: MapPin,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
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
              to={item.path}
              key={item.id}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${item.id === 'services' ? 'bg-blue-50 text-blue-900 font-medium border-l-4 border-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
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
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-orange-600" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">What service do you need today?</h1>
            <p className="text-gray-500">Please select a service from the options below to begin.</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative text-left p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  selectedService === service.id
                    ? 'border-blue-900 bg-blue-50/50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Checkmark */}
                {selectedService === service.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-10 h-10 ${service.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon size={20} className={service.iconColor} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button className="px-6 py-2.5 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Cancel
            </button>
            <Link to="/bookservice/landtransfer"
              disabled={!selectedService}
              className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedService
                  ? 'bg-blue-900 hover:bg-blue-800 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}