import _ from "lodash";
import { createContext } from "react";

export class FormDataStore {
  observers = {};
  data;
  form_id;
  useLocalStorage;
  
  constructor(useLocalStorage) {
    console.log(`constructing formdatastore with useLocal: ${useLocalStorage}`)
    this.useLocalStorage = useLocalStorage
    const storedData = this.getFromLocalStorage()
    try {
      this.data = JSON.parse(storedData) || {};
    } catch (error) {
      this.data = {};
    }
    if (!storedData) {
      this.setToLocalStorage(this.data)
    }

    // setInterval(() => {console.log(this.observers)}, 1000)
  }

  copy() {
    const result = new FormDataStore()
    result.observers = this.observers
    result.data = this.data
    result.form_id = this.form_id
    result.useLocalStorage = this.useLocalStorage
    return result
  }

  getFromLocalStorage() {
    console.log(this.useLocalStorage)
    if (this.useLocalStorage) {
      return localStorage.getItem("formdata")
    } else {
      return {}
    }
  }

  setToLocalStorage(data) {
    if (this.useLocalStorage) {
      localStorage.setItem("formdata", JSON.stringify(data));
    }  
  }

  removeFromLocalStorage() {
    if (this.useLocalStorage) {
      localStorage.removeItem("formdata")
    }  
  }

  registerObserver(path, callback) {
    console.log(`registering ${path} as observer with callback: ${callback}`)
    if (Array.isArray(this.observers[path])) this.observers[path].push(callback)
    else this.observers[path] = [callback];
    console.log(`resulting this.observers[path]: ${JSON.stringify(this.observers[path])}`)
  }

  notifyObservers(name) {
    console.log(`notifying observers on ${name}`)
    if (name) {
      if (!(name in this.observers)) return

      console.log(`notifying ${name} with new data ${JSON.stringify(this.data[name])}`)
      for (let c of this.observers[name]) c(this.data[name])
      return
    }

    for (let path of Object.keys(this.observers)) {
      console.log(`path: ${path} this.observers[path]: ${JSON.stringify(this.observers[path])}`)
      for(let c of this.observers[path]){
        const d = _.get(this.data, path);
        if (d) c(d)
      }
    }

  }

  loadData(apiJSON) { 
    console.log(`setting this.data to ${JSON.stringify(apiJSON)}`)
    this.data = apiJSON.data;
    this.form_id = apiJSON.form_id || -1;
    this.notifyObservers()
  }

  setNameData(path, value) {
    _.set(this.data, path, value)
    // this.notifyObservers(path)
    // if (/childrens|marriages/.test(path)) this.notifyObservers("marriages") // tab3an hay hack
    this.setToLocalStorage(this.data); // saving progress
  } 

  getByNameKey(name, nameKey) {
    if (nameKey && nameKey !== "") name += "_" + nameKey
    return _.get(this.data, name)
  }
}

const FormDataStoreContext = createContext(null)

export { FormDataStoreContext } 
