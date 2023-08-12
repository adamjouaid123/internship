import { useContext, useState } from "react"

import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

import { FormDataStoreContext } from "../../../stores/FormDataStore"

export default function UNHelp() {

    const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

    const [answer, setAnswer] = useState(formDataStore.data["house.tried_un_help"] || false)
    const [a1, setA1] = useState(formDataStore.data["house.school_nearby"] || false)
  
    return <>
      {/*If foreigner ask this */}
  
      <YesNoAnswer text="Is there a school nearby?" name="house.school_nearby" value={a1} onAnswer={(a) => setA1(a)} />
      {a1 && <OptionsAnswer text="Whats the school type?" name="house.school_type"/>}
  
  
      <YesNoAnswer
        text="Did the UN help you teaching ur kids?"
        name="house.tried_un_help"
        value={answer}
        onAnswer={setAnswer}
      />
  
      {answer && <>
        {/*If yes */}
        <OptionsAnswer text="How did the UN help?" name="house.un_help_how"
          
        />
        <OptionsAnswer text="What happened with the help offered by the UN?" name="house.un_help_result"
          
        />
      </>}
  
    </>
  }
  