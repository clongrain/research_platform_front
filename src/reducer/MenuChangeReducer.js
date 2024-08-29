import { MENU_CHANGE } from "@/action/MenuChangeAction"

const initialState = {
  // currentMenu:(window.location.pathname===undefined||!window.location.pathname)?'/users/students':window.location.pathname
  currentMenu:'/users/students'
}
export default function MenuChangeReducer(state = initialState, action){
  const { type, data } = action
  switch (type){
    case MENU_CHANGE:{
      return {
        ...state,
        currentMenu: data
      }
    };
    default: return state
  }
}