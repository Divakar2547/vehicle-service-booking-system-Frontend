import React, { useState } from "react";
import "../Styles/Product.css";

const products = [
  { id: 1, name: 'Engine Oil', price: 799, category: 'Maintenance', emoji: '🛢️', description: 'High-quality synthetic engine oil for smooth performance', image: "https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/news/P0rqvBNxgn_engine_oil_change.webp" },
  { id: 2, name: 'Air Filter', price: 299, category: 'Parts', emoji: '🌬️', description: 'Premium air filter for clean engine intake' ,image:"https://tgpindia.com/wp-content/uploads/2024/08/Tata-truck-air-filter.png"},
  { id: 3, name: 'Brake Pads', price: 1499, category: 'Safety', emoji: '🛑', description: 'Reliable brake pads for safe stopping power',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBHynRHalLhwGJxvyKICpfBTnARpoLt51YYw&s" },
  { id: 4, name: 'Car Battery', price: 5499, category: 'Electrical', emoji: '🔋', description: 'Long-lasting battery for reliable vehicle starting',image:"https://images.tayna.com/prod-images/1200/Powerline/065-powerline-45-435.jpg" },
  { id: 5, name: 'Spark Plugs', price: 899, category: 'Engine', emoji: '⚡', description: 'High-performance spark plugs for efficient combustion',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSVsRJc21ZqNmjNhh0zc2ght1FHGVJxT25Qg&s" },
  { id: 6, name: 'Tire Pressure Gauge', price: 399, category: 'Tools', emoji: '📏', description: 'Accurate tire pressure measurement tool',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9AsjbGF2G_tNdF1itm7ig_kg3knRu-RO1iQ&s" },
  { id: 7, name: 'Wiper Blades', price: 699, category: 'Safety', emoji: '🧽', description: 'Clear visibility wiper blades for all weather',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsTyf9bVxDuEYd06RhFz3ELL3TnjfOai6yTw&s" },
  { id: 8, name: 'Car Floor Mats', price: 1199, category: 'Interior', emoji: '🚗', description: 'Durable floor mats to protect your vehicle interior',image:"https://m.media-amazon.com/images/I/81qQjUKZr9L._AC_UF1000,1000_QL80_.jpg" },
];

const Products = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBuy = () => {
    const newOrderId = 'ORD' + Date.now();
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="products-page">
      {orderConfirmed && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center',
          border: '1px solid #c3e6cb'
        }}>
          <h2>🎉 Order Confirmed!</h2>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p>Thank you for your purchase. Your order will be delivered soon.</p>
          <button 
            onClick={() => {
              setOrderConfirmed(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Explore our range of quality vehicle parts and accessories.
          </p>
        </div>
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🛒 Cart ({cart.length})
        </button>
      </div>

      {showCart && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ddd'
        }}>
          <h3>Shopping Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <div>
                    <strong>{item.name}</strong>
                    <span style={{ marginLeft: '10px' }}>Qty: {item.quantity}</span>
                  </div>
                  <div>
                    <span style={{ marginRight: '10px' }}>₹{item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '15px', textAlign: 'right' }}>
                <strong>Total: ₹{getTotalPrice()}</strong>
                <button 
                  onClick={handleBuy}
                  style={{
                    marginLeft: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image ? <img src={product.image} alt={product.name} /> : <div className="product-emoji">{product.emoji}</div>}
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">₹ {product.price}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
