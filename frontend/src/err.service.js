import Swal from "sweetalert2"

export const handleResponses = (err) => {
    Swal.fire({
        icon: 'error',
        title: err.status,
        text: err.response.data.message,
      })
}