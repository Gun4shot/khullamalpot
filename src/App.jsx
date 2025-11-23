import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/landingpage";
import LoginPage from "./components/login";
import UserDashboard from "./components/userdashboard";
import MyApplications from "./components/myapplication";
import BookService from "./components/services";
import PublicTransparencyPortal from "./components/publicportal";
import LandTransferService from "./components/landtransfer";
import ApplicationDetails from "./components/applicationdetail";

function App() {
  return (
    <div>
      

      {/* Page switching */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/myapplications" element={<MyApplications />} />
        <Route path="/bookservice" element={<BookService />} />
        <Route path="/publicportal" element={<PublicTransparencyPortal />} />
        <Route path="/bookservice/landtransfer" element={<LandTransferService />} />
        <Route path="/myapplication/applicationdetails" element={<ApplicationDetails />} />

        
      </Routes> 
    </div>
  );
}

export default App;