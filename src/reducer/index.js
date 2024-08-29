import { combineReducers } from "redux";
import MenuChangeReducer from './MenuChangeReducer'
import { DialogReducer } from "./DialogReducer";
import MaterialProductionReducer from "./MaterialProductionReduer";

const rootReducer = combineReducers({
  MenuChange: MenuChangeReducer,
  Dialog: DialogReducer,
  MaterialProduction: MaterialProductionReducer

})

export default rootReducer