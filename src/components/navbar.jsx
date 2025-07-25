import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-r from-primary-300 to-secondary-200'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
  <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-primary-300 rounded-xl flex items-center justify-center overflow-hidden">
    <img
      src="/images/logoweb.png"
      alt="Logo Padukuhan Sangen 2"
      className="w-8 h-8 object-contain"
      onError={(e) => {
        // Fallback ke emoji jika logo gagal load
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'inline';
      }}
    />
    {/* Fallback emoji */}
    <span className="text-2xl" style={{ display: 'none' }}>🏘️</span>
  </div>
  <div>
    <h2 className={`text-xl lg:text-2xl font-bold transition-colors ${
      isScrolled ? 'text-gray-900' : 'text-white'
    }`}>
      Padukuhan Sangen 2
    </h2>
    <p className={`text-xs hidden lg:block ${
      isScrolled ? 'text-gray-600' : 'text-white/80'
    }`}>
      Semangat Gotong Royong dan Budaya Lokal
    </p>
  </div>
</div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {[
                { id: 'beranda', label: 'Beranda'},
                { id: 'profil', label: 'Profil Desa'},
                { id: 'video-profil', label: 'Video Profil'},
                { id: 'galeri', label: 'Galeri Desa'},
                { id: 'kegiatan', label: 'Kegiatan KKN'}
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-primary-400 hover:bg-gray-100'
                      : 'text-white hover:text-primary-100 hover:bg-white/20'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-300 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100 pb-6'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg mt-2 p-4 space-y-2">
            {[
              { id: 'beranda', label: 'Beranda', icon: '🏠' },
              { id: 'profil', label: 'Profil Desa', icon: '📋' },
              { id: 'video-profil', label: 'Video Profil', icon: '🎬' },
              { id: 'galeri', label: 'Galeri Desa', icon: '📸' },
              { id: 'kegiatan', label: 'Kegiatan KKN', icon: '🎯' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:text-primary-400 hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;