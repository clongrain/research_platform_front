import store from "store";
const SESSION_KEY = "session";
const USER_KEY = "user"
export default {
  saveSession(session){
    // localStorage.setItem(USER_KEY,JSON.stringify(user));
    store.set(SESSION_KEY,session)
  },
  getSession(){
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(SESSION_KEY)
  },
  removeSession(){
    // localStorage.removeItem(USER_KEY);
    store.remove(SESSION_KEY)
  },
  saveUser(user){
    store.set(USER_KEY,user)
  },
  getUser(){
    return store.get(USER_KEY)
  },
  removeUser(){
    store.remove(USER_KEY)
  }
}