import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pie } from "react-chartjs-2";
import { BASE_URL } from "../../../data/data";
import IncomeTable from "./IncomeTable";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Income Sources",
        data: [],
        backgroundColor: ["#1d528b", "#3f85c7", "#7c97b1"],
        hoverOffset: 4,
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/incomes`)
      .then((res) => res.json())
      .then((data) => {
        setIncomeData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setChartData({
      labels: incomeData.map((income) => income.source),
      datasets: [
        {
          label: "Income Sources",
          data: incomeData.map((income) => income.amount),
          backgroundColor: ["#1d528b", "#3f85c7", "#7c97b1"],
          hoverOffset: 4,
        },
      ],
    });
  }, [incomeData]);

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/incomes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        setIncomeData((prevIncomeData) =>
          prevIncomeData.filter((income) => income.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting income:", error);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <Button className="mb-3" onClick={handleGoBack}>
        Go Back
      </Button>
      <h2 className="mb-4">Income Details</h2>
      <IncomeTable incomeData={incomeData} setIncomeData={setIncomeData} />
      <table className="income-table mt-3">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Source</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((income) => (
            <tr key={income.id}>
              <th scope="row">{income.id}</th>
              <td>{income.source}</td>
              <td>{income.amount}</td>
              <td>{income.date}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(income.id)}
                >
                  Delete <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-label">Income Chart</div>
      <div className=" mt-5">
        <div className="pie-chart mt-3">
          <Pie
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;
