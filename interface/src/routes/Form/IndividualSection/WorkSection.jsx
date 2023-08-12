import { FormDataStoreContext } from "../../../stores/FormDataStore";

import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";import React, { useContext, useState } from 'react';
import SectionWithTitle from "../../../components/SectionWithTitle";


function Work(props) {
  let path  = props.path ;
  if (path===undefined) { path =""}

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [paymentType, setPaymentType] = useState(formDataStore.getByNameKey(`${path}full_payment`) )
  const [nakaba, setNakaba] = useState(formDataStore.getByNameKey(`${path}nakaba`) )
  return (
    <>
      <OptionsAnswer text="What do u work?" path={path} name="job_type" />

      <RegularAnswer text="Describe ur work" path={path} name="job_details" type="text" />

      <OptionsAnswer text="How often do u get paid?" path={path} name="payment_type" />

      <OptionsAnswer text="How do u get paid?" path={path} name="payment_method" />

      <RegularAnswer text="How much do u get paid? (in US dollars)" path={path} name="salary" type="number" />

      <YesNoAnswer text="Do u have a contrcat?" path={path} name="has_contrat" />

      <OptionsAnswer text="Are u msajjal bl daman l ijtimaai?" path={path} name="daman_ijtimaai" />

      <YesNoAnswer text="Do u work more than one job at a time?" path={path} name="works_more_than_one_job" />
      
      <OptionsAnswer text="Do u get full payments?" path={path} name="full_payment" onChange={(e) => { setPaymentType(formDataStore.data[`${path}full_payment`]) }} />

      {(paymentType != "yes" && paymentType != null) && <RegularAnswer text="Since when?" path={path} name="since_when_not_fully_payed" type="date" /> }

      <OptionsAnswer text="Do u have problems with ur boss?" path={path} name="problems_with_boss" />

      <OptionsAnswer text="Are u a member in the nakaba?" path={path} name="nakaba" onChange={(e) => { setNakaba(formDataStore.data[`${path}nakaba`]) }} />

      {nakaba === "yes" && <YesNoAnswer text="Did u ask the nakaba for help?" path={path} name="asked_nakaba_help" /> }
    </>
  )
}

function NoWork(props) {

  let path  = props.path ;
  if (path===undefined) { path =""}

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)


  const [reason, setReason] =useState(formDataStore.getByNameKey(`${path}reason`) )

  return (
    <>
      <RegularAnswer text="Since when dont u work?" path={path} name="since_when_not_working" type="date" />

      <OptionsAnswer text="Why dont u work?" path={path} name="reason" onChange={(e) => { setReason(formDataStore.data[`${path}reason`]) }} />

      {reason === "fired" && <RegularAnswer text="When were u fired?" path={path} name="when_fired" type="date" /> }

      {reason === "fired" && <RegularAnswer text="How long did u work before getting fired? (in months)" path={path} name="time_working_before_fired" type="number" /> }

      {reason === "fired" && <RegularAnswer text="Why were u fired?" path={path} name="reason_fired" type="text" /> }

      {reason === "fired" && <YesNoAnswer text="Did u get warned before getting fired?" path={path} name="warned_before_fired" /> }

      {reason === "fired" && <YesNoAnswer text="Did u get a taawid?" path={path} name="taawid_after_fired" /> }
    </>
  )
}

export function WorkSection(props) {
  let path = props.path ? props.path : ""

  
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [a1, setA1] =  useState(formDataStore.getByNameKey(`${path}works`) )

  return (
    <SectionWithTitle title="Work Section">
      <YesNoAnswer text="Do u work?" path={path} name="works" value={a1} onAnswer={(a) => setA1(a)} />

      {a1 && <Work path={path} />}
      {a1 === false && <NoWork path={path} />}
    </SectionWithTitle>


  );
}

export function ForeignerWorkSection(props) {
  let path = ""
  if (props.path) path += props.path

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [a1, setA1] =   useState(formDataStore.getByNameKey(`${path}foreigner_work_permit`))


  return (
    <SectionWithTitle title="Foreigner Work Section">
      <YesNoAnswer text="Did u have a work permit?" path={path} name="foreigner_work_permit" value={a1} onAnswer={(a) => setA1(a)} />

      {a1 === false && <RegularAnswer text="Why dont u have a work permit?" path={path} name="reason_no_permit" type="text" /> }

      <RegularAnswer text="When was the last time u had a work permit?" path={path} name="last_work_permit" type="date" />
    </SectionWithTitle>


  )
}

