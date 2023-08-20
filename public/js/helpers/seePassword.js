export const seePassword = function () {
  $("#password").attr(
    "type",
    $("#password").attr("type") === "password" ? "text" : "password"
  );

  $("#togglePassword").toggleClass("bi-eye");
};
