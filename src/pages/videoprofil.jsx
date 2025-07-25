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

// Function untuk mengkonversi YouTube URL ke embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  
  // Extract video ID dari berbagai format YouTube URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1&showinfo=0`;
  }
  
  return url; // Return original URL jika tidak bisa di-parse
};

const VideoProfil = () => {
  // URL YouTube Video
  const youtubeVideoUrl = "https://youtu.be/5LgFuPKB_S0?si=MGskaeEJy0ft7Wfd";
  
  const embedUrl = getYouTubeEmbedUrl(youtubeVideoUrl);

  return (
    <div id="video-profil" className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-300 via-primary-200 to-accent-100">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Profil Audiovisual
                <span className="block bg-gradient-to-r from-accent-100 to-white bg-clip-text text-transparent pb-2">
                  Padukuhan Sangen 2
                </span>
              </h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Main Video Title */}
          <AnimatedSection animation="fade-in" delay={0.3} className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Video Profil Padukuhan Sangen 2
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dokumentasi audiovisual yang menampilkan pesona, budaya, dan kehidupan masyarakat di Padukuhan Sangen 2
            </p>
          </AnimatedSection>

          {/* Video Player */}
          <AnimatedSection animation="scale-in" delay={0.3} className="w-full aspect-video bg-gradient-to-br from-secondary-100 to-primary-100 rounded-3xl overflow-hidden shadow-2xl">
            {embedUrl ? (
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="Video Profil Padukuhan Sangen 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl animate-bounce">🎬</div>
                  <p className="text-gray-700 font-semibold text-xl">Video Profil Desa Sangen 2</p>
                  <p className="text-gray-500">Video akan segera tersedia</p>
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default VideoProfil;