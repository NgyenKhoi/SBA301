import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <div className="app-wrapper">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="page-content">
        {renderPage()}
      </div>
      <Footer />
    </div>
  )
}

export default App
