import { messageAPI } from "@/components/Message"
import { sortby } from "@/utils/commonUtils"


/**
 * 
 * @param {Event} e 
 * @param {()=>{}} setDatas 设置对象数组的方法
 * @param {[Object]} datas 对象数组
 * @param {String} field 搜索对象的哪个成员变量
 * @param {*} searchValue 输入值
 */
export const onSearchEnter = (e, setDatas, datas, field, searchValue) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    setDatas(datas.filter((data) => {
      if (data[field].includes(searchValue)) return data
    }))
  }
}
/**
 * 
 * @param {[Boolean]} selected 选择数组，判断哪些对应索引数据被选择
 * @param {()=>{}} exportMethod ExportAction中的导出方法，exportStudent等
 * @param {[Object]} datas 所有数据
 */
export const handleExport = (selected, exportMethod, datas, dispatch) => {
  let selectedData = false
  selected.forEach((item) => {
    if (item) selectedData = true
  })
  if (!selectedData) messageAPI.info({ text: '请至少选择一条数据' })
  else {
    dispatch(exportMethod(datas.filter((data, index) => selected[index])))
  }
}
/**
 * 
 * @param {Event} e 
 * @param {()=>{}} setAscending 设置顺序的方法
 * @param {*} sortBy 排序的字段
 * @param {*} setDatas 设置对象数组的方法
 * @param {*} datas 对象数组
 */
export const onChangeOrder = (e, setAscending, sortBy, setDatas, datas) => {
  setAscending(e.target.value === 'true')
  const newDatas = datas
  newDatas.sort(sortby(sortBy, e.target.value === 'true' ? 1 : -1))
  setDatas(newDatas)
}
/**
 * 
 * @param {Event} e 
 * @param {()=>{}} setSortBy 设置排列字段的方法
 * @param {*} datas 对象数组
 * @param {*} setDatas 设置对象数组的方法
 * @param {*} ascending 排列顺序
 */
export const onChangeSort = (e, setSortBy, datas, setDatas, ascending) => {
  setSortBy(e.target.value)
  const newDatas = datas
  newDatas.sort(sortby(e.target.value, ascending ? 1 : -1))
  setDatas(newDatas)
}
export const onClickDetail = (data, navigate, type) => {
  switch (type) {
    case 'student':
      navigate(`/users/students/details/${data.user_id}`, { state: data })
      break;
    case 'teacher':
      navigate(`/users/teachers/details/${data.user_id}`, { state: data })
      break;
    case 'award':
      navigate(`/achievements/awards/details/${data.id}`)
      break;
    case 'monograph':
      navigate(`/achievements/monographs/details/${data.id}`)
      break;
    case 'patent':
      navigate(`/achievements/patents/details/${data.id}`)
      break;
    case 'project':
      navigate(`/projects/details/${data.id}`)
      break;
    case 'softwareCopyright':
      navigate(`/achievements/software-copyrights/details/${data.id}`)
      break;
    default:
      break;
  }
}
/**
 * 
 * @param {Number} pos 对应数据的索引
 * @param {Boolean} value 选择数组对应索引位置的值
 * @param {[Boolean]} selected 选择数组
 * @param {()=>{}} setSelected 设置选择数组的方法
 * @param {()=>{}} setSelectedAll 设置全选的方法
 */
export const onChangeChecked = (pos, selected, setSelected, setSelectedAll) => {
  let flag = true
  setSelected(selected.map((item, index) => {
    if (pos === index) {
      if (selected[pos]) flag = false;
      return !selected[pos]
    }
    else {
      if (!item) flag = false
      return item
    }
  }))
  setSelectedAll(flag)
}