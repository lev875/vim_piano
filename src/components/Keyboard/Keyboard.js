import react from "react";
import { useSelector } from "react-redux";

import Key from "../Key/Key";
import { selectKeys } from "./store"

function Keyboard() {

  const keys = useSelector(selectKeys)

  return <div id="keyboard">
    {
      keys.map(
        ({ name, button, frequency }, i ) =>
          <Key name={name} button={button} frequency={frequency} key={i}/>
      )
    }
  </div>

}

export default Keyboard;
