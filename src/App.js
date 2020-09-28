import React, { useState } from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import ListView from "./components/ListView";
import TabsView from "./components/TabsView";
import Recipe from "./components/Recipe";
import Sales from "./components/Sales";
import initialState from "./data/dataset.json";

function getInitialState() {
  const data = {};

  for (const dataKey in initialState) {
    data[dataKey] = initialState[dataKey].map(entry => ({
      ...entry,
      quantity: 0
    }));
  }

  return data;
}

function App() {
  const [data, setData] = useState(getInitialState());
  const [viewType, setViewType] = useState("list");
  const [recipe, setRecipe] = useState([]);
  const [showSales, setShowSales] = useState(false);
  const [sales, setSales] = useState([]);

  function onChangeViewTypeHandler(type) {
    setViewType(type);
  }

  function onUpdateRecipeHandler(item) {
    // update quantity property value in data
    const newDate = {};

    for (const dataKey in data) {
      newDate[dataKey] = data[dataKey].map(entry =>
        entry.id === item.id
          ? { ...entry, quantity: +item.quantity }
          : { ...entry }
      );
    }

    setData(newDate);

    // update recipe
    const entry = recipe.find(entry => entry.id === item.id);

    if (entry && +item.quantity === 0) {
      setRecipe(recipe.filter(service => service.id !== entry.id));

      return;
    }

    if (!entry) {
      setRecipe([item, ...recipe]);

      return;
    }

    setRecipe(
      recipe.map(service =>
        service.id === item.id ? { ...item } : { ...service }
      )
    );
  }

  function onResetHandler(id) {
    // update data
    let newData = {};

    for (const dataKey in data) {
      newData[dataKey] = data[dataKey].map(entry =>
        entry.id === id ? { ...entry, quantity: 0 } : { ...entry }
      );
    }

    setData(newData);

    // update recipe
    setRecipe(recipe.filter(service => service.id !== id));
  }

  function onSubmitHandler(customer) {
    const payload = {
      id: Date.now(),
      meta: {
        timestamp: Date.now(),
        seller: "John McKlein"
      },
      customer,
      recipe: recipe.map(entry => ({
        ...entry,
        subTotal: +entry.quantity * entry.price
      }))
    };

    setSales([payload, ...sales]);
    setRecipe([]);
    setData(getInitialState());
  }

  function onToggleSalesHandler() {
    setShowSales(!showSales);
  }

  return (
    <>
      {showSales && (
        <Sales sales={sales} onToggleSales={onToggleSalesHandler} />
      )}
      <Toolbar
        sales={sales}
        viewType={viewType}
        onChangeViewType={onChangeViewTypeHandler}
        onToggleSales={onToggleSalesHandler}
      />
      <div className="container">
        <div className="menu">
          {viewType === "list" ? (
            <ListView data={data} onUpdateRecipe={onUpdateRecipeHandler} />
          ) : (
            <TabsView data={data} onUpdateRecipe={onUpdateRecipeHandler} />
          )}
        </div>
        <div className="recipe">
          <Recipe
            data={recipe}
            onReset={onResetHandler}
            onSubmitHandler={onSubmitHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
