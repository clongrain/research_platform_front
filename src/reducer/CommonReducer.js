import { UPDATE_USER_NAME } from "@/action/CommonAction"
import storageUtils from "@/utils/storageUtils";

const initialState = {
  userName: storageUtils.getUser()?.name || ""
}
export default function CommonReducer(state=initialState, action){
  const {type, data} = action
  switch(type){
    case UPDATE_USER_NAME:
      return {
        ...state,
        userName:data
      };
    default: return state
  }
}