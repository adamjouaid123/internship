import React, { useContext, useState } from 'react';



import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";
import { FormDataStoreContext } from "../../../stores/FormDataStore"

import BirthInformation from "./BirthInformation"
import EducationSection from "./EducationSection"
import HealthSection from "./HealthSection"
import { ForeignerWorkSection, WorkSection } from "./WorkSection"
import SpecialNeedSection from "./SpecialNeedSection"
import AncestorsSection from "./AncestorsSection"
import Education from './EducationSection';
import SectionWithTitle from '../../../components/SectionWithTitle';



function NoNationality(props) {

  let path = props.path;
  if (path === undefined) { path = "" }


  return (
    <SectionWithTitle title="Individual's legal situation (No nationality)">

      <OptionsAnswer text="Legal situation in Lebanon" path={path} name="legal_situation_type_id" />

      <YesNoAnswer text="Did you enter Lebanon legally?" path={path} name="has_entered_legally" />

    </SectionWithTitle>

  )
}

function ForeignersTahtKayd(props) {
  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  const [residencyEnded, setResidencyEnded] = useState((formDataStore.getByNameKey(`${path}date_end_residency`)))
  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}has_passport`))

  const handleEndOfResidency = (inputValue) => {
    const ended = new Date(inputValue) <= new Date();
    setResidencyEnded(ended);
  };

  return (
    <SectionWithTitle title="Individual's legal situation (Taht kayd)">
      <RegularAnswer text="Date of end of residency" type="date" name="date_end_residency" path={path} onChange={(e) => handleEndOfResidency(formDataStore.getByNameKey(`${path}date_end_residency`))} />
      {residencyEnded && <OptionsAnswer text="Why didnt u renew ur residency?" path={path} name="reason_no_residency_renewal_id" />}

      <OptionsAnswer text="Residency type:" path={path} name="residency_type_id" />

      <YesNoAnswer text="do u have a passport?" path={path} name="has_passport" value={a1} onAnswer={(a) => setA1(a)} />

      {a1 && <OptionsAnswer text="Which country is ur passport from?" path={path} name="passport_country_delivered_id" />}

      {a1 && <RegularAnswer text="When does ur passport expire?" type="date" path={path} name="end_of_passport_validity" />}

    </SectionWithTitle>


  )
}

export default function IndividualSection(props) {

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  let path = props.path;
  if (path === undefined) { path = "" }
  console.log("individual path: " + path)

  const [hasNation, setHasNation] = useState(formDataStore.getByNameKey(`${path}has_nationality`))

  return <SectionWithTitle title="Main Individual">
    
    <YesNoAnswer text="Same house" name="same_house" path={path} onAnswer={(b) => {
      console.log(path)
      if (b) {
        const mainHouse = formDataStore.getByNameKey("house")
        const newFds = formDataStore.copy()
        formDataStore.setNameData(`${path}house`, mainHouse)
        setFormDataStore(newFds)
      } else {
        const newFds = formDataStore.copy()
        formDataStore.setNameData(`${path}house`, {})
        setFormDataStore(newFds)
      }
    }}
    />

    <RegularAnswer text="First name" type="text" name="first_name" path={path} />

    <RegularAnswer text="Last Name:" name="last_name" path={path} type="text" />

    <RegularAnswer text="Father's Name:" name="father_name" path={path} type="text" />

    <RegularAnswer text="Grandfather's Name:" name="grandfather_name" path={path} type="text" />

    <OptionsAnswer text="Sex:" name="sex" path={path} />

    <OptionsAnswer text="Mazhab:" name="mazhab_id" path={path} />

    <YesNoAnswer text="Alive?" name="alive" path={path} />

    <OptionsAnswer text="Do u have a nationality" name="has_nationality" path={path} onChange={(e) => { setHasNation(e.target.value) }} />

    {(hasNation === "foreigner" || hasNation === "taht_kayd" || hasNation === "lebniniye_and_another") && <OptionsAnswer path={path} text="Enter ur nationalities:" name="nationalities" />}

    {hasNation === "no" && <NoNationality path={path} />}

    {(hasNation === "foreigner" || hasNation === "taht_kayd") && <ForeignersTahtKayd path={path} />}

    {(hasNation === "taht_kayd" || hasNation === "no") && <AncestorsSection path={path} />}

    {(hasNation === "foreigner") && <ForeignerWorkSection path={path} />}

    {(hasNation !== "foreigner" && hasNation != null) && <WorkSection path={path} />}

    <SectionWithTitle title={`${props.title}'s Birth Infos`}>
      <BirthInformation path={path} />
    </SectionWithTitle>

    <SectionWithTitle title={`${props.title}'s Education`}>
      <Education path={path} />
    </SectionWithTitle>

    <SectionWithTitle title={`${props.title}'s Health`}>
      <HealthSection path={path} />
    </SectionWithTitle>

    <SectionWithTitle title={`${props.title}'s Special Needs`}>

      <SpecialNeedSection path={path} />
    </SectionWithTitle>

  </SectionWithTitle>

}