// src/components/DepositForm.jsx
import React, { useState } from "react";

const DepositForm = ({ goalId, onDeposit }) => {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const deposit = parseFloat(amount);
    if (!isNaN(deposit) && deposit > 0) {
      onDeposit(goalId, deposit);
      setAmount("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to deposit"
      />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;
