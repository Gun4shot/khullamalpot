import { useState, useRef } from 'react';
import { Eye, EyeOff, Shield, Upload, Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .left-panel {
    flex: 1;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 3rem;
    background-image: url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80');
    background-size: cover;
    background-position: center;
  }

  .left-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(30, 58, 138, 0.3), rgba(30, 58, 138, 0.5));
  }

  .left-content {
    position: relative;
    z-index: 10;
    color: white;
    max-width: 400px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards;
  }

  .left-title {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .left-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.6;
  }

  .right-panel {
    flex: 1;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    overflow-y: auto;
    max-height: 100vh;
  }

  .right-content {
    width: 100%;
    max-width: 420px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.2s forwards;
    margin: auto 0;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: #1e3a8a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
  }

  .gov-text {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .form-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border: 1px solid #e5e7eb;
    margin: 1rem 0;
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .input-wrapper {
    position: relative;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    color: #111827;
    transition: all 0.2s;
    outline: none;
  }

  .form-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .password-toggle:hover {
    color: #374151;
  }

  .form-input.with-icon {
    padding-right: 2.75rem;
  }

  .login-btn {
    width: 100%;
    padding: 0.875rem;
    background: #1e3a8a;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }

  .login-btn:hover {
    background: #1e40af;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
  }

  .login-btn:active {
    transform: translateY(0);
  }

  .switch-text {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .switch-link {
    color: #1e3a8a;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
  }

  .switch-link:hover {
    text-decoration: underline;
  }

  .registration-type {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .type-card {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
  }

  .type-card:hover {
    border-color: #3b82f6;
  }

  .type-card.selected {
    border-color: #1e3a8a;
    background: #eff6ff;
  }

  .type-title {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }

  .type-desc {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .file-upload-wrapper {
    margin-bottom: 1.25rem;
  }

  .file-upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }

  .file-upload-area:hover {
    border-color: #3b82f6;
    background: #f9fafb;
  }

  .file-upload-area.has-file {
    border-color: #10b981;
    background: #ecfdf5;
  }

  .upload-icon {
    margin-bottom: 0.5rem;
    color: #6b7280;
    display: flex;
    justify-content: center;
  }

  .upload-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }

  .upload-subtext {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .file-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #059669;
  }

  .remove-file {
    background: none;
    border: none;
    color: #dc2626;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .camera-wrapper {
    margin-bottom: 1.25rem;
  }

  .camera-button {
    width: 100%;
    padding: 1rem;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    background: white;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.3s;
  }

  .camera-button:hover {
    border-color: #3b82f6;
    background: #f9fafb;
  }

  .photo-preview {
    margin-top: 0.5rem;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .photo-preview img {
    width: 100%;
    height: auto;
    display: block;
  }

  .retake-photo {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #dc2626;
  }

  .terms-wrapper {
    margin-bottom: 1.25rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .checkbox {
    width: 16px;
    height: 16px;
    margin-top: 0.125rem;
    accent-color: #1e3a8a;
    cursor: pointer;
    flex-shrink: 0;
  }

  .terms-text {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.6;
  }

  .terms-link {
    color: #1e3a8a;
    text-decoration: none;
  }

  .terms-link:hover {
    text-decoration: underline;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .info-text {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .required {
    color: #dc2626;
  }

  .form-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .form-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
    .login-page {
      flex-direction: column;
    }

    .left-panel {
      min-height: 250px;
      padding: 2rem;
    }

    .left-title {
      font-size: 1.75rem;
    }

    .right-panel {
      padding: 1.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .registration-type {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .left-panel {
      min-height: 200px;
      padding: 1.5rem;
    }

    .left-title {
      font-size: 1.5rem;
    }

    .left-subtitle {
      font-size: 0.875rem;
    }

    .form-card {
      padding: 1.5rem;
    }

    .form-title {
      font-size: 1.25rem;
    }
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [registrationType, setRegistrationType] = useState('nid');
  const [formData, setFormData] = useState({ nid: '', fullName: '', password: '' });
  const [nidFormatted, setNidFormatted] = useState('');
  const [loginNidFormatted, setLoginNidFormatted] = useState('');
  const [registerData, setRegisterData] = useState({
    nidNumber: '',
    fullName: '',
    dateOfBirth: '',
    contactNumber: '',
    citizenshipNumber: '',
    issuedDistrict: '',
    issuedDate: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [documents, setDocuments] = useState({
    citizenship: null,
    additionalDoc: null
  });
  const [photoCapture, setPhotoCapture] = useState(null);
  const fileInputRef = useRef({});

  const handleFileUpload = (docType, file) => {
    if (file) {
      setDocuments(prev => ({ ...prev, [docType]: file }));
    }
  };

  const handleRemoveFile = (docType) => {
    setDocuments(prev => ({ ...prev, [docType]: null }));
    if (fileInputRef.current[docType]) {
      fileInputRef.current[docType].value = '';
    }
  };

  const handleNidChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 10) {
      let formatted = value;
      
      if (value.length > 3) {
        formatted = value.slice(0, 3) + '-' + value.slice(3);
      }
      if (value.length > 6) {
        formatted = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
      }
      if (value.length > 9) {
        formatted = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9) + '-' + value.slice(9);
      }
      
      setNidFormatted(formatted);
      setRegisterData({ ...registerData, nidNumber: value });
    }
  };

  const handleLoginNidChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length <= 10) {
      let formatted = value;
      
      if (value.length > 3) {
        formatted = value.slice(0, 3) + '-' + value.slice(3);
      }
      if (value.length > 6) {
        formatted = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
      }
      if (value.length > 9) {
        formatted = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9) + '-' + value.slice(9);
      }
      
      setLoginNidFormatted(formatted);
      setFormData({ ...formData, nid: value });
    }
  };

  const handleCameraCapture = () => {
    const dummyImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e5e7eb" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="14"%3EPhoto Captured%3C/text%3E%3C/svg%3E';
    setPhotoCapture(dummyImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt:', formData);
      // Redirect to user dashboard
      navigate('/userdashboard');
    } else {
      console.log('Registration attempt:', { ...registerData, documents, photoCapture });
      alert('Registration submitted for verification!');
    }
  };

  const resetForm = () => {
    setFormData({ nid: '', fullName: '', password: '' });
    setLoginNidFormatted('');
    setNidFormatted('');
    setRegisterData({
      nidNumber: '',
      fullName: '',
      dateOfBirth: '',
      contactNumber: '',
      citizenshipNumber: '',
      issuedDistrict: '',
      issuedDate: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    });
    setDocuments({ citizenship: null, additionalDoc: null });
    setPhotoCapture(null);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
    // Scroll to top when switching modes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="left-panel">
          <div className="left-overlay"></div>
          <div className="left-content">
            <h1 className="left-title">Digitizing Land Services for a Prosperous Nepal</h1>
            <p className="left-subtitle">Secure, transparent, and efficient land management at your fingertips.</p>
          </div>
        </div>

        <div className="right-panel">
          <div className="right-content">
            <div className="header">
              <div className="logo">
                <div className="logo-icon">
                  <Shield size={18} />
                </div>
                <span className="logo-text">Khulla Malpot</span>
              </div>
              <p className="gov-text">Government of Nepal</p>
            </div>

            <div className="form-card">
              <h2 className="form-title">{isLogin ? 'Sign in to your Account' : 'Create New Account'}</h2>

              {!isLogin && (
                <div className="registration-type">
                  <div 
                    className={`type-card ${registrationType === 'nid' ? 'selected' : ''}`}
                    onClick={() => setRegistrationType('nid')}
                  >
                    <div className="type-title">NID Holder</div>
                    <div className="type-desc">Register with National ID</div>
                  </div>
                  <div 
                    className={`type-card ${registrationType === 'non-nid' ? 'selected' : ''}`}
                    onClick={() => setRegistrationType('non-nid')}
                  >
                    <div className="type-title">Non-NID Holder</div>
                    <div className="type-desc">Register with Citizenship</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {isLogin ? (
                  <>
                    <div className="form-group">
                      <label className="form-label">National ID <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="123-456-789-0"
                        value={loginNidFormatted}
                        onChange={handleLoginNidChange}
                        maxLength="13"
                        required
                      />
                      <p className="info-text">Your 10-digit National ID number</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Name <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Password <span className="required">*</span></label>
                      <div className="input-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-input with-icon"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="login-btn">Log In</button>
                  </>
                ) : (
                  <>
                    {registrationType === 'nid' ? (
                      <>
                        <div className="form-section">
                          <div className="section-title">Personal Information</div>
                          
                          <div className="form-group">
                            <label className="form-label">National ID Number <span className="required">*</span></label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="123-456-789-0"
                              value={nidFormatted}
                              onChange={handleNidChange}
                              maxLength="13"
                              required
                            />
                            <p className="info-text">Your 10-digit National ID number (auto-formatted)</p>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Full Name <span className="required">*</span></label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Enter your full name as per NID"
                              value={registerData.fullName}
                              onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Date of Birth <span className="required">*</span></label>
                            <input
                              type="date"
                              className="form-input"
                              value={registerData.dateOfBirth}
                              onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-section">
                          <div className="section-title">Photo Verification <span className="required">*</span></div>
                          <div className="camera-wrapper">
                            {!photoCapture ? (
                              <button 
                                type="button" 
                                className="camera-button"
                                onClick={handleCameraCapture}
                              >
                                <Camera size={20} />
                                Capture Live Photo for Verification
                              </button>
                            ) : (
                              <div className="photo-preview">
                                <img src={photoCapture} alt="Captured" />
                                <button 
                                  type="button" 
                                  className="retake-photo"
                                  onClick={() => setPhotoCapture(null)}
                                >
                                  <Camera size={14} />
                                  Retake
                                </button>
                              </div>
                            )}
                            <p className="info-text">Live photo helps verify your identity</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-section">
                          <div className="section-title">Personal Information</div>
                          
                          <div className="form-group">
                            <label className="form-label">Full Name <span className="required">*</span></label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Enter your full name"
                              value={registerData.fullName}
                              onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Date of Birth <span className="required">*</span></label>
                              <input
                                type="date"
                                className="form-input"
                                value={registerData.dateOfBirth}
                                onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">Contact Number <span className="required">*</span></label>
                              <input
                                type="tel"
                                className="form-input"
                                placeholder="98XXXXXXXX"
                                value={registerData.contactNumber}
                                onChange={(e) => setRegisterData({ ...registerData, contactNumber: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-section">
                          <div className="section-title">Citizenship Details</div>
                          
                          <div className="form-group">
                            <label className="form-label">Citizenship Number <span className="required">*</span></label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Enter citizenship number"
                              value={registerData.citizenshipNumber}
                              onChange={(e) => setRegisterData({ ...registerData, citizenshipNumber: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Issued District <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Kathmandu"
                                value={registerData.issuedDistrict}
                                onChange={(e) => setRegisterData({ ...registerData, issuedDistrict: e.target.value })}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label className="form-label">Issued Date <span className="required">*</span></label>
                              <input
                                type="date"
                                className="form-input"
                                value={registerData.issuedDate}
                                onChange={(e) => setRegisterData({ ...registerData, issuedDate: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-section">
                          <div className="section-title">Document Verification <span className="required">*</span></div>
                          
                          <div className="file-upload-wrapper">
                            <label className="form-label">Citizenship Document</label>
                            <input
                              type="file"
                              ref={el => fileInputRef.current['citizenship'] = el}
                              onChange={(e) => handleFileUpload('citizenship', e.target.files[0])}
                              accept="image/*,.pdf"
                              style={{ display: 'none' }}
                              required
                            />
                            <div 
                              className={`file-upload-area ${documents.citizenship ? 'has-file' : ''}`}
                              onClick={() => fileInputRef.current['citizenship'].click()}
                            >
                              <div className="upload-icon">
                                <Upload size={24} />
                              </div>
                              <div className="upload-text">
                                {documents.citizenship ? 'Document uploaded' : 'Click to upload citizenship'}
                              </div>
                              <div className="upload-subtext">PDF, JPG or PNG (Max 5MB)</div>
                              {documents.citizenship && (
                                <div className="file-name">
                                  {documents.citizenship.name}
                                  <button 
                                    type="button" 
                                    className="remove-file"
                                    onClick={(e) => { e.stopPropagation(); handleRemoveFile('citizenship'); }}
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="file-upload-wrapper">
                            <label className="form-label">Additional Document (Optional)</label>
                            <input
                              type="file"
                              ref={el => fileInputRef.current['additionalDoc'] = el}
                              onChange={(e) => handleFileUpload('additionalDoc', e.target.files[0])}
                              accept="image/*,.pdf"
                              style={{ display: 'none' }}
                            />
                            <div 
                              className={`file-upload-area ${documents.additionalDoc ? 'has-file' : ''}`}
                              onClick={() => fileInputRef.current['additionalDoc'].click()}
                            >
                              <div className="upload-icon">
                                <Upload size={24} />
                              </div>
                              <div className="upload-text">
                                {documents.additionalDoc ? 'Document uploaded' : 'Upload additional document'}
                              </div>
                              <div className="upload-subtext">Passport, License, etc.</div>
                              {documents.additionalDoc && (
                                <div className="file-name">
                                  {documents.additionalDoc.name}
                                  <button 
                                    type="button" 
                                    className="remove-file"
                                    onClick={(e) => { e.stopPropagation(); handleRemoveFile('additionalDoc'); }}
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="form-section">
                          <div className="section-title">Photo Verification <span className="required">*</span></div>
                          <div className="camera-wrapper">
                            {!photoCapture ? (
                              <button 
                                type="button" 
                                className="camera-button"
                                onClick={handleCameraCapture}
                              >
                                <Camera size={20} />
                                Capture Live Photo
                              </button>
                            ) : (
                              <div className="photo-preview">
                                <img src={photoCapture} alt="Captured" />
                                <button 
                                  type="button" 
                                  className="retake-photo"
                                  onClick={() => setPhotoCapture(null)}
                                >
                                  <Camera size={14} />
                                  Retake
                                </button>
                              </div>
                            )}
                            <p className="info-text">Live photo verifies your identity</p>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="form-section">
                      <div className="section-title">Account Security</div>
                      
                      <div className="form-group">
                        <label className="form-label">Password <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-input with-icon"
                            placeholder="Create a strong password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        <p className="info-text">Min 8 characters with letters, numbers and symbols</p>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Confirm Password <span className="required">*</span></label>
                        <div className="input-wrapper">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="form-input with-icon"
                            placeholder="Re-enter your password"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="terms-wrapper">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          id="terms"
                          className="checkbox"
                          checked={registerData.agreeTerms}
                          onChange={(e) => setRegisterData({ ...registerData, agreeTerms: e.target.checked })}
                          required
                        />
                        <label htmlFor="terms" className="terms-text">
                          I agree to the <a href="#" className="terms-link">Terms and Conditions</a> and <a href="#" className="terms-link">Privacy Policy</a>. I understand that my information will be verified for land registry services.
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="login-btn">Create Account</button>
                  </>
                )}

                <div className="switch-text">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <span className="switch-link" onClick={switchMode}>
                    {isLogin ? 'Register Now' : 'Sign In'}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}