import { messageAPI } from "@/components/Message"
import supabase, { BUCKET_NAME } from "@/config"


export function downloadStorageFile(storagePath){
  handleClickDownload(storagePath)
}
const handleClickDownload = async (storage_path="") => {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).download(storage_path)
  if (data) {
    const A = document.createElement('a')
    const href = window.URL.createObjectURL(data)
    A.href = href
    A.download = storage_path.substring(storage_path.lastIndexOf('/')+1) // 下载后文件名
    document.body.appendChild(A)
    A.click() // 点击下载
    document.body.removeChild(A) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
  else if(error){
    messageAPI.error({title:"Download Error", text:error.message})
  }
}