import React, { useState } from "react";
import DepositForm from "./DepositForm";

function GoalCard({ goal, onDeleteGoal, onEditGoal, onDeposit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        onEditGoal(data);
        setIsEditing(false);
      });
  };

  return (
    <div className="goal-card">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedGoal.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="targetAmount"
            value={editedGoal.targetAmount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={editedGoal.category}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Target: Ksh {goal.targetAmount}</p>
          <p>Saved: Ksh {goal.savedAmount}</p>
          <p>Category: {goal.category}</p>
          <p>Deadline: {goal.deadline}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          <DepositForm goalId={goal.id} onDeposit={onDeposit} />
        </>
      )}
    </div>
  );
}

export default GoalCard;
