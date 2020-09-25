import React, { useEffect, useState } from "react";

export default function Input({ service, onUpdateRecipe }) {
  const [value, setValue] = useState(service.quantity);

  useEffect(() => {
    setValue(service.quantity);
  }, [service]);

  function onChangeHandler(data) {
    onUpdateRecipe(data);
    setValue(data.quantity);
  }

  return (
    <input
      type="number"
      min="0"
      value={value}
      onChange={event =>
        onChangeHandler({ ...service, quantity: event.target.value })
      }
    />
  );
}
