import { Outlet } from "react-router-dom";
import style from "./style.module.css"

import { ToastContainer, toast } from "react-toastify";
import { UserDataContext } from "../../stores/UserDataStore";
import { useContext } from "react";

export default function RouterLayout() {

  const [userData, setUserData] = useContext(UserDataContext)

  const handleLogOut = () => {
    const newUserData = userData.copy()
    newUserData.clearToken()
    newUserData.clearRole()
    setUserData(newUserData)
    toast.info("Logged out successfully");
  };

  return (
    <div className={style.rootLayout}>
      <div className={style.navbar}>
        <div className={style.logo}>
          ......
          {/* <img src="" alt="LOGO" /> */}
        </div>
        <button className={style.logout} onClick={handleLogOut}>Log Out</button>
      </div>
      <Outlet />
    </div>
  );
}