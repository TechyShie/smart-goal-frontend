import { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: "",
    category: "",
    deadline: "",
    createdAt: new Date().toISOString().split("T")[0], // today
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newGoal) => {
        onAddGoal(newGoal);
        setFormData({
          name: "",
          targetAmount: "",
          savedAmount: "",
          category: "",
          deadline: "",
          createdAt: new Date().toISOString().split("T")[0],
        });
      });
  }

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="savedAmount"
        placeholder="Saved Amount"
        value={formData.savedAmount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
