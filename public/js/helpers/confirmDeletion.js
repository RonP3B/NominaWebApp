export const confirmDeletion = function (form) {
  $(form).submit(function (event) {
    event.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de eliminar al empleado seleccionado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffb347",
      cancelButtonColor: "#ffca46",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "whitesmoke",
      customClass: { title: "text-warning" },
    }).then((result) => {
      if (result.isConfirmed) {
        $(this).off("submit").submit();
      }
    });
  });
};
