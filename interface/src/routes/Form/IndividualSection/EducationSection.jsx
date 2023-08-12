import { FormDataStoreContext } from "../../../stores/FormDataStore";



import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer"; import React, { useContext, useState } from 'react';
import SectionWithTitle from "../../../components/SectionWithTitle";



export default function Education(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  const [resType, setResType] = useState(formDataStore.getByNameKey(`${path}current_study_id`))
  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}online_study`))
  const [a2, setA2] = useState(formDataStore.getByNameKey(`${path}saf_shhede_rasmiye`))
  const [a3, setA3] = useState(formDataStore.getByNameKey(`${path}abroad_study`))

  return (
    <SectionWithTitle title={props.title}>
      <OptionsAnswer text="Did u study or currently studying?" name="current_study_id" path={path} onChange={(e) => { setResType(formDataStore.getByNameKey(`${path}current_study_id`)) }} />

      {resType === "no" && <OptionsAnswer text="Why didnt u study?" name="reason_stop_school" path={path} />}

      {resType === "no" && <YesNoAnswer text="Can u read and write?" name="read_and_write" path={path} />}

      {resType === "no" && <RegularAnswer text="What year did u stop stuying?" name="age_when_stopped_school" type="number" path={path} />}

      {(resType === "studied" || resType === "currently_studying") && <RegularAnswer text="School name:" name="name_of_school" type="text" path={path} />}

      {(resType === "studied" || resType === "currently_studying") && <OptionsAnswer text="School type:" name="type_of_school" path={path} />}

      {(resType === "studied" || resType === "currently_studying") && <YesNoAnswer name="online_study" text="Did u try online studying?" value={a1} onAnswer={(a) => setA1(a)} path={path} />}

      {a1 && <OptionsAnswer text="Did u succeed studying online?" name="online_study_succeed" path={path} />}

      {(resType === "studied" || resType === "currently_studying") && <OptionsAnswer text="What is the last year u did?" name="academic_year" path={path} />}

      {(resType === "studied" || resType === "currently_studying") && <YesNoAnswer name="ifedet" text="Do u have proof for the previous years u studied?" path={path} />}

      {resType === "currently_studying" && <YesNoAnswer name="saf_shhede_rasmiye" text="Are u in saf shhede rasmiye?" value={a2} onAnswer={(a) => setA2(a)} path={path} />}

      {a2 && <OptionsAnswer text="Do u have a talab tarshih?" name="talab_tarshih" path={path} />}

      <OptionsAnswer text="did u tebaet dawrat mahou l omiya?" name="dawrat_mahou_omiya" path={path} />

      <OptionsAnswer text="Do u self study?" name="self_studying" path={path} />

      <RegularAnswer text="Whats ur dream job" name="preferred_job" type="text" path={path} />

      <YesNoAnswer name="abroad_study" text="Did u study abroad?" value={a3} onAnswer={(a) => setA3(a)} path={path} />
      {a3 && <OptionsAnswer text="Did u try to t3adel shhedetak?" name="moaadalat_shhede" path={path} />}

    </SectionWithTitle>

  )
}
