import React, { useState } from 'react';
import { BASE_URL } from '../../../data/data';
import './Budget.css';

const BudgetForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((newBudget) => {
      onSubmit(newBudget);  
      setFormData({ date: "", description: "", amount: "" });
    })
    .catch((error) => {
      console.error('Error adding budget:', error);
    });
  };

  return (
    <div className='add-budget-sec'>
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <button type="submit">Add Budget</button>
    </form>
    </div>
  );
};

export default BudgetForm;
