import Swal from 'sweetalert2'

export default function useSwal(option:object){
  const swal = Swal.fire({
    confirmButtonColor: '#198754',
    denyButtonColor: '#dc3545',
    confirmButtonText: '確認',
    denyButtonText: '拒絕',
    cancelButtonText: '取消',
    reverseButtons: true,
    showConfirmButton: true,
    showDenyButton: false, // 拒絕按鈕
    showCancelButton: false, // 取消按鈕
    allowOutsideClick: true, // 允許外部點擊關閉
    ...option,
  });
  return swal;
}