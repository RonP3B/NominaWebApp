import { showFormMsg } from "./showFormMsg.js";

export const validateSignUp = (form) => {
  const emailRegEx = /^\S+@\S+\.\S+$/;

  if ($("#phone").val().includes("_")) {
    return showFormMsg("Número telefónico inválido.");
  }

  if (!emailRegEx.test($("#email").val())) {
    return showFormMsg("Correo electronico inválido.");
  }

  if ($("#password").val().length < 6) {
    return showFormMsg("La contraseña debe tener mas de 5 caracteres.");
  }

  if ($("#password").val() !== $("#confirmPassword").val()) {
    return showFormMsg("Las contraseñas no coinciden.");
  }

  $(form).submit();
};
