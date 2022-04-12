import NoteContext from "./noteContext";
import { useState } from "react";

const NoteContext = (props) => {
  const s1 = {
    "name": "Sourabh",
    "class": "5b",
  };
  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        "name": "Sourabh Sikarwar",
        "class": "10b",
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{state, update}}>{props.children}</NoteContext.Provider>
  );
};
