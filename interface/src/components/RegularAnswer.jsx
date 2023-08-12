import { useEffect, useContext, useState } from "react";

import { FormDataStoreContext } from "../stores/FormDataStore";

import InputBlock from "./InputBlock";

export default function RegularAnswer(props) {
  var name = props.name;
  if (props.path) {
    name = props.path + name
  }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  // Initialize with empty string
  const [v, setV] = useState(formDataStore.getByNameKey(name) || "");

  const handleChange = (e) => {
    setFormDataStore(fds => {
      const newFds = fds.copy()
      newFds.setNameData(name, e.target.value);
      return newFds
    })
    setV(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <InputBlock>
      <div>{props.text}</div>
      <div>
        <input
        
          type={props.type}
          name={name}
          onChange={handleChange}
          value={v}
          max={props.max !== undefined ? props.max : null}
        />
      </div>
  </InputBlock>
  );
}