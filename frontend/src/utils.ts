import Swal from "sweetalert2";
export const showError = (message: string) => {
    Swal.fire({
        title: "An error occured",
        text: message,
        icon: "question"
      });
}

export const noop = () => null