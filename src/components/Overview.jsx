// src/components/Overview.jsx
import React from "react";
function Overview({ goals }) {
  const totalTarget = goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0);
  const totalSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0);

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Saved: {totalSaved}</p>
      <p>Total Target: {totalTarget}</p>
      <p>Progress: {totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%</p>
    </div>
  );
}

export default Overview;
