import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../data/data';
import './Expenses.css'
import ExpensesTable from './ExpensesTable';
const Expenses = () => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseOption, setExpenseOption] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/expenses`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (!isNaN(amount)) {
      const newExpense = {
        amount: expenseAmount,
        date: expenseDate,
        category: expenseOption,
        description: expenseDescription,
      };
      submitExpense(newExpense);
      setTotalExpense(totalExpense + amount);
    }
    setExpenseAmount('');
    setExpenseDate('');
    setExpenseOption('');
    setExpenseDescription('');
  };

  const submitExpense = (expenseData) => {
    fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((newExpense) => setExpenses((prevExpenses) => [...prevExpenses, newExpense]))
      .catch((error) => console.error('Error adding expense:', error));
  };

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/expenses/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  return (
    <div className="expenses-container p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Expenses</h1>
      <div className="total-expense text-center mb-6 text-xl">
        Total Expense: <span className="text-green-500">${totalExpense.toFixed(2)}</span>
      </div>
      <form onSubmit={handleSubmit} className="expense-form grid grid-cols-1 gap-4">
        <input
          type="number"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <input
          type="date"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={expenseOption}
          onChange={(e) => setExpenseOption(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Shopping">Shopping</option>
          <option value="Transportation">Transportation</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add A Description"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          + Add Expense
        </button>
      </form>
      <div className="mt-8">
        <ExpensesTable expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Expenses;
