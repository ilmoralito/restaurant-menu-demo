import React, { useState } from "react";
import style from "./Sales.module.css";

function Detail({ recipe }) {
  return recipe.map(entry => (
    <tr key={entry.id}>
      <td>{entry.name}</td>
      <td>{entry.price}</td>
      <td>{entry.quantity}</td>
      <td>{entry.subTotal}</td>
      <td></td>
    </tr>
  ));
}

function Row({ id, meta, customer, recipe, onToggleSaleDetail }) {
  const [isActive, setIsActive] = useState(false);

  function getTotal() {
    return recipe.reduce((previousValue, currentValue) => {
      return (previousValue += currentValue.subTotal);
    }, 0);
  }

  function onClickHandler(id) {
    onToggleSaleDetail(id);
    setIsActive(!isActive);
  }

  return (
    <tr className={isActive ? style.active : style.noActive}>
      <td>{new Date(meta.timestamp).toLocaleDateString()}</td>
      <td>{meta.seller}</td>
      <td>{`${customer.firstName} ${customer.lastName}`}</td>
      <td>{getTotal()}</td>
      <td className={style.center}>
        <button onClick={() => onClickHandler(id)}>Detalle</button>
      </td>
    </tr>
  );
}

export default function Sales({ sales, onToggleSales }) {
  const [details, setDetails] = useState([]);

  function onToggleSaleDetailHandler(id) {
    if (details.indexOf(id) !== -1) {
      setDetails(details.filter(entry => entry !== id));

      return;
    }

    setDetails([...details, id]);
  }

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
              <th />
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => {
              if (details.includes(sale.id)) {
                return (
                  <>
                    <Detail recipe={sale.recipe} />
                    <Row
                      key={index}
                      {...sale}
                      onToggleSaleDetail={onToggleSaleDetailHandler}
                    />
                  </>
                );
              }

              return (
                <Row
                  key={index}
                  {...sale}
                  onToggleSaleDetail={onToggleSaleDetailHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
