
import IndividualSection from "./IndividualSection";
// import { OptionsAnswer, YesNoAnswer } from "./Answers.old";

import RegularAnswer from "../../components/RegularAnswer";
import OptionsAnswer from "../../components/OptionsAnswer";
import YesNoAnswer from "../../components/YesNoAnswer";

import { useState, useEffect, useContext } from "react";
import { AddChild } from "./ChildrenSection";
import { FormDataStoreContext } from "../../stores/FormDataStore";
import SectionWithTitle from "../../components/SectionWithTitle";

function ParentDivorced() {
  /*TODO write informations required if parents are divorced */
}

function AreDivorced(props) {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  let path = props.path;
  if (path === undefined) {
    path = "";
  }

  const [marriageType, setMarriageType] = useState(
    formDataStore.getByNameKey(`${path}marriage_status`)
  );

  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}have_kids`));

  console.log(`got new marriage type: ${marriageType}`)
  return (
    <div>
      <SectionWithTitle title="Marriage status">
        <OptionsAnswer text="Is the marriage ongoing?" name={`marriage_status`} path={path} onChange={(e) => {
          setMarriageType(e.target.value)
        }} />
        {marriageType === "divorced" && <ParentDivorced />}
        {marriageType === "yes" && (<IndividualSection path={`marriages[${props.marriageId}].`} title="Zawj aw Zawja" />)}

        {a1 && (
          <OptionsAnswer text="hekem esbat nesab l awlad" name="esbat_nesab_awlad" path={path} />
        )}

        {marriageType === "divorced" && a1 && (<OptionsAnswer text="hadanet l wled" name="hadane" path={path} />)}

        {marriageType === "divorced" && (<RegularAnswer text="date of divorce" type="date" name="date_divorced" path={path} />)}
        {marriageType === "divorced" && (<OptionsAnswer text="In which country did u get divorced?" name="country_divorced" path={path} />)}

        {marriageType === "divorced" && (<OptionsAnswer text="divorce msabbat bl mahkame shar3iye/mazhabiye?" name="divorce_msabbat" path={path} />)}

        {marriageType === "divorced" && (<OptionsAnswer text="divorce msajal?" name="is_msajal" path={path} />)}
        <SectionWithTitle title="Children">
          <YesNoAnswer text="Do u have kids together" name="have_kids" value={a1} path={path} onAnswer={(a) => setA1(a)} />
          {a1 && <AddChild path={path} />}

        </SectionWithTitle>
      </SectionWithTitle>
    </div>

  );
}

/*soe of these infos are not in the db :( */
export default function MarriagesInfo(props) {

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  var path = `marriages[${props.marriageId}]`

  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}msabat_mahkame`))
  const [a2, setA2] = useState(formDataStore.getByNameKey(`${path}zawej_msajal`))

  return (
    <SectionWithTitle title={`${props.page.title} (Marriage ID is: ${props.marriageId})}`}>

      <RegularAnswer text="date of marriage" type="date" name={`date_of_marriage`} path={path} />

      <OptionsAnswer text="Country of marriage" name={`country_of_marriage`} path={path} />

      <OptionsAnswer text="b ayya ta2ifa aamlto zawej" name={`tayfe_zawej`} path={path} />

      <OptionsAnswer text="shakel l zawej" name={`shakl_zawej`} path={path} />

      <YesNoAnswer text="maak naskha men 3e2d zawej?" name={`has_naskha`} path={path} />

      <YesNoAnswer text="zawej mosabat bl mahkame?" name={`msabat_mahkame`} value={a1} path={path} onAnswer={(a) => setA1(a)} />

      {a1 && <OptionsAnswer text="In which country" name={`country_msabat`} path={path} />}

      {a1 && <YesNoAnswer text="msada2a l mokhtar?" name={`msaad2_mokhtar`} path={path} />}

      <YesNoAnswer text="zawej msajal?" name={`zawej_msajal`} value={a2} onAnswer={(a) => setA2(a)} path={path} />

      {a2 && <OptionsAnswer text="In which country" name={`country_esbat_nesab`} path={path} />}

      {/*If the couple is divorced */}
      {console.log("marriageId: " + props.marriageId)}
      <AreDivorced path={path} marriageId={props.marriageId} />

    </SectionWithTitle>
  );
}

