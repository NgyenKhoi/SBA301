import { useState } from 'react'
import '../pages/Page.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <main>
            <div className="container">
                <div className="hero-section">
                    <h1>Contact Us</h1>
                    <p>Get in touch with us. We'd love to hear from you!</p>
                </div>
                
                <div className="content-grid">
                    <section>
                        <h2>Contact Information</h2>
                        <ul>
                            <li><strong>📧 Email:</strong> Khoine@gmail.com</li>
                            <li><strong>📞 Phone:</strong> +84 (0) 123 456 789</li>
                            <li><strong>📍 Address:</strong> 123 Do Lit Street, Vietnam</li>
                            <li><strong>🕒 Hours:</strong> Mon-Fri 9AM-6PM</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    )
}
