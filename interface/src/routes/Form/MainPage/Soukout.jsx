import { useContext, useState } from "react"

import YesNoAnswer from "../../../components/YesNoAnswer";

import { FormDataStoreContext } from "../../../stores/FormDataStore"

export default function Soukout() {
    const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

    
    const [a1, setA1] = useState(formDataStore.data["house.hh_muhadad_soukout"] || false)
    const [a2, setA2] = useState(formDataStore.data["house.owner_knows_soukout"] || false)
    const [a3, setA3] = useState(formDataStore.data["house.baladiya_knows"] || false)

    return <>
        <YesNoAnswer text="is the house muhadadad bl soukout?" name="house.hh_muhadad_soukout" value={a1} onAnswer={(a) => setA1(a)} />

        {/*If yes (muhadad bl soukout): */}
        {a1 && <YesNoAnswer text="Does the owner know about it?" name="house.owner_knows_soukout" value={a2} onAnswer={(a) => setA2(a)} />}

        {/*If yes (owner knows about it) */}
        {a1 && a2 && <YesNoAnswer text="Did the owner try to repair it?" name="house.owner_tried_repairing" />}

        {/*If muhadad soukout:  */}
        {a1 && <YesNoAnswer text="Does the baladiya knows about it?" name="house.baladiya_knows" value={a3} onAnswer={(a) => setA3(a)} />}

        {/*If baladiya knows */}
        {a1 && a3 && <YesNoAnswer text="Did the baladiya do smth about it?" name="house.baladiya_acted" />}
        {a1 && <YesNoAnswer text="  another place to live?" name="house.have_another_place" />}

    </>
}