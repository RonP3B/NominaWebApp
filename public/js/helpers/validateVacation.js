import { showFormMsg } from "./showFormMsg.js";

export const validateVacation = (form) => {
  const dates = [];

  $(`${form} input[type="date"]`).each(function () {
    dates.push($(this).val());
  });

  if (new Date(dates[1]) <= new Date(dates[0])) {
    return showFormMsg(
      "La fecha de finalización debe ser mayor a la de inicio"
    );
  }

  $(form).submit();
};
