import React from 'react';
import './Mainpage.css';
import { Line } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom'; // Import NavLink
import SideBar from '../sideBar.jsx/SideBar';
import BalanceIcon from '@mui/icons-material/AccountBalanceWallet';
import IncomeIcon from '@mui/icons-material/AttachMoney';
import ExpenseIcon from '@mui/icons-material/MonetizationOn';
import BudgetIcon from '@mui/icons-material/TrendingUp';

const Mainpage = ({ balance = 50000, income = 80000, expenses = 32000, budget = 40000 }) => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Income',
        data: [4000, 4500, 3000, 3500, 5000],
        backgroundColor: 'rgba(0, 51, 102, 0.5)',
        borderColor: '#003366',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [2000, 2500, 1500, 1800, 2200],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Ksh ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mainpage-container">
      <SideBar />
      <div className="main-content">
        <div className="info-container">
          <div className="info-item balance">
            <BalanceIcon className="icon" />
            <h2>Balance</h2>
            <p>Ksh {balance.toFixed(2)}</p>
            <div className="tooltip">Your current balance</div>
          </div>
          <div className="info-item income">
            <IncomeIcon className="icon" style={{ fontSize: '50px' }} />
            <NavLink to="/income" className="info-link">
              <h2>Income</h2>
            </NavLink>
            <p>Ksh {income.toFixed(2)}</p>
            <div>Total income for the period</div>
          </div>
          <div className="info-item expenses">
            <ExpenseIcon className="icon" style={{ fontSize: '50px' }} />
            <NavLink to="/expenses" className="info-link">
              <h2>Expenses</h2>
            </NavLink>
            <p>Ksh {expenses.toFixed(2)}</p>
            <div>Total expenses for the period</div>
          </div>
          <div className="info-item budget">
            <BudgetIcon className="icon" style={{ fontSize: '50px' }} />
            <NavLink to="/budget" className="info-link">
              <h2>Budget</h2>
            </NavLink>
            <p>Ksh {budget.toFixed(2)}</p>
            <div>Your budget for the period</div>
            <div className="progress-bar">
              <span style={{ width: `${(expenses / budget) * 100}%` }}></span>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h2>Income vs Expenses</h2>
          <Line data={chartData} options={options} />
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            <li>
              <span className="transaction-description">Payment from client</span>
              <span className="transaction-amount positive">Ksh 500</span>
            </li>
            <li>
              <span className="transaction-description">Office supplies</span>
              <span className="transaction-amount negative">Ksh -120</span>
            </li>
            <li>
              <span className="transaction-description">Monthly rent</span>
              <span className="transaction-amount negative">Ksh -1500</span>
            </li>
            <li>
              <span className="transaction-description">Payment from client</span>
              <span className="transaction-amount positive">Ksh 500</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
