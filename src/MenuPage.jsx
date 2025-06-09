import React, { useState } from 'react';
import './MenuPage.css'; // Import the CSS here

const MenuPage = () => {
  const [orderSummary, setOrderSummary] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const selectedItems = [];

    form.querySelectorAll('input[type="checkbox"]:checked').forEach((input) => {
      const itemName = input.value;
      const itemKey = itemName.toLowerCase().replace(/\s/g, '_');
      const custom = formData.get(`${itemKey}_custom`) || '';
      selectedItems.push(`${itemName}${custom ? ` (Mod: ${custom})` : ''}`);
    });

    setOrderSummary(selectedItems);
  };

  return (
    <div className="menu-container">
      <div className="ai-message">
        👋 Hi, I’m AI-Waiter! Here’s the list of the menu. What would you like to order?
      </div>

      <form onSubmit={handleSubmit}>
        <div className="menu-item">
          <label>
            <input type="checkbox" name="order" value="Milk Tea" />
            Milk Tea
          </label>
          <input type="text" name="milk_tea_custom" placeholder="Modifications (e.g. sugar free)" />
        </div>

        <div className="menu-item">
          <label>
            <input type="checkbox" name="order" value="Brownie" />
            Brownie
          </label>
          <input type="text" name="brownie_custom" placeholder="Modifications (e.g. extra chocolate)" />
        </div>

        <div className="menu-item">
          <label>
            <input type="checkbox" name="order" value="Margherita" />
            Margherita
          </label>
          <input type="text" name="margherita_custom" placeholder="Modifications (e.g. extra cheese)" />
        </div>

        <button type="submit" className="submit-btn">Place Order</button>
      </form>

      {orderSummary.length > 0 && (
        <div className="order-summary">
          <strong>📝 Order Summary:</strong>
          <ul>
            {orderSummary.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
