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
const InfiniteScrollGalleryReverse = ({ images, speed = 35 }) => {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      {/* CSS untuk animasi */}
      <style jsx>{`
        .scroll-container-reverse {
          display: flex;
          width: fit-content;
          animation: scroll-infinite-reverse ${speed}s linear infinite;
        }
        
        @keyframes scroll-infinite-reverse {
          from {
            transform: translateX(calc(-384px * ${images.length} - 1.5rem * ${images.length}));
          }
          to {
            transform: translateX(0);
          }
        }
        
        .scroll-container-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Container untuk animasi scroll reverse - 3 set untuk seamless */}
      <div className="scroll-container-reverse gap-6">
        {/* Set 1 */}
        {images.map((image, index) => (
          <div
            key={`set1-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-96 aspect-video bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
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
            <div className="w-96 aspect-video bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
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
            </div>
            
            {/* Caption gambar */}
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
            <div className="w-96 aspect-video bg-gradient-to-br from-accent-100 to-primary-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KegiatanKKN = () => {
  // Data kegiatan KKN
  const kegiatanImages = [
    {
      src: '/images/kegiatankkn/jkn.JPG',
      title: 'Screening Mobile JKN',
      description: 'Membantu proses screening Mobile JKN untuk Sangen 2'
    },
    {
      src: '/images/kegiatankkn/posysgn1.JPG',
      title: 'Posyandu Sangen 1 dan Sangen 2',
      description: 'Membantu puskesmas di Balai Dusun Sangen 1'
    },
    { 
      src: '/images/kegiatankkn/kerjalampu.JPG',
      title: 'Memperbaiki Lampu',
      description: 'Membantu karang taruna memperbaiki lampu jalan yang rusak'
    },
    {
      src: '/images/kegiatankkn/temurt.JPG',
      title: 'Kunjungan ke Rumah RT',
      description: 'Silahturahmi ke rumah Pak RT yang ada di Padukuhan Sangen 2'
    },
    {
      src: '/images/kegiatankkn/eng1.JPG',
      title: 'Bimbel Bahasa Inggris Week 1',
      description: 'Belajar menyapa dan perkenalan dengan Bahasa Inggris'
    },
    {
      src: '/images/kegiatankkn/surveydesa.JPG',
      title: 'Survey Desa Bersama Pak RT',
      description: 'Bersama Pak RT keliling desa melihat batas-batas desa'
    },
    {
      src: '/images/kegiatankkn/individuhukum.JPG',
      title: 'Proker Individu: Penyuluhan Anti Bullying',
      description: 'Bersama anak Sangen II belajar tentang anti bullying'
    },
    {
      src: '/images/kegiatankkn/individuakuntansi.JPG',
      title: 'Proker Individu: Literasi Keuangan Kreatif',
      description: 'Bersama anak Sangen II belajar menabung'
    },
    {
      src: '/images/kegiatankkn/kerbakkkn.png',
      title: 'Kerja Bakti Bersama Warga Sangen II',
      description: 'Membersihkan jalan agar desa bersih'
    },
    {
      src: '/images/kegiatankkn/individuilkom1.JPG',
      title: 'Proker Individu: Pelatihan penulisan jurnalistik',
      description: 'Bersama karangtaruna belajar menulis jurnal'
    },
    {
      src: '/images/kegiatankkn/individuinfor1.JPG',
      title: 'Proker Individu: Pelatihan Pengolahan Data',
      description: 'Bersama karang taruna belajar mengolah data menggunakan aplikasi cloud'
    },
    {
      src: '/images/kegiatankkn/eng2.JPG',
      title: 'Bimbel Bahasa Inggris Week 2',
      description: 'Belajar abjad dan angka dalam Bahasa Inggris'
    },
    {
      src: '/images/kegiatankkn/kesehatan.JPG',
      title: 'Pemeriksaan Kesehatan Sangen 2',
      description: 'Pemeriksaan kesehatan dengan Puskesmas Tanjungsari'
    },
    {
      src: '/images/kegiatankkn/pasanglampu.JPG',
      title: 'Pemasangan Lampu Penerangan',
      description: 'Penerangan lampu untuk jalan umum'
    },
    {
      src: '/images/kegiatankkn/individuilkom2.JPG',
      title: 'Proker Individu: Pelatihan Tanggap Bencana Gempa Bumi',
      description: 'Pelatihan ditujukan kepada anak Sangen 2'
    },
    {
      src: '/images/kegiatankkn/individuinfor2.JPG',
      title: 'Proker Individu: Pelatihan Canva',
      description: 'Belajar mengenal canva kepada anak Sangen 2'
    },
    {
      src: '/images/kegiatankkn/kunjumkm.JPG',
      title: 'Kunjungan ke Salah Satu UMKM di Sangen 2',
      description: 'Silahturahmi besama Pak Sukiyan'
    },
    {
      src: '/images/kegiatankkn/individuteksip.JPG',
      title: 'Proker Individu: Biopori',
      description: 'Pemasangan biopori di 4 titik Padukuhan Sangen 2'
    },
    {
      src: '/images/kegiatankkn/individusi.jpeg', 
      title: 'Proker Individu: Portal Layanan Masyarakat',
      description: 'Pembuatan code QR yang berisi layanan masyarakat'
    },
    {
      src: '/images/kegiatankkn/eng3.JPG',
      title: 'Bimbel Bahasa Inggris Week 3',
      description: 'Belajar bagian tubuh dalam Bahasa Inggris'
    }
  ];

  return (
    <div id="kegiatan" className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-200 via-primary-200 to-accent-100">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Program Kuliah Kerja Nyata
                <span className="block bg-gradient-to-r from-accent-100 to-white bg-clip-text text-transparent pb-2">
                  di Sangen 2
                </span>
              </h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-light-50 overflow-hidden">
        <div className="space-y-16">

          {/* Main Gallery Title */}
          <AnimatedSection animation="fade-in" delay={0.3} className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Dokumentasi Kegiatan KKN
            </h2>
          </AnimatedSection>

          {/* Infinite Scroll Gallery */}
          <AnimatedSection animation="scale-in" delay={0.4}>
            <InfiniteScrollGalleryReverse images={kegiatanImages} />
          </AnimatedSection>
        </div>
      </section>

      {/* Foto Kelompok KKN */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              KKN UAJY <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">87</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="scale-in" delay={0.3} className="w-full aspect-video bg-gradient-to-br from-accent-100 to-primary-100 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/foto-kelompok-kkn.jpg"
              alt="Foto Kelompok KKN Sangen 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
              <div className="text-center space-y-4">
                <div className="text-8xl animate-bounce">👥</div>
                <p className="text-gray-700 font-semibold text-xl">Foto Kelompok KKN Sangen 2</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default KegiatanKKN;