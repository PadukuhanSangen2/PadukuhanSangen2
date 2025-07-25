import { useState, useEffect, useRef } from 'react';

// Custom hook untuk carousel slideshow
const useImageCarousel = (images, interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return currentIndex;
};

// Component untuk Image Carousel
const ImageCarousel = ({ images, className = "" }) => {
  const currentIndex = useImageCarousel(images, 4000); // Ganti setiap 4 detik

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      {/* Images Container */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative"
          >
            {/* Conditional rendering: gambar jika ada src, placeholder jika tidak */}
            {image.src ? (
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback ke placeholder jika gambar gagal load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Placeholder - akan muncul jika tidak ada src atau gambar error */}
            <div 
              className={`w-full h-full flex items-center justify-center ${image.src ? 'hidden' : 'flex'}`}
              style={{ display: image.src ? 'none' : 'flex' }}
            >
              <div className="text-center space-y-4">
                <div className="text-6xl animate-bounce">{image.icon}</div>
                <p className="text-gray-700 font-semibold text-lg px-4">{image.title}</p>
              </div>
            </div>
            
            {/* Overlay gradient untuk readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Title overlay untuk gambar asli */}
            {image.src && (
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg drop-shadow-lg">{image.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Custom hook untuk scroll animations
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible];
};

// Component untuk animated section
const AnimatedSection = ({ 
  children, 
  animation = 'fade-in', 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const animationStyles = {
    'fade-in': {
      opacity: isVisible ? 1 : 0,
      transform: 'translateY(0)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'slide-up': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'slide-down': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'slide-left': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'slide-right': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'scale-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'pop-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
      transition: `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s`
    },
    'rotate-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'flip-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'rotateY(0deg)' : 'rotateY(-90deg)',
      transition: `all ${duration}s ease-out ${delay}s`
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={animationStyles[animation]}
      {...props}
    >
      {children}
    </div>
  );
};

const Beranda = () => {
  return (
    <div id="beranda" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-24 lg:pb-20 bg-gradient-to-br from-primary-300 via-secondary-200 to-light-200 hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Hero Content */}
            <AnimatedSection animation="slide-right" duration={0.8} className="space-y-8">
              <div className="space-y-4">                
                <AnimatedSection animation="slide-up" delay={0.4}>
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                    Selamat Datang di 
                    <span className="block bg-gradient-to-r from-accent-100 to-white bg-clip-text text-transparent pb-2">
                      Padukuhan Sangen 2
                    </span>
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection animation="fade-in" delay={0.6}>
                  <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                    Desa yang asri, damai, dan penuh potensi, tempat tumbuhnya harapan dan keberdayaan. Sebuah fondasi kuat untuk masa depan yang lebih cerah.
                  </p>
                </AnimatedSection>
              </div>
            </AnimatedSection>

            {/* Hero Image Carousel */}
            <AnimatedSection animation="scale-in" delay={0.3} className="relative">
              <div className="relative z-10">
                <ImageCarousel 
                  images={[
                    {
                      src: '/images/beranda/kalurahan.png'
                    },
                    {
                      src: '/images/beranda/bendera.png'
                    },
                    {
                      src: '/images/beranda/bocil.png'
                    },
                    {
                      src: '/images/beranda/pemandangan.png'
                    },
                    {
                      src: '/images/beranda/kecamatan.png'
                    }
                  ]}
                  className="w-full h-80 lg:h-96 shadow-2xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-100/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl animate-pulse"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-light-100 to-accent-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Layanan <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Desa</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection
            animation="slide-up"
            delay={0.2}
            className="w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-12 group hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Portal Layanan Desa Digital
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Akses semua layanan desa dalam satu platform digital yang mudah dan praktis. 
                    Hemat waktu dan tenaga dengan layanan online 24/7.
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🚒',
                      title: 'Layanan Damkar',
                      description: 'UPT Damkar & Penyelamatan Kab. Gunungkidul, Pos Pembantu Damkar Karangmojo, dll',
                      color: 'from-blue-400 to-blue-600'
                    },
                    {
                      icon: '👮‍♂️',
                      title: 'Layanan Kepolisian',
                      description: 'POLSEK Wonosari, POLSEK Tanjungsari, Polsek Gedangsari, dll',
                      color: 'from-green-400 to-green-600'
                    },
                    {
                      icon: '🏥',
                      title: 'Layanan Kesehatan',
                      description: 'Puskesmas Tanjungsari, RSUD Wonosari, RSUD Saptosari, dll',
                      color: 'from-red-400 to-red-600'
                    },
                    {
                      icon: '🚑',
                      title: 'Layanan Ambulance',
                      description: 'PSC 119 Gunungkidul, Ambulance Peduli Muslim Gunungkidul, dll',
                      color: 'from-purple-400 to-purple-600'
                    }
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-2xl text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">{service.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">🔍</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Cara Menggunakan</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Buka kamera smartphone atau aplikasi untuk scan → Arahkan ke QR Code → Tap link yang muncul atau otomatis akan menuju ke link layanan → Klik 'Skip Advertisement' atau 'Lewati Iklan' → Akses layanan 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code*/}
              <div className="flex-shrink-0 flex flex-col items-center space-y-6">
                <div className="w-80 h-80 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center shadow-inner p-4">
                    <img
                      src="/images/layanandesa/qrlayanan.png"
                      alt="QR Code Portal Layanan Desa"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback ke placeholder jika QR Code gagal load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-8xl" style={{ display: 'none' }}>
                      📱
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xl font-semibold text-primary-400 mb-2">
                    QR Code Layanan Desa
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Beranda;