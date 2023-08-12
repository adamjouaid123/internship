import { useEffect, useContext, useState } from "react";
import { FormDataStoreContext } from "../stores/FormDataStore";
import InputBlock from "./InputBlock";

export default function YesNoAnswer(props) {

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  var name = props.name;
  if (props.path) {
    name = props.path + name
  }

  const defaultValue = props.value !== undefined ? props.value : formDataStore.getByNameKey(name);
  const [actualValue, setActualValue] = useState(defaultValue);

  return <InputBlock>
    <div>
      {props.text}
    </div>
    <div>
      <label>
        <input
          type="radio"
          name={name}
          value="yes"
          checked={actualValue === true}
          onChange={(e) => {
            console.log("ON CHANGE YES")
            setFormDataStore(fds => {
              const newFds = fds.copy()
              newFds.setNameData(name, true)
              return newFds
            })
            setActualValue(true)
            if (props.onAnswer) props.onAnswer(true)
          }}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="no"
          checked={actualValue === false}
          onChange={(e) => {
            console.log("ON CHANGE NO")
            setFormDataStore(fds => {
              const newFds = fds.copy()
              newFds.setNameData(name, false)
              return newFds
            })
            setActualValue(false)
            if (props.onAnswer) props.onAnswer(false)
          }}
        />
        No
      </label>
    </div>
  </InputBlock>
}