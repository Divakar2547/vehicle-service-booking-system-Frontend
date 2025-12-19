import "../Styles/About.css";

const About = () => {
    return (
        <div className="about-page">
            <div className="hero-section">
                <h1>About VehicleService</h1>
                <p className="hero-subtitle">Your trusted partner for vehicle maintenance</p>
            </div>
            
            <div className="about-container">
                <div className="about-card">
                    <div className="card-icon">🔧</div>
                    <h3>Expert Service</h3>
                    <p>Professional mechanics with years of experience in vehicle maintenance and repair.</p>
                </div>
                
                <div className="about-card">
                    <div className="card-icon">⚡</div>
                    <h3>Quick Booking</h3>
                    <p>Book your service appointment in just a few clicks with our easy-to-use platform.</p>
                </div>
                
                <div className="about-card">
                    <div className="card-icon">🛡️</div>
                    <h3>Trusted Quality</h3>
                    <p>We partner with certified service centers to ensure top-quality maintenance for your vehicle.</p>
                </div>
            </div>
            
            <div className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>
                        We provide a reliable vehicle service booking platform that connects customers with trusted service centers. 
                        Our goal is to make vehicle maintenance easy, transparent, and hassle-free for every vehicle owner.
                    </p>
                    <div className="stats">
                        <div className="stat">
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Service Centers</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;