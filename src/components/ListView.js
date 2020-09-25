import React, { useState } from "react";
import Input from "./Input";
import style from "./ListView.nodule.css";

function Row({ service, onUpdateRecipe }) {
  return (
    <tr>
      <td>{service.name}</td>
      <td className={style.center}>{service.price}</td>
      <td>{service.description}</td>
      <td>
        <Input service={service} onUpdateRecipe={onUpdateRecipe} />
      </td>
    </tr>
  );
}

export default function ListView({ data, onUpdateRecipe }) {
  return (
    <>
      {Object.entries(data).map(([category, services], index) => (
        <details key={index} open={index === 0}>
          <summary>{category}</summary>
          <table>
            <tbody>
              {services.map(service => (
                <Row
                  key={service.id}
                  service={service}
                  onUpdateRecipe={onUpdateRecipe}
                />
              ))}
            </tbody>
          </table>
        </details>
      ))}
    </>
  );
}
