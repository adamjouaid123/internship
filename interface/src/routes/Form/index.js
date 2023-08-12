import { useParams, useLocation } from "react-router-dom";
import { createContext, useEffect, useContext, useState } from "react";

import FormDataDebug from "./FormDataDebug";
import PageBrowser from "./PageBrowser";
import MarriagesInfo from "./Marriage.jsx";
import { ChildrenSection } from "./ChildrenSection.jsx";
// import MainPage from "../components/MainPage";
import MainPage from "./MainPage";
import Recommendation from "./Recommendation";

import { FormDataStore, FormDataStoreContext } from "../../stores/FormDataStore";

import { useNavigate } from "react-router-dom"

// import Timer from "./components/Timer";
import { UserDataContext } from "../../stores/UserDataStore";

import style from "./style.module.css"


const Form = () => {
  const { formId } = useParams();
  const location = useLocation();
  const [pages, setPages] = useState(); // hacker 
  const [pageIndex, setPageIndex] = useState(0);

  const isNewForm = location.pathname.includes("/new-form")
  const [loading, setLoading] = useState(true);
  const [formDataStore, setFormDataStore] = useState(new FormDataStore(false))

  const [userData, setUserData] = useContext(UserDataContext)

  useEffect(() => {
    if (!isNewForm) {
      // need to get the data from the api now
      fetch(`http://localhost:4000/form/${formId}`, {
        headers: {
          "Authorization": `${userData.token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(response)
          return response.json();
        })
        .then(apiJSON => {
          console.log(formDataStore)
          formDataStore.loadData(apiJSON);
          setTimeout(() => {
            setLoading(false)
          }, 300)
          // we didnt have to reload the data anymore because we did the setLoading stuff 
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
    } else {
      setFormDataStore(new FormDataStore(true))
      setTimeout(() => {
        setLoading(false)
      }, 300)
      // if data contains form_id, clear the local storage ? :rofl: 🤣
    }
  }, [formId])

  function setPageDetailsFromBrowser(pages, pageIndex) {
    setPages(pages)
    setPageIndex(pageIndex)
  }

  return loading
    ? <div className="loading"> <div className="loading-message">loading form please wait</div></div> // you can replace this with some UI
    : <FormDataStoreContext.Provider value={[formDataStore, setFormDataStore]}>
      {/* <Timer />  */}

      <div className={style.topActionBar}>
        {/* Navigation */}
        <PageBrowser {...{ setPageDetailsFromBrowser }} />

        {/* Debug */}
        {/* <FormDataDebug/> */}

      </div>

      <div className={style.container}>

        {pages?.[pageIndex]?.type === "general" && <MainPage
          key={pageIndex}
        />}

        {pages?.[pageIndex]?.type === "marriage" && <MarriagesInfo
          key={pageIndex}
          page={pages[pageIndex]}
          marriageId={pages?.[pageIndex]?.marriage_id}
        />}

        {pages?.[pageIndex]?.type === "children" && <ChildrenSection
          key={pageIndex}
          page={pages[pageIndex]}
          marriageId={pages?.[pageIndex]?.marriage_id}
          childId={pages?.[pageIndex]?.child_id}
        />}

        {pages?.[pageIndex]?.type === "recommend" && <Recommendation pages={pages} />}

      </div>
    </FormDataStoreContext.Provider>

};

export default Form;
