import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalCard from "./components/GoalCard";
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    console.log("Fetching from:", API_URL); // Debugging line
    fetch(`${API_URL}/goals`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(setGoals)
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  const addOrUpdateGoal = (goalData) => {
    const url = goalData.id ? `${API_URL}/goals/${goalData.id}` : `${API_URL}/goals`;
    const method = goalData.id ? "PUT" : "POST";
    const body = JSON.stringify(goalData.id ? goalData : { ...goalData, savedAmount: 0 });

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((result) => {
        if (goalData.id) {
          setGoals((prev) =>
            prev.map((goal) => (goal.id === result.id ? result : goal))
          );
          setEditingGoal(null);
        } else {
          setGoals((prev) => [...prev, result]);
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/goals/${id}`, { method: "DELETE" }).then(() => {
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    });
  };

  const handleDeposit = (id, amount) => {
    const goal = goals.find((g) => g.id === id);
    const updated = { ...goal, savedAmount: goal.savedAmount + amount };

    fetch(`${API_URL}/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        setGoals((prev) =>
          prev.map((goal) => (goal.id === id ? updatedGoal : goal))
        );
      });
  };

  const handleEditClick = (goal) => setEditingGoal(goal);

  const handleCancelEdit = () => setEditingGoal(null);

  return (
    <div className="App">
      <GoalForm
        onSubmit={addOrUpdateGoal}
        editingGoal={editingGoal}
        onCancel={handleCancelEdit}
      />

      <div className="goal-list">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDelete}
            onDeposit={handleDeposit}
            onEditClick={handleEditClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
