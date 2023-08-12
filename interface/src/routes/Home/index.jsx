import React, { useEffect, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"

import { UserDataContext } from "../../stores/UserDataStore";
import { ToastContainer, toast } from "react-toastify";

import style from "./style.module.css"; // we need to reorganize css

console.log(style)

export default function Home() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const [deletingIndex, setDeletingIndex] = useState()

  const [userData, setUserData] = useContext(UserDataContext)

  console.log(userData)
  useEffect(() => {

    fetch("http://localhost:4000/form", {
      headers: {
        "Authorization": `${userData.token}`
      }
    })
      .then(async (response) => {
        const data = await response.json()
        console.log(data)
        setForms(data);
      })
  }, [])

  const handleLogOut = () => {
    const newUserData = userData.copy()
    newUserData.clearToken()
    newUserData.clearRole()
    setUserData(newUserData)
    toast.info("Logged out successfully");
  };

  const handleNewFormClick = () => {
    navigate("/home/new-form");
  };

  const handleStat = () => {
    navigate("/statistics");
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormDelete = (index, formId) => {
    setDeletingIndex(index);
    axios
      .delete(`http://localhost:4000/form/${formId}`, {
        headers: {
          Authorization: `${userData.token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setForms((forms) => {
          const newForms = [...forms];
          newForms.splice(index, 1);
          return newForms;
        });
        setDeletingIndex(-1);
      })
      .catch((err) => {
        console.error(err.response);

        if (err.response && err.response.status === 500) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else if (err.response && err.response.status === 403) {
          toast.error(err.response.data)
        } else {
          toast.error(
            "An error occurred while submitting the form. Please try again."
          );
        }
        setDeletingIndex(-1);
      });
  }

  const filteredForms = forms.filter((item) => {
    const { first_name, last_name } = item.data;
    const form_id = item.form_id

    const searchTerms = searchQuery.toLowerCase().trim().split(" ");

    return searchTerms.every((term) => {
      const searchTerm = term.trim();

      return (
        first_name.toLowerCase().includes(searchTerm) ||
        last_name.toLowerCase().includes(searchTerm) ||
        String(form_id).includes(searchTerm)
      );
    });
  });

  const renderDataItems = () => {
    return forms.map((item, index) => (
      <div className={style.box} key={index} onClick={() => {
        console.log("click");
        navigate(`/home/form/${item.form_id}`);
      }}>
        <div className={style.leftSide}>
          <div>{item.data.first_name}</div>
          <div>{item.data.last_name}</div>
          <div className={style.gender}>{item.form_id}</div>
        </div>
        <div className={style.rightSide}>
          <div>
            <strong>Last Changed: </strong>
            {item.created_at}
          </div>
          <div>
            <strong>Created Date: </strong>
            {item.created_at}
          </div>
        </div>
      </div>
    ));
  };


  return (
    <div className={style.homeContainer}>

      <div  className={style.leftNavbar}>
        <div className={style.search}>
          <input placeholder="SEARCH..." type="search" className={style.input} value={searchQuery}
          onChange={handleSearchChange}
          />
          <button type="button" className={style.blueButton} onClick={handleNewFormClick}>New Form</button>
          <button type="button" className={`${style.blueButton}`} onClick={handleStat}>Statistics</button>
        </div>

        <div className={style.formList}>
          {renderDataItems()}
        </div>

      </div>

      <div className={style.homeOutlet}>
        <div className={style.homeOutletScroll}>
          <Outlet />
        </div>
      </div>
      
    </div>

  );
}
