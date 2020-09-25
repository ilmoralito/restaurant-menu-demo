import React, { useState } from "react";
import Input from "./Input";
import style from "./TabsView.module.css";

function getCategories(data) {
  return Object.keys(data);
}

function Service({ id, name, price, description, quantity, onUpdateRecipe }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>
        <Input
          service={{ id, name, price, quantity }}
          onUpdateRecipe={onUpdateRecipe}
        />
      </td>
    </tr>
  );
}

function Services({ services, onUpdateRecipe }) {
  return (
    <table>
      <tbody>
        {services.map(service => (
          <Service
            key={service.id}
            {...service}
            onUpdateRecipe={onUpdateRecipe}
          />
        ))}
      </tbody>
    </table>
  );
}

function Tab({ category, currentCategory, onChangeCategory }) {
  const isActive = category === currentCategory ? style.active : "no-active";
  const className = [style.tab, isActive].join(" ");

  return (
    <li className={className} onClick={() => onChangeCategory(category)}>
      {category}
    </li>
  );
}

export default function TabsView({ data, onUpdateRecipe }) {
  const [currentCategory, setCurrentCategory] = useState(
    getCategories(data)[0]
  );

  function onChangeCategoryHandler(category) {
    setCurrentCategory(category);
  }

  return (
    <>
      <ul className={style.tabs}>
        {getCategories(data).map(category => (
          <Tab
            key={category}
            category={category}
            currentCategory={currentCategory}
            onChangeCategory={onChangeCategoryHandler}
          />
        ))}
      </ul>
      <Services
        services={data[currentCategory]}
        onUpdateRecipe={onUpdateRecipe}
      />
    </>
  );
}
