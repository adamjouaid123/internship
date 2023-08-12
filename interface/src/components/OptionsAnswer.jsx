import { useEffect, useContext, useState } from "react";
import { FormDataStoreContext } from "../stores/FormDataStore";
import { getOptions } from "../const/Options";
import InputBlock from "./InputBlock";

export default function OptionsAnswer(props) {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  var name = props.name;
  if (props.path) {
    name = props.path + name
  }
  
  const [v, setV] = useState(formDataStore.getByNameKey(name));
  const myoptions = getOptions(props.name);

  return (
    <InputBlock>
      <div>{props.text}</div>
      <div>
        <select
          name={name}
          onChange={(e) => {
            setFormDataStore(fds => {
              const newFds = fds.copy()
              newFds.setNameData(name, e.target.value);
              return newFds
            })
            setV(e.target.value);
            if (props.onChange) props.onChange(e);
          }}
          value={v}
        >
          <option value="">Choose an option</option>
          {myoptions &&
            myoptions.map((option, i) => (
              <option key={i} value={option.value}>
                {option.text}
              </option>
            ))}
        </select>
      </div>
    </InputBlock>

  );
}