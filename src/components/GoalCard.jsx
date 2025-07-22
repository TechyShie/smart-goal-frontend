// components/GoalCard.jsx
import React, { useState } from "react";

function GoalCard({ goal, onDelete, onDeposit, onEditClick }) {
  const [depositAmount, setDepositAmount] = useState("");

  const progress = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100
  ).toFixed(0);

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(goal.id, amount);
      setDepositAmount("");
    }
  };

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: Ksh {goal.targetAmount}</p>
      <p>Saved: Ksh {goal.savedAmount}</p>
      <div className="progress-bar">
        <div
          className="fill"
          style={{
            width: `${progress}%`,
            backgroundColor: "#4caf50",
            height: "10px",
            borderRadius: "4px",
          }}
        />
      </div>
      <p>{progress}% achieved</p>

      {/* 👇 Inline Deposit Form */}
      <form onSubmit={handleDepositSubmit} className="deposit-form">
        <input
          type="number"
          placeholder="Enter amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
          min="1"
        />
        <button type="submit">Deposit</button>
      </form>

      <div className="goal-actions">
        <button onClick={() => onEditClick(goal)}>Edit</button>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;
