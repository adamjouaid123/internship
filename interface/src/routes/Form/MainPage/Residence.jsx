import { useContext, useState } from "react"

import { FormDataStoreContext } from "../../../stores/FormDataStore"

import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

export default function Residence() {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  
  const [resType, setResType] = useState(formDataStore.data["house.residency_type"] || false)
  
  return <>
    <OptionsAnswer text="House hold residency type" name="house.residency_type"

      onChange={(e) => { setResType(e.target.value) }}
    />

    {resType === "ownership" && <OptionsAnswer text="House hold ownership type" name="house.ownership_type" />}

    {resType === "rent" && <OptionsAnswer text="House hold rent type" name="house.rent_type" />}
    {resType === "rent" && <RegularAnswer text="House hold rent cost:" type="number" name="house.rent_cost" />}
    {resType === "rent" && <OptionsAnswer text="House hold rent payment proof type" name="house.payment_proof" />}

    {resType === "given" && <OptionsAnswer text="Who gave u the house?" name="house.hh_given" />}
    {/* ADD CONDITION */}
    {resType === "given" && <YesNoAnswer text="Was the house given temporarily?" name="house.is_given_temporarily" />}
    {resType === "given" && <OptionsAnswer text="The house was given until :" type="text" name="house.is_given_temporarily" />}

    <YesNoAnswer text="Are you currently facing a threat of eviction from your residence?" name="house.is_threatened_eviction" />
    <RegularAnswer text="Reason" name="house.reason" />
  </>
}