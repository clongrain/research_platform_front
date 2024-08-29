import { DIALOG_AGREE, DIALOG_DISAGREE, DIALOG_HIDDEN, DIALOG_SHOW } from "@/action/DialogAction"

const initState = {
  dialogShow: true,
  dialogAgree: true
}

export function DialogReducer(state=initState, action){
  const { type, data } = action
  switch (type){
    case DIALOG_SHOW:{
      return {
        ...state,
        dialogShow: true
      }
    };
    case DIALOG_HIDDEN:{
      return {
        ...state,
        dialogShow: false
      }
    };
    case DIALOG_AGREE:{
      return {
        ...state,
        dialogAgree: true
      }
    };
    case DIALOG_DISAGREE:{
      return {
        ...state,
        dialogAgree: false
      }
    };
    default: return state
  }
}