import Swal from 'sweetalert2'

export const showAlert = ({ 
  icon = 'info', 
  title = '', 
  text = '', 
  position = 'center', 
  timer = null, 
  showConfirmButton = true ,
  backdrop = true
}) => {
  return Swal.fire({
    icon,
    title,
    text,
    position,
    showConfirmButton,
    timer,
    backdrop,
  })
}