import React from "react";
import GoalCard from "./GoalCard";

function GoalsList({ goals, onDelete, onEdit }) {
  return (
    <div className="goals-list">
      {goals.length === 0 ? (
        <p>No goals found 😢</p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default GoalsList;
