import { showFormMsg } from "./showFormMsg.js";

export const validateEmployee = (form) => {
  const emailRegEx = /^\S+@\S+\.\S+$/;

  if ($("#phone").val().includes("_")) {
    return showFormMsg("Número telefónico inválido.");
  }

  if (!emailRegEx.test($("#email").val())) {
    return showFormMsg("Correo electronico inválido.");
  }

  if (isNaN($("#salary").val())) {
    return showFormMsg("Sueldo inválido.");
  }

  $(form).submit();
};
