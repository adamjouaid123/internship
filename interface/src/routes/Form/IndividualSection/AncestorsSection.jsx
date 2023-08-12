
import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

import React, { useContext, useState } from 'react';
import { FormDataStoreContext } from "../../../stores/FormDataStore";
import SectionWithTitle from "../../../components/SectionWithTitle";

function AdditionalInfos(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}asked_another_nationality`))
  const [a2, setA2] = useState(formDataStore.getByNameKey(`${path}asked_lebanese_nationality`))
  const [a3, setA3] = useState(formDataStore.getByNameKey(`${path}lawyer_help`))
  const [a4, setA4] = useState(formDataStore.getByNameKey(`${path}ever_had_a_nationality_removal`))
  const [a5, setA5] = useState(formDataStore.getByNameKey(`${path}has_bayan_fardi`))
  const [a6, setA6] = useState(formDataStore.getByNameKey(`${path}has_bayan_aa2ili`))
  const [a7, setA7] = useState(formDataStore.getByNameKey(`${path}has_betaka_hawiya`))
  const [a8, setA8] = useState(formDataStore.getByNameKey(`${path}has_ifadat_taarif_esem`))
  const [a9, setA9] = useState(formDataStore.getByNameKey(`${path}has_betakat_taarif_mokhtar`))
  const [a10, setA10] = useState(formDataStore.getByNameKey(`${path}has_eshara_ehtiraziya`))
  const [a11, setA11] = useState(formDataStore.getByNameKey(`${path}application_accepted`))

  return (
    <>
      <YesNoAnswer text="Have u ever asked for another nationality? (excluding lebanese)" path={path} name="asked_another_nationality" value={a1} onAnswer={(a) => setA1(a)} />

      {a1 && <OptionsAnswer text="Country asked:" path={path} name="country_asked" />}

      {a1 && <RegularAnswer text="When did u ask for it?" path={path} name="when_asked_nationality" type="date" />}

      <YesNoAnswer text="Have u ever asked for the lebanese nationality?" path={path} name="asked_lebanese_nationality" value={a2} onAnswer={(a) => setA2(a)} />

      {a2 && <OptionsAnswer text="How did u ask for it?" path={path} name="how_asked_lebanese_nationality" />}

      {a2 && <YesNoAnswer text="Did u ask a lawyer for help?" path={path} name="lawyer_help" value={a3} onAnswer={(a) => setA3(a)} />}

      {a3 && <RegularAnswer text="Lawyer's full name:" path={path} name="lawyer_full_name" type="text" />}

      {a2 && <RegularAnswer text="Year asked for lebanese nationality:" path={path} name="year_asked_lebanese_nationality" type="number" />}

      {a2 && <YesNoAnswer text="Has the application been accepted?" path={path} name="application_accepted" value={a11} onAnswer={(a) => setA11(a)} />}

      {(a2 && a11 === false) && <YesNoAnswer text="Is the application in progress?" path={path} name="application_in_progress" />}

      <YesNoAnswer text="Have u ever lost a nationality?" path={path} name="ever_had_a_nationality_removal" value={a4} onAnswer={(a) => setA4(a)} />

      {a4 && <OptionsAnswer text="What was the nationality lost?" path={path} name="nationality_removed" />}

      {a4 && <RegularAnswer text="When did u lose it?" path={path} name="date_removed" type="date" />}

      {a4 && <RegularAnswer text="Why did u lose it?" path={path} name="reason_removed" type="text" />}

      <YesNoAnswer text="Do u have a bayan fardi?" path={path} name="has_bayan_fardi" value={a5} onAnswer={(a) => setA5(a)} />

      {a5 && <OptionsAnswer text="Specify its country:" path={path} name="bayan_fardi_country" />}

      <YesNoAnswer text="Do u have a bayan aa2ili?" path={path} name="has_bayan_aa2ili" value={a6} onAnswer={(a) => setA6(a)} />

      {a6 && <OptionsAnswer text="Specify its country:" path={path} name="bayan_aa2ili_country" />}

      <YesNoAnswer text=" Do u have a bayan betakat hawiya?" path={path} name="has_betaka_hawiya" value={a7} onAnswer={(a) => setA7(a)} />

      {a7 && <OptionsAnswer text="Specify its country:" path={path} name="betaka_hawiya_country" />}

      {a7 && <RegularAnswer text="When did u get the betakat hawiya?" path={path} name="date_betaka" type="date" />}

      {a7 && <RegularAnswer text="When does it expire?" path={path} name="date_end_betaka" type="date" />}

      {a7 && <YesNoAnswer text="Did u renew ur bitaka?" path={path} name="has_renewed_betaka" />}

      <YesNoAnswer text="Do u have a ifadat taarif bel esem?" path={path} name="has_ifadat_taarif_esem" value={a8} onAnswer={(a) => setA8(a)} />

      {a8 && <RegularAnswer text="Full name of the mokhtar that issued the ifadat taarif bel esem for u:" path={path} name="mokhtar_ifada_full_name" type="text" />}

      <YesNoAnswer text="Do u have a bitakat taarif from a mokhtar?" path={path} name="has_betakat_taarif_mokhtar" value={a9} onAnswer={(a) => setA9(a)} />

      {a9 && <RegularAnswer text="Full name of the mokhtar that issued the bitakat taarif bel esem for u:" path={path} name="mokhtar_betaka_full_name" type="text" />}

      <YesNoAnswer text="Does any member of ur family have an ishara ehtiraziya?" path={path} name="has_eshara_ehtiraziya" value={a10} onAnswer={(a) => setA10(a)} />

      {a10 && <RegularAnswer text="How do u relate with this person?" path={path} name="relation_between_them" type="text" />}

    </>
  )
}

function AncestorNationality(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  let index = props.index;
  if (index === undefined) { index = 0 }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [nationalityType, setNationalityType] = useState(formDataStore.getByNameKey(`${path}nationality_type_id`))

  return (
    <>
      <OptionsAnswer text="Nationality:" path={path} name={`nationality_type_id_${index}`} onChange={(e) => { setNationalityType(formDataStore.getByNameKey(`${path}nationality_type_id`)); }} />

      {nationalityType === "lebnene_mjannas" && (<OptionsAnswer text="How did he get the Lebanese nationality?" path={path} name={`how_lebanese_id_${index}`} />)}
      {nationalityType === "foreigner" && <OptionsAnswer text="Precise nationality:" path={path} name={`nationality_id_${index}`} />}
      <YesNoAnswer text="is he still alive" index={index} path={path} name={`is_alive_${index}`} />
    </>
  );
}

function RepeatedQuestions(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  const ancestors = [
    'Father',
    'Mother',
    'Grandfather from father\'s side',
    'Father\'s grandfather',
    'Grandmother from father\'s side',
    'Grandfather from mother\'s side',
    'Grandmother from mother\'s side'
  ];

  return (
    <div>
      {ancestors.map((ancestor, index) => (
        <SectionWithTitle key={index} title={ancestor}>
          <AncestorNationality path={path} index={index} />
        </SectionWithTitle>
      ))}
    </div>
  );
}

{/*These questions are only for people with no nationalities */ }
export default function AncestorsSection(props) {
  let path = props.path;
  if (path === undefined) { path = "" }

  return (
    <SectionWithTitle title="Individual's ancestory">
      <RepeatedQuestions path={path} />

      {/*If not originally lebanese but have the nationality */}

      {/*If not lebanese */}

      {/*Now questions about family origins */}

      <OptionsAnswer text="Precise ur family's origins:" path={path} name="family_origins" />

      <OptionsAnswer text="From which kabile?" path={path} name="kabile" />

      <OptionsAnswer text="From which kawmiye?" path={path} name="kawmiye" />

      <OptionsAnswer text="Family's logha om:" path={path} name="logha_l_om" />

      <OptionsAnswer text="Family in Lebanon since:" path={path} name="since_when_in_leb" />

      <OptionsAnswer text="Where was the family before Lebanon?" path={path} name="before_leb" />

      {/*Additional infos about the individual */}

      <AdditionalInfos path={path} />
    </SectionWithTitle>
  );
}
