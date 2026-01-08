import './Header.css'

export default function Header({ currentPage, onNavigate }) {
  return (
    <header>
      <nav>
        <h2>Website</h2>
        <ul>
          <li>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              className={currentPage === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className={currentPage === 'contact' ? 'active' : ''}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#orchid"
              onClick={(e) => { e.preventDefault(); onNavigate('orchid'); }}
              className={currentPage === 'orchid' ? 'active' : ''}
            >
              Orchid
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
