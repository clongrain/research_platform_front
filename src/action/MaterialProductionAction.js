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
export function generateMaterial(order, achievements, materialType) {
  const databody = {
    conferencePaper: [], journalPaper: [], award: [], patent: [], monograph: [], softwareCopyright: [], materialType: materialType
  }
  achievements.forEach(item => {
    if (item.type === '会议论文') databody.conferencePaper.push('' + item.id)
    else if (item.type === '期刊论文') databody.journalPaper.push('' + item.id)
    else if (item.type === '获奖') databody.award.push('' + item.id)
    else if (item.type === '专利') databody.patent.push('' + item.id)
    else if (item.type === '专著') databody.monograph.push('' + item.id)
    else if (item.type === '软著') databody.softwareCopyright.push('' + item.id)
  });
  databody['order'] = order.map((item) => {
    if (item === '会议论文') return 'conferencePaper'
    else if (item === '期刊论文') return 'journalPaper'
    else if (item === '获奖') return 'award'
    else if (item === '专利') return 'patent'
    else if (item === '专著') return 'monograph'
    else if (item === '软著') return 'softwareCopyright'
    else return ''
  })
  return async dispatch => {
    try {
      var response = await axios_instance.post('/material/new', databody, {
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