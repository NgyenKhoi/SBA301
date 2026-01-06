import '../pages/Page.css'

export default function About() {
    return (
        <main>
            <div className="container">
                <div className="hero-section">
                    <h1>About Us</h1>
                    <p>Learn more about our mission, vision, and the team behind our success</p>
                </div>
                
                <section>
                    <h2>Our Story</h2>
                    <p>
                        We're dedicated to creating beautiful, functional web experiences that users love.
                        Our team combines creativity with technical expertise to deliver exceptional results
                        that exceed expectations and drive business growth.
                    </p>
                    <p>
                        Founded with a passion for innovation, we've been helping businesses transform
                        their digital presence and connect with their audiences in meaningful ways.
                    </p>
                </section>

                <section>
                    <h2>Our Values</h2>
                    <ul>
                        <li>Innovation: We embrace new technologies and creative solutions</li>
                        <li>Quality: We deliver excellence in every project we undertake</li>
                        <li>Collaboration: We work closely with our clients as partners</li>
                        <li>Integrity: We maintain transparency and honesty in all our dealings</li>
                    </ul>
                </section>

                <div className="content-grid">
                    <div className="content-card">
                        <h3>🎯 Our Mission</h3>
                        <p>To empower businesses with innovative digital solutions that drive growth and success.</p>
                    </div>
                    <div className="content-card">
                        <h3>👁️ Our Vision</h3>
                        <p>To be the leading provider of cutting-edge web solutions that transform industries.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
