import { useEffect, useContext, useState } from "react";

import RegularAnswer from "../../../components/RegularAnswer";
import OptionsAnswer from "../../../components/OptionsAnswer";
import YesNoAnswer from "../../../components/YesNoAnswer";

import { FormDataStoreContext } from "../../../stores/FormDataStore";

export default function FamilyFinance() {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  
    const [averageIncome, setAverageIncome] = useState("");
    const [averagePayingMonthly, setAveragePayingMonthly] = useState("");
    const [difference, setDifference] = useState(0);
    const [a1, setA1] = useState(formDataStore.data["house.kared_masrifi"]);
    const [a2, setA2] = useState(formDataStore.data["house.kared_ghayr_masrifi"]);
  
  
    useEffect(() => {
      setDifference(averageIncome - averagePayingMonthly);
    }, [averageIncome, averagePayingMonthly]);
  
    const handleIncomeChange = (event) => {
      setAverageIncome(Number(event.target.value));
    };
  
    const handleExpenseChange = (event) => {
      setAveragePayingMonthly(Number(event.target.value));
    };
  
    return (
      <>
        <RegularAnswer
          text="Family's average income (in dollars):"
          type="number"
          name="house.average_income"
          value={averageIncome}
          onChange={handleIncomeChange}
        />
  
        <RegularAnswer text="How do u make that amount of money:" type="text" name="house.income_majority" />
  
        <YesNoAnswer text="Do u have a loan from the bank?" name="house.kared_masrifi" value={a1} onAnswer={(a) => setA1(a)} />
        
        <YesNoAnswer text="Do u have a loan from not from the bank?" name="house.kared_ghayr_masrifi" value={a2} onAnswer={(a) => setA2(a)} />
        {(a1 || a2) && <OptionsAnswer text="Why do u have a loan?" name="house.kared_reason"/>}

        <RegularAnswer
          text="How much do you pay per month?"
          type="number"
          name="house.average_paying_monthly"
          value={averagePayingMonthly}
          onChange={handleExpenseChange}
        />
  
        {difference < 0 && (
          <RegularAnswer
            text="How do you make up the negative difference between spendings and earnings?"
            type="text"
            name="house.paying_difference_incomeoutcome_method"
          />
        )}
  
        <OptionsAnswer text="What do u spend on most?" name="house.paying_on" />
  
        <YesNoAnswer text="Do u get any financial help?" name="house.getting_financial_help" />
  
      </>
  
  
    );
  }
  