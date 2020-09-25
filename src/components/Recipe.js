import React, { useState } from "react";
import Reset from "./Reset";
import style from "./Recipe.module.css";

function SaleConfirmForm({ onCancelSale, onSubmitHandler }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  function validate() {
    const errors = [];

    if (!firstName) {
      errors.push("First name is required");
    }

    if (!lastName) {
      errors.push("Last name is required");
    }

    if (!email) {
      errors.push("Email is required");
    }

    return errors;
  }

  function cleanInputs() {
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  function onSubmit(event) {
    event.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      setErrors(errors);

      return;
    }

    onSubmitHandler({ firstName, lastName, email });

    cleanInputs();
  }

  return (
    <div className={style.form}>
      <form onSubmit={onSubmit}>
        {errors.length > 0 && (
          <ul className={style.errors}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className={style.group}>
          <label htmlFor="firstName">First name</label>
          <input
            className={style.control}
            onChange={event => setFirstName(event.target.value)}
            value={firstName}
          />
        </div>

        <div className={style.group}>
          <label htmlFor="lastName">Last name</label>
          <input
            className={style.control}
            onChange={event => setLastName(event.target.value)}
            value={lastName}
          />
        </div>

        <div className={style.group}>
          <label htmlFor="email">Email</label>
          <input
            className={style.control}
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        </div>

        <div
          className={style.group}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button type="submit" style={{ marginRight: "5px" }}>
            Sale confirm
          </button>
          <button onClick={onCancelSale}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function SaleConfirmButton({ onConfirmSale }) {
  return <button onClick={onConfirmSale}>Confirm</button>;
}

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

export default function Recipe({ data, onReset, onSubmitHandler }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const entries = data.map(entry => ({
    ...entry,
    subTotal: (entry.price * entry.quantity).toFixed(2)
  }));

  function onConfirmSaleHandler() {
    setIsConfirming(true);
  }

  function onCancelSaleHandler() {
    setIsConfirming(false);
  }

  return (
    <>
      {data.length > 0 && (
        <>
          {!isConfirming ? (
            <SaleConfirmButton onConfirmSale={onConfirmSaleHandler} />
          ) : (
            <SaleConfirmForm
              onSubmitHandler={customer => {
                setIsConfirming(false);
                onSubmitHandler(customer);
              }}
              onCancelSale={onCancelSaleHandler}
            />
          )}
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
        </>
      )}
    </>
  );
}
