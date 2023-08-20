"use strict";

import { seePassword } from "./helpers/seePassword.js";
import { validateForm } from "./helpers/validateForm.js";
import { validateSignUp } from "./helpers/validateSignup.js";
import { validateReset } from "./helpers/validateReset.js";
import { confirmDeletion } from "./helpers/confirmDeletion.js";
import { prenventNonNumeric } from "./helpers/preventNonNumeric.js";
import { addImageForm } from "./helpers/addImageForm.js";
import { validateEmployee } from "./helpers/validateEmployee.js";
import { collapseForm } from "./helpers/collapseForm.js";
import { validateVacation } from "./helpers/validateVacation.js";
import { filterEmployees } from "./helpers/filterEmployees.js";

$(() => {
  String.prototype.isEmpty = function () {
    return this === null || this === undefined || this.trim().length === 0;
  };

  Inputmask("(9{3}) 9{3}-9{4}", { greedy: false }).mask("input[type=tel]");

  $("#salary").on("input", prenventNonNumeric);

  $("#image").change((e) => addImageForm(e));

  $(".alert-container").on("click", "#form-alert-btn", () =>
    $(".form-alert").fadeOut()
  );

  $("#togglePassword").click(() => seePassword());

  $("#btn-submit").click(() => validateForm("#default-form"));

  $("#btn-signup").click(() => validateForm("#form-signup", validateSignUp));

  $("#btn-resetPass").click(() => validateForm("#form-reset", validateReset));

  $("#btn-addVacation").click(() =>
    validateForm("#form-vacation", validateVacation)
  );

  $("#btn-employee").click(() =>
    validateForm("#form-employee", validateEmployee)
  );

  $(".btn-delete-employee").click(() => confirmDeletion(".delete-employee"));

  $("#btn-collapse").click(() => collapseForm());

  $("#input-filter").on("input", function () {
    filterEmployees(this);
  });

  $("#btn-filter").click(() =>
    $(".filter-content").animate({ width: "toggle" })
  );
});
