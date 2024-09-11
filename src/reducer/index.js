import { combineReducers } from "redux";
import MenuChangeReducer from './MenuChangeReducer'
import { DialogReducer } from "./DialogReducer";
import MaterialProductionReducer from "./MaterialProductionReduer";
import CommonReducer from "./CommonReducer";

const rootReducer = combineReducers({
  MenuChange: MenuChangeReducer,
  Dialog: DialogReducer,
  MaterialProduction: MaterialProductionReducer,
  Common: CommonReducer
})

export default rootReducer