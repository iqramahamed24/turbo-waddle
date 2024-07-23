import React from "react";
import "./ExpensesTable.css";
import { Button } from "react-bootstrap";

const ExpensesTable = ({ expenses, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center">
        <b>No Expenses Available</b>
      </div>
    );
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-blue-500 text-white">Amount</th>
          <th className="py-2 px-4 bg-blue-500 text-white">Date</th>
          <th className="py-2 px-4 bg-blue-500 text-white">Category</th>
          <th className="py-2 px-4 bg-blue-500 text-white">Description</th>
          <th className="py-2 px-4 bg-blue-500 text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className="py-2 px-4 border-b border-gray-200">
              {expense.amount}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {expense.date}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {expense.category}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {expense.description}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              <Button onClick={() => onDelete(expense.id)} variant="danger">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
