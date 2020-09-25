import React, { useState } from "react";

export default function Reset({ id, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      {confirmReset ? (
        <>
          <button onClick={() => onReset(id)}>Confirm</button>
          <button onClick={() => setConfirmReset(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setConfirmReset(true)}>Reset</button>
      )}
    </>
  );
}
