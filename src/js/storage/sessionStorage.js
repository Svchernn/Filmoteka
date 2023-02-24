export class SStorage {
  constructor() { }
  
  save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
  }

  get(key) {
    try {
      const savedSettings = sessionStorage.getItem(key);
      const parsedSettings = JSON.parse(savedSettings);
      return parsedSettings;
    } catch (error) {
    console.error("Get state error: ", error.message);
  }
  }

  load(key)  {
  try {
    const serializedState = sessionStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
  }
  
  remove(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
  }
  
  clear() {
    try {
        sessionStorage.clear();
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
} 

}






