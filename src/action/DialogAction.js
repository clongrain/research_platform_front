export const DIALOG_SHOW = "DIALOG_SHOW"
export const DIALOG_HIDDEN = "DIALOG_HIDDEN"
export const DIALOG_AGREE = "DIALOG_AGREE"
export const DIALOG_DISAGREE = 'DIALOG_DISAGREE'
export function dialogShow() {
  return dispatch => {
    dispatch({ type: DIALOG_SHOW })
  }
}

export function dialogHidden() {
  return dispatch => {
    dispatch({ type: DIALOG_HIDDEN })
  }
}

export function dialogAgree() {
  return dispatch => {
    dispatch({ type: DIALOG_AGREE })
  }
}

export function dialogDISagree() {
  return dispatch => {
    dispatch({ type: DIALOG_DISAGREE })
  }
}