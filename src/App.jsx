import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalsList from "./components/GoalsList";

const BASE_URL = "https://smart-goals-backend-2.onrender.com";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/goals`)
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  const handleAddGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const handleDeleteGoal = (id) => {
    fetch(`${BASE_URL}/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    });
  };

  const handleEditGoal = (updatedGoal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const handleDeposit = (goalId, amount) => {
    const goal = goals.find((g) => g.id === goalId);
    const updatedGoal = {
      ...goal,
      savedAmount: Number(goal.savedAmount) + Number(amount),
    };

    fetch(`${BASE_URL}/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === goalId ? data : g))
        );
      });
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <GoalForm onAddGoal={handleAddGoal} />
      <GoalsList
        goals={goals}
        onDeleteGoal={handleDeleteGoal}
        onEditGoal={handleEditGoal}
        onDeposit={handleDeposit}
      />
    </div>
  );
}

export default App;
