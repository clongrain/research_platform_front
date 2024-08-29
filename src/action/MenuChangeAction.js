export const MENU_CHANGE = 'MENU_CHANGE'

export function menuChange(menuId){
  return dispatch => {
    dispatch({ type: MENU_CHANGE, data: menuId})
  }
}