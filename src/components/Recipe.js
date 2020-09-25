import React from "react";
import Reset from "./Reset";
import style from "./Recipe.module.css";

function Total({ data }) {
  function getTotal() {
    return data.reduce((previousValue, currentValue) => {
      return (previousValue += +currentValue.subTotal);
    }, 0);
  }

  return (
    <tr>
      <td colSpan="3">TOTAL TO PAY</td>
      <td className={style.center}>{getTotal()}</td>
      <td />
    </tr>
  );
}

function Entry({ id, name, price, quantity, subTotal, onReset }) {
  return (
    <tr>
      <td>{name}</td>
      <td className={style.center}>{price}</td>
      <td className={style.center}>{quantity}</td>
      <td className={style.center}>{subTotal}</td>
      <td className={style.buttons}>
        <Reset id={id} onReset={onReset} />
      </td>
    </tr>
  );
}

export default function Recipe({ data, onReset }) {
  const entries = data.map(entry => ({
    ...entry,
    subTotal: (entry.price * entry.quantity).toFixed(2)
  }));

  return (
    <>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className={style.forty}>Name</th>
              <th className={style.ten}>Price</th>
              <th className={style.ten}>Quantity</th>
              <th className={style.ten}>Subtotal</th>
              <th className={style.thirty} />
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <Entry key={entry.id} {...entry} onReset={onReset} />
            ))}
            <Total data={entries} />
          </tbody>
        </table>
      )}
    </>
  );
}
