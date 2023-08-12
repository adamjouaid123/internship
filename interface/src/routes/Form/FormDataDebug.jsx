import { useEffect, useContext, useState } from "react"
import { FormDataStoreContext } from "../../stores/FormDataStore"
import { useNavigate } from "react-router-dom"

export default function FormDataDebug() {
  const [formDataStore, setFormDataStore] = useContext(FormDataStoreContext)

  // const [data, setData] = useState({...formDataStore.data})
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   setInterval(() => {
  //     setData({...formDataStore.data})
  //   }, 1000)
  // }, [])

  return <div className="formdatadebug">
    <pre>{JSON.stringify(formDataStore.data, null, 2)}</pre>
    <div>
      {/* <button onClick={() => setData({...formDataStore.data})}>get data</button> */}
      <button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }}>reset</button>
    </div>
  </div>
}
