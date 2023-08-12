import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

// import MarriagesInfo from "../Marriage";
import React, { useState, useEffect, useContext } from 'react';
import { FormDataStoreContext } from "../../../stores/FormDataStore";
import { v4 as uuidv4 } from 'uuid';
import SectionWithTitle from "../../../components/SectionWithTitle";

function MarriageQuestions(props) {

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        let name = e.target.first_name.value
        let newMarriages = formDataStore.getByNameKey(`marriages`) || []
        newMarriages.push({ first_name: name })
        setFormDataStore(fds => {
          const newFds = fds.copy()
          newFds.setNameData("marriages", [...newMarriages])
          return newFds
        })
        e.target.first_name.value = ""
      }}
    >
      <div className="inputBlock">
        <div>Enter spouse name</div>
        <div>
          <input
            name="first_name"
          />
        </div>
      </div>

      <button>Add spouse</button>
    </form>
  );
}

function PhoneNumbers(props) {
  const [phoneNumbers, setPhoneNumbers] = useState([{ type: '', owner: '', number: '' }]);

  const handlePhoneNumberChange = (index, field, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index][field] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { type: '', owner: '', number: '' }]);
  };

  return (
    <>
      {phoneNumbers.map((phoneNumber, index) => (
        <div className="inputBlock" key={index}>
          <div>Type:</div>
          <OptionsAnswer
            name={`type_id_${index}`}
            path={props.path}
            value={phoneNumber.type}
            onChange={(e) => handlePhoneNumberChange(index, 'type', e.target.value)}
          />

          <div>Phone owner:</div>
          <RegularAnswer
            name={`phone_owner_${index}`}
            path={props.path}
            type="text"
            value={phoneNumber.owner}
            onChange={(e) => handlePhoneNumberChange(index, 'owner', e.target.value)}
          />

          <div>Phone number:</div>
          <RegularAnswer
            name={`phone_number_${index}`}
            path={props.path}
            type="tel"
            value={phoneNumber.number}
            onChange={(e) => handlePhoneNumberChange(index, 'number', e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addPhoneNumber}>
        Add Phone Number
      </button>
    </>
  );
}

function Birth(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  const [a1, setA1] = useState(formDataStore.getByNameKey(`${path}shahadat_wilada`))
  const [a2, setA2] = useState(formDataStore.getByNameKey(`${path}wasiet_wilede`))
  const [a3, setA3] = useState(formDataStore.getByNameKey(`${path}informations_correct`))

  return (
    <>
      <YesNoAnswer text="Has Shahadat Wilada:" name="shahadat_wilada" value={a1} onAnswer={(a) => setA1(a)} path={path} />

      {a1 && <OptionsAnswer text="Country of deliverance of the Shahada:" name="country_of_deliverance" path={path} />}

      <YesNoAnswer text="Wasiet Wilede:" name="wasiet_wilede" value={a2} path={path} onAnswer={(a) => setA2(a)} />

      {a2 && <OptionsAnswer text="Who delivered the wasiet wilede" name="country_of_deliverance_wasi2a" path={path} />}

      {a2 && <YesNoAnswer text="Are the informations correct:" path={path} name="informations_correct" value={a3} onAnswer={(a) => setA3(a)} />}

      {a3 && <RegularAnswer text="Specify the errors:" path={path} name="errors" type="text" />}
    </>
  )
}

export default function BirthInformation(props) {

  let path = props.path;
  if (path === undefined) { path = "" }

  return (
    <div>

      <OptionsAnswer text="Country of birth:" name="country_of_birth" path={path} />

      <YesNoAnswer text="Do u have a bank account?" name="has_bank_account" path={path} />

      <SectionWithTitle title="Phone numbers">
        <PhoneNumbers path={path} />
      </SectionWithTitle>

      <SectionWithTitle title="Spouse names">
        <MarriageQuestions path={path} />
      </SectionWithTitle>

      <OptionsAnswer text="Location of birth:" name="location_of_birth" path={path} />

      <OptionsAnswer text="Doctor supervision:" name="doctor_supervision" path={path} />

      <OptionsAnswer text="Location type:" name="location_type" path={path} />

      <RegularAnswer text="Hospital name:" name="hospital_name" type="text" path={path} />

      <YesNoAnswer text="Supervisor of birth alive:" name="supervisor_alive" path={path} />

      <Birth path={path} />
    </div>
  );
}
