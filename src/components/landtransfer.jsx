import { useState } from 'react';
import { Check, Upload, X, FileText, AlertCircle, Info, ChevronRight, ChevronLeft, Clock, Users, HelpCircle, Image, File } from 'lucide-react';
import { Link } from "react-router-dom";

export default function LandTransferService() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    district: '', municipality: '', ward: '', parcelNumber: '', landType: '', area: '', areaUnit: 'ropani',
    sellerName: '', sellerCitizenship: '', sellerPhone: '', sellerAddress: '', isSelfTransfer: false,
    buyerName: '', buyerCitizenship: '', buyerPhone: '', buyerAddress: '',
    documents: { lalPurja: null, citizenship: null, taxReceipt: null, mortgageRelease: null, photograph: null }
  });
  

  const steps = [
    { id: 1, title: 'Property Details' },
    { id: 2, title: 'Seller & Buyer Details' },
    { id: 3, title: 'Document Upload' },
    { id: 4, title: 'Auto Verification' },
    { id: 5, title: 'Payment' },
    { id: 6, title: 'Submit' },
  ];

  const districts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Morang', 'Sunsari'];
  const landTypes = ['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed Use'];
  const areaUnits = ['Ropani', 'Anna', 'Paisa', 'Daam', 'Bigha', 'Kattha', 'Dhur', 'Square Meter', 'Square Feet'];

  const documents = [
    { id: 'lalPurja', name: 'Lal Purja (Scanned)', required: true, icon: FileText },
    { id: 'citizenship', name: 'Citizenship Copies (Seller & Buyer)', required: true, icon: FileText },
    { id: 'taxReceipt', name: 'Land Tax Receipt', required: true, icon: FileText },
    { id: 'mortgageRelease', name: 'Bank Mortgage Release', required: false, icon: File },
    { id: 'photograph', name: 'Photograph', required: true, icon: Image },
  ];

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = (docId, file) => {
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, documents: { ...prev.documents, [docId]: { name: file.name, size: file.size } } }));
    }
  };

  const removeFile = (docId) => {
    setFormData(prev => ({ ...prev, documents: { ...prev.documents, [docId]: null } }));
  };

  const nextStep = () => currentStep < 6 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Land Ownership Transfer (Kitta Kat)</h1>
          <p className="text-sm text-gray-500 mt-1">Complete the following steps to submit your application</p>
        </div>
      </header>

      {/* Transparency Stats Bar */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 md:px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-2 text-blue-900">
            <Clock size={16} />
            <span>Avg. processing time in your district: <strong>36 hours</strong></span>
          </div>
          <div className="flex items-center gap-2 text-blue-900">
            <Users size={16} />
            <span>Officer workload today: <strong>78 cases processed</strong></span>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep > step.id ? 'bg-green-500 text-white' :
                    currentStep === step.id ? 'bg-blue-900 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? <Check size={18} /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 text-center hidden md:block max-w-[80px] ${
                    currentStep >= step.id ? 'text-blue-900 font-medium' : 'text-gray-400'
                  }`}>{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 lg:w-24 h-1 mx-1 md:mx-2 rounded ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="px-4 md:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Property Details */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Details</h2>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select value={formData.district} onChange={(e) => updateForm('district', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none">
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Municipality <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.municipality} onChange={(e) => updateForm('municipality', e.target.value)}
                    placeholder="Enter municipality" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ward No. <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formData.ward} onChange={(e) => updateForm('ward', e.target.value)}
                    placeholder="Enter ward number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                    Parcel Number (खस्रा नम्बर) <span className="text-red-500">*</span>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                  </label>
                  <input type="text" value={formData.parcelNumber} onChange={(e) => updateForm('parcelNumber', e.target.value)}
                    placeholder="e.g., 123/456" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Land Type <span className="text-red-500">*</span></label>
                  <select value={formData.landType} onChange={(e) => updateForm('landType', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none">
                    <option value="">Select Land Type</option>
                    {landTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Area <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <input type="number" value={formData.area} onChange={(e) => updateForm('area', e.target.value)}
                      placeholder="Enter area" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                    <select value={formData.areaUnit} onChange={(e) => updateForm('areaUnit', e.target.value)}
                      className="w-28 px-2 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none">
                      {areaUnits.map(u => <option key={u} value={u.toLowerCase()}>{u}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              {formData.parcelNumber && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">Official Record Found</p>
                      <p className="text-green-700 mt-1">This parcel is currently registered to: <strong>Ram Bahadur Thapa</strong></p>
                      <p className="text-green-700">Last transfer dated: <strong>2078-05-11</strong></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Seller & Buyer Details */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Seller & Buyer Details</h2>

              {/* Seller Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">Seller Information</h3>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={formData.isSelfTransfer} onChange={(e) => updateForm('isSelfTransfer', e.target.checked)}
                      className="w-4 h-4 text-blue-900 rounded" />
                    I am the seller (self transfer)
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.sellerName} onChange={(e) => updateForm('sellerName', e.target.value)}
                      placeholder="Auto-loaded from records" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Citizenship Number <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.sellerCitizenship} onChange={(e) => updateForm('sellerCitizenship', e.target.value)}
                      placeholder="Enter citizenship number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" value={formData.sellerPhone} onChange={(e) => updateForm('sellerPhone', e.target.value)}
                      placeholder="98XXXXXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.sellerAddress} onChange={(e) => updateForm('sellerAddress', e.target.value)}
                      placeholder="Enter address" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>

              {/* Buyer Section */}
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Buyer Information</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.buyerName} onChange={(e) => updateForm('buyerName', e.target.value)}
                      placeholder="Enter buyer's full name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Citizenship Number <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.buyerCitizenship} onChange={(e) => updateForm('buyerCitizenship', e.target.value)}
                      placeholder="Enter citizenship number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" value={formData.buyerPhone} onChange={(e) => updateForm('buyerPhone', e.target.value)}
                      placeholder="98XXXXXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.buyerAddress} onChange={(e) => updateForm('buyerAddress', e.target.value)}
                      placeholder="Enter address" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Document Upload</h2>
              <p className="text-sm text-gray-500 mb-6">Upload clear scanned copies of the required documents (Max 5MB each)</p>

              <div className="space-y-4">
                {documents.map(doc => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.documents[doc.id] ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {formData.documents[doc.id] ? <Check size={18} className="text-green-600" /> : <doc.icon size={18} className="text-gray-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.required ? 'Required' : 'Conditional (if applicable)'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {formData.documents[doc.id] ? (
                          <>
                            <span className="text-xs text-green-600 font-medium">{formData.documents[doc.id].name}</span>
                            <button onClick={() => removeFile(doc.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <label className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileUpload(doc.id, e.target.files[0])} />
                            Upload
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

             
            </div>
          )}

          {/* Step 4: Auto Verification */}
          {currentStep === 4 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Auto Verification</h2>
              <div className="space-y-4">
                {['Property ownership verified', 'Seller identity confirmed', 'Buyer identity confirmed', 'Document authenticity checked', 'No pending disputes found', 'Tax clearance verified'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-green-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 5 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Registration Fee</span><span className="font-medium">Rs. 5,000</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Service Charge</span><span className="font-medium">Rs. 500</span></div>
                <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Stamp Duty (1%)</span><span className="font-medium">Rs. 25,000</span></div>
                <div className="flex justify-between py-3 text-lg"><span className="font-semibold">Total</span><span className="font-bold text-blue-900">Rs. 30,500</span></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['eSewa', 'Khalti', 'Bank Transfer'].map(method => (
                  <button key={method} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-900 transition-colors text-sm font-medium">{method}</button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Submit */}
          {currentStep === 6 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Submit</h2>
              <p className="text-gray-500 mb-6">Please review all details before final submission. Once submitted, your application will be processed within 36 hours.</p>
              <Link to="/myapplications">
              <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                Submit Application
              </button>
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={prevStep} disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronLeft size={18} /> Previous
            </button>
            {currentStep < 6 && (
              <button onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                Next <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}