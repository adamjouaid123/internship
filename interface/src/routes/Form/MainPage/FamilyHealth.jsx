import { useContext, useState } from "react"

import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

import { FormDataStoreContext } from "../../../stores/FormDataStore"

export default function FamilyHealth() {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [treatmentType, setTreatmentType] = useState(formDataStore.data["house.where_to_when_sick"] || null)
  const [a1, setA1] = useState(formDataStore.data["house.hospital_around_area"] || false)

  return <>
    <OptionsAnswer text="Where do u go to when someone is sick?" name="house.where_to_when_sick" onChange={(e) => { setTreatmentType(e.target.value) }} />

    {/*If option chosen was we dont get treatment ask this question: */}
    {treatmentType === "no_treatment" && <OptionsAnswer text="Why dont u get treatment?" name="house.why_no_treatment" />}

    <YesNoAnswer text="Is there a hospital in the area where u live?" name="house.hospital_around_area" value={a1} onAnswer={(a) => setA1(a)} />
    {a1 && <RegularAnswer text="How far is it from ur place?" name="house.how_far" />}
    <OptionsAnswer text="Who does the hospital belongs to?" name="house.belongs_to" />
    <OptionsAnswer text="Can they help?" name="house.can_help" />

    <OptionsAnswer text="How do you pay for treatment?" name="house.method_pf_paying" />

    <YesNoAnswer text="Do you get free meds?" name="house.get_free_meds" />
  </>
}