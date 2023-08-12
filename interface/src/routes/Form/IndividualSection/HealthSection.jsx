

import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer"; import React, { useContext, useState } from 'react'


import { FormDataStoreContext } from "../../../stores/FormDataStore"
import SectionWithTitle from "../../../components/SectionWithTitle";

export default function Health(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}has_amrad_mozmana`))

  const [a2, setA2] = useState(formDataStore.getByNameKey(`${path}mental_problems`))
  const [a3, setA3] = useState(formDataStore.getByNameKey(`${path}hala_sohiya_mostajeda`))
  const [a4, setA4] = useState(formDataStore.getByNameKey(`${path}ilaj_nafsi`))
  const [a5, setA5] = useState(formDataStore.getByNameKey(`${path}has_addiction`))
  const [a6, setA6] = useState(formDataStore.getByNameKey(`${path}ilaj_addiction`))

  return (
      <SectionWithTitle title={props.title}>

        <YesNoAnswer text="Did u get all the likahat" name="likahat_id" path={path} />

        <YesNoAnswer text="Do u have any amrad mozmana" name="has_amrad_mozmana" value={a1} onAnswer={(a) => setA1(a)} path={path} />
        {console.log("value : " + a1)}
        {console.log("in data : " + formDataStore.getByNameKey(`${path}has_amrad_mozmana`))}

        {a1 && <OptionsAnswer text="What is ur marad mozman" name="amrad_mozmana_id" path={path} />}

        {a1 && <OptionsAnswer text="Do u get treatment?" name="ilaj_mozman_id" path={path} />}

        {a1 && <OptionsAnswer text="Do u have meds?" name="adwiya_mostadima_id" path={path} />}

        <YesNoAnswer text="aandak haje sohiye mostajede?" name="hala_sohiya_mostajeda" value={a3} onAnswer={(a) => setA3(a)} path={path} />
        {a3 && <RegularAnswer text="What is ur hala mostajeda?" name="type_mostajed" type="text" path={path} />}

        {a3 && <OptionsAnswer text="Have u visited a doc?" name="visited_doctor_mustajed" path={path} />}

        {a3 && <OptionsAnswer text="Do u get treated?" name="ilaj_mustajed" path={path} />}

        <YesNoAnswer text="Do u have any mental problems?" name="mental_problems" value={a2} onAnswer={(a) => setA2(a)} path={path} />
        {a2 && <OptionsAnswer text="Have u visited a doc?" name="visited_doctor_mental" path={path} />}
        {a2 && <YesNoAnswer text="Do u get treated" name="ilaj_nafsi" value={a4} onAnswer={(a) => setA4(a)} path={path} />}
        {a4 && <RegularAnswer text="How much does it cost?" name="ilaj_price" type="number" path={path} />}


        <YesNoAnswer text="Do u have any addictions?" name="has_addiction" value={a5} onAnswer={(a) => setA5(a)} path={path} />
        {a5 && <OptionsAnswer text="What is ur addiction?" name="addiction" path={path} />}

        {a5 && <YesNoAnswer text="Do u get treated" name="ilaj_addiction" value={a6} onAnswer={(a) => setA6(a)} path={path} />}
        {a6 && <RegularAnswer text="How much does it cost?" name="ilaj_addiction_price" type="number" path={path} />}
        {a6 && <RegularAnswer text="esem l markaz aw l mo2asase:" name="addiction_facility_name" type="text" path={path} />}
        {a6 && <RegularAnswer text="treatment since when?" name="since_when" type="date" path={path} />}
        {a6 && <OptionsAnswer text="Have u visited a doc?" name="visited_doctor_addiction" path={path} />}
      </SectionWithTitle>
      )
}