import React from "react";
import style from "./Sales.module.css";

function Row({ meta, customer, recipe }) {
  function getTotal() {
    return recipe.reduce((previousValue, currentValue) => {
      return (previousValue += currentValue.subTotal);
    }, 0);
  }

  return (
    <tr>
      <td>{new Date(meta.timestamp).toLocaleDateString()}</td>
      <td>{meta.seller}</td>
      <td>{`${customer.firstName} ${customer.lastName}`}</td>
      <td>{getTotal()}</td>
    </tr>
  );
}

export default function Sales({ sales, onToggleSales }) {
  return (
    <>
      <div className={style.sales}>
        <button onClick={onToggleSales}>Cerrar</button>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Atendido por</th>
              <th>Cliente</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <Row key={index} {...sale} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
