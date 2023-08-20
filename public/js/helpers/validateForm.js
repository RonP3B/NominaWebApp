import { showFormMsg } from "./showFormMsg.js";

const highlightFields = (form) => {
  $(`${form} .required`).each(function () {
    if ($(this).val().isEmpty()) $(this).addClass("is-invalid");
    else $(this).removeClass("is-invalid");
  });
};

const checkFields = (form) => {
  let res = true;

  $(`${form} .required`).each(function () {
    if ($(this).val().isEmpty()) {
      res = false;
      return false;
    }
  });

  return res;
};

export const validateForm = (
  form,
  validateFunction = false,
  msg = "Debes completar todos los campos."
) => {
  highlightFields(form);

  if (checkFields(form)) {
    validateFunction ? validateFunction(form) : $(form).submit();
  } else {
    showFormMsg(msg);
  }
};
