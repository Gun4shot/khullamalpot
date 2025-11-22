import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Link } from "react-router-dom";

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

  /* Left Panel */
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

  /* Right Panel */
  .right-panel {
    flex: 1;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .right-content {
    width: 100%;
    max-width: 420px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.2s forwards;
  }

  /* Header */
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

  /* Form Card */
  .form-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border: 1px solid #e5e7eb;
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

  /* Options Row */
  .options-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox {
    width: 16px;
    height: 16px;
    accent-color: #1e3a8a;
    cursor: pointer;
  }

  .checkbox-label {
    font-size: 0.875rem;
    color: #4b5563;
    cursor: pointer;
  }

  .forgot-link {
    font-size: 0.875rem;
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  /* Login Button */
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

  /* Support Link */
  .support-text {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .support-link {
    color: #1e3a8a;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .support-link:hover {
    text-decoration: underline;
  }

  /* Footer */
  .footer {
    text-align: center;
    margin-top: 2rem;
  }

  .footer-copyright {
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer-link {
    font-size: 0.75rem;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-link:hover {
    color: #1e3a8a;
  }

  .footer-separator {
    color: #d1d5db;
  }

  /* Animation */
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
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

    .options-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="left-overlay"></div>
          <div className="left-content">
            <h1 className="left-title">Digitizing Land Services for a Prosperous Nepal</h1>
            <p className="left-subtitle">Secure, transparent, and efficient land management at your fingertips.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="right-content">
            {/* Header */}
            <div className="header">
              <div className="logo">
                <div className="logo-icon">
                  <Shield size={18} />
                </div>
                <span className="logo-text">Khulla Malpot</span>
              </div>
              <p className="gov-text">Government of Nepal</p>
            </div>

            {/* Form Card */}
            <div className="form-card">
              <h2 className="form-title">Sign in to your Account</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Username / National ID</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your username or National ID"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input with-icon"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                
                <Link to="/userdashboard">
                <button type="submit" className="login-btn">Log In</button>
                </Link>
              </form>

              
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}