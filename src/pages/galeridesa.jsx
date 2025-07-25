import { useState, useEffect, useRef } from 'react';

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
    'slide-right': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: `all ${duration}s ease-out ${delay}s`
    },
    'scale-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
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

// Component untuk Infinite Scroll Gallery
const InfiniteScrollGallery = ({ images, speed = 30 }) => {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      {/* CSS untuk animasi */}
      <style jsx>{`
        .scroll-container {
          display: flex;
          width: fit-content;
          animation: scroll-infinite ${speed}s linear infinite;
        }
        
        @keyframes scroll-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-384px * ${images.length} - 1.5rem * ${images.length}));
          }
        }
        
        .scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Container untuk animasi scroll - 3 set untuk seamless */}
      <div className="scroll-container gap-6">
        {/* Set 1 */}
        {images.map((image, index) => (
          <div
            key={`set1-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-96 aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center space-y-3">
                  <div className="text-4xl">{image.icon}</div>
                  <p className="text-gray-700 font-medium px-4">{image.title}</p>
                </div>
              </div>
              
              {/* Overlay dengan title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
            
            {/* Caption dibawah gambar */}
            <div className="mt-3 px-2">
              <h4 className="text-gray-900 font-semibold text-base mb-1">{image.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
            </div>
          </div>
        ))}
        
        {/* Set 2 - Duplikasi untuk seamless */}
        {images.map((image, index) => (
          <div
            key={`set2-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-96 aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center space-y-3">
                  <div className="text-4xl">{image.icon}</div>
                  <p className="text-gray-700 font-medium px-4">{image.title}</p>
                </div>
              </div>
              
              {/* Overlay dengan title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
            
            {/* Caption dibawah gambar */}
            <div className="mt-3 px-2">
              <h4 className="text-gray-900 font-semibold text-base mb-1">{image.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
            </div>
          </div>
        ))}
        
        {/* Set 3 - Duplikasi ketiga untuk buffer */}
        {images.map((image, index) => (
          <div
            key={`set3-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-96 aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center space-y-3">
                  <div className="text-4xl">{image.icon}</div>
                  <p className="text-gray-700 font-medium px-4">{image.title}</p>
                </div>
              </div>
              
              {/* Overlay dengan title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
            
            {/* Caption dibawah gambar */}
            <div className="mt-3 px-2">
              <h4 className="text-gray-900 font-semibold text-base mb-1">{image.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GaleriDesa = () => {
  // Data gambar galeri
  const galeriImages = [
    {
      src: '/images/galeridesa/kerbakdesa.png'
    },
    {
      src: '/images/galeridesa/singkong.JPG'
    },
    {
      src: '/images/galeridesa/latreog.JPG'
    },
    {
      src: '/images/galeridesa/simpanpinjam.JPG'
    },
    {
      src: '/images/galeridesa/bocahmain.png'
    },
    {
      src: '/images/galeridesa/nyingkong.png'
    },
    {
      src: '/images/galeridesa/masjid.png'
    },
    {
      src: '/images/galeridesa/balailagi.png'
    }
  ];

  return (
    <div id="galeri" className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-light-100 to-accent-50">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Dokumentasi Kehidupan
                <span className="block bg-gradient-to-r from-primary-100 to-secondary-400 bg-clip-text text-transparent pb-2">
                  Masyarakat Desa
                </span>
              </h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="space-y-16">

          {/* Main Gallery Title */}
          <AnimatedSection animation="fade-in" delay={0.3} className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Galeri Foto Terbaru
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kumpulan foto yang menggambarkan kehidupan, kegiatan, dan keindahan alam Padukuhan Sangen 2
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scale-in" delay={0.4}>
            <InfiniteScrollGallery images={galeriImages} />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default GaleriDesa;