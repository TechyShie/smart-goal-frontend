// components/GoalForm.jsx
import React, { useState, useEffect } from "react";

function GoalForm({ onSubmit, editingGoal, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    deadline: "",
    targetAmount: "",
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name || "",
        category: editingGoal.category || "",
        deadline: editingGoal.deadline || "",
        targetAmount: editingGoal.targetAmount || "",
      });
    }
  }, [editingGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGoal = {
      ...editingGoal,
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
    };
    onSubmit(updatedGoal);
    setFormData({ name: "", category: "", deadline: "", targetAmount: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
      <input
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
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
      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingGoal ? "Update Goal" : "Add Goal"}</button>
      {editingGoal && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default GoalForm;
