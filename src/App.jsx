// App.jsx
import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalCard from "./components/GoalCard";
import './App.css';


const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/goals`)
      .then((res) => res.json())
      .then(setGoals)
      .catch(console.error);
  }, []);

  const addOrUpdateGoal = (goalData) => {
    if (goalData.id) {
      // UPDATE
      fetch(`${API_URL}/goals/${goalData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      })
        .then((res) => res.json())
        .then((updated) => {
          setGoals((prev) =>
            prev.map((goal) => (goal.id === updated.id ? updated : goal))
          );
          setEditingGoal(null);
        });
    } else {
      // CREATE
      fetch(`${API_URL}/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...goalData, savedAmount: 0 }),
      })
        .then((res) => res.json())
        .then((newGoal) => setGoals((prev) => [...prev, newGoal]));
    }
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
