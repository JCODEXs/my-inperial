import React, { useCallback, useEffect } from "react";
import styles from "./toggle.module.css";
import { useState } from "preact/hooks";

const Toggle = ({ name, state, disabler, onClick }) => {
  const [toggle, setToggle] = useState(state);
  const HandleToggle = () => {
    setToggle((prev) => !prev);
  };
  // useEffect(() => {
  //   setToggle(false);
  // }, [state]);
  useEffect(() => {
    onClick(toggle, name);
  }, [toggle]);
  //console.log("disabler", toggle);
  return (
    <div
      className={`${styles.container} ${disabler && "disabled"}`}
      onClick={HandleToggle}
      disabled={disabler && "disabled"}
    >
      <div
        name={name}
        className={`${styles.btn} ${!toggle ? styles.disable : ""}`}
      >
        {toggle ? "OK" : "Mal"}
      </div>
      {/* { console.log("actualtoggle", name,toggle)} */}
    </div>
  );
};
export default Toggle;
