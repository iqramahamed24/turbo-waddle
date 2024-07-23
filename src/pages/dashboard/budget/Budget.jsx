import React, { useState, useEffect } from 'react';
import BudgetTable from './BudgetTable';
import BudgetForm from './BudgetForm';
import SearchBar from './FilterBudget';
import NavBar from './NavBar';
import { BASE_URL } from '../../../data/data';
import './Budget.css';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/budgets`)
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data);
        setFilteredBudgets(data); 
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddBudget = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    setFilteredBudgets((prevFilteredBudgets) => [...prevFilteredBudgets, newBudget]);
  };

  const handleSearch = (searchTerm) => {
    const filtered = budgets.filter(budget =>
      budget.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBudgets(filtered);
  };

  return (
    <div className="App">
      <NavBar />
      <div className="budget-form">
        <BudgetForm onSubmit={handleAddBudget} />
      </div>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="transaction-table">
        <BudgetTable budgets={filteredBudgets} />
      </div>
    </div>
  );
};

export default Budget;
