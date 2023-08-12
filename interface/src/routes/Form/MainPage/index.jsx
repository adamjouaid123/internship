
import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

import IndividualSection from "../IndividualSection/index.jsx"
import UNHelp from "./UNHelp";
import FamilyFinance from "./FamilyFinance";

import Residence from "./Residence";
import Soukout from "./Soukout";
import FamilyHealth from "./FamilyHealth";
import SectionWithTitle from "../../../components/SectionWithTitle";

export default function MainPage() {
  return <div>
    {/* House Hold general information */}
    <SectionWithTitle title="House Hold general information">


      {/*How will we know whether an individual is living in the house with his family or away?*/}

      {/*HouseHoldInfos table */}
      <RegularAnswer text="Number of families in the same house hold :" type="number" name="house.nb_of_families" />

      {/*we want the number of people other than family members in the house, this can be calculated with a query? or better as a question?*/}
      <RegularAnswer text="Number of people other than family members in the house:" type="number" name="house.number_of_people_notfamily_in_household" />

      <OptionsAnswer text="Region" name="house.region_id" />

      <OptionsAnswer text="Caza" name="house.caza_id" />

      <OptionsAnswer text="Mohafaza" name="house.mohafaza_id" />

      <OptionsAnswer text="Baladiya" name="house.baladiya" />

      <RegularAnswer text="Adresse in details" type="text" name="house.details" />

      {/*HouseHoldInfos table */}
      <OptionsAnswer text="House hold type" name="house.h_type" />

      <RegularAnswer text="House area in m²" type="number" name="house.area" />

      <RegularAnswer text="Number of rooms without kitchen and bathroom:" type="number" name="house.number_of_rooms_withoutkitchenandbath" />

      <YesNoAnswer text="House has kitchen:" name="house.has_kitchen" />

      <YesNoAnswer text="House has bathroom:" name="house.has_bathroom" />

      <OptionsAnswer text="House hold situation" name="house.hh_situation" />

      {/* Simple */}
      <Soukout />

      {/*The following 2 questions can have multiple answers.. have to change the db and make a new table? */}

      {/*TODO multiple answers possible*/}

      <OptionsAnswer text="Whats around ur house?" name="house.around_hh" />

      {/*TODO multiple answers possible*/}

      <OptionsAnswer text="What are the khadamat l mutawafira?" name="house.available_khadamet" />

      {/*TODO 2 more questions on each selection */}

      <OptionsAnswer text="Do you pay for it?" name="house.payed" />

      <YesNoAnswer text="Do you have a receipt?" name="house.has_receipt" />

      <OptionsAnswer text="Reason living in this house:" name="house.hh_reason" />

      <Residence />

    </SectionWithTitle>

    {/*FamilyHealth table informations now */}

    <SectionWithTitle title="Family health information">
      <FamilyHealth />
    </SectionWithTitle>

    <SectionWithTitle title="Family Education Information">
      <OptionsAnswer text="Who helps the kids with their studies?" name="house.kids_school_help" />
      <UNHelp />
    </SectionWithTitle>

    <SectionWithTitle title="Family Finance Information">
      <FamilyFinance />
    </SectionWithTitle>

    {/*Now asking about the indivuals and family members, we have to differentiate between the ones living in the same house or away, different questions if away*/}
    {/*Also have to ask the family head some more questions about the family in general, since everything is saved the interviewer can take care of that and continue later?*/}

    <IndividualSection title="Main Individual" />

  </div>

}
