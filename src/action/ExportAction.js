import { messageAPI } from "@/components/Message"
import { axios_instance } from "@/utils/axios_instance"

export const EXPORT_STUDENT = 'EXPORT_STUDENT'
export const EXPORT_TEACHER = 'EXPORT_TEACHER'
export const EXPORT_CONFERENCE_PAPER = 'EXPORT_CONFERENCE_PAPER'
export const EXPORT_JOURNAL_PAPER = 'EXPORT_JOURNAL_PAPER'
export const EXPORT_MONOGRAPH = 'EXPORT_MONOGRAPH'
export const EXPORT_AWARD = 'EXPORT_AWARD'
export const EXPORT_PATENT = 'EXPORT_PATENT'
export const EXPORT_SOFTWARE_COPYRIGHT = 'EXPORT_SOFTWARE_COPYRIGHT'
export const EXPORT_PROJECT = "EXPORT_PROJECT"

export function downloadFile(dataFlow, fileName) {
  if (dataFlow?.code === 500) {
    messageAPI.error({text: 'Failed to export data'})
    return 
  }
  var blob;
  // if (fileName.split('.')[1] === 'xls' || fileName.split('.')[1] === 'xlsx') {
  //   blob = new Blob([dataFlow], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });
  // } else {
  //   blob = new Blob(
  //     [
  //       new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM
  //       dataFlow,
  //     ],
  //     {
  //       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     }
  //   );
  // }
  blob = new Blob([dataFlow])
  if ('download' in document.createElement('a')) {
    // 非IE下载
    try{
      const elink = document.createElement('a');
      elink.setAttribute('download', fileName)
    
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放 URL对象
    document.body.removeChild(elink);
    messageAPI.success({text:'Succeeded in exporting data'})
    } catch (error){
      console.log('dowa err')
    }
  }
  
}

export function exportStudents(students){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/students', {
        students: students
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_students.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportTeachers(teachers){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/teachers', {
        teachers: teachers
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_teachers.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportConferencePapers(papers){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/conference-papers', {
        conferencePapers: papers
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_conference_papers.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportJournalPapers(papers){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/journal-papers', {
        journalPapers: papers
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_journal_papers.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportMonographs(monographs){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/monographs', {
        monographs: monographs
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_monographs.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportAwards(awards){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/awards', {
        awards: awards
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_awards.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportPatents(patents){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/patents', {
        patents: patents
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_patents.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportSoftwareCopyrights(softwareCopyrights){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/software-copyrights', {
        softwareCopyrights: softwareCopyrights
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_software_copyrights.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}

export function exportProjects(projects){
  return async dispatch => {
    try{
      var res = await axios_instance.post('/export/projects', {
        projects: projects
      },{
        responseType:'blob',
        headers:{
          'Content-Type': 'application/json',
        }
      })
      downloadFile(res.data, new Date().getTime()+'_projects.xlsx')
      return true
    } catch (error){
      console.log(error)
      messageAPI.error({text:'Failed to export data'})
      return false
    }
  }
}
