import { useEffect, useContext, useState } from "react";
import { FormDataStoreContext } from "../../../stores/FormDataStore";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserDataContext } from "../../../stores/UserDataStore";

import 'react-toastify/dist/ReactToastify.css';
import style from "./style.module.css"

export default function PageBrowser(props) {
  const { setPageDetailsFromBrowser } = props
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)
  const [userData, setUserData] = useContext(UserDataContext)
  const navigate = useNavigate();

  // const [marriages, setMarriages] = useState(formDataStore.getByNameKey("marriages") || [])
  const marriages = formDataStore.getByNameKey("marriages") || []

  console.log(`got new marriages: ${marriages}`)
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.currentPage) || 0);

  const mainPage = { title: "Individual General Info", type: "general" }
  let pages = [mainPage]
  for (let i = 0; i < marriages.length; i++) {
    const marr = marriages[i];
    pages.push({ ...marr, marriage_id: i, title: `Marriage with ${marr.first_name}`, type: "marriage" })
    if (marr.childrens) // more better smarter stronger
      pages = pages.concat(marr.childrens.map((child, j) => ({ ...child, marriage_id: i, child_id: j, title: `Child ${child.first_name}`, type: "children" })))
  }

  const submitPage = { title: "Submit", type: "submit" };
  const recommendPage = { title: "Conclusion", type: "recommend" };
  pages.push(recommendPage);
  pages.push(submitPage);

  useEffect(() => {
    // formDataStore.registerObserver("marriages", (marriages) => {
    //   console.log(marriages)
    //   setMarriages([...marriages])
    // })
    setPageDetailsFromBrowser(pages, currentPage)
  }, [])


  function saveCurrentPage(i) {
    localStorage.setItem("currentPage", i)
    setCurrentPage(i)
    setPageDetailsFromBrowser(pages, i)
  }

  function renderPages() {
    return pages.map((page, i) => {
      const active = i === currentPage ? 'active' : '';
      return (
        <div
          key={i}
          onClick={() => {
            saveCurrentPage(i);

            if (pages[i].type === 'submit') {
              setIsSubmitting(true);
              const formData = formDataStore.data;
              formData.form_id = formDataStore.form_id

              axios.post('http://localhost:4000/form', formData, {
                headers: {
                  Authorization: `${userData.token}`
                }
              })
                .then(response => {
                  { saveCurrentPage(0) }
                  setIsSubmitting(false);
                  console.log(response.data)
                  formDataStore.removeFromLocalStorage()
                  navigate("/home")
                })
                .catch(err => {
                  console.error(err.response);
                  setIsSubmitting(false);
                  if (err.response && err.response.status === 500) {
                    const errorMessage = err.response.data;
                    console.error(errorMessage);
                    toast.error("idk bro")
                  } else if (err.response && err.response.status === 403) {
                    toast.error(err.response.data)
                  } else {
                    toast.error("An error occurred while submitting the form. Please try again.");
                  }

                  saveCurrentPage(0)
                })

            }

          }}

          className={`${style.pageButton} ${style.pageButtonActive}`}
        >
          {i + 1 + ' - ' + page.title}

          {["marriage", "children"].includes(pages[i].type) && (
            <button
              onClick={(e) => {
                if (pages[i].type === "children") {
                  const childIndex = pages[i].child_id;
                  let newChildrens = formDataStore.getByNameKey(`marriages[${pages[i].marriage_id}].childrens`);
                  newChildrens.splice(childIndex, 1);
                  const newFds = formDataStore.copy()
                  newFds.setNameData(`marriages[${pages[i].marriage_id}].childrens`, [...newChildrens]);
                  setFormDataStore(newFds)
                  if (currentPage === i) saveCurrentPage(currentPage - 1);
                }

                if (pages[i].type === "marriage") {
                  const marriageIndex = pages[i].marriage_id;
                  let newMarriages = formDataStore.getByNameKey(`marriages`);
                  newMarriages.splice(marriageIndex, 1);
                  const newFds = formDataStore.copy()
                  newFds.setNameData(`marriages`, [...newMarriages]);
                  setFormDataStore(newFds)
                  if (currentPage === i) saveCurrentPage(currentPage - 1);
                }

                e.stopPropagation();
              }}
            >
              X
            </button>
          )}
        </div>
      );
    })
  }

  return (
    <div className={style.pageBrowser}>
      {isSubmitting && <div className={style.submitting}> <div className={style.message}> Submitting form...  </div></div>}
      <h2>Page Browser</h2>

      <div className={style.pagesContainer}>
        {renderPages()}
      </div>

      {/* <div className={style.bottomBar}>
        <button className={`${style.bottomBarButton}`} onClick={() => { if (currentPage > 0) saveCurrentPage(currentPage - 1) }}>
          PREV
        </button>
        <button className={`${style.bottomBarButton} ${style.deleteButton} ${style.button}`} onClick={() => { if (currentPage + 1 < pages.length) saveCurrentPage(currentPage + 1) }}>
          NEXT
        </button>
      </div> */}

      <ToastContainer position="bottom-right" />
    </div>

  );

};