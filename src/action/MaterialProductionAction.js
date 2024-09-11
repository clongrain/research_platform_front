import { axios_instance } from "@/utils/axios_instance"
import { messageAPI } from "@/components/Message"

export const SET_ORDER = 'SET_ORDER'
export const SET_ACHIEVEMENTS = 'SET_ACHIEVEMENTS'
export const SET_MATERIAL_TYPE = 'SET_MATERIAL_TYPE'
export function setMaterialOrder(order) {
  return dispatch => {
    dispatch({ type: SET_ORDER, data: order })
  }
}
export function setMaterialType(materialType) {
  return dispatch => {
    dispatch({ type: SET_MATERIAL_TYPE, data: materialType })
  }
}
export function setMaterialAchievements(achievements) {
  return dispatch => {
    dispatch({ type: SET_ACHIEVEMENTS, data: achievements })
  }
}
export function generateMaterial(order = [], achievements, materialType) {

  const conferencePaper = [], journalPaper = [], award = [], patent = [], monograph = [], softwareCopyright = []

  achievements.forEach(item => {
    if (item.type === '会议论文') conferencePaper.push(item.storagePath)
    else if (item.type === '期刊论文') journalPaper.push(item.storagePath)
    else if (item.type === '获奖') award.push(item.storagePath)
    else if (item.type === '专利') patent.push(item.storagePath)
    else if (item.type === '专著') monograph.push(item.storagePath)
    else if (item.type === '软著') softwareCopyright.push(item.storagePath)
  });
  const paths = []
  order.forEach((item) => {
    if (item === '会议论文') paths.push(...conferencePaper)
    else if (item === '期刊论文') paths.push(...journalPaper)
    else if (item === '获奖') paths.push(...award)
    else if (item === '专利') paths.push(...patent)
    else if (item === '专著') paths.push(...monograph)
    else if (item === '软著') paths.push(...softwareCopyright)
  })

  const body = {
    materialType:materialType,
    paths:paths
  }
  return async dispatch => {
    try {
      var response = await axios_instance.post('/material/new', body, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const blob = new Blob([response.data], { type: 'application/pdf' });
      // 创建一个下载链接
      const downloadLink = document.createElement('a');
      // 将 Blob 对象转换成一个可下载的 URL
      downloadLink.href = URL.createObjectURL(blob);
      // 设置下载的文件名
      downloadLink.download = 'merged_file.pdf';
      // 模拟用户点击下载链接
      downloadLink.click();
    }
    catch (error) {
      messageAPI.error({ text: 'Failed to export data' })
      return false
    }
  }
}