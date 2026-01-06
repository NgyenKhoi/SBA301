import './Home.css'

export default function Home() {
  return (
    <main>
      <div className="hero-section">
        <h1>Welcome to My Website</h1>
        <p>Discover amazing content and connect with our community</p>
        <button className="cta-button" onClick={() => alert('Button clicked!')}>
          Get Started
        </button>
      </div>
      
      <section>
        <h2>What We Offer</h2>
        <p>
          We provide cutting-edge solutions that help businesses thrive in the digital age.
          Our expertise spans across multiple domains to deliver comprehensive results.
        </p>
        <ul>
          <li>Modern web development with latest technologies</li>
          <li>Responsive design that works on all devices</li>
          <li>Performance optimization for better user experience</li>
          <li>SEO-friendly architecture for better visibility</li>
        </ul>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast Performance</h3>
          <p>Lightning-fast loading times and smooth interactions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile First</h3>
          <p>Designed for mobile devices with responsive layouts</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Modern Design</h3>
          <p>Clean, contemporary aesthetics that engage users</p>
        </div>
      </div>
    </main>
  )
}
