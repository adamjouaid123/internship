import React, { useContext, useState } from 'react';
import { FormDataStoreContext } from '../../../stores/FormDataStore';


import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";
import SectionWithTitle from '../../../components/SectionWithTitle';


export default function SpecialNeedSection(props) {
  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}special_needs`))

  return (
    <SectionWithTitle title={props.title}>
      <YesNoAnswer name="special_needs" text="Do u have any special needs?" value={a1} onAnswer={(a) => setA1(a)} path={path} />
      {a1 && <>
        <OptionsAnswer text="What is ur special need?" name="special_need" path={path} />

        <YesNoAnswer text="Is it permanent?" name="is_permanent" path={path} />

        <OptionsAnswer text="Do u get treatment" name="treatment_id" path={path} />
        <OptionsAnswer text="What is ur need l asesiye?" name="need_type_id" path={path} />

        <OptionsAnswer text="Is ur house enough for ur needs?" name="house_enough_for_needs_id" path={path} />

        <YesNoAnswer text="Did u have problems in school because of ur special need?" name="school_problems_because_of_special" path={path} />
      </>
      }

    </SectionWithTitle>




  );
}
