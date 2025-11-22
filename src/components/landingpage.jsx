import { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeftRight, Search, Globe, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({ hero: true, features: true, cards: true });
    }, 100);
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    { icon: CheckCircle, title: 'Secure Digital Records', desc: 'Your land records are safely stored and easily accessible anytime, anywhere.' },
    { icon: ArrowLeftRight, title: 'Easy Property Transfers', desc: 'Streamlined procedures for buying, selling, or inheriting property with clear steps.' },
    { icon: Search, title: 'Transparent Process', desc: 'Track fees, applications, and statuses openly to ensure a fair and honest process.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white text-black shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
           
            <span className={`font-semibold transition-colors ${scrolled ? 'text-gray-800' : 'text-gray-800'}`}>Khulla Malpot</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a
             href="#"
            className={`transition-colors text-sm hover:text-blue-700 ${scrolled ? 'text-black' : 'text-white'}`}
            >
            About
            </a>

            <a
             href="#"
            className={`transition-colors text-sm hover:text-blue-700 ${scrolled ? 'text-black' : 'text-white'}`}
            >
            Services
            </a>

            <a
             href="#"
            className={`transition-colors text-sm hover:text-blue-700 ${scrolled ? 'text-black' : 'text-white'}`}
            >
            Contact
            </a>


            <button
            className={`flex items-center gap-1 text-sm border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-100 transition 
            ${scrolled ? 'text-black hover:text-black' : 'text-white hover:text-black'}`}
            >     
             <Globe size={14} /> English
            </button>


           <Link to="/login">
            <button className="bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-800 transition-all hover:scale-105">
              Register
            </button>
           </Link>
          </div>
          
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white px-4 py-4 space-y-3 shadow-lg">
            <a href="#" className="block text-gray-600 hover:text-blue-700">About</a>
            <a href="#" className="block text-gray-600 hover:text-blue-700">Services</a>
            <a href="#" className="block text-gray-600 hover:text-blue-700">Contact</a>
            <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-md">Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: "url(bg.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>
        </div>
        
        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Khulla Malpot
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connecting land and water through transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
            <button className="bg-white text-gray-800 px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
              Login
            </button>
            </Link>
            <Link to="/login">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-orange-600">
              Register
            </button>
            </Link>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* New Era Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            A New Era for Land Services in Nepal
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The journey to secure your property just got easier. Transparent Malpot revolutionizes the way you interact with land registration services—bringing transparency, speed, and accessibility for everyone.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What We Do</h2>
            <p className="text-gray-600">Our platform is built on security, efficiency, and transparency to serve you better.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i}
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group ${isVisible.cards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${600 + i * 150}ms` }}
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <f.icon className="text-blue-700" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}