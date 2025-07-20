import React from "react";
import GoalCard from "./GoalCard";

function GoalsList({ goals, onDeleteGoal, onEditGoal, onDeposit }) {
  return (
    <div className="goals-list">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDeleteGoal={onDeleteGoal}
          onEditGoal={onEditGoal}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default GoalsList;
