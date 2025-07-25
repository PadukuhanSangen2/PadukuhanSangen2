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

const ProfilDesa = () => {
  return (
    <div id="profil" className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary-300 via-secondary-200 to-light-200">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Mengenal Lebih Dekat
                <span className="block bg-gradient-to-r from-accent-100 to-white bg-clip-text text-transparent pb-2">
                  Desa Sangen 2
                </span>
              </h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sejarah Desa */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-right" duration={0.8} className="space-y-6">
              <div className="space-y-4">
                <AnimatedSection animation="slide-up" delay={0.4}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-400 mb-4">
                    Padukuhan Sangen 2
                  </h3>
                </AnimatedSection>
              </div>
              
              <AnimatedSection animation="fade-in" delay={0.6}>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Padukuhan Sangen ii adalah sebuah dusun yang terletak di Kalurahan Banjarejo, Kapanewon Tanjungsari, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta. Padukuhan Sangen II juga merupakan salah satu dari 71 padukuhan di Kecamatan Tanjungsari, tepatnya berada di wilayah administrasi di Desa Banjarejo. 
                  </p>
                  <p>
                    Padukuhan Sangen II istimewa karena memiliki tradisi budaya kuat seperti Rasulan dan Reog. Tidak hanya itu, Padukuhan Sangen II juga berada di jalur wisata menuju pantai Gunungkidul seperti Pantai Drini, serta aktif dalam pemberdayaan masyarakat melalui pengolahan produk lokal dan daur ulang kreatif.
                  </p>
                  <p>
                    Tidak hanya soal pertanian semata, Sangen II adalah komunitas yang menjaga warisan budaya, memanfaatkan potensi lokal seperti UMKM, dan mendorong kreativitas serta inovasi. Ini membuatnya layak menjadi model desa wisata berbasis budaya dan ekonomi kreatif.
                  </p>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            <AnimatedSection animation="scale-in" delay={0.3} className="relative">
              <div className="relative z-10">
                <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <img
                    src="/images/profildesa/balaidusun.png"
                    alt="Foto Bersejarah Desa Sangen 2"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center space-y-4">
                      <div className="text-6xl animate-bounce-gentle">🏛️</div>
                      <p className="text-gray-700 font-semibold text-lg">Foto Bersejarah Desa</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-100/30 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl animate-pulse-slow"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Profil Kepala Dukuh */}
      <section className="section-padding bg-gradient-to-br from-accent-50 to-light-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              Profil <span className="text-gradient">Kepala Dukuh</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={0.2} className="w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-12 group hover:shadow-3xl transition-all duration-300">
            <div className="grid lg:grid-cols-4 gap-8 items-start">
              
              {/* Foto Kepala Dukuh */}
              <AnimatedSection animation="scale-in" delay={0.4} className="lg:col-span-1 text-center lg:text-left">
                <div className="relative inline-block">
                  <div className="w-48 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-secondary-100">
                    <img
                      src="/images/profildesa/suwandi.JPG"
                      alt="Foto Kepala Dukuh Sangen 2"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-center">
                        <div className="text-5xl mb-4">👨‍💼</div>
                        <p className="text-gray-600 text-sm">Foto Kepala Dukuh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Informasi Detail */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Nama dan Jabatan */}
                <AnimatedSection animation="slide-left" delay={0.6} className="text-center lg:text-left border-b border-primary-200 pb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary-400 mb-2">Suwandi Kurniawan</h3>
                  <p className="text-xl text-gray-600 mb-1">Kepala Dukuh Sangen 2</p>
                  <p className="text-sm text-gray-500">Padukuhan Sangen, Banjarejo, Kec. Tanjungsari, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta</p>
                </AnimatedSection>

                {/* Data Personal */}
                <AnimatedSection animation="fade-in" delay={0.8}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: '📅', label: 'Tanggal Lahir', value: '06 Maret 1980' },
                      { icon: '📍', label: 'Tempat Lahir', value: 'Gunungkidul' },
                      { icon: '🕌', label: 'Agama', value: 'Islam' },
                      { icon: '📋', label: 'Periode Jabatan', value: '2016 - Sekarang' }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center text-xl text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                          {data.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{data.label}</h4>
                          <p className="text-gray-600 text-lg">{data.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Detail Lokasi Padukuhan Sangen 2 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              Detail Lokasi <span className="text-gradient">Padukuhan Sangen 2</span>
            </h2>
          </AnimatedSection>

          {/* Layout Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Konten Detail Lokasi */}
            <AnimatedSection animation="slide-right" duration={0.8} className="space-y-8">

              {/* Detail Lokasi Grid */}
              <AnimatedSection animation="pop-in" delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '📮', label: 'Kode Pos', value: '55881' },
                    { icon: '🗺️', label: 'Kecamatan', value: 'Tanjungsari' },
                    { icon: '🏛️', label: 'Kabupaten', value: 'Gunungkidul' },
                    { icon: '🚗', label: 'Akses', value: 'Jalan Pantai' }
                  ].map((info, index) => (
                    <div key={index} className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-xl text-center group hover:shadow-lg transition-all duration-300">
                      <div className="text-2xl mb-2">{info.icon}</div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{info.label}</h4>
                      <p className="text-gray-600 text-sm">{info.value}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Alamat Lengkap */}
              <AnimatedSection animation="fade-in" delay={0.4}>
                <div className="bg-gradient-to-br from-accent-50 to-light-100 p-6 rounded-2xl border border-primary-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-xl mr-3">📍</span>
                    Alamat Lengkap
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Padukuhan Sangen, Banjarejo, Kec. Tanjungsari, 
                    Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta 55881
                  </p>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            {/* Google Maps */}
            <AnimatedSection animation="scale-in" delay={0.3} className="relative">
              <iframe
                className="w-full h-[500px] lg:h-[600px] rounded-3xl shadow-2xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7988.556066155064!2d110.59202514560172!3d-8.073227031871033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f22.5!3m3!1m2!1s0x2e7bb1200a6b1f75%3A0xbbb9313123174461!2sSangen%2C%20Banjarejo%2C%20Kec.%20Tanjungsari%2C%20Kabupaten%20Gunungkidul%2C%20Daerah%20Istimewa%20Yogyakarta!5e1!3m2!1sid!2sid!4v1751732166194!5m2!1sid!2sid"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Padukuhan Sangen 2"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Peta Sangen 2 */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              Peta <span className="text-gradient"> Padukuhan Sangen 2</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="scale-in" delay={0.3} className="w-full aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/src/images/profildesa/legenda-sangen2.jpg"
              alt="Legenda Sangen 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
              <div className="text-center space-y-4">
                <div className="text-8xl animate-bounce">📜</div>
                <p className="text-gray-700 font-semibold text-xl">Foto Legenda Sangen 2</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ProfilDesa;