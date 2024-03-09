export default async function upload(file: FileList) {
  const { $i18n } = useNuxtApp()

  // 請注意，僅限使用 jpg、jpeg 與 png 格式，檔案大小限制為 3MB 以下。
  const formData = new FormData()
  formData.append('file-to-upload', file[0])

  const { apiPath } = useRuntimeConfig().public
  const res: any = await getFetchData({
    url: `/api/${apiPath}/admin/upload`,
    method: 'POST',
    params: formData,
  })
  if (res.success) {
    return res.imageUrl
  } else {
    useSwal({
      icon: 'error',
      title: $i18n.t('error.upload'),
      showConfirmButton: false,
      timer: 3000,
    })
    return ''
  }
}
