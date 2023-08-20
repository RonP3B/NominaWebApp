import { showFormMsg } from "./showFormMsg.js";

export const validateReset = (form) => {
  if ($("#password").val().length < 6) {
    return showFormMsg("La contraseña debe tener mas de 5 caracteres.");
  }

  if ($("#password").val() !== $("#confirmPassword").val()) {
    return showFormMsg("Las contraseñas no coinciden.");
  }

  $(form).submit();
};
