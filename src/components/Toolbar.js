import React from "react";
import style from "./Toolbar.module.css";

function AppTitle() {
  return <span className={style.appTitle}>My Menu APP</span>;
}

function Language() {
  return (
    <div className={style.language}>
      <button>English</button>
      <button>Spanish</button>
    </div>
  );
}

function ViewTabs({ viewType, onChangeViewType }) {
  function isActive(type) {
    return viewType === type ? style.active : "no-active";
  }

  return (
    <div className={style.viewType}>
      <button
        className={isActive("list")}
        onClick={() => onChangeViewType("list")}
      >
        List
      </button>
      <button
        className={isActive("tabs")}
        onClick={() => onChangeViewType("tabs")}
      >
        Tabs
      </button>
    </div>
  );
}

export default function Toolbar({ viewType, onChangeViewType }) {
  return (
    <div className={style.toolbar}>
      <AppTitle />
      <ViewTabs viewType={viewType} onChangeViewType={onChangeViewType} />
    </div>
  );
}
