import Navbar from './components/navbar.jsx'
import Beranda from './pages/beranda.jsx'
import ProfilDesa from './pages/profildesa.jsx'
import VideoProfil from './pages/videoprofil.jsx'
import GaleriDesa from './pages/galeridesa.jsx'
import KegiatanKKN from './pages/kegiatankkn.jsx'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="relative">
        <Beranda />
        <ProfilDesa />
        <VideoProfil />
        <GaleriDesa />
        <KegiatanKKN />
      </main>
    </div>
  )
}

export default App;