import { useState } from 'react';
import { LayoutDashboard, FileText, CalendarPlus, Bell, User, Info, Menu, Clock, MapPin, Phone, Mail, AlertTriangle, CheckCircle, Circle, Flag, MessageSquare, Download, ChevronRight, Calendar, Building, FileCheck } from 'lucide-react';
import { Link } from "react-router-dom";

export default function ApplicationDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/userdashboard' },
    { id: 'applications', label: 'My Applications', icon: 'applications', path: '/myapplications' },
    { id: 'services', label: 'Book Service', icon: 'services', path: '/bookservice' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
    { id: 'portal', label: 'Transparency Portal', icon: 'portal', path: '/publicportal' },
  ];

  const navIcons = {
    dashboard: <LayoutDashboard size={18} />,
    applications: <FileText size={18} />,
    services: <CalendarPlus size={18} />,
    notifications: <Bell size={18} />,
    profile: <User size={18} />,
    portal: <Info size={18} />,
  };

  const application = {
    id: 'LTS-2025-00123',
    type: 'Property Ownership Transfer',
    status: 'in_review',
    submittedDate: '2025-11-23',
    lastUpdated: '2025-11-23',
    expectedCompletion: '2025-11-24',
    property: {
      district: 'Kathmandu',
      municipality: 'Kathmandu Metropolitan City',
      ward: '10',
      parcelNumber: '123/456',
      landType: 'Residential',
      area: '4 Anna',
    },
    seller: { name: 'Ram Bahadur Thapa', citizenship: '12-34-56789', phone: '9841234567' },
    buyer: { name: 'Sita Kumari Sharma', citizenship: '98-76-54321', phone: '9851234567' },
    documents: [
      { name: 'Lal Purja', status: 'verified' },
      { name: 'Citizenship (Seller)', status: 'verified' },
      { name: 'Citizenship (Buyer)', status: 'verified' },
      { name: 'Tax Receipt', status: 'verified' },
      { name: 'Photograph', status: 'verified' },
    ],
    payment: { amount: 'Rs. 30,500', status: 'paid', method: 'eSewa', transactionId: 'ESW-78945612' },
  };

  const officer = {
    name: 'Krishna Prasad Adhikari',
    designation: 'Land Registration Officer',
    office: 'Kathmandu District Land Revenue Office',
    employeeId: 'GOV-KTM-2045',
    phone: '01-4456789',
    email: 'kp.adhikari@malpot.gov.np',
    photo: null,
    casesHandled: 156,
    avgProcessingTime: '32 hours',
    rating: 4.5,
  };

  const timeline = [
    { date: '2025-11-23, 10:30 AM', title: 'Application Submitted', description: 'Your application has been received successfully.', status: 'completed' },
    { date: '2025-11-23, 02:15 PM', title: 'Payment Confirmed', description: 'Payment of Rs. 30,500 verified via eSewa.', status: 'completed' },
    { date: '2025-11-23, 09:00 AM', title: 'Document Verification', description: 'All uploaded documents have been verified.', status: 'completed' },
    { date: '2025-11-23, 11:30 AM', title: 'Assigned to Officer', description: `Application assigned to ${officer.name}.`, status: 'completed' },
    { date: '2025-11-23, 03:00 PM', title: 'Under Review', description: 'Officer is reviewing the property records.', status: 'current' },
    { date: 'Expected: 2025-11-24', title: 'Final Approval', description: 'Pending final approval and certificate generation.', status: 'pending' },
  ];

  const reportReasons = [
    'Unreasonable delay in processing',
    'Officer unresponsive / not available',
    'Requested unofficial payment (bribe)',
    'Rude or unprofessional behavior',
    'Incorrect information provided',
    'Other',
  ];

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    in_review: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    pending: 'Pending',
    in_review: 'In Review',
    approved: 'Approved',
    rejected: 'Rejected',
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
            <Link key={item.id}
            to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all ${item.id === 'applications' ? 'bg-blue-50 text-blue-900 font-medium border-l-4 border-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>
              {navIcons[item.icon]}
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
              <div className="flex items-center gap-3">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Application Details</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                  {statusLabels[application.status]}
                </span>
              </div>
              <p className="text-sm text-gray-500">{application.id}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            onClick={() => setShowReportModal(true)}>
            <Flag size={16} />
            Report Issue
          </button>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Application Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Application Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-900" />
                  Application Summary
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div><span className="text-xs text-gray-500">Service Type</span><p className="text-sm font-medium text-gray-900">{application.type}</p></div>
                    <div><span className="text-xs text-gray-500">Submitted Date</span><p className="text-sm font-medium text-gray-900">{application.submittedDate}</p></div>
                    <div><span className="text-xs text-gray-500">Last Updated</span><p className="text-sm font-medium text-gray-900">{application.lastUpdated}</p></div>
                  </div>
                  <div className="space-y-3">
                    <div><span className="text-xs text-gray-500">Expected Completion</span><p className="text-sm font-medium text-green-600">{application.expectedCompletion}</p></div>
                    <div><span className="text-xs text-gray-500">Payment Status</span><p className="text-sm font-medium text-green-600">✓ {application.payment.status} ({application.payment.amount})</p></div>
                    <div><span className="text-xs text-gray-500">Transaction ID</span><p className="text-sm font-medium text-gray-900">{application.payment.transactionId}</p></div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-900" />
                  Property Details
                </h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-xs text-gray-500">District</span><p className="font-medium">{application.property.district}</p></div>
                  <div><span className="text-xs text-gray-500">Municipality</span><p className="font-medium">{application.property.municipality}</p></div>
                  <div><span className="text-xs text-gray-500">Ward</span><p className="font-medium">{application.property.ward}</p></div>
                  <div><span className="text-xs text-gray-500">Parcel Number</span><p className="font-medium">{application.property.parcelNumber}</p></div>
                  <div><span className="text-xs text-gray-500">Land Type</span><p className="font-medium">{application.property.landType}</p></div>
                  <div><span className="text-xs text-gray-500">Area</span><p className="font-medium">{application.property.area}</p></div>
                </div>
              </div>

              {/* Seller & Buyer */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Seller</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{application.seller.name}</p>
                    <p className="text-gray-500">Citizenship: {application.seller.citizenship}</p>
                    <p className="text-gray-500">Phone: {application.seller.phone}</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Buyer</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{application.buyer.name}</p>
                    <p className="text-gray-500">Citizenship: {application.buyer.citizenship}</p>
                    <p className="text-gray-500">Phone: {application.buyer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck size={18} className="text-blue-900" />
                  Uploaded Documents
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {application.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <button className="text-blue-900 hover:underline text-xs font-medium">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-blue-900" />
                  Application Timeline
                </h2>
                <div className="space-y-4">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-500' : item.status === 'current' ? 'bg-blue-500 ring-4 ring-blue-100' : 'bg-gray-300'}`} />
                        {i < timeline.length - 1 && <div className={`w-0.5 flex-1 mt-1 ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`} />}
                      </div>
                      <div className="pb-4">
                        <p className="text-xs text-gray-500">{item.date}</p>
                        <p className={`text-sm font-medium ${item.status === 'current' ? 'text-blue-900' : item.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Officer Info */}
            <div className="space-y-6">
              {/* Assigned Officer Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Assigned Officer</h2>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User size={32} className="text-blue-900" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{officer.name}</h3>
                  <p className="text-sm text-gray-500">{officer.designation}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {officer.employeeId}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <Building size={16} className="text-gray-500" />
                    <span className="text-gray-700">{officer.office}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-gray-700">{officer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-gray-700 text-xs">{officer.email}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-900">{officer.casesHandled}</p>
                      <p className="text-xs text-gray-500">Cases Handled</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{officer.avgProcessingTime}</p>
                      <p className="text-xs text-gray-500">Avg. Time</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  <MessageSquare size={16} />
                  Contact Officer
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <span>Download Receipt</span>
                    <Download size={16} className="text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <span>Print Application</span>
                    <ChevronRight size={16} className="text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <span>Track Similar Cases</span>
                    <ChevronRight size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Report Issue Card */}
              <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Facing Issues?</h3>
                    <p className="text-xs text-red-700 mb-3">Report delays, misconduct, or any problems with your application processing.</p>
                    <button onClick={() => setShowReportModal(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      Report Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Report an Issue</h2>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for Report</label>
                <select value={reportReason} onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 outline-none">
                  <option value="">Select a reason</option>
                  {reportReasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Provide details about the issue..." rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 outline-none resize-none" />
              </div>
              <p className="text-xs text-gray-500">Your report will be sent to the District Land Revenue Office supervisor and logged for accountability.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Submit Report</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}