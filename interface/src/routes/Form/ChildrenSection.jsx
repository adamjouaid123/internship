import { useEffect, useContext, useState } from "react";

import { FormDataStoreContext } from "../../stores/FormDataStore";
import IndividualSection from "./IndividualSection";
import SectionWithTitle from "../../components/SectionWithTitle";

export function AddChild(props) {

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const { path } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        // needed to abstract this lol
        let name = e.target.first_name.value
        console.log(`${path}childrens`)
        let newChildren = formDataStore.getByNameKey(`${path}childrens`) || [] // lol
        newChildren.push({ first_name: name })
        const newFds = formDataStore.copy()
        newFds.setNameData(`${path}childrens`, [...newChildren])
        setFormDataStore(newFds)
        e.target.first_name.value = ""
      }}
    >
      <div className="inputBlock">
        <div>Enter child name</div>
        <div>
          <input
            name="first_name"
          />
        </div>
      </div>

      <button>Add child</button>
    </form>
  );
}


export function ChildrenSection(props) {
  var path = `marriages[${props.marriageId}]childrens[${props.childId}]`
  return <SectionWithTitle title="Children Information">
    <IndividualSection path={path} title={props.page?.title} />
  </SectionWithTitle>

}