import React, { useEffect, useState, useRef } from 'react';
import { database, ref, onValue } from './firebase';
import './MenuPage.css';

const MenuPage = () => {
  const [menuData, setMenuData] = useState({});
  const [orderSummary, setOrderSummary] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);


  const categories =[
    'Tea (Milk Base)',
    'Quick Bites',
    'Tea (Water Base)',
    'Smokes',
    'Hookah',
    'Mohi and Dahi',
    'Drinks'
  ];

  const sectionRefs = useRef(categories.reduce((acc, value) => {
    acc[value] = React.createRef();
    return acc;
  }, {}));

  useEffect(() => {
    const menuRef = ref(database, '/menu');
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMenuData(data);
      }
    });

    const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (section) => {
    const ref = sectionRefs.current[section];
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  };

  const handleQuantityChange = (key, change) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) + change),
    }));
  };

  const handleAddToOrder = (itemKey, itemName, custom) => {
    const quantity = quantities[itemKey] || 1;
    const note = custom ? ` (Note: ${custom})` : '';
    setOrderSummary((prev) => [...prev, `${itemName} x${quantity}${note}`]);
  };

  const MenuImage = ({ src, alt, className}) => (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/100x100?text=No+Image';
      }}
    />
  );

  return (
    <div className="menu-container">
       {/* 🔸 Category Navigation Bar */}
      <div className="category-nav">
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleScrollTo(cat)}>{cat}</button>
        ))}
      </div>
      <h2 className="ai-message">👋 Welcome! Choose your favorites below.</h2>

 {categories.map((section) =>
  menuData[section] ? (
    <div key={section} ref={sectionRefs.current[section]} className="category-section">
      <h3 className="category-title">{section}</h3>
      <div className="carousel">
        {Object.entries(menuData[section]).map(([key, item]) => {
          const itemKey = key.toLowerCase().replace(/\s/g, '_');
          return (
            <div className="menu-card" key={itemKey}>
              <MenuImage src={item.imageURL} alt={item.name} className="item-img" />
              <div className="menu-info">
                <h4 className="menu-name">{item.name}</h4>
                <div className="menu-price">Rs. {item.price}</div>

                <div className="quantity-controls">
                  <button type="button" onClick={() => handleQuantityChange(itemKey, -1)}>−</button>
                  <span>{quantities[itemKey] || 1}</span>
                  <button type="button" onClick={() => handleQuantityChange(itemKey, 1)}>+</button>
                </div>

                <input
                  type="text"
                  name={`${itemKey}_custom`}
                  className="menu-custom-input"
                  placeholder="Special instructions"
                  onChange={(e) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [`${itemKey}_note`]: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="add-btn"
                  onClick={() =>
                    handleAddToOrder(
                      itemKey,
                      item.name,
                      quantities[`${itemKey}_note`]
                    )
                  }
                >
                  Add
                </button>
                
                {showScrollTop && (
                  <button
                    className="back-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    ⬆ Back to Top
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null // 🛑 skip if menuData[section] is missing
)}


      {orderSummary.length > 0 && (
        <div className="order-summary">
          <strong>🧾 Order Summary:</strong>
          <ul>
            {orderSummary.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
