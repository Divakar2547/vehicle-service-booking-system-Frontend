import { useState } from "react";
import { contactAPI } from "../utils/api";
import "./../Styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await contactAPI.submitContact(formData);
      setSuccess(response.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📍 123 Anna Nager Street, City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ contact@vehicleservice.com</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <input 
            type="text" 
            name="name"
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <textarea 
            name="message"
            placeholder="Message" 
            rows="4" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;