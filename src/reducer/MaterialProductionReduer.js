import { SET_ACHIEVEMENTS, SET_ORDER, SET_MATERIAL_TYPE } from "@/action/MaterialProductionAction"

const initState = {
  order: [],
  achievements: {},
  materialType: '成果报奖'
}
export default function MaterialProductionReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case SET_ORDER:
      return {
        ...state, order: data
      };
    case SET_ACHIEVEMENTS:
      return {
        ...state, achievements: data
      };
    case SET_MATERIAL_TYPE:
      return {
        ...state, materialType: data
      };
    default:
      return state
  }
}