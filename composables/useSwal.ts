import Swal from 'sweetalert2'

export default function useSwal(option: object) {
  const { $i18n } = useNuxtApp()

  const swal = Swal.fire({
    confirmButtonColor: '#198754',
    denyButtonColor: '#dc3545',
    confirmButtonText: $i18n.t('common.confirm'),
    denyButtonText: $i18n.t('common.reject'),
    cancelButtonText: $i18n.t('common.cancel'),
    reverseButtons: true,
    showConfirmButton: true,
    showDenyButton: false, // 拒絕按鈕
    showCancelButton: false, // 取消按鈕
    allowOutsideClick: true, // 允許外部點擊關閉
    ...option,
  })
  return swal
}
