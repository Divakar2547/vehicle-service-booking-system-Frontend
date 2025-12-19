import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { bookingAPI, vehicleAPI, authHelpers } from "../utils/api";

const BookNow = () => {
  const { services } = useOutletContext() || {};
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    numberPlate: '',
    servicePackageId: '',
    serviceDate: '',
    timeSlot: '',
    pickupRequired: false,
    pickupAddress: ''
  });
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authHelpers.isAuthenticated());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to book a service');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await bookingAPI.createBooking(formData);
      setSuccess('Vehicle booked successfully!');
      setBookingResult(response.booking);
      setFormData({
        brand: '',
        model: '',
        numberPlate: '',
        servicePackageId: '',
        serviceDate: '',
        timeSlot: '',
        pickupRequired: false,
        pickupAddress: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Book Vehicle Service</h1>
        <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Login Required</h3>
          <p>Please login to book a service</p>
          <div style={{ marginTop: '20px' }}>
            <h4>Demo Credentials:</h4>
            <p><strong>Customer:</strong> divakar@example.com / password123</p>
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
          </div>
          <div style={{ marginTop: '15px' }}>
            <a href="/login" style={{ 
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px',
              marginRight: '10px'
            }}>Go to Login</a>
            <a href="/BookingConfirm" style={{ 
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px'
            }}>Book Without Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Book Vehicle Service</h1>
      
      <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>Demo Credentials Used:</h4>
        <p><strong>Logged in as:</strong> {authHelpers.getUser()?.email}</p>
        <p><strong>Role:</strong> {authHelpers.getUser()?.role}</p>
      </div>

      {bookingResult ? (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#155724' }}>🎉 Vehicle Booked Successfully!</h2>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
            <h3>Booking Details:</h3>
            <p><strong>Booking ID:</strong> {bookingResult._id}</p>
            <p><strong>Vehicle:</strong> {formData.brand} {formData.model} ({formData.numberPlate})</p>
            <p><strong>Service Date:</strong> {bookingResult.serviceDate}</p>
            <p><strong>Time Slot:</strong> {bookingResult.timeSlot}</p>
            <p><strong>Status:</strong> {bookingResult.status}</p>
            <p><strong>Total Amount:</strong> ₹{bookingResult.totalAmount}</p>
          </div>
          <button 
            onClick={() => { setBookingResult(null); setSuccess(''); }}
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Book Another Service
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          {success && <div style={{ color: 'green', marginBottom: '15px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '4px' }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{error}</div>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Vehicle Details:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand || ''}
            onChange={handleChange}
            placeholder="Vehicle Brand (e.g., Honda)"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '8px' }}
            required
          />
          <input
            type="text"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            placeholder="Vehicle Model (e.g., Activa 6G)"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '8px' }}
            required
          />
          <input
            type="text"
            name="numberPlate"
            value={formData.numberPlate || ''}
            onChange={handleChange}
            placeholder="Number Plate (e.g., TN37AB1234)"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Service Package:</label>
          <select
            name="servicePackageId"
            value={formData.servicePackageId}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          >
            <option value="">Select a service</option>
            <option value="basic">Basic Service - ₹899 (Oil change, wash, inspection)</option>
            <option value="full">Full Service - ₹1499 (Complete service + filters)</option>
            <option value="repair">Repair Service - ₹2499 (Mechanical repairs)</option>
            <option value="maintenance">Premium Maintenance - ₹3999 (Full maintenance)</option>
            {services?.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name} - ₹{service.price}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Service Date:</label>
          <input
            type="date"
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Time Slot:</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            required
          >
            <option value="">Select time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="pickupRequired"
              checked={formData.pickupRequired}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontWeight: 'bold' }}>Pickup Required</span>
          </label>
        </div>

        {formData.pickupRequired && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Pickup Address:</label>
            <textarea
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              placeholder="Enter pickup address"
              rows="3"
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              required={formData.pickupRequired}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Booking...' : 'Book Service'}
        </button>
        </form>
      )}
    </div>
  );
};

export default BookNow;