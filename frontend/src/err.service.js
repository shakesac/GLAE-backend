import Swal from "sweetalert2"

export const handleResponses = (err) => {
  let msg
  if (err.response) {
    msg = err.response.data.message
  } else {
    msg = err
    console.log(err)
  }
    Swal.fire({
        icon: 'error',
        title: err.status,
        text: msg
      })
}