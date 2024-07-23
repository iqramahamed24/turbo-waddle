import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../data/data";
import "./Budget.css";
import { Button } from "react-bootstrap";

const BudgetTable = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/budgets`)
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleDeleteBudget = (id) => {
    fetch(`${BASE_URL}/budgets/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setBudgets((prevBudgets) =>
          prevBudgets.filter((budget) => budget.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting budget:", error);
      });
  };

  return (
    <div className="budget-table container">
      <table className="budget-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget, index) => (
            <tr key={index}>
              <td>{budget.date}</td>
              <td>{budget.description}</td>
              <td>{budget.amount}</td>
              <td>
                <Button
                  onClick={() => handleDeleteBudget(budget.id)}
                  variant="danger"
                >
                  Delete
                </Button>{" "}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
