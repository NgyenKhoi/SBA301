import avatarImage from '../assets/meme.jpg'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="profile">
            <img
              src={avatarImage}
              alt="Khoine"
              className="avatar"
            />
            <div className="profile-info">
              <p className="name">Khoine</p>
              <p className="subtext">Full Stack Developer</p>
            </div>
          </div>
          <div className="contact">
            <p className="contactLabel">Get in touch</p>
            <a href="mailto:Khoine@gmail.com" className="email">
              Khoine@gmail.com
            </a>
            <div className="social-links">
              <a href="#" className="social-link" title="GitHub">
                <span>🐙</span>
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="social-link" title="Twitter">
                <span>🐦</span>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 khoine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
