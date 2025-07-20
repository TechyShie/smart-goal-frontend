// src/components/Overview.jsx
import React from "react";

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + parseFloat(g.savedAmount || 0), 0);
  const totalTarget = goals.reduce((sum, g) => sum + parseFloat(g.targetAmount || 0), 0);

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: Ksh {totalSaved}</p>
      <p>Total Target: Ksh {totalTarget}</p>
    </div>
  );
};

export default Overview;
